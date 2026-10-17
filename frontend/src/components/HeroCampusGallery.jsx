import React from "react";
import { MapPin, Sparkles, Building2, Eye } from "lucide-react";

const HERO_GALLERY_ITEMS = [
  {
    src: "/campus/campus-1.webp",
    caption: "High-Performance Cloud & DevOps Lab",
    location: "Delhi Campus"
  },
  {
    src: "/campus/campus-2.webp",
    caption: "Smart Interactive Coding Classroom",
    location: "Noida Campus"
  },
  {
    src: "/campus/campus-3.webp",
    caption: "Student Live Project Pod",
    location: "Delhi Campus"
  },
  {
    src: "/campus/campus-10.webp",
    caption: "1-on-1 Faculty Mentorship Desk",
    location: "Delhi Campus"
  },
  {
    src: "/campus/campus-11.webp",
    caption: "Collaborative Peer Discussion Lounge",
    location: "Noida Campus"
  },
  {
    src: "/campus/campus-12.webp",
    caption: "Full-Stack & AI Training Hall",
    location: "Delhi Campus"
  },
  {
    src: "/campus/campus-13.webp",
    caption: "Cyber Security & Systems Topology Lab",
    location: "Noida Campus"
  },
  {
    src: "/campus/campus-15.webp",
    caption: "Multi-Cloud Workstation Cluster",
    location: "Noida Campus"
  },
  {
    src: "/campus/campus-20.webp",
    caption: "Executive Keynote & Workshop Suite",
    location: "Delhi Campus"
  }
];

export default function HeroCampusGallery({ className = "" }) {
  const scrollToCampus = () => {
    const el = document.getElementById("our-campus");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Duplicate items for seamless continuous marquee loop
  const marqueeItems = [...HERO_GALLERY_ITEMS, ...HERO_GALLERY_ITEMS];

  return (
    <div className={`w-full pt-8 pb-4 relative overflow-hidden select-none ${className}`}>
      
      {/* Top Banner Tagline */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            EXPERIENCE OUR INFRASTRUCTURE IN PERSON
          </span>
        </div>
        <button
          onClick={scrollToCampus}
          className="text-[11px] sm:text-xs font-mono font-semibold text-[#65A30D] dark:text-[#84CC16] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View All Campus Photos</span>
          <span>→</span>
        </button>
      </div>

      {/* Marquee Track Container with Edge Gradient Fades */}
      <div className="relative w-full overflow-hidden group">
        
        <style>{`
          @keyframes campusMarqueeScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-campus-marquee {
            display: flex;
            width: max-content;
            animation: campusMarqueeScroll 38s linear infinite;
          }
          .animate-campus-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Left and Right Edge Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-[#0B0D13] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-[#0B0D13] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Ribbon */}
        <div 
          onClick={scrollToCampus}
          className="animate-campus-marquee gap-4 sm:gap-6 py-2 cursor-pointer"
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.src}-${idx}`}
              className="relative shrink-0 w-[260px] sm:w-[320px] aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.03] group/card bg-gray-100 dark:bg-gray-900"
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
              />

              {/* Bottom Gradient with Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 text-white">
                <div className="flex items-center gap-1 text-[10px] font-mono text-[#84CC16] mb-0.5">
                  <MapPin size={10} />
                  <span>{item.location}</span>
                </div>
                <div className="text-xs font-bold truncate">
                  {item.caption}
                </div>
              </div>

              {/* Hover Pill */}
              <div className="absolute top-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono font-medium text-white border border-white/20">
                  <Eye size={10} className="text-[#84CC16]" />
                  <span>Explore</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
