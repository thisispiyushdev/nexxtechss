import "dotenv/config";
import express from "express";
import cors from "cors";
import { generateKnowledgeReply } from "../backend/src/routes/chatRoutes.js";

const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5500,https://www.nexxtechs.com"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

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

// In-memory rate limiter
const hits = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
  const now = Date.now();
  const windowMs = 60_000;
  const max = 30;
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

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "Nexxi AI Chatbot Server",
    status: "healthy",
    engine: "Website Internal Knowledge Base (Zero External API)",
  });
});

// Main chat endpoint
app.post("/api/chat", rateLimit, (req, res) => {
  const raw = req.body?.messages;
  if (!Array.isArray(raw) || !raw.length) {
    return res.status(400).json({ error: "Message missing ya galat format me hai." });
  }

  const latest = raw[raw.length - 1];
  const userText = (latest && latest.content) || "";
  const isNoida =
    req.body?.isNoida === true ||
    String(req.body?.branch || "").toLowerCase().includes("noida") ||
    String(req.headers.referer || "").toLowerCase().includes("noida");

  const reply = generateKnowledgeReply(userText, isNoida);
  res.json({ reply });
});

// Generic error handler
app.use((err, _req, res, _next) => {
  res.status(err.message?.includes("CORS") ? 403 : 400).json({
    error: err.message || "Kuch gadbad ho gayi. Kripya dobara try karein.",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Nexxi AI Chatbot running on http://localhost:${PORT}`);
  console.log(`📡 Allowed Origins: ${ALLOWED_ORIGINS.join(", ")}`);
  console.log(`🤖 Engine: Pure Website Knowledge (No API keys required)`);
});
