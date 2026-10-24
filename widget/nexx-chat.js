/*!
 * Nexxi - NexxTechs AI Chat Widget
 * Single file, zero external dependencies.
 *
 * Usage:
 *   <script src="/nexx-chat.js"
 *           data-api="http://localhost:3001/api/chat"
 *           data-brand="NexxTechs"
 *           data-bot-name="Nexxi"
 *           data-color="#84CC16"
 *           data-phone="+919217179762"></script>
 */
(function () {
  "use strict";
  if (window.__nexxiChatLoaded) return;
  window.__nexxiChatLoaded = true;

  var script = document.currentScript;
  var cfg = (script && script.dataset) || {};
  var API = cfg.api || "http://localhost:3001/api/chat";
  var BRAND = cfg.brand || "NexxTechs";
  var BOT_NAME = cfg.botName || "Nexxi";
  var COLOR = cfg.color || "#84CC16";
  var PHONE = cfg.phone || "+919217179762";
  var WHATSAPP_URL = "https://wa.me/" + PHONE.replace(/[^0-9]/g, "") + "?text=" + encodeURIComponent("Hi Nexxi, I want to know more about courses and demo classes at NexxTechs.");
  var STORE_KEY = "nexxi_chat_session_v1";

  var GREETING =
    "Namaste! 👋 Main " + BOT_NAME + " hu, " + BRAND + " ki AI counselor.\nCourses, duration, batch timings, placement assistance ya Free Demo Class ke baare me kuch bhi puchiye!";

  var CHIPS = [
    "📚 Courses & Duration",
    "⭐ Book Free Demo Class",
    "💰 Fees & Installments",
    "💼 Placement Support",
    "📍 Center Locations"
  ];

  var history = [];
  var busy = false;

  try {
    var saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || "[]");
    if (Array.isArray(saved)) history = saved.slice(-20);
  } catch (e) {}

  function save() {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(history.slice(-20)));
    } catch (e) {}
  }

  // ---------- CSS Styles ----------
  var css =
    ".nxc *{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}" +
    ".nxc{--c:" + COLOR + ";--c-dark:#65A30D;--ink:#0f172a;position:fixed;right:22px;bottom:22px;z-index:2147483000;font-size:14px}" +
    
    /* Launcher Button (FAB) */
    ".nxc-fab{width:62px;height:62px;border-radius:50%;border:0;background:var(--c);color:#000;cursor:pointer;" +
    "box-shadow:0 8px 24px rgba(132,204,22,.45),0 4px 12px rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;transition:all .2s cubic-bezier(.4,0,.2,1);position:relative}" +
    ".nxc-fab:hover{transform:scale(1.08);background:#99e31d;box-shadow:0 12px 28px rgba(132,204,22,.6)}" +
    ".nxc-fab:active{transform:scale(0.96)}" +
    ".nxc-fab-badge{position:absolute;top:-2px;right:-2px;width:14px;height:14px;background:#22c55e;border:2.5px solid #fff;border-radius:50%}" +
    ".nxc-fab svg{transition:transform .2s ease}" +
    ".nxc.open .nxc-fab svg{transform:rotate(90deg)}" +

    /* Chat Panel */
    ".nxc-panel{position:absolute;right:0;bottom:78px;width:390px;max-width:calc(100vw - 28px);height:570px;max-height:calc(100vh - 110px);" +
    "background:#ffffff;border-radius:20px;box-shadow:0 16px 48px rgba(0,0,0,.2),0 0 1px rgba(0,0,0,.1);display:none;flex-direction:column;overflow:hidden;border:1px solid #e2e8f0;transition:opacity .15s ease}" +
    ".nxc.open .nxc-panel{display:flex;animation:nxcIn .25s cubic-bezier(0.16,1,0.3,1)}" +
    "@keyframes nxcIn{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}" +

    /* Header */
    ".nxc-head{background:#0a0c10;color:#ffffff;padding:14px 18px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(255,255,255,.08)}" +
    ".nxc-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--c),#65a30d);display:flex;align-items:center;justify-content:center;font-weight:700;color:#000;font-size:18px;position:relative;flex-shrink:0}" +
    ".nxc-status{position:absolute;bottom:0;right:0;width:10px;height:10px;background:#22c55e;border:2px solid #0a0c10;border-radius:50%}" +
    ".nxc-head-info{flex:1;min-width:0}" +
    ".nxc-head-info b{font-size:16px;color:#fff;display:flex;align-items:center;gap:6px}" +
    ".nxc-head-info small{font-size:12px;color:#94a3b8;display:block}" +
    ".nxc-head-actions{display:flex;align-items:center;gap:4px}" +
    ".nxc-hbtn{background:transparent;border:0;color:#94a3b8;width:32px;height:32px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s}" +
    ".nxc-hbtn:hover{background:rgba(255,255,255,.1);color:#fff}" +

    /* Body */
    ".nxc-body{flex:1;overflow-y:auto;padding:16px;background:#f8fafc;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}" +
    ".nxc-m{max-width:85%;padding:11px 15px;border-radius:16px;font-size:13.5px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}" +
    ".nxc-m.bot{background:#ffffff;color:#1e293b;align-self:flex-start;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.06);border:1px solid #e2e8f0}" +
    ".nxc-m.user{background:var(--c);color:#0a1a02;align-self:flex-end;border-bottom-right-radius:4px;font-weight:500;box-shadow:0 2px 6px rgba(132,204,22,.25)}" +
    ".nxc-m a{color:#0284c7;text-decoration:underline;word-break:break-all}" +
    ".nxc-m strong,.nxc-m b{color:#0f172a;font-weight:600}" +
    ".nxc-m.user strong,.nxc-m.user b{color:#0a1a02}" +

    /* Chips */
    ".nxc-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}" +
    ".nxc-chip{background:#ffffff;border:1px solid #cbd5e1;color:#334155;border-radius:999px;padding:6px 12px;font-size:12px;cursor:pointer;font-weight:500;transition:all .15s ease}" +
    ".nxc-chip:hover{background:var(--c);color:#0a1a02;border-color:var(--c);transform:translateY(-1px)}" +

    /* Typing Dots */
    ".nxc-typing-wrap{align-self:flex-start;background:#fff;border:1px solid #e2e8f0;padding:10px 14px;border-radius:14px;border-bottom-left-radius:4px}" +
    ".nxc-typing{display:flex;gap:4px;align-items:center}" +
    ".nxc-typing i{width:6px;height:6px;border-radius:50%;background:#84cc16;animation:nxcBounce 1.2s infinite ease-in-out}" +
    ".nxc-typing i:nth-child(2){animation-delay:.15s}" +
    ".nxc-typing i:nth-child(3){animation-delay:.3s}" +
    "@keyframes nxcBounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}" +

    /* Direct Contact Banner */
    ".nxc-call-banner{background:#ecfccb;border:1px solid #d9f99d;border-radius:10px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#365314;margin-bottom:4px}" +
    ".nxc-call-banner a{color:#365314;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:4px}" +
    ".nxc-call-banner a:hover{text-decoration:underline}" +

    /* Form */
    ".nxc-form{display:flex;gap:8px;padding:12px 14px;border-top:1px solid #e2e8f0;background:#ffffff}" +
    ".nxc-in{flex:1;border:1.5px solid #cbd5e1;border-radius:999px;padding:10px 16px;font-size:13.5px;outline:none;min-width:0;transition:border-color .15s,box-shadow .15s}" +
    ".nxc-in:focus{border-color:var(--c);box-shadow:0 0 0 3px rgba(132,204,22,.2)}" +
    ".nxc-send{border:0;background:var(--c);color:#000;border-radius:50%;width:40px;height:40px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;transition:transform .15s,background .15s}" +
    ".nxc-send:hover{background:#99e31d;transform:scale(1.05)}" +
    ".nxc-send:disabled{opacity:.4;cursor:not-allowed;transform:none}" +

    /* Footer */
    ".nxc-foot{font-size:11px;color:#94a3b8;text-align:center;padding:0 14px 8px;background:#ffffff;display:flex;align-items:center;justify-content:center;gap:8px}" +
    ".nxc-foot a{color:#64748b;text-decoration:none}" +
    ".nxc-foot a:hover{color:#0f172a;text-decoration:underline}" +

    /* Mobile Responsive */
    "@media(max-width:480px){" +
    ".nxc{right:14px;bottom:14px}" +
    ".nxc-panel{position:fixed;right:8px;left:8px;bottom:84px;width:auto;max-width:none;height:calc(100vh - 100px);border-radius:18px}" +
    "}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- DOM Helper ----------
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // ---------- Widget Container ----------
  var root = el("div", "nxc");

  // Floating Action Button
  var fab = el("button", "nxc-fab");
  fab.type = "button";
  fab.setAttribute("aria-label", "Open Nexxi Chat Assistant");
  fab.setAttribute("aria-expanded", "false");
  fab.innerHTML =
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
    '<span class="nxc-fab-badge"></span>';

  // Panel
  var panel = el("div", "nxc-panel");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", BRAND + " AI Assistant");

  // Header
  var head = el("div", "nxc-head");
  var avatar = el("div", "nxc-avatar", "N");
  var statusDot = el("span", "nxc-status");
  avatar.appendChild(statusDot);

  var info = el("div", "nxc-head-info");
  var title = el("b", null, BOT_NAME + " • " + BRAND);
  var sub = el("small", null, "AI Counselor • Online 24/7");
  info.appendChild(title);
  info.appendChild(sub);

  var headActions = el("div", "nxc-head-actions");

  // WhatsApp quick link in header
  var waBtn = el("a", "nxc-hbtn");
  waBtn.href = WHATSAPP_URL;
  waBtn.target = "_blank";
  waBtn.rel = "noopener noreferrer";
  waBtn.setAttribute("aria-label", "Chat on WhatsApp");
  waBtn.setAttribute("title", "Chat on WhatsApp");
  waBtn.innerHTML =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
  headActions.appendChild(waBtn);

  // Close button
  var closeBtn = el("button", "nxc-hbtn", "✕");
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Close Chat");
  headActions.appendChild(closeBtn);

  head.appendChild(avatar);
  head.appendChild(info);
  head.appendChild(headActions);

  // Messages Body
  var body = el("div", "nxc-body");
  body.setAttribute("aria-live", "polite");

  // Call quick banner
  var banner = el("div", "nxc-call-banner");
  banner.innerHTML =
    '<span>Instant counselor call:</span><a href="tel:' + PHONE + '">📞 ' + PHONE + '</a>';
  body.appendChild(banner);

  // Input Form
  var form = el("form", "nxc-form");
  var input = el("input", "nxc-in");
  input.type = "text";
  input.placeholder = "Apna sawal likhein (e.g. Data Analytics batches)...";
  input.maxLength = 500;
  input.autocomplete = "off";
  input.setAttribute("aria-label", "Your message to Nexxi");

  var sendBtn = el("button", "nxc-send");
  sendBtn.type = "submit";
  sendBtn.setAttribute("aria-label", "Send message");
  sendBtn.innerHTML =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';

  form.appendChild(input);
  form.appendChild(sendBtn);

  // Footer note
  var foot = el("div", "nxc-foot");
  foot.innerHTML =
    '<span>NexxTechs Institute</span> • <a href="' + WHATSAPP_URL + '" target="_blank">WhatsApp Desk</a> • <a href="tel:' + PHONE + '">Call: ' + PHONE + '</a>';

  panel.appendChild(head);
  panel.appendChild(body);
  panel.appendChild(form);
  panel.appendChild(foot);
  root.appendChild(panel);
  root.appendChild(fab);
  document.body.appendChild(root);

  // ---------- Message Rendering ----------
  var URL_RE = /(https?:\/\/[^\s)]+)/g;
  var BOLD_RE = /\*\*(.*?)\*\*/g;

  function formatMessageText(text) {
    var container = document.createDocumentFragment();
    var raw = String(text || "");

    // Split lines
    var lines = raw.split("\n");
    lines.forEach(function (line, lineIdx) {
      if (lineIdx > 0) container.appendChild(document.createElement("br"));

      // Parse bold **text**
      var segments = line.split(BOLD_RE);
      segments.forEach(function (segment, sIdx) {
        var isBold = sIdx % 2 === 1;
        // Parse URLs inside segment
        var parts = segment.split(URL_RE);
        parts.forEach(function (p, pIdx) {
          if (pIdx % 2 === 1) {
            var a = el("a", null, p);
            a.href = p;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            container.appendChild(a);
          } else if (p) {
            if (isBold) {
              var b = el("b", null, p);
              container.appendChild(b);
            } else {
              container.appendChild(document.createTextNode(p));
            }
          }
        });
      });
    });

    return container;
  }

  function addMsg(role, text) {
    var m = el("div", "nxc-m " + (role === "user" ? "user" : "bot"));
    m.appendChild(formatMessageText(text));
    body.appendChild(m);
    scrollDown();
    return m;
  }

  function scrollDown() {
    body.scrollTop = body.scrollHeight;
  }

  var chipsBox = null;
  function showChips() {
    if (chipsBox) return;
    chipsBox = el("div", "nxc-chips");
    CHIPS.forEach(function (c) {
      var b = el("button", "nxc-chip", c);
      b.type = "button";
      b.addEventListener("click", function () {
        send(c);
      });
      chipsBox.appendChild(b);
    });
    body.appendChild(chipsBox);
    scrollDown();
  }

  function hideChips() {
    if (chipsBox && chipsBox.parentNode) {
      chipsBox.parentNode.removeChild(chipsBox);
    }
    chipsBox = null;
  }

  function typing(on) {
    var t = body.querySelector(".nxc-typing-wrap");
    if (on && !t) {
      t = el("div", "nxc-typing-wrap");
      var d = el("div", "nxc-typing");
      d.appendChild(el("i"));
      d.appendChild(el("i"));
      d.appendChild(el("i"));
      t.appendChild(d);
      t.setAttribute("aria-label", BOT_NAME + " typing...");
      body.appendChild(t);
      scrollDown();
    } else if (!on && t) {
      t.parentNode.removeChild(t);
    }
  }

  // ---------- Sending Messages ----------
  function send(text) {
    text = (text || "").trim();
    if (!text || busy) return;

    hideChips();
    addMsg("user", text);
    history.push({ role: "user", content: text });
    save();

    input.value = "";
    busy = true;
    sendBtn.disabled = true;
    typing(true);

    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () {
      if (ctrl) ctrl.abort();
    }, 28000);

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-10) }),
      signal: ctrl ? ctrl.signal : undefined,
    })
      .then(function (r) {
        return r.json().then(function (j) {
          return { ok: r.ok, j: j };
        });
      })
      .then(function (res) {
        typing(false);
        if (res.ok && res.j.reply) {
          addMsg("bot", res.j.reply);
          history.push({ role: "assistant", content: res.j.reply });
          save();
        } else {
          var errMsg =
            (res.j && res.j.error) ||
            "Kuch takneeki dikkat aayi. Kripya hamare counselor ko " + PHONE + " par call ya WhatsApp karein.";
          addMsg("bot", errMsg);
          history.pop();
          save();
        }
      })
      .catch(function () {
        typing(false);
        addMsg(
          "bot",
          "Server connect nahi ho pa raha hai. Kripya backend start karein (`npm start` in /server) ya direct " + PHONE + " par call/WhatsApp karein."
        );
        history.pop();
        save();
      })
      .then(function () {
        clearTimeout(timer);
        busy = false;
        sendBtn.disabled = false;
        input.focus();
      });
  }

  // ---------- Open / Close ----------
  function setOpen(open) {
    root.classList.toggle("open", open);
    fab.setAttribute("aria-expanded", String(open));
    if (open) {
      setTimeout(function () {
        input.focus();
      }, 80);
      scrollDown();
    } else {
      fab.focus();
    }
  }

  fab.addEventListener("click", function () {
    setOpen(!root.classList.contains("open"));
  });

  closeBtn.addEventListener("click", function () {
    setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && root.classList.contains("open")) {
      setOpen(false);
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    send(input.value);
  });

  // ---------- Initialize ----------
  addMsg("bot", GREETING);
  if (history.length) {
    history.forEach(function (m) {
      addMsg(m.role, m.content);
    });
  } else {
    showChips();
  }
})();
