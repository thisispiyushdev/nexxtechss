/*!
 * Nexxi - NexxTechs AI Chat Widget
 * Pure Website Data Knowledge Engine with Dynamic Delhi & Noida Counselor Routing.
 * Zero external API keys required.
 *
 * Usage:
 *   <script src="/nexx-chat.js"
 *           data-api="/api/chat"
 *           data-brand="NexxTechs"
 *           data-bot-name="Nexxi"
 *           data-color="#84CC16"></script>
 */
(function () {
  "use strict";
  if (window.__nexxiChatLoaded) return;
  window.__nexxiChatLoaded = true;

  var script = document.currentScript;
  var cfg = (script && script.dataset) || {};
  var API = cfg.api || "/api/chat";
  var BRAND = cfg.brand || "NexxTechs";
  var BOT_NAME = cfg.botName || "Nexxi";
  var COLOR = cfg.color || "#84CC16";
  var AVATAR_URL = cfg.avatar || "/assets/nexxi-avatar.png";
  var STORE_KEY = "nexxi_chat_session_v3";

  var BRANCHES = {
    noida: {
      city: "Noida",
      name: "Noida Sector 2 Branch",
      phone: "+91 7987059430",
      phoneRaw: "917987059430",
      address: "B-136 Upper, Ground floor, B Block, Sector 2, Noida, UP - 201301",
      whatsappUrl: "https://wa.me/917987059430?text=" + encodeURIComponent("Hi Nexxi, I want to know more about courses and demo classes at NexxTechs Noida."),
    },
    delhi: {
      city: "Delhi",
      name: "Delhi Vikaspuri Branch",
      phone: "+91 9217179762",
      phoneRaw: "919217179762",
      address: "B-54 Krishna Park, Vikaspuri, New Delhi - 110018 (Near Janakpuri West)",
      whatsappUrl: "https://wa.me/919217179762?text=" + encodeURIComponent("Hi Nexxi, I want to know more about courses and demo classes at NexxTechs Delhi."),
    },
  };

  function isNoidaPage() {
    try {
      var p = (window.location.pathname || "").toLowerCase();
      var h = (window.location.href || "").toLowerCase();
      return p.indexOf("noida") !== -1 || h.indexOf("noida") !== -1;
    } catch (e) {
      return false;
    }
  }

  function getBranch() {
    return isNoidaPage() ? BRANCHES.noida : BRANCHES.delhi;
  }

  function getOtherBranch() {
    return isNoidaPage() ? BRANCHES.delhi : BRANCHES.noida;
  }

  var CHIPS = [
    "📚 Sabhi Courses List",
    "📊 Data Analytics",
    "🤖 Data Science & AI",
    "☁️ Cloud Computing",
    "⚙️ DevOps",
    "💻 Full Stack Web Dev",
    "🛡️ Cyber Security",
    "💼 SAP Masterclass",
    "🎨 UI/UX Design",
    "📈 Digital Marketing",
    "⭐ Free Demo Class",
    "💰 Fees & EMI",
    "💼 Placement Record",
    "📞 Talk to Counselor"
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
    ".nxc-fab{width:64px;height:64px;border-radius:50%;border:2.5px solid var(--c);background:#0a0c10;color:#fff;cursor:pointer;" +
    "box-shadow:0 8px 24px rgba(132,204,22,.45),0 4px 12px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;transition:all .25s cubic-bezier(.4,0,.2,1);position:relative;padding:0;overflow:visible;-webkit-tap-highlight-color:transparent}" +
    ".nxc-fab:hover{transform:scale(1.08);border-color:#a3e635;box-shadow:0 12px 30px rgba(132,204,22,.6)}" +
    ".nxc-fab:active{transform:scale(0.96)}" +
    ".nxc-fab-img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;transition:all .2s ease}" +
    ".nxc-fab-close{display:none;width:24px;height:24px;stroke:#fff}" +
    ".nxc.open .nxc-fab-img{display:none}" +
    ".nxc.open .nxc-fab-close{display:block}" +
    ".nxc.open .nxc-fab{background:#18181b;border-color:#ef4444}" +
    ".nxc-fab-badge{position:absolute;top:0;right:0;width:15px;height:15px;background:#22c55e;border:2.5px solid #0a0c10;border-radius:50%;box-shadow:0 0 8px rgba(34,197,94,.8)}" +
    ".nxc-fab-bubble{position:absolute;right:74px;white-space:nowrap;background:#0a0c10;color:#fff;border:1px solid rgba(132,204,22,.4);padding:6px 12px;border-radius:999px;font-size:12px;font-weight:600;pointer-events:none;box-shadow:0 4px 14px rgba(0,0,0,.3);display:flex;align-items:center;gap:6px;transition:opacity .2s ease}" +
    ".nxc.open .nxc-fab-bubble{display:none}" +

    /* Chat Panel */
    ".nxc-panel{position:absolute;right:0;bottom:78px;width:395px;max-width:calc(100vw - 28px);height:570px;max-height:calc(100vh - 110px);" +
    "background:#ffffff;border-radius:20px;box-shadow:0 16px 48px rgba(0,0,0,.2),0 0 1px rgba(0,0,0,.1);display:none;flex-direction:column;overflow:hidden;border:1px solid #e2e8f0;transition:opacity .15s ease}" +
    ".nxc.open .nxc-panel{display:flex;animation:nxcIn .25s cubic-bezier(0.16,1,0.3,1)}" +
    "@keyframes nxcIn{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}" +

    /* Header */
    ".nxc-head{background:#0a0c10;color:#ffffff;padding:12px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0}" +
    ".nxc-avatar{width:44px;height:44px;border-radius:50%;border:2px solid var(--c);display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0;background:#0a0c10;box-shadow:0 0 10px rgba(132,204,22,.3)}" +
    ".nxc-avatar-img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}" +
    ".nxc-status{position:absolute;bottom:0;right:0;width:11px;height:11px;background:#22c55e;border:2px solid #0a0c10;border-radius:50%;box-shadow:0 0 6px rgba(34,197,94,.9)}" +
    ".nxc-head-info{flex:1;min-width:0;overflow:hidden}" +
    ".nxc-head-info b{font-size:14.5px;color:#fff;display:flex;align-items:center;gap:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    ".nxc-head-info small{font-size:11.5px;color:#a3e635;display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    ".nxc-head-actions{display:flex;align-items:center;gap:4px;flex-shrink:0}" +
    ".nxc-hbtn{background:transparent;border:0;color:#94a3b8;width:34px;height:34px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s;-webkit-tap-highlight-color:transparent}" +
    ".nxc-hbtn:hover{background:rgba(255,255,255,.12);color:#fff}" +
    ".nxc-hbtn:active{transform:scale(0.94)}" +

    /* Body */
    ".nxc-body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:14px;background:#f8fafc;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}" +
    ".nxc-row{display:flex;align-items:flex-end;gap:8px;max-width:92%;scroll-margin-top:12px}" +
    ".nxc-row.bot{align-self:flex-start;max-width:92%}" +
    ".nxc-row.user{align-self:flex-end;margin-left:auto;max-width:86%}" +
    ".nxc-bot-avatar{width:28px;height:28px;border-radius:50%;border:1.5px solid var(--c);object-fit:cover;flex-shrink:0;margin-bottom:2px;box-shadow:0 0 6px rgba(132,204,22,.25)}" +
    ".nxc-m{padding:10px 14px;border-radius:16px;font-size:13.5px;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word}" +
    ".nxc-m.bot{background:#ffffff;color:#1e293b;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.06);border:1px solid #e2e8f0;flex:1}" +
    ".nxc-m.user{background:var(--c);color:#0a1a02;align-self:flex-end;border-bottom-right-radius:4px;font-weight:500;box-shadow:0 2px 6px rgba(132,204,22,.25)}" +
    ".nxc-m strong,.nxc-m b{color:#0f172a;font-weight:700}" +
    ".nxc-m.user strong,.nxc-m.user b{color:#0a1a02}" +
    ".nxc-link{color:#0284c7;text-decoration:underline;font-weight:600}" +

    /* Short, Beautiful WhatsApp Button */
    ".nxc-wa-btn{display:inline-flex;align-items:center;gap:6px;background:#22c55e;color:#ffffff!important;padding:5px 13px;border-radius:999px;text-decoration:none!important;font-weight:700;font-size:12.5px;margin:5px 0 2px;box-shadow:0 2px 6px rgba(34,197,94,.35);transition:transform .15s,background .15s}" +
    ".nxc-wa-btn:hover{background:#16a34a;transform:translateY(-1px)}" +

    /* Chips Container */
    ".nxc-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;margin-left:36px;padding:4px 0}" +
    ".nxc-chip{background:#ffffff;border:1px solid #cbd5e1;color:#334155;border-radius:999px;padding:6px 12px;font-size:12px;cursor:pointer;font-weight:500;transition:all .15s ease;box-shadow:0 1px 2px rgba(0,0,0,.04);-webkit-tap-highlight-color:transparent;touch-action:manipulation}" +
    ".nxc-chip:hover{background:var(--c);color:#0a1a02;border-color:var(--c);transform:translateY(-1px)}" +
    ".nxc-chip:active{transform:scale(0.96)}" +

    /* Typing Dots */
    ".nxc-typing-row{display:flex;align-items:flex-end;gap:8px;align-self:flex-start}" +
    ".nxc-typing-wrap{background:#fff;border:1px solid #e2e8f0;padding:10px 14px;border-radius:14px;border-bottom-left-radius:4px}" +
    ".nxc-typing{display:flex;gap:4px;align-items:center}" +
    ".nxc-typing i{width:6px;height:6px;border-radius:50%;background:#84cc16;animation:nxcBounce 1.2s infinite ease-in-out}" +
    ".nxc-typing i:nth-child(2){animation-delay:.15s}" +
    ".nxc-typing i:nth-child(3){animation-delay:.3s}" +
    "@keyframes nxcBounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}" +

    /* Direct Contact Banner */
    ".nxc-call-banner{background:#ecfccb;border:1px solid #d9f99d;border-radius:10px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#365314;margin-bottom:4px;flex-shrink:0}" +
    ".nxc-call-banner a{color:#365314;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:4px}" +
    ".nxc-call-banner a:hover{text-decoration:underline}" +

    /* Form */
    ".nxc-form{display:flex;gap:8px;padding:11px 13px;border-top:1px solid #e2e8f0;background:#ffffff;flex-shrink:0}" +
    ".nxc-in{flex:1;border:1.5px solid #cbd5e1;border-radius:999px;padding:10px 16px;font-size:14px;outline:none;min-width:0;transition:border-color .15s,box-shadow .15s;-webkit-appearance:none}" +
    ".nxc-in:focus{border-color:var(--c);box-shadow:0 0 0 3px rgba(132,204,22,.2)}" +
    ".nxc-send{border:0;background:var(--c);color:#000;border-radius:50%;width:42px;height:42px;min-width:42px;min-height:42px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;transition:transform .15s,background .15s;-webkit-tap-highlight-color:transparent}" +
    ".nxc-send:hover{background:#99e31d;transform:scale(1.05)}" +
    ".nxc-send:disabled{opacity:.4;cursor:not-allowed;transform:none}" +

    /* Footer */
    ".nxc-foot{font-size:11px;color:#94a3b8;text-align:center;padding:0 14px 8px;background:#ffffff;display:flex;align-items:center;justify-content:center;gap:8px;flex-shrink:0}" +
    ".nxc-foot a{color:#64748b;text-decoration:none}" +
    ".nxc-foot a:hover{color:#0f172a;text-decoration:underline}" +

    /* Mobile Responsive Optimizations */
    "@media(max-width:640px){" +
    ".nxc{right:16px;bottom:max(16px,env(safe-area-inset-bottom,16px))}" +
    ".nxc-fab{width:56px;height:56px;box-shadow:0 6px 20px rgba(132,204,22,.4),0 4px 10px rgba(0,0,0,.3)}" +
    ".nxc-fab-bubble{display:none!important}" +
    ".nxc.open{position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;width:100vw!important;height:100vh!important;height:100dvh!important;max-width:100vw!important;max-height:100dvh!important;z-index:2147483000!important}" +
    ".nxc.open .nxc-fab{display:none!important}" +
    ".nxc-panel{position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;width:100vw!important;max-width:100vw!important;height:100vh!important;height:100dvh!important;max-height:100dvh!important;border-radius:0!important;border:none!important;box-shadow:none!important;animation:nxcSlideUp .26s cubic-bezier(.16,1,.3,1)}" +
    ".nxc-head{padding:max(12px,env(safe-area-inset-top,12px)) 12px 12px;gap:8px}" +
    ".nxc-avatar{width:38px;height:38px}" +
    ".nxc-head-info b{font-size:14px}" +
    ".nxc-head-info small{font-size:11px}" +
    ".nxc-hbtn{width:36px;height:36px;border-radius:8px}" +
    ".nxc-body{padding:12px;gap:10px}" +
    ".nxc-row.bot{max-width:95%}" +
    ".nxc-row.user{max-width:90%}" +
    ".nxc-chips{margin-left:0;gap:6px;padding:4px 0}" +
    ".nxc-chip{padding:7px 12px;font-size:12px}" +
    ".nxc-form{padding:10px 12px;padding-bottom:max(10px,env(safe-area-inset-bottom,10px))}" +
    ".nxc-in{font-size:16px!important;padding:9px 14px}" +
    ".nxc-send{width:42px;height:42px;min-width:42px;min-height:42px}" +
    ".nxc-foot{display:none!important}" +
    "}" +
    "@keyframes nxcSlideUp{from{transform:translateY(100%);opacity:.6}to{transform:translateY(0);opacity:1}}" +
    "body.nxc-locked{overflow:hidden!important;touch-action:none}" +
    "html.nxc-locked{overflow:hidden!important}";

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

  // Floating Action Button with Bitmoji Avatar
  var fab = el("button", "nxc-fab");
  fab.type = "button";
  fab.setAttribute("aria-label", "Open Nexxi Chat Assistant");
  fab.setAttribute("aria-expanded", "false");

  var fabImg = el("img", "nxc-fab-img");
  fabImg.src = AVATAR_URL;
  fabImg.alt = "Nexxi Bitmoji Avatar";
  fabImg.onerror = function() {
    if (this.src.indexOf("/nexxi-avatar.png") === -1) {
      this.src = "/nexxi-avatar.png";
    }
  };

  var fabClose = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  fabClose.setAttribute("class", "nxc-fab-close");
  fabClose.setAttribute("viewBox", "0 0 24 24");
  fabClose.setAttribute("fill", "none");
  fabClose.setAttribute("stroke", "currentColor");
  fabClose.setAttribute("stroke-width", "2.5");
  fabClose.setAttribute("stroke-linecap", "round");
  fabClose.setAttribute("stroke-linejoin", "round");
  fabClose.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';

  var fabBadge = el("span", "nxc-fab-badge");
  var fabBubble = el("div", "nxc-fab-bubble", "Chat with Nexxi ✨");

  fab.appendChild(fabImg);
  fab.appendChild(fabClose);
  fab.appendChild(fabBadge);
  fab.appendChild(fabBubble);

  // Panel
  var panel = el("div", "nxc-panel");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", BRAND + " AI Assistant");

  // Header
  var head = el("div", "nxc-head");
  var avatar = el("div", "nxc-avatar");
  var avatarImg = el("img", "nxc-avatar-img");
  avatarImg.src = AVATAR_URL;
  avatarImg.alt = BOT_NAME;
  avatarImg.onerror = function() {
    if (this.src.indexOf("/nexxi-avatar.png") === -1) {
      this.src = "/nexxi-avatar.png";
    }
  };
  var statusDot = el("span", "nxc-status");
  avatar.appendChild(avatarImg);
  avatar.appendChild(statusDot);

  var info = el("div", "nxc-head-info");
  var title = el("b", null, BOT_NAME + " • " + BRAND);
  var sub = el("small", null, "AI Counselor • Delhi Branch • Online 24/7");
  info.appendChild(title);
  info.appendChild(sub);

  var headActions = el("div", "nxc-head-actions");

  // Call quick action in header
  var callBtn = el("a", "nxc-hbtn");
  callBtn.setAttribute("aria-label", "Call Counselor");
  callBtn.setAttribute("title", "Call Counselor");
  callBtn.innerHTML =
    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  headActions.appendChild(callBtn);

  // WhatsApp quick link in header
  var waBtn = el("a", "nxc-hbtn");
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
  var bannerLabel = el("span", null, "Counselor call:");
  var bannerLink = el("a", null, "📞 +91 9217179762");
  banner.appendChild(bannerLabel);
  banner.appendChild(bannerLink);
  body.appendChild(banner);

  // Input Form
  var form = el("form", "nxc-form");
  var input = el("input", "nxc-in");
  input.type = "text";
  input.placeholder = "Apna sawal likhein (e.g. DevOps batches, fees)...";
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
  var footBrand = el("span", null, "NexxTechs Institute");
  var footDot1 = el("span", null, "•");
  var footWa = el("a", null, "WhatsApp Desk");
  footWa.target = "_blank";
  var footDot2 = el("span", null, "•");
  var footCall = el("a", null, "Call Counselor");

  foot.appendChild(footBrand);
  foot.appendChild(footDot1);
  foot.appendChild(footWa);
  foot.appendChild(footDot2);
  foot.appendChild(footCall);

  panel.appendChild(head);
  panel.appendChild(body);
  panel.appendChild(form);
  panel.appendChild(foot);
  root.appendChild(panel);
  root.appendChild(fab);
  document.body.appendChild(root);

  // Dynamic Branch UI updater
  function updateBranchUI() {
    var b = getBranch();
    sub.textContent = "AI Counselor • " + b.city + " Center • Online 24/7";
    bannerLabel.textContent = b.city + " Counselor Call:";
    bannerLink.href = "tel:+" + b.phoneRaw;
    bannerLink.textContent = "📞 " + b.phone;
    waBtn.href = b.whatsappUrl;
    callBtn.href = "tel:+" + b.phoneRaw;
    footWa.href = b.whatsappUrl;
    footCall.href = "tel:+" + b.phoneRaw;
    footCall.textContent = "Call: " + b.phone;
  }

  updateBranchUI();

  // ---------- Message Rendering (Short Clean Links & Markdown) ----------
  function formatLine(line, container) {
    // Regex matches [label](url) OR **bold** OR raw url
    var TOKEN_RE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*(.*?)\*\*|(https?:\/\/[^\s)]+)/g;
    var lastIndex = 0;
    var match;

    while ((match = TOKEN_RE.exec(line)) !== null) {
      if (match.index > lastIndex) {
        container.appendChild(document.createTextNode(line.substring(lastIndex, match.index)));
      }

      if (match[1] && match[2]) {
        // [label](url) Markdown link
        var a = el("a", null, match[1]);
        a.href = match[2];
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        if (match[2].indexOf("wa.me") !== -1 || match[2].indexOf("whatsapp") !== -1) {
          a.className = "nxc-wa-btn";
        } else {
          a.className = "nxc-link";
        }
        container.appendChild(a);
      } else if (match[3] != null) {
        // **bold**
        var b = el("b", null, match[3]);
        container.appendChild(b);
      } else if (match[4]) {
        // Raw URL: shorten display so it doesn't blow up bubbles
        var rawUrl = match[4];
        var isWa = rawUrl.indexOf("wa.me") !== -1 || rawUrl.indexOf("whatsapp") !== -1;
        var displayLabel = isWa ? "💬 Chat on WhatsApp" : (rawUrl.length > 32 ? rawUrl.substring(0, 30) + "..." : rawUrl);
        var rawA = el("a", isWa ? "nxc-wa-btn" : "nxc-link", displayLabel);
        rawA.href = rawUrl;
        rawA.target = "_blank";
        rawA.rel = "noopener noreferrer";
        container.appendChild(rawA);
      }

      lastIndex = TOKEN_RE.lastIndex;
    }

    if (lastIndex < line.length) {
      container.appendChild(document.createTextNode(line.substring(lastIndex)));
    }
  }

  function formatMessageText(text) {
    var container = document.createDocumentFragment();
    var raw = String(text || "");
    var lines = raw.split("\n");

    lines.forEach(function (line, lineIdx) {
      if (lineIdx > 0) container.appendChild(document.createElement("br"));
      formatLine(line, container);
    });

    return container;
  }

  function addMsg(role, text) {
    if (role === "bot") {
      var row = el("div", "nxc-row bot");
      var miniAvatar = el("img", "nxc-bot-avatar");
      miniAvatar.src = AVATAR_URL;
      miniAvatar.alt = BOT_NAME;
      miniAvatar.onerror = function() {
        if (this.src.indexOf("/nexxi-avatar.png") === -1) {
          this.src = "/nexxi-avatar.png";
        }
      };
      var m = el("div", "nxc-m bot");
      m.appendChild(formatMessageText(text));
      row.appendChild(miniAvatar);
      row.appendChild(m);
      body.appendChild(row);
      return row;
    } else {
      var row = el("div", "nxc-row user");
      var m = el("div", "nxc-m user");
      m.appendChild(formatMessageText(text));
      row.appendChild(m);
      body.appendChild(row);
      scrollDown();
      return row;
    }
  }

  function scrollDown() {
    body.scrollTop = body.scrollHeight;
  }

  function scrollToElement(elem) {
    if (!elem) return;
    setTimeout(function () {
      var targetTop = elem.offsetTop - 14;
      if (targetTop < 0) targetTop = 0;
      try {
        body.scrollTo({ top: targetTop, behavior: "smooth" });
      } catch (e) {
        body.scrollTop = targetTop;
      }
    }, 50);
  }

  // ---------- Suggestion Chips ----------
  var chipsBox = null;

  function showChips(skipScroll) {
    if (chipsBox && chipsBox.parentNode) {
      chipsBox.parentNode.removeChild(chipsBox);
    }
    chipsBox = el("div", "nxc-chips");
    CHIPS.forEach(function (c) {
      var b = el("button", "nxc-chip", c);
      b.type = "button";
      b.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        send(c);
      });
      chipsBox.appendChild(b);
    });
    body.appendChild(chipsBox);
    if (!skipScroll) {
      scrollDown();
    }
  }

  function typing(on) {
    var t = body.querySelector(".nxc-typing-row");
    if (on && !t) {
      t = el("div", "nxc-typing-row");
      var miniAvatar = el("img", "nxc-bot-avatar");
      miniAvatar.src = AVATAR_URL;
      miniAvatar.alt = BOT_NAME;
      miniAvatar.onerror = function() {
        if (this.src.indexOf("/nexxi-avatar.png") === -1) {
          this.src = "/nexxi-avatar.png";
        }
      };
      var bubble = el("div", "nxc-typing-wrap");
      var d = el("div", "nxc-typing");
      d.appendChild(el("i"));
      d.appendChild(el("i"));
      d.appendChild(el("i"));
      bubble.appendChild(d);
      t.appendChild(miniAvatar);
      t.appendChild(bubble);
      t.setAttribute("aria-label", BOT_NAME + " typing...");
      body.appendChild(t);
      scrollDown();
    } else if (!on && t) {
      t.parentNode.removeChild(t);
    }
  }

  // ---------- Client-Side Knowledge Engine (Mirroring Server) ----------
  function getKnowledgeReply(text) {
    var b = getBranch();
    var other = getOtherBranch();
    var rawQ = (text || "").trim();
    var q = rawQ.toLowerCase();
    var norm = q.replace(/[^\w\s\+\#\/]/g, " ").replace(/\s+/g, " ").trim();

    // 1. GREETINGS
    if (
      /^(hi|hello|hey|namaste|hola|good\s*morning|good\s*afternoon|good\s*evening|kaise\s*ho)$/i.test(norm) ||
      /^(hi|hello|hey|namaste)\b/i.test(norm)
    ) {
      return "Namaste! 👋 Main Nexxi hu, NexxTechs " + b.city + " ki AI counselor.\nMain aapko hamare sabhi job-oriented tech courses, free demo classes, batch timings aur 100% placement assistance ke baare me poori jankari de sakti hu.\n\nAap kis course me interested hain? Aap neeche diye kisi bhi course par click kar sakte hain ya apna sawal likh sakte hain:";
    }

    // 2. ALL COURSES / COURSES KE NAAM / LIST
    if (
      /\b(all\s*courses?|courses?\s*list|list\s*of\s*courses?|courses?\s*(ke\s*)?naam|courses?\s*names?|courses?\s*name|course\s*name|kya\s*(kya\s*)?courses?|programs?\s*list|available\s*courses?|konsa\s*course|kon\s*se\s*courses?|courses?\s*btao|course\s*btao|all\s*programs?|sabhi\s*courses?)\b/i.test(norm) ||
      /^(courses?|courseses|all\s*course|course\s*details)$/i.test(norm) ||
      (norm.indexOf("course") !== -1 && (norm.indexOf("naam") !== -1 || norm.indexOf("name") !== -1 || norm.indexOf("list") !== -1 || norm.indexOf("btao") !== -1 || norm.indexOf("options") !== -1 || norm.indexOf("kya") !== -1 || norm.indexOf("available") !== -1))
    ) {
      return "NexxTechs " + b.city + " par ye sabhi Job-Oriented Tech Courses available hain (100% Placement Assistance ke saath):\n\n" +
        "1. 📊 **Data Analytics** (4 Months) — Advanced Excel, SQL, Python, Power BI, Tableau\n" +
        "2. 🤖 **Data Science & GenAI** (6 Months) — Python, Statistics, ML, Deep Learning, NLP, Generative AI\n" +
        "3. ☁️ **Cloud Computing Architect** (5 Months) — AWS, Microsoft Azure, Google Cloud, Terraform\n" +
        "4. ⚙️ **DevOps & Cloud Engineering** (4 Months) — Linux, Docker, Kubernetes, Jenkins, CI/CD, Terraform\n" +
        "5. 💻 **Full Stack Web Development** (4-6 Months) — React 19, Next.js 15, Node.js, Express, MongoDB\n" +
        "6. 🐍 **Python Full Stack** (6 Months) — Core Python, Django, FastAPI, PostgreSQL, AWS\n" +
        "7. ☕ **Java Full Stack** (6 Months) — Core Java 17+, Spring Boot 3, Microservices, React\n" +
        "8. 🛡️ **Cyber Security & Ethical Hacking** (5 Months) — CEH, Kali Linux, Penetration Testing, SIEM\n" +
        "9. 🎨 **UI/UX Design** (4 Months) — Figma, Framer, Design Systems, Usability Testing\n" +
        "10. 📈 **Digital Marketing** (3 Months) — SEO, Google Ads, Meta Ads, Performance Marketing, GA4\n" +
        "11. 🖌️ **Graphic Design** (3 Months) — Photoshop, Illustrator, InDesign, Canva Pro, Brand Kits\n" +
        "12. 💼 **SAP Enterprise Masterclass** (5 Months) — SAP FICO, SAP MM, S/4HANA, Fiori Apps\n" +
        "13. 🧩 **DSA & Coding** (3 Months) — C++/Java/Python, Algorithms, 300+ LeetCode problems\n" +
        "14. 🧠 **GenAI & Autonomous Agents** (4 Months) — LangChain, RAG Pipelines, Multi-Agent Systems\n\n" +
        "Aap kis course ki poori details (syllabus & batch timings) dekhna chahte hain? Bas us course ka naam likhein ya suggestion par click karein!\n\n" +
        "Free Demo Class book karne ke liye hamare " + b.city + " counselor se connect karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 3. DEVOPS & CLOUD ENGINEERING
    if (/\b(devops|dev\s*ops|docker|kubernetes|k8s|jenkins|ci\s*\/?\s*cd|cicd|terraform|ansible|helm|sre)\b/i.test(norm)) {
      return "⚙️ **DevOps & Cloud Engineering Master Program** (Duration: 4 Months)\n\n" +
        "• **Comprehensive Syllabus**:\n" +
        "  - Linux System Administration & Shell Scripting (Bash)\n" +
        "  - Git, GitHub & GitOps (GitHub Actions, ArgoCD)\n" +
        "  - Docker Containerization (Images, Containers, Multi-stage builds, Docker Compose)\n" +
        "  - Kubernetes Orchestration (Pods, Deployments, Services, Ingress, Helm Charts)\n" +
        "  - Jenkins CI/CD Pipelines (Automated build, test, and production deployment)\n" +
        "  - Infrastructure as Code (IaC) with Terraform & Ansible configuration management\n" +
        "  - Production Monitoring & Observability with Prometheus & Grafana\n" +
        "  - SRE (Site Reliability Engineering) practices & AWS production setups\n\n" +
        "• **Flexible Batch Timings**:\n" +
        "  - Morning: 10:00 AM - 12:00 PM (Monday to Friday)\n" +
        "  - Evening: 7:00 PM - 9:00 PM (Working professionals special)\n" +
        "  - Weekend: 10:00 AM - 1:00 PM (Saturday & Sunday)\n\n" +
        "• **Placement Guarantee**: 100% Placement assistance with live multi-tier CI/CD projects on AWS sandbox labs.\n\n" +
        "Free Demo Class aur detailed syllabus PDF ke liye connect karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 4. DATA ANALYTICS
    if (
      /\b(data\s*analytics?|data\s*analyst|analytics?|power\s*bi|powerbi|tableau|advanced\s*excel|business\s*analytics?)\b/i.test(norm) ||
      /^(da|data\s*analysis)$/i.test(norm)
    ) {
      return "📊 **Data Analytics Training Program** (Duration: 4 Months)\n\n" +
        "• **Comprehensive Syllabus**:\n" +
        "  - Advanced Excel: VLOOKUP, XLOOKUP, Nested IFs, Pivot Tables, Power Query, Macros\n" +
        "  - SQL for Data Analysis: Joins, Subqueries, Window Functions, CTEs, Aggregations\n" +
        "  - Python for Data Analysis: NumPy arrays, Pandas DataFrames, Data Cleaning & EDA\n" +
        "  - Data Visualization: Matplotlib, Seaborn interactive charts\n" +
        "  - Power BI: Data Modeling, Star Schema, DAX Formulas, Interactive Executive Dashboards\n" +
        "  - Tableau Desktop: Visual Analytics, Storytelling with Data, KPI Metrics\n" +
        "  - Real-world Business Intelligence Case Studies (E-commerce, Banking, Healthcare)\n\n" +
        "• **Batch Timings**:\n" +
        "  - Morning: 10:00 AM - 12:00 PM (Mon-Fri)\n" +
        "  - Evening: 7:00 PM - 9:00 PM (Mon-Fri)\n" +
        "  - Weekend: 10:00 AM - 1:00 PM (Sat-Sun)\n\n" +
        "• **Placement**: 100% Placement support with resume building and mock corporate interviews.\n\n" +
        "Free Demo Class book karne ke liye abhi sampark karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 5. SAP ENTERPRISE MASTERCLASS (FICO / MM / S4HANA)
    if (/\b(sap|fico|sap\s*fico|sap\s*mm|s\/?4\s*hana|s4hana|sap\s*erp|abap)\b/i.test(norm)) {
      return "💼 **SAP Enterprise Masterclass (FICO / MM / S/4HANA)** (Duration: 5 Months)\n\n" +
        "• **Core Modules & Practical Curriculum**:\n" +
        "  - ERP Overview, Architecture & SAP GUI / Fiori Navigation\n" +
        "  - SAP FICO: General Ledger (GL), Accounts Payable (AP), Accounts Receivable (AR), Asset Accounting (AA), Bank Accounting, Cost Center & Profit Center Accounting (CO)\n" +
        "  - SAP MM: Procure-to-Pay (P2P Cycle), Material Master, Vendor Master, Purchase Requisitions & Orders (PO), Goods Receipt, Invoice Verification, Inventory Management\n" +
        "  - SAP S/4HANA Finance & Logistics Migration, Real-time Reporting & Analytics\n" +
        "  - Live SAP Server Access: 24/7 GUI server practice with real enterprise scenarios\n\n" +
        "• **Batch Timings**:\n" +
        "  - Morning: 10:00 AM - 12:00 PM (Mon-Fri)\n" +
        "  - Evening: 7:00 PM - 9:00 PM (Mon-Fri)\n" +
        "  - Weekend: 10:00 AM - 1:00 PM (Sat-Sun)\n\n" +
        "• **Placement**: 100% Placement assistance with top MNC SAP consulting partners.\n\n" +
        "Free Demo Class aur SAP syllabus PDF ke liye connect karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 6. GENERATIVE AI & AUTONOMOUS AGENTS
    if (/\b(genai|gen\s*ai|generative\s*ai|llm|large\s*language\s*models?|langchain|rag\s*pipeline|autonomous\s*agents?)\b/i.test(norm)) {
      return "🧠 **Generative AI & Autonomous Agents Masterclass** (Duration: 4 Months)\n\n" +
        "• **Syllabus & Topics**:\n" +
        "  - Transformer Architecture & Advanced Prompt Engineering\n" +
        "  - OpenAI, Anthropic Claude & Google Gemini API integrations\n" +
        "  - Vector Databases (ChromaDB, Pinecone, FAISS) & Embeddings\n" +
        "  - Advanced Retrieval Augmented Generation (RAG) Pipelines\n" +
        "  - LangChain & LlamaIndex Frameworks\n" +
        "  - Multi-Agent Orchestration (CrewAI, AutoGen, ReAct Framework)\n" +
        "  - Model Fine-Tuning (LoRA, QLoRA, PEFT) on custom datasets\n" +
        "  - AI Application Deployment with FastAPI, Docker & AWS\n\n" +
        "• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Sat-Sun (10:00 AM - 1:00 PM)\n\n" +
        "Demo class ke liye contact karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 7. DATA SCIENCE & GENAI / MACHINE LEARNING
    if (/\b(data\s*science|data\s*scientist|datascience|machine\s*learning|\bml\b|deep\s*learning|\bdl\b|artificial\s*intelligence|\bnlp\b|scikit|ai\s*course|ai\s*master)\b/i.test(norm)) {
      return "🤖 **Data Science & GenAI Master Program** (Duration: 6 Months)\n\n" +
        "• **Comprehensive Syllabus**:\n" +
        "  - Python for Data Science (NumPy, Pandas, Matplotlib, Seaborn)\n" +
        "  - Probability, Applied Statistics & Exploratory Data Analysis (EDA)\n" +
        "  - Machine Learning: Regression, Classification, Random Forest, XGBoost, Clustering\n" +
        "  - Deep Learning: PyTorch, TensorFlow, Keras, CNNs (Computer Vision), RNNs/LSTMs\n" +
        "  - Natural Language Processing (NLP), NLTK, Spacy, Transformers & HuggingFace\n" +
        "  - Generative AI & LLMs: Prompt Engineering, LangChain, RAG Pipelines\n" +
        "  - MLOps & Production: FastAPI, Docker, and AWS model deployment\n\n" +
        "• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Sat-Sun (10:00 AM - 1:00 PM) | Evening (7:00 PM - 9:00 PM)\n" +
        "• **Placement**: 100% Placement assistance, live Kaggle competitions, portfolio building.\n\n" +
        "Free Demo Class book karne ke liye connect karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 8. CLOUD COMPUTING (AWS / AZURE / GCP)
    if (/\b(cloud|cloud\s*computing|aws|azure|gcp|google\s*cloud|amazon\s*web\s*services)\b/i.test(norm)) {
      return "☁️ **Cloud Computing Architect Program** (Duration: 5 Months)\n\n" +
        "• **Comprehensive Syllabus**:\n" +
        "  - Cloud Networking & Virtualization (VPC, Subnets, Gateways, Route Tables, Security Groups)\n" +
        "  - AWS Core Services: EC2, S3, RDS, DynamoDB, IAM, CloudFront, Route 53\n" +
        "  - AWS Serverless: Lambda Functions, API Gateway, SQS, SNS, EventBridge\n" +
        "  - Microsoft Azure: Virtual Machines, Azure Entra ID, Azure SQL, Blob Storage\n" +
        "  - Google Cloud Platform: GCP Compute Engine, BigQuery, IAM Policies\n" +
        "  - Multi-Cloud Automation with Terraform Infrastructure as Code (IaC)\n" +
        "  - AWS Certified Solutions Architect Associate exam preparation\n\n" +
        "• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Evening (7:00 PM - 9:00 PM)\n\n" +
        "Free Demo Class ke liye sampark karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 9. PYTHON FULL STACK
    if (/\b(python|django|fastapi|flask)\b/i.test(norm)) {
      return "🐍 **Python Full Stack Development** (Duration: 6 Months)\n\n" +
        "• **Syllabus & Topics**:\n" +
        "  - Core & Advanced Python 3.10+, OOPs, Decorators, Generators, Concurrency\n" +
        "  - Django Web Framework: Models, MTV Architecture, ORM, Admin Panel\n" +
        "  - Django REST Framework (DRF): RESTful APIs, JWT Authentication, Permissions\n" +
        "  - High-performance FastAPI: Asynchronous endpoints, Pydantic data validation\n" +
        "  - PostgreSQL, Redis Caching, Celery Background Tasks\n" +
        "  - React 19 Frontend Integration, TailwindCSS, State Management\n" +
        "  - Docker Containerization, CI/CD, AWS EC2 & RDS Deployment\n\n" +
        "• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Sat-Sun (10:00 AM - 1:00 PM)\n\n" +
        "Free Demo Class ke liye contact karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 10. JAVA FULL STACK
    if (/\b(java|spring\s*boot|springboot|hibernate|microservices|core\s*java)\b/i.test(norm)) {
      return "☕ **Java Full Stack Development** (Duration: 6 Months)\n\n" +
        "• **Syllabus & Topics**:\n" +
        "  - Core Java 17+: OOPs, Collections Framework, Multithreading, Streams & Lambdas\n" +
        "  - Hibernate ORM, JPA (Java Persistence API), JDBC, MySQL & PostgreSQL\n" +
        "  - Spring Boot 3: Dependency Injection, Spring MVC, REST APIs, Spring Security & JWT\n" +
        "  - Microservices Architecture: Eureka Service Discovery, API Gateway, Circuit Breaker\n" +
        "  - Apache Kafka Message Broker, Redis Distributed Caching\n" +
        "  - React 19 Frontend with TypeScript\n" +
        "  - Docker, Kubernetes & AWS Cloud Deployment\n\n" +
        "• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Evening (7:00 PM - 9:00 PM)\n\n" +
        "Free Demo Class ke liye call/WhatsApp karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 11. FULL STACK WEB DEVELOPMENT (MERN / NEXT.JS)
    if (/\b(full\s*stack|fullstack|mern|mern\s*stack|react|reactjs|next\s*js|nextjs|web\s*development|web\s*dev|frontend|backend|nodejs|node\s*js|expressjs)\b/i.test(norm)) {
      return "💻 **Full Stack Web Development (MERN / Next.js 15)** (Duration: 4 to 6 Months)\n\n" +
        "• **Comprehensive Syllabus**:\n" +
        "  - Modern HTML5, CSS3, TailwindCSS, Responsive Mobile-First Design\n" +
        "  - Modern JavaScript (ES6+), TypeScript Fundamentals\n" +
        "  - React 19: Hooks, Component Lifecycle, State Management, Custom Hooks\n" +
        "  - Next.js 15: App Router, Server Components, Server Actions, SEO, SSR & SSG\n" +
        "  - Node.js & Express.js: REST APIs, Middleware, WebSockets for Real-time Apps\n" +
        "  - Databases: MongoDB & Mongoose, PostgreSQL & Prisma ORM\n" +
        "  - Authentication: JWT, NextAuth, OAuth\n" +
        "  - 20+ Live Projects: Full SaaS Platforms, E-commerce, Real-time Chat, Portfolio\n\n" +
        "• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Evening (7:00 PM - 9:00 PM) | Sat-Sun (10:00 AM - 1:00 PM)\n" +
        "• **Placement**: 100% Placement Assistance with live portfolio hosting.\n\n" +
        "Free Demo Class ke liye contact karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 12. CYBER SECURITY & ETHICAL HACKING
    if (/\b(cyber\s*security|cybersecurity|cyber|ethical\s*hacking|hacking|hacker|ceh|pentest|penetration\s*testing|kali\s*linux|soc|siem|metasploit)\b/i.test(norm)) {
      return "🛡️ **Cyber Security & Ethical Hacking Program** (Duration: 5 Months)\n\n" +
        "• **Comprehensive Syllabus**:\n" +
        "  - Computer Networking Fundamentals, Protocols (TCP/IP, OSI), Wireshark Packet Analysis\n" +
        "  - Kali Linux Mastery & Command-line Tools\n" +
        "  - Reconnaissance & Footprinting: OSINT, Nmap, Nessus Vulnerability Scanning\n" +
        "  - System Hacking: Metasploit Framework, Password Cracking, Privilege Escalation\n" +
        "  - Web Application Penetration Testing: OWASP Top 10, Burp Suite Professional, SQL Injection, XSS\n" +
        "  - Network Security, Wireless Hacking, Firewalls & IDS/IPS\n" +
        "  - Blue Team Defense & SIEM Operations with Splunk & ELK\n" +
        "  - Aligned with Certified Ethical Hacker (CEH) & CompTIA Security+ credentials\n\n" +
        "• **Batches**: Mon-Fri & Weekend slots (10:00 AM - 7:00 PM)\n\n" +
        "Free Demo Class book karne ke liye connect karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 13. UI/UX DESIGN
    if (/\b(ui\s*\/?\s*ux|uiux|\bui\b|\bux\b|figma|framer|user\s*interface|user\s*experience|wireframing)\b/i.test(norm)) {
      return "🎨 **UI/UX Design Mastery** (Duration: 4 Months)\n\n" +
        "• **Syllabus & Topics**:\n" +
        "  - Design Thinking, User Psychology, Color Theory & Modern Typography\n" +
        "  - User Research, Information Architecture, User Personas & Journey Maps\n" +
        "  - Wireframing & Rapid Lo-Fi Prototyping (Whimsical, Balsamiq)\n" +
        "  - Figma Mastery: Auto Layout, Components, Variants, Design Tokens, Design Systems\n" +
        "  - Framer Interactive Prototyping, Micro-interactions & Motion Design\n" +
        "  - Usability Testing, Heuristic Evaluation & Developer Handoff\n" +
        "  - Complete Portfolio Creation on Behance & Dribbble\n\n" +
        "• **Batches**: Flexible Weekdays & Weekends\n\n" +
        "Free Demo Class ke liye contact karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 14. GRAPHIC DESIGN
    if (/\b(graphic\s*design(ing)?|graphics?|photoshop|illustrator|canva|indesign)\b/i.test(norm)) {
      return "🖌️ **Graphic Design Program** (Duration: 3 Months)\n\n" +
        "• **Topics Covered**:\n" +
        "  - Design Principles, Visual Composition, Branding Identity Systems\n" +
        "  - Adobe Photoshop: Advanced Photo Manipulation, Retouching, Poster & Banner Mockups\n" +
        "  - Adobe Illustrator: Vector Illustration, Brand Logos, Iconography, Vector Art\n" +
        "  - Adobe InDesign: Multi-page Print Layouts, Brochures, Magazine Design\n" +
        "  - Canva Pro & AI Design Tools (Midjourney, Adobe Firefly)\n" +
        "  - Live Client Creatives & Portfolio Building\n\n" +
        "• **Batches**: Weekday & Weekend batches available.\n\n" +
        "Free Demo ke liye contact karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 15. DSA & CODING
    if (/\b(dsa|data\s*structures?|algorithms?|leetcode|competitive\s*programming|coding\s*interview|c\+\+)\b/i.test(norm)) {
      return "🧩 **DSA & Coding Mastery (C++ / Java / Python)** (Duration: 3 Months)\n\n" +
        "• **Topics & Roadmap**:\n" +
        "  - Big-O Time & Space Complexity Analysis\n" +
        "  - Arrays, Strings, Two Pointers, Sliding Window Technique\n" +
        "  - Linked Lists, Stacks, Queues, Monotonic Queues\n" +
        "  - Binary Trees, Binary Search Trees (BST), Heaps & Priority Queues\n" +
        "  - Graph Theory: BFS, DFS, Dijkstra, Topological Sort, Disjoint Set Union (DSU)\n" +
        "  - Dynamic Programming (1D, 2D, Knapsack, Longest Common Subsequence)\n" +
        "  - 300+ Curated LeetCode problems & Mock FAANG Technical Coding Rounds\n\n" +
        "Free Demo Class ke liye connect karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 16. DIGITAL MARKETING
    if (/\b(digital\s*marketing|marketing|seo|google\s*ads|meta\s*ads|facebook\s*ads|social\s*media\s*marketing|smm|sem|ppc)\b/i.test(norm)) {
      return "📈 **Digital Marketing Masterclass** (Duration: 3 Months)\n\n" +
        "• **Comprehensive Syllabus**:\n" +
        "  - Search Engine Optimization (SEO): On-Page, Off-Page, Technical SEO, Local Google Maps SEO\n" +
        "  - Google Ads: Search, Display, Video, Shopping, Performance Max Campaigns\n" +
        "  - Meta Ads: Facebook & Instagram Ads Manager, Audience Targeting, Retargeting\n" +
        "  - Social Media Marketing (SMM): Content Strategy, LinkedIn & YouTube Growth\n" +
        "  - Web Analytics: Google Analytics 4 (GA4), Google Tag Manager (GTM), Conversion Tracking\n" +
        "  - Email Marketing Automation & Lead Funnels\n" +
        "  - AI for Marketers & Live Campaigns with Real Client Ad Budgets\n\n" +
        "• **Batches**: Mon-Fri (11:00 AM - 1:00 PM) | Sat-Sun (10:00 AM - 1:00 PM)\n\n" +
        "Free Demo Class ke liye sampark karein:\n" +
        "📞 Call: " + b.phone + "\n" +
        "💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n" +
        "📍 Center: " + b.address;
    }

    // 17. FEES & INSTALLMENTS / EMI
    if (/\b(fee|fees|cost|price|paisa|kitna|installment|emi|discount|scholarship)\b/i.test(norm)) {
      return "NexxTechs me course fees student ke selected module, batch format aur scholarship test discount par depend karti hai. Hum **0% Interest EMI** aur **easy monthly installments** provide karte hain taaki padhai bilkul affordable rahe.\n\nExact fee structure, scholarship discounts aur syllabus PDF ke liye hamare " + b.city + " counselor se direct baat karein:\n📞 Call: " + b.phone + "\n💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n📍 Center: " + b.address;
    }

    // 18. DEMO CLASS / TRIAL
    if (/\b(demo|trial|sample\s*class|free\s*class)\b/i.test(norm)) {
      return "Haan! NexxTechs par har course ke liye **100% Free Demo Class** available hai. Aap hamare " + b.city + " center par offline visit kar sakte hain ya Live Online interactive demo attend kar sakte hain.\n\nApna free demo slot confirm karne ke liye abhi call ya WhatsApp karein:\n📞 Call: " + b.phone + "\n💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n📍 Center: " + b.address;
    }

    // 19. PLACEMENTS / JOBS / SALARY
    if (/\b(placement|job|package|salary|hiring|company|career)\b/i.test(norm)) {
      return "NexxTechs ka **95% Placement Track Record** hai aur 5000+ students top tech MNCs me place ho chuke hain! Hum provide karte hain:\n• 100% Placement Assistance Guarantee\n• Dedicated Placement Cell & 150+ Hiring Partners\n• Resume & LinkedIn Profile Optimization\n• 1-on-1 Mock Technical & HR Interviews\n\nRecent placement records aur hiring partners ki details ke liye counselor se connect karein:\n📞 Call: " + b.phone + "\n💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n📍 Center: " + b.address;
    }

    // 20. BRANCH / ADDRESS / LOCATION
    if (/\b(address|location|center|branch|kahan|kaha|office|where)\b/i.test(norm)) {
      return "📍 **NexxTechs " + b.name + "**:\n" + b.address + "\n📞 Call: " + b.phone + "\n💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n\n(Hamari doosri branch: **NexxTechs " + other.name + "** — " + other.address + " | Call: " + other.phone + ")\nOnline Live Interactive Classes bhi available hain!";
    }

    // 21. BATCH TIMINGS
    if (/\b(batch|timing|timings|time|duration|morning|evening|weekend)\b/i.test(norm)) {
      return "NexxTechs me flexible batch timings available hain:\n• **Morning Batches**: 10:00 AM - 12:00 PM (Monday to Friday)\n• **Evening Batches**: 7:00 PM - 9:00 PM (Working professionals ke liye best)\n• **Weekend Batches**: 10:00 AM - 1:00 PM (Saturday & Sunday)\n\nAgla naya batch kab shuru ho raha hai janne ke liye " + b.city + " counselor se connect karein:\n📞 Call: " + b.phone + "\n💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n📍 Center: " + b.address;
    }

    // 22. CERTIFICATE
    if (/\b(certificate|certification|degree|diploma)\b/i.test(norm)) {
      return "Haan! Course successfully complete karne par aapko industry-recognized **NexxTechs Course Completion Certificate** aur **Live Capstone Project Experience Letter** milta hai. Saath hi global certification exams (AWS Certified, CEH, CompTIA, etc.) ki complete preparation karayi jaati hai.";
    }

    // 23. ONLINE VS OFFLINE
    if (/\b(online|offline|hybrid|mode)\b/i.test(norm)) {
      return "NexxTechs par dono training modes available hain:\n• **Offline Classroom**: Hamare " + b.name + " par modern lab facilities aur mentor ke saath face-to-face training.\n• **Live Interactive Online**: Ghar baithe live sessions with class recordings & dedicated doubt support.\n\nFree demo class book karne ke liye contact karein:\n📞 Call: " + b.phone + "\n💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n📍 Center: " + b.address;
    }

    // 24. DIRECT COUNSELOR CONTACT
    if (/\b(contact|phone|number|counselor|counsellor|consultant|call|whatsapp|baat)\b/i.test(norm)) {
      return "Aap hamare **" + b.name + " Counselor** se direct baat kar sakte hain:\n📞 Call: " + b.phone + "\n💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n📍 Address: " + b.address;
    }

    // 25. FALTU / EXTRA / UNRELATED QUESTION FALLBACK (User Rule: Direct to respective branch counselor)
    return "Yeh jankari mere paas uplabdh nahi hai. Main sirf NexxTechs ke IT courses, admissions aur career training ke sawaalo ke jawab de sakti hu.\n\nKisi bhi anya jankari ya personal career counseling ke liye aap hamare **" + b.name + " Counselor** se direct baat kar sakte hain:\n📞 Call: " + b.phone + "\n💬 WhatsApp: [💬 Chat on WhatsApp](" + b.whatsappUrl + ")\n📍 Address: " + b.address;
  }

  // ---------- Sending Messages ----------
  function send(text) {
    text = (text || "").trim();
    if (!text || busy) return;

    updateBranchUI();
    addMsg("user", text);
    history.push({ role: "user", content: text });
    save();

    input.value = "";
    busy = true;
    sendBtn.disabled = true;
    typing(true);

    var isNoida = isNoidaPage();
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () {
      if (ctrl) ctrl.abort();
    }, 10000);

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-10), isNoida: isNoida }),
      signal: ctrl ? ctrl.signal : undefined,
    })
      .then(function (r) {
        return r.json().then(function (j) {
          return { ok: r.ok, j: j };
        });
      })
      .then(function (res) {
        typing(false);
        var reply = (res.ok && res.j && res.j.reply) ? res.j.reply : getKnowledgeReply(text);
        var botRow = addMsg("bot", reply);
        history.push({ role: "assistant", content: reply });
        save();
        showChips(true); // Re-render suggestion chips without jumping to bottom
        scrollToElement(botRow); // Stay right at the beginning of the course response!
      })
      .catch(function () {
        typing(false);
        var reply = getKnowledgeReply(text);
        var botRow = addMsg("bot", reply);
        history.push({ role: "assistant", content: reply });
        save();
        showChips(true);
        scrollToElement(botRow);
      })
      .then(function () {
        clearTimeout(timer);
        busy = false;
        sendBtn.disabled = false;
        if (!isMobileView()) {
          input.focus();
        }
      });
  }

  function isMobileView() {
    try {
      return (
        window.innerWidth <= 640 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || "")
      );
    } catch (e) {
      return false;
    }
  }

  // ---------- Open / Close ----------
  function setOpen(open) {
    root.classList.toggle("open", open);
    fab.setAttribute("aria-expanded", String(open));
    var isMob = isMobileView();
    if (open) {
      if (isMob) {
        document.body.classList.add("nxc-locked");
        document.documentElement.classList.add("nxc-locked");
      }
      updateBranchUI();
      showChips(); // Prominently show suggestion chips whenever opened!
      if (!isMob) {
        setTimeout(function () {
          input.focus();
        }, 80);
      }
      scrollDown();
    } else {
      document.body.classList.remove("nxc-locked");
      document.documentElement.classList.remove("nxc-locked");
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

  // Track SPA navigation (React Router) to dynamically switch Delhi/Noida contact
  window.addEventListener("popstate", updateBranchUI);
  var origPushState = history.pushState;
  if (typeof origPushState === "function") {
    history.pushState = function () {
      var ret = origPushState.apply(this, arguments);
      setTimeout(updateBranchUI, 100);
      return ret;
    };
  }

  // ---------- Initialize ----------
  var initialBranch = getBranch();
  var greetingMsg =
    "Namaste! 👋 Main " + BOT_NAME + " hu, " + BRAND + " (" + initialBranch.city + " Center) ki AI counselor.\nNexxTechs ke sabhi courses, duration, batch timings, placement assistance ya Free Demo Class ke baare me kuch bhi puchiye!";

  addMsg("bot", greetingMsg);
  if (history.length) {
    history.forEach(function (m) {
      addMsg(m.role, m.content);
    });
  }
  showChips(); // Always render suggestion chips when loaded!
})();
