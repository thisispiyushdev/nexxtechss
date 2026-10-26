import React, { useState } from "react";
import {
  Brain,
  Code2,
  ShieldCheck,
  Cloud,
  Palette,
  TrendingUp,
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { DOMAINS, getDomain } from "../../data/careerQuizData";

const ICON_MAP = {
  Brain: Brain,
  Code2: Code2,
  ShieldCheck: ShieldCheck,
  Cloud: Cloud,
  Palette: Palette,
  TrendingUp: TrendingUp,
};

function renderDomainIcon(iconName, className = "w-5 h-5") {
  const IconComponent = ICON_MAP[iconName] || Sparkles;
  return <IconComponent className={className} />;
}

export default function CourseExplorer({ onPick }) {
  const [activeDomainId, setActiveDomainId] = useState(DOMAINS[0].id);
  const activeDomain = getDomain(activeDomainId) || DOMAINS[0];

  return (
    <section id="career-explorer" className="w-full max-w-[1360px] mx-auto mt-16 scroll-mt-28" data-testid="course-explorer">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#84CC16]/10 text-[#65A30D] dark:text-[#84CC16] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={13} /> Interactive Track Explorer
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Explore All Tech Domains & Programs
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl mx-auto">
          Click any course below to launch your personalized career matching assessment directly.
        </p>
      </div>

      {/* Explorer Container */}
      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
        {/* Domain Navigation - Left Sidebar (Desktop) / Horizontal Tabs (Mobile) */}
        <div className="md:col-span-4 lg:col-span-3 bg-gray-50/70 dark:bg-[#161616] border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10 p-4 md:p-6 flex flex-col justify-between">
          <div>
            <div className="hidden md:block text-[11px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">
              SELECT TECH DOMAIN
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0 scrollbar-none">
              {DOMAINS.map((d) => {
                const isActive = d.id === activeDomainId;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActiveDomainId(d.id)}
                    className={`flex items-center justify-between w-full p-3 rounded-2xl text-left transition-all duration-200 shrink-0 md:shrink cursor-pointer ${
                      isActive
                        ? "bg-white dark:bg-[#222222] text-[#65A30D] dark:text-[#84CC16] font-bold shadow-md shadow-black/5 border border-gray-200/80 dark:border-white/10"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-[#84CC16]/20 text-[#65A30D] dark:text-[#84CC16]"
                            : "bg-gray-200/60 dark:bg-white/5 text-gray-500"
                        }`}
                      >
                        {renderDomainIcon(d.iconName, "w-4 h-4")}
                      </div>
                      <span className="text-sm whitespace-nowrap md:whitespace-normal">{d.name}</span>
                    </div>
                    {isActive && (
                      <ChevronRight size={16} className="hidden md:block text-[#84CC16] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden md:block pt-6 border-t border-gray-200 dark:border-white/5 mt-6">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Need personalized guidance? <br />
              <a href="tel:+919217179762" className="text-[#84CC16] font-bold hover:underline">
                Call +91 9217179762
              </a>
            </div>
          </div>
        </div>

        {/* Courses Panel - Right Side */}
        <div className="md:col-span-8 lg:col-span-9 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-[#84CC16] uppercase tracking-wider">
                  Available Programs ({activeDomain.courses.length})
                </span>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {activeDomain.name}
                </h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 font-semibold">
                {activeDomain.tagline}
              </span>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeDomain.courses.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => onPick({ domain: activeDomain.id, course: c.name })}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl bg-gray-50/70 dark:bg-[#181818] border border-gray-200/80 dark:border-white/5 text-left hover:border-[#84CC16]/50 hover:bg-[#84CC16]/5 dark:hover:bg-[#84CC16]/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#84CC16]/10 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#84CC16]/15 text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#84CC16]" />
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.type === "Job Bootcamp"
                            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {c.type}
                      </span>
                    </div>

                    <h5 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-[#84CC16] transition-colors mb-1">
                      {c.name}
                    </h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Curated curriculum, live projects & mentorship
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-white/5 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-[#84CC16] transition-colors">
                    <span>Take Match Quiz</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-gray-400">
            <span>Want instant advice?</span>
            <button
              type="button"
              onClick={() => onPick({ domain: activeDomain.id, course: activeDomain.courses[0].name })}
              className="text-[#84CC16] font-bold hover:underline"
            >
              Start quiz with {activeDomain.name} &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
