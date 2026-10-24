import React from "react";

export default function HeroHeadingSection() {
  return (
    <section 
      aria-label="Institute Overview"
      className="relative w-full overflow-hidden bg-[#f7faf2] dark:bg-[#07130e] border-b border-[#e2edd8] dark:border-emerald-950/60 transition-colors duration-300"
    >
      {/* Background Grid Pattern matching user's image */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-80 dark:opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(118, 192, 19, 0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(118, 192, 19, 0.16) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Subtle Ambient Radial Glow */}
      <div className="pointer-events-none absolute -top-16 left-6 w-96 h-96 rounded-full bg-[#84cc16]/15 dark:bg-[#84cc16]/5 blur-3xl" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 lg:py-12">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ebf7d9] dark:bg-[#152a14] border border-[#d6ecb8] dark:border-[#24461f] shadow-sm mb-4 sm:mb-5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#76c013] animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#335312] dark:text-[#a3e635]">
            The Future of AI &amp; Tech Education
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight leading-[1.12] text-[#0b132b] dark:text-white max-w-5xl">
          Best IT Training Institute in{" "}
          <span className="text-[#76c013] dark:text-[#84cc16]">
            Vikaspuri, Delhi
          </span>{" "}
          – Cloud, DevOps &amp; Full Stack
        </h1>
      </div>
    </section>
  );
}
