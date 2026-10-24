import React, { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    tabTitle: "Enroll & Learn",
    labelTitle: "Enroll & Learn",
    labelDesc: "Choose your domain & start learning",
  },
  {
    num: "02",
    tabTitle: "Build & Practice",
    labelTitle: "Build & Practice",
    labelDesc: "Work on live projects with mentors",
  },
  {
    num: "03",
    tabTitle: "Get Certified",
    labelTitle: "Get Certified",
    labelDesc: "Earn industry-recognized credentials",
  },
  {
    num: "04",
    tabTitle: "Get Placed",
    labelTitle: "Get Placed",
    labelDesc: "Direct company placements & prep",
  },
];

const DOMAINS = [
  "Cloud Computing",
  "DevOps",
  "Full Stack (Java, Python, MERN)",
  "Data Science",
  "Data Analytics",
  "Cyber Security",
  "Digital Marketing",
  "UI/UX Design",
  "SAP",
  "Generative AI",
];

const HIRING_PARTNERS = [
  { name: "Google", domain: "google.com", url: "https://www.google.com" },
  { name: "Microsoft", domain: "microsoft.com", url: "https://www.microsoft.com" },
  { name: "Amazon", domain: "amazon.com", url: "https://www.amazon.com" },
  { name: "Netflix", domain: "netflix.com", url: "https://www.netflix.com" },
  { name: "Zomato", domain: "zomato.com", url: "https://www.zomato.com" },
  { name: "Swiggy", domain: "swiggy.com", url: "https://www.swiggy.com" },
  { name: "Flipkart", domain: "flipkart.com", url: "https://www.flipkart.com" },
  { name: "Goldman Sachs", domain: "goldmansachs.com", url: "https://www.goldmansachs.com" },
  { name: "PayPal", domain: "paypal.com", url: "https://www.paypal.com" },
  { name: "Adobe", domain: "adobe.com", url: "https://www.adobe.com" },
  { name: "Salesforce", domain: "salesforce.com", url: "https://www.salesforce.com" },
  { name: "Apple", domain: "apple.com", url: "https://www.apple.com" },
  { name: "IBM", domain: "ibm.com", url: "https://www.ibm.com" },
  { name: "Spotify", domain: "spotify.com", url: "https://www.spotify.com" },
  { name: "Paytm", domain: "paytm.com", url: "https://paytm.com" },
  { name: "Deloitte", domain: "deloitte.com", url: "https://www.deloitte.com" },
];

export default function CareerTransformation() {
  const [activeStep, setActiveStep] = useState(0);
  const tabsRef = useRef(null);

  // Sync with URL hash if present (e.g. #step-3)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const match = window.location.hash.match(/step-(\d)/);
      if (match) {
        const stepNum = parseInt(match[1], 10) - 1;
        if (stepNum >= 0 && stepNum <= 3) {
          setActiveStep(stepNum);
        }
      }
    }
  }, []);

  const goToStep = (step, scroll = true) => {
    const clamped = Math.max(0, Math.min(3, step));
    setActiveStep(clamped);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#step-${clamped + 1}`);
    }
    if (scroll && tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      goToStep(activeStep + 1, false);
    } else if (e.key === "ArrowLeft") {
      goToStep(activeStep - 1, false);
    }
  };

  const handleEnrollClick = (e) => {
    const enquiryEl = document.querySelector('[data-testid="enquiry-form"]');
    if (enquiryEl) {
      e.preventDefault();
      enquiryEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      className="py-16 md:py-24 bg-transparent relative overflow-hidden"
      data-testid="career-transformation"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Your Learning Journey"
    >
      <style>{`
        .journey-canvas {
          position: relative;
          max-width: 1136px;
          margin: 0 auto;
          aspect-ratio: 1136 / 444;
          border-radius: 20px;
          overflow: hidden;
          background:
            linear-gradient(to right, rgba(0,0,0,.045) 1px, transparent 1px) 0 0 / 40px 40px,
            linear-gradient(to bottom, rgba(0,0,0,.045) 1px, transparent 1px) 0 0 / 40px 40px,
            radial-gradient(ellipse at 85% 0%, rgba(132,204,22,.18), transparent 55%),
            linear-gradient(180deg, #eef3ea 0%, #f8faf6 100%);
          border: 1px solid #e4e9e0;
        }
        .dark .journey-canvas {
          background:
            linear-gradient(to right, rgba(255,255,255,.04) 1px, transparent 1px) 0 0 / 40px 40px,
            linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px) 0 0 / 40px 40px,
            radial-gradient(ellipse at 85% 0%, rgba(132,204,22,.22), transparent 55%),
            linear-gradient(180deg, #0e140e 0%, #090d09 100%);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .journey-axis-label {
          position: absolute;
          left: 2.2%;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .18em;
          color: #6b7280;
          user-select: none;
        }
        .journey-axis-label.top { top: 4%; }
        .journey-axis-label.bottom { bottom: 4%; }
        .journey-axis-line {
          position: absolute;
          left: 4.1%;
          top: 12%;
          bottom: 12%;
          width: 1px;
          background: linear-gradient(#1e293b, transparent);
        }
        .dark .journey-axis-line {
          background: linear-gradient(rgba(255,255,255,0.4), transparent);
        }
        .path-glow {
          filter: blur(10px);
          opacity: .55;
        }
        .journey-node {
          position: absolute;
          width: 6.2%;
          aspect-ratio: 1;
          min-width: 28px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 3px solid #0b0f0a;
          background: #84cc16;
          color: #0b0f0a;
          font: 800 clamp(11px, 1.7vw, 18px) "Inter", sans-serif;
          cursor: pointer;
          display: grid;
          place-items: center;
          box-shadow: 0 0 22px rgba(132,204,22,.7);
          transition: transform .25s ease, background .25s ease, box-shadow .25s ease, border-color .25s ease;
          z-index: 20;
        }
        .journey-node:hover {
          transform: translate(-50%, -50%) scale(1.12);
        }
        .journey-node:focus-visible {
          outline: 3px solid #0b0f0a;
          outline-offset: 3px;
        }
        .journey-node.active {
          background: #ffffff;
          border-color: #65a30d;
          box-shadow: 0 0 0 6px rgba(132,204,22,.35), 0 0 26px rgba(132,204,22,.85);
        }
        .dark .journey-node {
          border-color: #1a2216;
        }
        .dark .journey-node.active {
          background: #0f160e;
          color: #84cc16;
          border-color: #84cc16;
        }
        .journey-label {
          position: absolute;
          transform: translateX(-50%);
          text-align: center;
          width: 22%;
          cursor: pointer;
          pointer-events: auto;
          z-index: 15;
          transition: transform .2s ease;
        }
        .journey-label:hover {
          transform: translateX(-50%) scale(1.03);
        }
        .journey-label h3 {
          font-size: clamp(11px, 1.45vw, 16px);
          font-weight: 800;
          letter-spacing: -.02em;
          color: #0b0f0a;
        }
        .dark .journey-label h3 {
          color: #ffffff;
        }
        .journey-label p {
          font-size: clamp(9px, 1.1vw, 12px);
          color: #65a30d;
          font-weight: 600;
          margin-top: 2px;
          line-height: 1.3;
        }
        .dark .journey-label p {
          color: #84cc16;
        }
        .panel-fade-in {
          animation: panelRise .32s ease forwards;
        }
        @keyframes panelRise {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 700px) {
          .journey-label p, .journey-axis-label, .journey-axis-line {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-[#65a30d] dark:text-[#84cc16] uppercase bg-[#f0f9e0] dark:bg-[#84cc16]/10 px-3.5 py-1.5 rounded-full mb-3">
            Roadmap to Success
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A0A0A] dark:text-white uppercase tracking-tight">
            Your <span className="text-[#84CC16]">Career Growth</span> Graph
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mt-2">
            See how you transform from a beginner to an industry-ready professional
          </p>
        </div>

        {/* ============ CURVED JOURNEY GRAPH ============ */}
        <div className="w-full px-0 sm:px-2">
          <div className="journey-canvas">
            <div className="journey-axis-label top">EXPERT</div>
            <div className="journey-axis-line"></div>
            <div className="journey-axis-label bottom">BEGINNER</div>

            <svg
              viewBox="0 0 1136 444"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {/* Glow Blur Layer */}
              <path
                className="path-glow"
                d="M156 381 C 260 370, 300 270, 415 269 C 540 268, 600 157, 726 157 C 840 157, 880 50, 979 44"
                fill="none"
                stroke="#84cc16"
                strokeWidth="22"
                strokeLinecap="round"
              />
              {/* Foreground Sharp Curved Path */}
              <path
                d="M156 381 C 260 370, 300 270, 415 269 C 540 268, 600 157, 726 157 C 840 157, 880 50, 979 44"
                fill="none"
                stroke="#84cc16"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>

            {/* Nodes */}
            <button
              type="button"
              className={`journey-node ${activeStep === 0 ? "active" : ""}`}
              style={{ left: "13.7%", top: "85.8%" }}
              onClick={() => goToStep(0)}
              aria-label="Step 1: Enroll and Learn"
            >
              01
            </button>
            <button
              type="button"
              className={`journey-node ${activeStep === 1 ? "active" : ""}`}
              style={{ left: "36.5%", top: "60.6%" }}
              onClick={() => goToStep(1)}
              aria-label="Step 2: Build and Practice"
            >
              02
            </button>
            <button
              type="button"
              className={`journey-node ${activeStep === 2 ? "active" : ""}`}
              style={{ left: "63.9%", top: "35.4%" }}
              onClick={() => goToStep(2)}
              aria-label="Step 3: Get Certified"
            >
              03
            </button>
            <button
              type="button"
              className={`journey-node ${activeStep === 3 ? "active" : ""}`}
              style={{ left: "86.2%", top: "9.9%" }}
              onClick={() => goToStep(3)}
              aria-label="Step 4: Get Placed"
            >
              04
            </button>

            {/* Labels */}
            <div
              className="journey-label"
              style={{ left: "15.8%", top: "65%" }}
              onClick={() => goToStep(0)}
            >
              <h3 className={activeStep === 0 ? "text-[#65a30d] dark:text-[#84cc16]" : ""}>
                {STEPS[0].labelTitle}
              </h3>
              <p>{STEPS[0].labelDesc}</p>
            </div>
            <div
              className="journey-label"
              style={{ left: "36.5%", top: "71.5%" }}
              onClick={() => goToStep(1)}
            >
              <h3 className={activeStep === 1 ? "text-[#65a30d] dark:text-[#84cc16]" : ""}>
                {STEPS[1].labelTitle}
              </h3>
              <p>{STEPS[1].labelDesc}</p>
            </div>
            <div
              className="journey-label"
              style={{ left: "63.9%", top: "45.5%" }}
              onClick={() => goToStep(2)}
            >
              <h3 className={activeStep === 2 ? "text-[#65a30d] dark:text-[#84cc16]" : ""}>
                {STEPS[2].labelTitle}
              </h3>
              <p>{STEPS[2].labelDesc}</p>
            </div>
            <div
              className="journey-label"
              style={{ left: "77%", top: "3.5%" }}
              onClick={() => goToStep(3)}
            >
              <h3 className={activeStep === 3 ? "text-[#65a30d] dark:text-[#84cc16]" : ""}>
                {STEPS[3].labelTitle}
              </h3>
              <p>{STEPS[3].labelDesc}</p>
            </div>
          </div>
        </div>

        {/* ============ TABS ============ */}
        <div ref={tabsRef} className="max-w-[1136px] mx-auto mt-6 px-0 sm:px-2">
          <div
            className="flex gap-2 flex-wrap bg-white dark:bg-[#121811] border border-[#e4e9e0] dark:border-white/10 p-1.5 rounded-2xl shadow-sm"
            role="tablist"
            aria-label="Learning journey steps"
          >
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => goToStep(idx, false)}
                  className={`flex-1 basis-[160px] border-0 cursor-pointer font-semibold text-sm py-3 px-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 outline-none ${
                    isActive
                      ? "bg-[#0b0f0a] text-white dark:bg-white dark:text-[#0b0f0a] shadow-sm"
                      : "bg-transparent text-[#5b6470] dark:text-gray-400 hover:bg-[#f4f8ef] dark:hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full grid place-items-center text-[11px] font-extrabold transition-colors ${
                      isActive
                        ? "bg-[#84cc16] text-[#0b0f0a]"
                        : "bg-[#eef2ea] dark:bg-white/10 text-[#0b0f0a] dark:text-white"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{step.tabTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============ PANELS ============ */}
        <div className="max-w-[1136px] mx-auto mt-4 px-0 sm:px-2">
          {/* STEP 1: Enroll & Learn */}
          {activeStep === 0 && (
            <article
              className="panel-fade-in bg-white dark:bg-[#111612] border border-[#e4e9e0] dark:border-white/10 rounded-[20px] p-6 sm:p-8 md:p-10 shadow-sm"
              role="tabpanel"
            >
              <span className="inline-block text-xs font-bold tracking-[0.14em] text-[#65a30d] dark:text-[#84cc16] bg-[#f0f9e0] dark:bg-[#84cc16]/10 px-3 py-1 rounded-full">
                STEP 01
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0b0f0a] dark:text-white mt-3.5 mb-2.5">
                Enroll &amp; Learn
              </h2>
              <p className="text-[#5b6470] dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Pick the domain that matches your career goal and start with industry-focused training at NexxTechs, Vikaspuri.
                Our courses are built around practical, job-oriented skills rather than pure theory, so you learn what companies actually use.
              </p>

              <div className="mt-7 text-xs font-bold tracking-[0.08em] text-[#5b6470] dark:text-gray-400 uppercase">
                DOMAINS YOU CAN CHOOSE FROM
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {DOMAINS.map((domain) => (
                  <span
                    key={domain}
                    className="text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-full border border-[#e4e9e0] dark:border-white/10 bg-white dark:bg-white/5 text-[#0b0f0a] dark:text-gray-200 shadow-2xs hover:border-[#84cc16] transition-colors"
                  >
                    {domain}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mt-7">
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">🎯</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Choose your path
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Talk to our career team, pick a domain, and get a clear roadmap from beginner to job-ready.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">📚</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Structured curriculum
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Concepts are taught step by step, from fundamentals to advanced topics, with hands-on exercises.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">🏫</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Learn at our campus
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Classroom learning at B-54 Krishna Park, Vikaspuri, New Delhi – 110018.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8 items-center">
                <a
                  href="mailto:info@nexxtechs.com?subject=Enrollment%20enquiry"
                  onClick={handleEnrollClick}
                  className="bg-[#84cc16] hover:bg-[#a3e635] text-[#0b0f0a] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  Enroll Now
                </a>
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="bg-transparent border border-[#e4e9e0] dark:border-white/15 text-[#0b0f0a] dark:text-white hover:bg-[#f4f8ef] dark:hover:bg-white/5 font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Next: Build &amp; Practice →
                </button>
                <div className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 ml-auto flex items-center gap-2">
                  <a href="tel:+919217179762" className="hover:text-[#65a30d] transition-colors">
                    📞 +91 9217179762
                  </a>
                  <span>·</span>
                  <a href="mailto:info@nexxtechs.com" className="hover:text-[#65a30d] transition-colors">
                    ✉ info@nexxtechs.com
                  </a>
                </div>
              </div>
            </article>
          )}

          {/* STEP 2: Build & Practice */}
          {activeStep === 1 && (
            <article
              className="panel-fade-in bg-white dark:bg-[#111612] border border-[#e4e9e0] dark:border-white/10 rounded-[20px] p-6 sm:p-8 md:p-10 shadow-sm"
              role="tabpanel"
            >
              <span className="inline-block text-xs font-bold tracking-[0.14em] text-[#65a30d] dark:text-[#84cc16] bg-[#f0f9e0] dark:bg-[#84cc16]/10 px-3 py-1 rounded-full">
                STEP 02
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0b0f0a] dark:text-white mt-3.5 mb-2.5">
                Build &amp; Practice
              </h2>
              <p className="text-[#5b6470] dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Learning sticks when you build. At NexxTechs every course includes practical training and real-world project exposure,
                so you finish with work you can show to recruiters, not just notes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-7">
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">🛠️</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Live, real-world projects
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Apply every concept on projects that mirror real industry work, and build a portfolio as you go.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">👩‍🏫</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Mentor guidance
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Get feedback from experienced trainers who review your work and help you fix gaps early.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">🧪</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Hands-on labs
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Practice daily with exercises and lab sessions instead of only watching lectures.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">👥</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Small, focused batches
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Learn in a batch where doubts get answered and everyone keeps up.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">📝</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Assessments &amp; reviews
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Regular tests and project reviews show exactly where you stand and what to improve.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">🧠</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Interview-ready skills
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Resume building, mock interviews and communication practice alongside your technical training.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-[#f0f9e0]/60 dark:bg-[#84cc16]/10 border border-[#84cc16]/20">
                <div className="text-xs font-bold tracking-[0.08em] text-[#65a30d] dark:text-[#84cc16] uppercase">
                  HOW WE MAKE LEARNING BETTER
                </div>
                <p className="text-[#0b0f0a] dark:text-gray-200 text-sm leading-relaxed mt-1 font-medium">
                  Practical first, theory second. Every module ends with something you build, so by the time you finish you have both the skills and the proof.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8 items-center">
                <button
                  type="button"
                  onClick={() => goToStep(0)}
                  className="bg-transparent border border-[#e4e9e0] dark:border-white/15 text-[#0b0f0a] dark:text-white hover:bg-[#f4f8ef] dark:hover:bg-white/5 font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="bg-[#84cc16] hover:bg-[#a3e635] text-[#0b0f0a] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Next: Get Certified →
                </button>
              </div>
            </article>
          )}

          {/* STEP 3: Get Certified */}
          {activeStep === 2 && (
            <article
              className="panel-fade-in bg-white dark:bg-[#111612] border border-[#e4e9e0] dark:border-white/10 rounded-[20px] p-6 sm:p-8 md:p-10 shadow-sm"
              role="tabpanel"
            >
              <span className="inline-block text-xs font-bold tracking-[0.14em] text-[#65a30d] dark:text-[#84cc16] bg-[#f0f9e0] dark:bg-[#84cc16]/10 px-3 py-1 rounded-full">
                STEP 03
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0b0f0a] dark:text-white mt-3.5 mb-2.5">
                Get Certified
              </h2>
              <p className="text-[#5b6470] dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Finish your course and earn a NexxTechs certificate that shows employers what you can do. Certification is backed by the
                projects you built and the assessments you cleared, so it reflects real skills.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-7">
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">🎓</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Course completion certificate
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Awarded by NexxTechs after you complete your domain training and projects.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">✅</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Skill-based assessment
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Certification depends on tests and project evaluation, not just attendance.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">💼</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Portfolio-backed
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Attach your project work to your certificate when you apply for roles.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">🔗</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Share it anywhere
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Add your credential to your resume and LinkedIn profile to stand out.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8 items-center">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="bg-transparent border border-[#e4e9e0] dark:border-white/15 text-[#0b0f0a] dark:text-white hover:bg-[#f4f8ef] dark:hover:bg-white/5 font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="bg-[#84cc16] hover:bg-[#a3e635] text-[#0b0f0a] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Next: Get Placed →
                </button>
              </div>
            </article>
          )}

          {/* STEP 4: Get Placed */}
          {activeStep === 3 && (
            <article
              className="panel-fade-in bg-white dark:bg-[#111612] border border-[#e4e9e0] dark:border-white/10 rounded-[20px] p-6 sm:p-8 md:p-10 shadow-sm"
              role="tabpanel"
            >
              <span className="inline-block text-xs font-bold tracking-[0.14em] text-[#65a30d] dark:text-[#84cc16] bg-[#f0f9e0] dark:bg-[#84cc16]/10 px-3 py-1 rounded-full">
                STEP 04
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0b0f0a] dark:text-white mt-3.5 mb-2.5">
                Get Placed
              </h2>
              <p className="text-[#5b6470] dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Your training ends with a career, not a certificate alone. Our placement team works with you on resumes, interview prep
                and connects you with hiring companies.
              </p>

              {/* Placement Stats */}
              <div className="flex flex-wrap gap-3.5 mt-7">
                <div className="flex-1 basis-[180px] bg-[#0b0f0a] dark:bg-[#151c14] text-white rounded-2xl p-5 border border-black/10 dark:border-white/10 shadow-sm">
                  <b className="block text-3xl sm:text-4xl font-extrabold tracking-tight text-[#84cc16]">
                    5000+
                  </b>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">
                    Students trained
                  </span>
                </div>
                <div className="flex-1 basis-[180px] bg-[#0b0f0a] dark:bg-[#151c14] text-white rounded-2xl p-5 border border-black/10 dark:border-white/10 shadow-sm">
                  <b className="block text-3xl sm:text-4xl font-extrabold tracking-tight text-[#84cc16]">
                    95%
                  </b>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">
                    Placement rate
                  </span>
                </div>
              </div>

              {/* Placement Prep Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">📄</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Resume &amp; LinkedIn
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Professional resume and profile building around your projects and skills.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">🎤</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Mock interviews
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Technical and HR practice rounds with feedback before the real thing.
                  </p>
                </div>
                <div className="border border-[#e4e9e0] dark:border-white/10 rounded-2xl p-5 bg-[#fafcf8] dark:bg-white/[0.03]">
                  <div className="text-2xl">🤝</div>
                  <h4 className="font-bold text-base text-[#0b0f0a] dark:text-white mt-2 mb-1">
                    Company referrals
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 leading-relaxed">
                    Direct introductions to hiring partners looking for job-ready candidates.
                  </p>
                </div>
              </div>

              {/* OUR HIRING PARTNERS WITH REAL COMPANY LOGOS */}
              <div className="mt-8 pt-6 border-t border-[#e4e9e0] dark:border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
                  <div className="text-xs font-bold tracking-[0.1em] text-[#5b6470] dark:text-gray-400 uppercase">
                    OUR HIRING PARTNERS
                  </div>
                  <span className="text-xs text-[#65a30d] dark:text-[#84cc16] font-semibold">
                    Top tech brands hiring NexxTechs alumni
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {HIRING_PARTNERS.map((partner) => (
                    <a
                      key={partner.name}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-[#e4e9e0] dark:border-white/10 bg-[#fafcf8] dark:bg-white/[0.03] hover:border-[#84cc16] hover:bg-white dark:hover:bg-white/[0.07] hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 flex items-center justify-center p-1.5 flex-shrink-0 shadow-xs">
                        <img
                          src={`https://logo.clearbit.com/${partner.domain}?size=128`}
                          alt={`${partner.name} logo`}
                          loading="lazy"
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                          onError={(e) => {
                            if (e.target.src.includes("clearbit")) {
                              e.target.src = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.${partner.domain}&size=128`;
                            } else {
                              e.target.style.display = "none";
                            }
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-xs sm:text-sm text-[#0b0f0a] dark:text-white group-hover:text-[#65a30d] dark:group-hover:text-[#84cc16] transition-colors truncate">
                          {partner.name}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-[#5b6470] dark:text-gray-400 truncate">
                          Hiring Partner
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-8 items-center">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="bg-transparent border border-[#e4e9e0] dark:border-white/15 text-[#0b0f0a] dark:text-white hover:bg-[#f4f8ef] dark:hover:bg-white/5 font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  ← Back
                </button>
                <a
                  href="mailto:info@nexxtechs.com?subject=Placement%20enquiry"
                  className="bg-[#84cc16] hover:bg-[#a3e635] text-[#0b0f0a] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  Talk to Placement Team
                </a>
                <a
                  href="tel:+919217179762"
                  className="text-xs sm:text-sm text-[#5b6470] dark:text-gray-400 hover:text-[#65a30d] dark:hover:text-[#84cc16] transition-colors ml-auto flex items-center gap-1.5"
                >
                  📞 +91 9217179762
                </a>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
