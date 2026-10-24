import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Enroll & Learn",
    desc: "Choose your domain & start learning",
  },
  {
    num: "02",
    title: "Build & Practice",
    desc: "Work on live projects with mentors",
  },
  {
    num: "03",
    title: "Get Certified",
    desc: "Earn industry-recognized credentials",
  },
  {
    num: "04",
    title: "Get Placed",
    desc: "Direct company placements & prep",
  },
];

export default function CareerTransformation() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Skip heavy GSAP scrub animations on mobile — causes scroll jank
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // Just show everything immediately on mobile
      const nodes = containerRef.current?.querySelectorAll('.graph-node, .graph-content, .graph-path');
      nodes?.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'scale(1) translateY(0)';
        if (el.classList.contains('graph-path')) {
          el.style.strokeDashoffset = '0';
        }
      });
      return;
    }

    let ctx = gsap.context(() => {
      // Graph Line Animation
      gsap.fromTo(
        ".graph-path",
        { strokeDasharray: "1000", strokeDashoffset: "1000" },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".graph-container",
            start: "top center+=100",
            end: "bottom center",
            scrub: 3,
          },
        }
      );

      // Graph Nodes Animation
      gsap.fromTo(
        ".graph-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.4,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".graph-container",
            start: "top center+=150",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Node Content Animation
      gsap.fromTo(
        ".graph-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".graph-container",
            start: "top center+=150",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden" data-testid="career-transformation">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10 graph-container">
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-3xl md:text-5xl font-black text-[#0A0A0A] dark:text-white mb-4 uppercase tracking-tight">
            Your <span className="text-[#84CC16]">Career Growth</span> Graph
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            See how you transform from a beginner to an industry-ready professional
          </p>
        </div>

        {/* Graph Area */}
        <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px]">
          {/* Y-Axis Label */}
          <div className="absolute -left-4 md:-left-12 top-0 bottom-0 flex flex-col justify-between text-gray-500 text-xs md:text-sm font-semibold tracking-widest uppercase items-center py-4">
            <span>Expert</span>
            <div className="flex-1 w-px bg-gradient-to-b from-gray-500 to-transparent my-4"></div>
            <span>Beginner</span>
          </div>

          {/* X-Axis Label */}
          <div className="absolute left-0 right-0 -bottom-8 md:-bottom-12 flex justify-between text-gray-500 text-xs md:text-sm font-semibold tracking-widest uppercase px-4">
            <span>Timeline</span>
            <span>Success</span>
          </div>

          {/* SVG Graph Line */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Grid horizontal lines */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2" />
            
            {/* The upward curving path connecting nodes at roughly (10,85), (35,60), (65,35), (90,10) */}
            <path
              d="M 10 85 C 20 85, 25 60, 35 60 C 45 60, 50 35, 65 35 C 75 35, 80 10, 90 10"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            {/* Animated Gradient Line */}
            <path
              className="graph-path drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]"
              d="M 10 85 C 20 85, 25 60, 35 60 C 45 60, 50 35, 65 35 C 75 35, 80 10, 90 10"
              fill="none"
              stroke="#84CC16"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Nodes (Mapped onto the same positions as the SVG path) */}
          <div className="absolute inset-0">
            {/* Node 1 */}
            <div className="absolute left-[10%] top-[85%] -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="graph-node w-10 h-10 md:w-14 md:h-14 rounded-full border-4 border-[#050505] bg-[#84CC16] shadow-[0_0_25px_rgba(132,204,22,0.5)] flex items-center justify-center font-bold text-[#050505] text-sm md:text-lg z-20 relative">01</div>
              <div className="graph-content absolute bottom-full mb-3 md:mb-4 text-left md:text-center w-28 sm:w-32 md:w-48" style={{ left: '-15px' }}>
                <h3 className="text-[#0A0A0A] dark:text-white font-bold text-xs sm:text-sm md:text-base mb-1 drop-shadow-md">{STEPS[0].title}</h3>
                <p className="text-[#84CC16] font-medium text-[10px] sm:text-xs leading-tight drop-shadow-md">{STEPS[0].desc}</p>
              </div>
            </div>

            {/* Node 2 */}
            <div className="absolute left-[35%] top-[60%] -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="graph-node w-10 h-10 md:w-14 md:h-14 rounded-full border-4 border-[#050505] bg-[#84CC16] shadow-[0_0_25px_rgba(132,204,22,0.5)] flex items-center justify-center font-bold text-[#050505] text-sm md:text-lg z-20 relative">02</div>
              <div className="graph-content absolute top-full left-1/2 -translate-x-1/2 mt-3 md:mt-4 text-center w-28 sm:w-32 md:w-48">
                <h3 className="text-[#0A0A0A] dark:text-white font-bold text-xs sm:text-sm md:text-base mb-1 drop-shadow-md">{STEPS[1].title}</h3>
                <p className="text-[#84CC16] font-medium text-[10px] sm:text-xs leading-tight drop-shadow-md">{STEPS[1].desc}</p>
              </div>
            </div>

            {/* Node 3 */}
            <div className="absolute left-[65%] top-[35%] -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="graph-node w-10 h-10 md:w-14 md:h-14 rounded-full border-4 border-[#050505] bg-[#84CC16] shadow-[0_0_25px_rgba(132,204,22,0.5)] flex items-center justify-center font-bold text-[#050505] text-sm md:text-lg z-20 relative">03</div>
              <div className="graph-content absolute top-full left-1/2 -translate-x-[60%] md:-translate-x-1/2 mt-3 md:mt-4 text-center w-28 sm:w-32 md:w-48">
                <h3 className="text-[#0A0A0A] dark:text-white font-bold text-xs sm:text-sm md:text-base mb-1 drop-shadow-md">{STEPS[2].title}</h3>
                <p className="text-[#84CC16] font-medium text-[10px] sm:text-xs leading-tight drop-shadow-md">{STEPS[2].desc}</p>
              </div>
            </div>

            {/* Node 4 */}
            <div className="absolute left-[90%] top-[10%] -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="graph-node w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-[#84CC16] bg-white shadow-[0_0_40px_rgba(255,255,255,0.5)] flex items-center justify-center font-bold text-black text-sm md:text-xl z-20 relative">04</div>
              <div className="graph-content absolute top-1/2 -translate-y-1/2 text-right md:text-center w-28 sm:w-32 md:w-48" style={{ right: 'calc(100% + 25px)' }}>
                <h3 className="text-[#0A0A0A] dark:text-white font-bold text-sm md:text-lg mb-1 drop-shadow-md">{STEPS[3].title}</h3>
                <p className="text-[#84CC16] font-medium text-[10px] sm:text-xs md:text-sm leading-tight drop-shadow-md">{STEPS[3].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
