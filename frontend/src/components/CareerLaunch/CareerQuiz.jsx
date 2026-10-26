import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Code2,
  ShieldCheck,
  Cloud,
  Palette,
  TrendingUp,
  GraduationCap,
  Award,
  Briefcase,
  RotateCcw,
  Rocket,
  Shuffle,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  MessageSquare,
  ExternalLink,
  Lock,
  ChevronRight
} from "lucide-react";
import axios from "axios";
import { API_ROOT } from "../../lib/apiConfig";
import { DOMAINS, STATUSES, GOALS, STEPS, TITLES, getDomain } from "../../data/careerQuizData";

const ICON_MAP = {
  Brain: Brain,
  Code2: Code2,
  ShieldCheck: ShieldCheck,
  Cloud: Cloud,
  Palette: Palette,
  TrendingUp: TrendingUp,
  GraduationCap: GraduationCap,
  Award: Award,
  Briefcase: Briefcase,
  RotateCcw: RotateCcw,
  Rocket: Rocket,
  Shuffle: Shuffle,
  Zap: Zap,
  Globe: Globe,
};

const EMPTY_STATE = {
  step: 0,
  domain: null,
  course: null,
  status: null,
  goal: null,
  lead: { name: "", phone: "", email: "" },
};

function renderIcon(iconName, className = "w-6 h-6") {
  const IconComponent = ICON_MAP[iconName] || Sparkles;
  return <IconComponent className={className} />;
}

function validateLead({ name, phone, email }) {
  if (!name || name.trim().length < 2) return "Please enter your full name.";
  if (!phone || !/^[6-9]\d{9}$/.test(phone.trim())) return "Please enter a valid 10-digit Indian mobile number.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Please enter a valid email address.";
  return "";
}

export default function CareerQuiz({ preset, onQuizRestart, isNoida = false }) {
  const [s, setS] = useState(EMPTY_STATE);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const quizRef = useRef(null);

  const branchPhone = isNoida ? "+91 7987059430" : "+91 9217179762";
  const branchPhoneRaw = isNoida ? "917987059430" : "919217179762";
  const branchName = isNoida ? "Noida Sector 2 Center" : "Delhi Vikaspuri Center";
  const branchTag = isNoida ? "Nexxtechs Noida" : "Nexxtechs Delhi";

  // Jump into the quiz when a course is clicked in the explorer
  useEffect(() => {
    if (!preset) return;
    setS((prev) => ({
      ...prev,
      domain: preset.domain,
      course: preset.course,
      step: STEPS.indexOf("status"),
    }));
    setError("");
    quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [preset]);

  const key = STEPS[s.step];

  const canNext =
    (key === "domain" && !!s.domain) ||
    (key === "course" && !!s.course) ||
    (key === "status" && !!s.status) ||
    (key === "goal" && !!s.goal) ||
    key === "lead";

  const next = async () => {
    if (!canNext) return;

    if (key === "lead") {
      const err = validateLead(s.lead);
      if (err) {
        setError(err);
        return;
      }

      setIsSubmitting(true);
      setError("");

      const d = getDomain(s.domain);
      const chosenCourse = d?.courses.find((c) => c.name === s.course);
      const payload = {
        name: s.lead.name.trim(),
        phone: s.lead.phone.trim(),
        email: s.lead.email.trim(),
        domain: d?.name || s.domain,
        course_interested: s.course ? `${s.course} (${d?.name || ""})` : "Career Guidance",
        status: s.status,
        goal: s.goal,
        branch: "Career Launch Portal",
        message: `Career Launch Assessment: Background=${s.status}, Goal=${s.goal}, Preferred=${s.course}`,
        submittedAt: new Date().toISOString(),
      };

      // 1. Save to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem("career_leads") || "[]");
        stored.push(payload);
        localStorage.setItem("career_leads", JSON.stringify(stored));
      } catch (e) {
        console.warn("Could not save to localStorage:", e);
      }

      // 2. Post to backend enquiry API
      try {
        await axios.post(`${API_ROOT}/enquiry`, {
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          course_interested: payload.course_interested,
          branch: branchTag,
          message: payload.message,
        });
      } catch (apiErr) {
        console.warn("Backend enquiry submission note (graceful):", apiErr);
      } finally {
        setIsSubmitting(false);
      }
    }

    setError("");
    setS((prev) => ({ ...prev, step: prev.step + 1 }));
    quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const back = () => {
    if (s.step > 0) {
      setError("");
      setS((prev) => ({ ...prev, step: prev.step - 1 }));
      quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRestart = () => {
    setS(EMPTY_STATE);
    setError("");
    if (onQuizRestart) onQuizRestart();
    quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const currentDomain = getDomain(s.domain);
  const activeCourseObj = currentDomain?.courses.find((c) => c.name === s.course);

  // Compute alternative course if candidate wants job/switch but selected certification
  const altCourseObj =
    currentDomain && ["job", "switch"].includes(s.goal) && activeCourseObj?.type !== "Job Bootcamp"
      ? currentDomain.courses.find((c) => c.type === "Job Bootcamp")
      : null;

  const totalSteps = STEPS.length - 1; // excluding result
  const progressPercent = Math.min(100, Math.round((s.step / totalSteps) * 100));

  const firstName = s.lead.name ? s.lead.name.trim().split(" ")[0] : "Future Tech Leader";

  return (
    <div ref={quizRef} className="w-full max-w-[1360px] mx-auto scroll-mt-28" data-testid="career-quiz">
      {/* Quiz Card Shell */}
      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-10 lg:p-12 shadow-xl dark:shadow-2xl relative overflow-hidden transition-all duration-300">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#84CC16]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Progress Bar & Header */}
        {key !== "result" && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              <span className="flex items-center gap-1.5 text-[#84CC16] font-bold">
                <Sparkles size={14} /> Step {s.step + 1} of {totalSteps}
              </span>
              <span>{progressPercent}% Completed</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#84CC16] transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Dynamic Titles */}
        {key !== "result" ? (
          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              {TITLES[key][0]}
            </h3>
            {TITLES[key][1] && (
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                {TITLES[key][1]}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#84CC16]/10 border border-[#84CC16]/30 text-[#65A30D] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest mb-3">
              <Sparkles size={14} /> Personalized AI Recommendation
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Here is Your Tailored Career Path, <span className="text-[#84CC16]">{firstName}</span>!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Based on your background and target milestones, our AI matching engine analyzed the best tech track for you.
            </p>
          </div>
        )}

        {/* STEP 1: DOMAIN */}
        {key === "domain" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DOMAINS.map((d) => {
              const selected = s.domain === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() =>
                    setS((prev) => ({
                      ...prev,
                      domain: d.id,
                      course: prev.domain === d.id ? prev.course : null,
                    }))
                  }
                  className={`group relative flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    selected
                      ? "bg-[#84CC16]/10 border-[#84CC16] text-gray-900 dark:text-white shadow-[0_0_24px_rgba(132,204,22,0.15)] ring-2 ring-[#84CC16]/30"
                      : "bg-gray-50/70 dark:bg-[#181818] border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-200 hover:border-[#84CC16]/40 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        selected
                          ? "bg-[#84CC16] text-black"
                          : "bg-white dark:bg-white/5 text-gray-800 dark:text-gray-200 group-hover:text-[#84CC16]"
                      }`}
                    >
                      {renderIcon(d.iconName, "w-6 h-6")}
                    </div>
                    {selected ? (
                      <CheckCircle2 size={20} className="text-[#84CC16]" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-gray-300 dark:border-white/20" />
                    )}
                  </div>
                  <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1 group-hover:text-[#84CC16] transition-colors">
                    {d.name}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{d.tagline}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* STEP 2: COURSES FOR CHOSEN DOMAIN */}
        {key === "course" && currentDomain && (
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#84CC16] uppercase tracking-wider mb-2">
              Showing courses in {currentDomain.name}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentDomain.courses.map((c) => {
                const selected = s.course === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setS((prev) => ({ ...prev, course: c.name }))}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      selected
                        ? "bg-[#84CC16]/10 border-[#84CC16] text-gray-900 dark:text-white ring-2 ring-[#84CC16]/30 shadow-md"
                        : "bg-gray-50/70 dark:bg-[#181818] border-gray-200 dark:border-white/5 text-gray-800 dark:text-gray-200 hover:border-[#84CC16]/40 hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          selected
                            ? "bg-[#84CC16] text-black"
                            : "bg-white dark:bg-white/5 text-[#84CC16]"
                        }`}
                      >
                        <Code2 size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900 dark:text-white">{c.name}</div>
                        <span
                          className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                            c.type === "Job Bootcamp"
                              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                              : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          }`}
                        >
                          {c.type}
                        </span>
                      </div>
                    </div>
                    {selected ? (
                      <CheckCircle2 size={20} className="text-[#84CC16] shrink-0" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-gray-300 dark:border-white/20 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: STATUS */}
        {key === "status" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATUSES.map((st) => {
              const selected = s.status === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setS((prev) => ({ ...prev, status: st.id }))}
                  className={`flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    selected
                      ? "bg-[#84CC16]/10 border-[#84CC16] text-gray-900 dark:text-white ring-2 ring-[#84CC16]/30 shadow-md"
                      : "bg-gray-50/70 dark:bg-[#181818] border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-200 hover:border-[#84CC16]/40 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        selected
                          ? "bg-[#84CC16] text-black"
                          : "bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {renderIcon(st.iconName, "w-6 h-6")}
                    </div>
                    <div>
                      <div className="font-bold text-base text-gray-900 dark:text-white">{st.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{st.sub}</div>
                    </div>
                  </div>
                  {selected ? (
                    <CheckCircle2 size={20} className="text-[#84CC16] shrink-0" />
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-gray-300 dark:border-white/20 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* STEP 4: GOAL */}
        {key === "goal" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GOALS.map((g) => {
              const selected = s.goal === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setS((prev) => ({ ...prev, goal: g.id }))}
                  className={`flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    selected
                      ? "bg-[#84CC16]/10 border-[#84CC16] text-gray-900 dark:text-white ring-2 ring-[#84CC16]/30 shadow-md"
                      : "bg-gray-50/70 dark:bg-[#181818] border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-200 hover:border-[#84CC16]/40 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        selected
                          ? "bg-[#84CC16] text-black"
                          : "bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {renderIcon(g.iconName, "w-6 h-6")}
                    </div>
                    <div>
                      <div className="font-bold text-base text-gray-900 dark:text-white">{g.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{g.sub}</div>
                    </div>
                  </div>
                  {selected ? (
                    <CheckCircle2 size={20} className="text-[#84CC16] shrink-0" />
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-gray-300 dark:border-white/20 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* STEP 5: LEAD FORM */}
        {key === "lead" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
            className="max-w-md mx-auto space-y-4"
            noValidate
          >
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                autoComplete="name"
                placeholder="e.g. Rahul Sharma"
                value={s.lead.name}
                onChange={(e) =>
                  setS((prev) => ({ ...prev, lead: { ...prev.lead, name: e.target.value } }))
                }
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Mobile Number (WhatsApp Enabled) *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-sm font-bold text-gray-400 border-r border-gray-300 dark:border-white/10 pr-2">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel"
                  placeholder="98765 43210"
                  value={s.lead.phone}
                  onChange={(e) =>
                    setS((prev) => ({
                      ...prev,
                      lead: { ...prev.lead, phone: e.target.value.replace(/\D/g, "") },
                    }))
                  }
                  className="w-full pl-16 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all text-sm font-medium tracking-wide"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="e.g. rahul@example.com"
                value={s.lead.email}
                onChange={(e) =>
                  setS((prev) => ({ ...prev, lead: { ...prev.lead, email: e.target.value } }))
                }
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all text-sm font-medium"
              />
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-gray-500 dark:text-gray-400">
              <Lock size={14} className="text-[#84CC16] shrink-0" />
              <span>We respect your privacy. Zero spam. Free career counselling only.</span>
            </div>
          </form>
        )}

        {/* STEP 6: RESULT */}
        {key === "result" && currentDomain && activeCourseObj && (
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Primary Recommended Match Card */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#84CC16]/15 to-transparent border-2 border-[#84CC16] shadow-xl text-left overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#84CC16]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#84CC16] text-black font-extrabold text-[11px] uppercase tracking-wider">
                  <Sparkles size={12} /> BEST MATCH · {currentDomain.name.toUpperCase()}
                </span>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  {activeCourseObj.type}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">
                {activeCourseObj.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Recommended for your milestone to{" "}
                <strong className="text-gray-900 dark:text-white">
                  {GOALS.find((g) => g.id === s.goal)?.name.toLowerCase()}
                </strong>
                . Includes hands-on capstone projects, mentor code reviews, and mock interview drills.
              </p>

              {activeCourseObj.slug && (
                <Link
                  to={`/course/${activeCourseObj.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#84CC16] hover:underline"
                >
                  <span>Explore detailed syllabus & modules</span>
                  <ExternalLink size={13} />
                </Link>
              )}
            </div>

            {/* Alternative recommendation for job placement */}
            {altCourseObj && (
              <div className="p-4 sm:p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-left">
                <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                  High Placement Alternative
                </div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Since your target is to <strong>get placed</strong>, we also suggest looking at{" "}
                  <strong className="text-gray-900 dark:text-white">{altCourseObj.name}</strong> (
                  {altCourseObj.type}). It features 100% placement assurance and dedicated recruiter drives.
                </p>
                {altCourseObj.slug && (
                  <Link
                    to={`/course/${altCourseObj.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 mt-2 hover:underline"
                  >
                    <span>Check Bootcamp Highlights</span>
                    <ChevronRight size={14} />
                  </Link>
                )}
              </div>
            )}

            {/* Counsellor Callback Notice */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Our lead career counselor at <strong className="text-gray-900 dark:text-white font-bold">{branchName}</strong> will reach out to you at{" "}
              <strong className="text-gray-900 dark:text-white font-bold">{s.lead.phone}</strong> with
              your personalized course curriculum and batch timings.
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/${branchPhoneRaw}?text=${encodeURIComponent(
                  `Hi ${branchName} Team, I just completed the Career Launch assessment for ${activeCourseObj.name} (${currentDomain.name}). I would like to get the detailed course syllabus and fee details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#1EBE5D] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#25D366]/20"
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${branchPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-90 transition-all hover:-translate-y-0.5"
              >
                <Phone size={16} />
                <span>Call Counselor ({branchPhone})</span>
              </a>

              <button
                type="button"
                onClick={handleRestart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
              >
                <RotateCcw size={15} />
                <span>Restart Quiz</span>
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-4 text-center text-sm font-medium text-red-500 animate-shake" role="alert">
            {error}
          </p>
        )}

        {/* Navigation Actions */}
        {key !== "result" && (
          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
            <button
              type="button"
              onClick={back}
              disabled={s.step === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                s.step === 0
                  ? "opacity-0 pointer-events-none"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={next}
              disabled={!canNext || isSubmitting}
              className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all shadow-md ${
                canNext && !isSubmitting
                  ? "bg-[#84CC16] text-black hover:bg-[#65A30D] hover:-translate-y-0.5 shadow-[#84CC16]/25 cursor-pointer"
                  : "bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : key === "lead" ? (
                <>
                  <span>Show My Best Match</span>
                  <Sparkles size={16} />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
