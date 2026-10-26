import React, { useState } from "react";
import CareerQuiz from "./CareerQuiz";
import CourseExplorer from "./CourseExplorer";
import { Sparkles, Share2, Phone, MessageSquare, Check, ShieldCheck, Zap, Award } from "lucide-react";

export default function CareerLaunchSection({ isEmbedded = false }) {
  const [preset, setPreset] = useState(null);
  const [copied, setCopied] = useState(false);

  const handlePick = (p) => {
    // Generate new object with timestamp so effect re-triggers if same course clicked
    setPreset({ ...p, at: Date.now() });
  };

  const handleShare = async () => {
    const shareData = {
      title: "Career Launch – Find Your Best Tech Course at NexxTechs",
      text: "Take this 2-minute Career Launch quiz to discover your ideal tech specialization and 100% placement roadmap!",
      url: window.location.origin + "/career-launch",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled or share failed, fallback
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        alert("Link copied: " + shareData.url);
      }
    }
  };

  return (
    <section
      id="career-launch"
      className={`relative w-full ${
        isEmbedded ? "py-16 md:py-24 bg-transparent" : "py-12 md:py-20"
      }`}
      data-testid="career-launch-section"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#84CC16]/5 dark:bg-[#84CC16]/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Banner */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#84CC16]/10 border border-[#84CC16]/30 text-[#65A30D] dark:text-[#84CC16] text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles size={14} /> Career Launch Assessment
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
            Find Your Best Tech Course in{" "}
            <span className="text-[#84CC16] relative inline-block">
              2 Minutes
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#84CC16]/40 rounded-full" />
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            Confused between Full Stack, AI, Data Science, Cyber Security, or Cloud? Answer 4 quick
            questions to discover your highest-ROI roadmap and placement guarantee.
          </p>

          {/* Value Badges & Share Button */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-semibold">
              <Zap size={14} className="text-[#84CC16]" /> 2-Min Smart Quiz
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-semibold">
              <Award size={14} className="text-[#84CC16]" /> 100% Placement Assistance
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-semibold">
              <ShieldCheck size={14} className="text-[#84CC16]" /> Free 1-on-1 Counseling
            </span>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 text-xs font-bold hover:border-[#84CC16] transition-colors cursor-pointer shadow-sm"
              title="Share Career Assessment"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-[#84CC16]" />
                  <span className="text-[#84CC16]">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span>Share Quiz</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* The Core Quiz */}
        <CareerQuiz preset={preset} onQuizRestart={() => setPreset(null)} />

        {/* Course Explorer */}
        <CourseExplorer onPick={handlePick} />

        {/* Bottom Quick Contact Strip */}
        <div className="mt-14 max-w-[1360px] mx-auto p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/10 flex items-center justify-center shrink-0 text-[#84CC16]">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-gray-900 dark:text-white">
                Still Unsure Which Domain Fits You?
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Talk directly with our senior industry mentors in Delhi & Noida. Free counseling session.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+919217179762"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all"
            >
              <Phone size={14} />
              <span>+91 9217179762</span>
            </a>
            <a
              href="https://wa.me/919217179762?text=Hi%20NexxTechs%20Team,%20I%20need%20expert%20career%20guidance%20for%20choosing%20the%20right%20course."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-all shadow-md shadow-[#25D366]/20"
            >
              <MessageSquare size={14} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
