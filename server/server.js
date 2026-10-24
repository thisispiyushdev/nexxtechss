import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, INSTITUTE, COURSES, FAQS } from "./knowledge.js";

const PORT = process.env.PORT || 3001;
// Recommended Claude 3.5 Haiku model identifier
const MODEL = process.env.CLAUDE_MODEL || "claude-3-5-haiku-20241022";
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5500,https://www.nexxtechs.com"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const apiKey = process.env.ANTHROPIC_API_KEY;
const isPlaceholderKey =
  !apiKey ||
  apiKey === "your_anthropic_api_key_here" ||
  apiKey.includes("your_");

if (isPlaceholderKey) {
  console.warn("\n⚠️  [Nexxi Chatbot Notice]");
  console.warn("ANTHROPIC_API_KEY is not configured yet in server/.env.");
  console.warn("Running in local preview mode. Add your real key from https://console.anthropic.com/ into server/.env to use live Claude 3.5 Haiku.\n");
}

let anthropic = null;
if (!isPlaceholderKey) {
  try {
    anthropic = new Anthropic({ apiKey });
  } catch (err) {
    console.error("Failed to initialize Anthropic client:", err.message);
  }
}

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "25kb" }));

// Dynamic CORS whitelist
app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      const isAllowed =
        ALLOWED_ORIGINS.includes(origin) ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:");
      if (isAllowed) return cb(null, true);
      cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);

// --- In-memory rate limiter: 25 requests / minute / IP ---
const hits = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
  const now = Date.now();
  const windowMs = 60_000;
  const max = 25;
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    return res.status(429).json({
      error: "Bahut zyada messages bhej diye hain. Kripya 1 minute baad try karein.",
    });
  }
  arr.push(now);
  hits.set(ip, arr);
  next();
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, arr] of hits) {
    const fresh = arr.filter((t) => now - t < 60_000);
    fresh.length ? hits.set(ip, fresh) : hits.delete(ip);
  }
}, 5 * 60_000).unref();

// Keep only valid, alternating messages; must start with a user turn.
function cleanMessages(raw) {
  if (!Array.isArray(raw)) return [];
  let msgs = raw
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, 1000) }))
    .filter((m) => m.content.length > 0)
    .slice(-10);

  while (msgs.length && msgs[0].role !== "user") msgs.shift();

  // Merge consecutive same-role messages
  const merged = [];
  for (const m of msgs) {
    const last = merged[merged.length - 1];
    if (last && last.role === m.role) {
      last.content += "\n" + m.content;
    } else {
      merged.push({ ...m });
    }
  }
  return merged;
}

// Fallback smart response when API key is not yet set
function generateLocalPreviewReply(userMessage) {
  const text = (userMessage || "").toLowerCase();

  if (text.includes("fee") || text.includes("fees") || text.includes("paisa") || text.includes("kitna")) {
    return `NexxTechs me fees student ke chosen course module, batch type aur scholarship discount par depend karti hai. Exact fee structure aur available installment/0% EMI options ke liye aap hamare counseling desk par call ya WhatsApp karein: ${INSTITUTE.phone}.`;
  }

  if (text.includes("demo") || text.includes("class") || text.includes("trial")) {
    return `Haan! NexxTechs par 100% Free Demo Class available hai. Aap Delhi (Vikaspuri) ya Noida (Sector 2) center me visit kar sakte hain ya Live Online demo book kar sakte hain. Slot book karne ke liye call/WhatsApp karein: ${INSTITUTE.phone}.`;
  }

  if (text.includes("placement") || text.includes("job") || text.includes("hiring")) {
    return `NexxTechs ka placement track record 95% hai aur 5000+ students train ho chuke hain. Hum 100% placement assistance, resume building, mock interviews aur corporate hiring support provide karte hain!`;
  }

  if (text.includes("data analytic") || text.includes("analytics")) {
    const da = COURSES.find((c) => c.name.includes("Data Analytics"));
    return `📊 Data Analytics Course (Duration: ${da.duration}):\n- Batches: ${da.batches}\n- Topics: ${da.topics}\n- Fees: Counselor se call/WhatsApp (${INSTITUTE.phone}) par direct discuss karein. Kya aap free demo class book karna chahenge?`;
  }

  if (text.includes("data science") || text.includes("ai") || text.includes("ml")) {
    const ds = COURSES.find((c) => c.name.includes("Data Science"));
    return `🤖 Data Science & GenAI Course (Duration: ${ds.duration}):\n- Batches: ${ds.batches}\n- Topics: ${ds.topics}\n- Free demo class ke liye call/WhatsApp karein: ${INSTITUTE.phone}.`;
  }

  if (text.includes("cloud") || text.includes("aws") || text.includes("azure")) {
    const cc = COURSES.find((c) => c.name.includes("Cloud"));
    return `☁️ Cloud Computing Course (Duration: ${cc.duration}):\n- Batches: ${cc.batches}\n- Topics: ${cc.topics}\n- Demo aur batch details ke liye call karein: ${INSTITUTE.phone}.`;
  }

  if (text.includes("devops") || text.includes("docker") || text.includes("kubernetes")) {
    const devops = COURSES.find((c) => c.name.includes("DevOps"));
    return `⚙️ DevOps Engineering (Duration: ${devops.duration}):\n- Batches: ${devops.batches}\n- Topics: ${devops.topics}\n- Call/WhatsApp: ${INSTITUTE.phone}`;
  }

  if (text.includes("full stack") || text.includes("mern") || text.includes("web")) {
    return `💻 Full Stack Web Development (MERN / Python / Java):\n- Duration: 4 se 6 Months\n- Batches: Mon-Fri morning/evening & Weekend\n- Topics: React 19, Next.js, Node, MongoDB, SQL, APIs & 20+ live projects.\n- Fees & free demo ke liye call/WhatsApp karein: ${INSTITUTE.phone}.`;
  }

  if (text.includes("course") || text.includes("list") || text.includes("padhai")) {
    return `NexxTechs par ye trending courses available hain:\n- Data Analytics (4 Months)\n- Data Science & GenAI (6 Months)\n- Cloud Computing AWS/Azure/GCP (5 Months)\n- DevOps Engineering (4 Months)\n- Full Stack Web Dev (MERN/Java/Python - 4-6 Months)\n- Cyber Security & Ethical Hacking (5 Months)\n- Digital Marketing (3 Months)\n- UI/UX Design (4 Months)\n- SAP Masterclass (5 Months)\nAap kisme career banana chahte hain?`;
  }

  if (text.includes("address") || text.includes("kahan") || text.includes("location") || text.includes("branch")) {
    return `📍 Delhi Branch: ${INSTITUTE.delhiAddress} (Call: ${INSTITUTE.phone})\n📍 Noida Branch: ${INSTITUTE.noidaAddress} (Call: ${INSTITUTE.noidaPhone})\nOnline live classes bhi available hain!`;
  }

  return `Namaste! Main Nexxi hu, NexxTechs ki AI counselor. Hamare yahan Data Analytics, Data Science, Cloud, DevOps, Full Stack Web Dev, Cyber Security aur Digital Marketing ke job-oriented courses available hain with 100% placement assistance. Aap kis course ke baare me janna chahte hain? Call/WhatsApp: ${INSTITUTE.phone}`;
}

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "Nexxi AI Chatbot Server",
    status: "healthy",
    hasApiKey: !isPlaceholderKey,
    model: MODEL,
  });
});

// Main chat endpoint
app.post("/api/chat", rateLimit, async (req, res) => {
  const messages = cleanMessages(req.body?.messages);
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Message missing ya galat format me hai." });
  }

  const latestUserText = messages[messages.length - 1].content;

  // If Anthropic client is not initialized or key is missing, use verified preview knowledge
  if (!anthropic || isPlaceholderKey) {
    const previewReply = generateLocalPreviewReply(latestUserText);
    return res.json({ reply: previewReply });
  }

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    res.json({
      reply:
        reply ||
        `Maaf kijiye, main abhi connect nahi kar pa rahi hu. Kripya direct hamare counselor ko ${INSTITUTE.phone} par call ya WhatsApp karein.`,
    });
  } catch (err) {
    console.error("Claude API error:", err?.status, err?.message);

    // Fallback gracefully so the website visitor always gets a verified response
    const fallbackReply = generateLocalPreviewReply(latestUserText);
    res.json({
      reply: fallbackReply,
      warning: "AI service temporarily unavailable, served verified institute data.",
    });
  }
});

// Generic error handler
app.use((err, _req, res, _next) => {
  res.status(err.message?.includes("CORS") ? 403 : 400).json({
    error: err.message || "Kuch gadbad ho gayi. Kripya dobara try karein.",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Nexxi AI Chatbot API running on http://localhost:${PORT}`);
  console.log(`📡 Allowed Origins: ${ALLOWED_ORIGINS.join(", ")}`);
  console.log(`🤖 Engine: ${isPlaceholderKey ? "Local Verified Knowledge Mode (Add API key in .env for Claude)" : `Claude AI (${MODEL})`}`);
});
