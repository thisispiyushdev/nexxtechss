import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  ArrowRight
} from "lucide-react";
import CampusPlaybookGallery from "./CampusPlaybookGallery";

export const FEATURED_CAMPUS_ITEMS = [
  {
    id: 1,
    src: "/campus/campus-1.webp",
    title: "Advanced IT Lab & Multi-Screen Workstations",
    location: "Delhi Campus (Vikaspuri)",
    description: "Equipped with dual-monitor high-compute rigs specifically optimized for Cloud, MLOps, and Full Stack microservices development."
  },
  {
    id: 2,
    src: "/campus/campus-2.webp",
    title: "Interactive Smart Coding Classroom",
    location: "Noida Campus (Sector 2)",
    description: "Spacious, air-conditioned lecture theatre with high-definition multi-screen coding projection and live instructor displays."
  },
  {
    id: 3,
    src: "/campus/campus-3.webp",
    title: "Collaborative Capstone Project Pods",
    location: "Delhi Campus (Vikaspuri)",
    description: "Dedicated team pods where students collaborate on real-world deployment pipelines, Docker clusters, and production-ready applications."
  },
  {
    id: 4,
    src: "/campus/campus-10.webp",
    title: "1-on-1 Faculty Mentorship & Doubt Desk",
    location: "Delhi Campus (Vikaspuri)",
    description: "Personalized guidance stations where senior trainers sit 1-on-1 with learners to debug code, review architecture, and resolve queries."
  },
  {
    id: 5,
    src: "/campus/campus-11.webp",
    title: "Student Collaboration & Innovation Hub",
    location: "Noida Campus (Sector 2)",
    description: "Open discussion spaces fostering peer programming, internal hackathons, and mock technical interview simulations."
  },
  {
    id: 6,
    src: "/campus/campus-12.webp",
    title: "Intensive Full Stack & DevOps Lab",
    location: "Delhi Campus (Vikaspuri)",
    description: "Ergonomic seating and dedicated power hubs ensuring seamless, full-day intensive hands-on bootcamps."
  },
  {
    id: 7,
    src: "/campus/campus-13.webp",
    title: "Cyber Security & Cloud Simulation Lab",
    location: "Noida Campus (Sector 2)",
    description: "Isolated networking topologies and cloud testbeds for simulated penetration testing and infrastructure ops."
  },
  {
    id: 8,
    src: "/campus/campus-20.webp",
    title: "Executive Seminar & Industry Keynote Hall",
    location: "Delhi Campus (Vikaspuri)",
    description: "Multi-media presentation hall hosting industry guest speakers, hiring drives, and alumni workshops."
  }
];

export default function OurCampusSection({ currentBranch = "all" }) {
  const location = useLocation();

  // State for the top featured section
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [thumbPage, setThumbPage] = useState(0);

  // Determine branch-specific courses link
  const isNoida = currentBranch === "noida" || location.pathname.includes("noida");
  const coursesLink = isNoida ? "/courses-noida" : "/courses";

  // 4 thumbnails visible at a time
  const thumbsPerPage = 4;
  const currentThumbs = FEATURED_CAMPUS_ITEMS.slice(thumbPage * thumbsPerPage, (thumbPage + 1) * thumbsPerPage);
  const activeFeatured = FEATURED_CAMPUS_ITEMS[activeThumbIndex] || FEATURED_CAMPUS_ITEMS[0];

  return (
    <section id="our-campus" className="py-16 md:py-24 bg-white dark:bg-[#0c0d12] transition-colors duration-300 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#84CC16]/6 to-transparent pointer-events-none" />

      {/* ============================================================== */}
      {/* SECTION 1: TOP "OUR CAMPUS" SECTION (MATCHING USER WIREFRAME)  */}
      {/* ============================================================== */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 relative z-10 mb-10 md:mb-16">
        
        {/* Top Two-Column Grid: Featured Image (Left) + Text & Button (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Featured Large Image Box - Clean without overlays */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200/90 dark:border-white/10 shadow-md">
              <motion.img
                key={activeFeatured.src}
                src={activeFeatured.src}
                alt={activeFeatured.title}
                initial={{ opacity: 0.4, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </div>

          {/* Right: Title, Description & Action Button */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-4">
            
            {/* Bold Clean Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.12]">
              Our Campus
            </h2>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              Step inside our industry-grade training centers designed for real-world tech mastery. From high-compute multi-monitor workstation labs and dedicated cloud testbeds to personalized faculty doubt desks, our Delhi and Noida campuses give you the immersive environment needed to launch high-paying tech careers.
            </p>

            {/* Action Button: Links to Delhi courses or Noida courses based on active branch */}
            <div className="pt-2">
              <Link
                to={coursesLink}
                className="inline-flex items-center justify-center px-8 py-3.5 sm:py-4 bg-[#bef264] hover:bg-[#b0ec4e] active:translate-y-1 text-black font-extrabold text-sm sm:text-base rounded-2xl shadow-[0_4px_0_0_#4d7c0f] hover:shadow-[0_2px_0_0_#4d7c0f] transition-all duration-150 cursor-pointer tracking-wide"
              >
                <span>Explore All Courses</span>
                <ArrowRight size={18} className="ml-2.5 stroke-[2.5]" />
              </Link>
            </div>

          </div>

        </div>

        {/* Bottom Row of 4 Thumbnails (Clean without "Active" tag or text overlay) */}
        <div className="mt-8 md:mt-10">
          {FEATURED_CAMPUS_ITEMS.length > thumbsPerPage && (
            <div className="flex items-center justify-end mb-3 text-xs font-mono text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setThumbPage((prev) => (prev > 0 ? prev - 1 : 1))}
                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label="Previous set"
                >
                  <ChevronLeft size={16} />
                </button>
                <span>
                  Set {thumbPage + 1} of {Math.ceil(FEATURED_CAMPUS_ITEMS.length / thumbsPerPage)}
                </span>
                <button
                  onClick={() => setThumbPage((prev) => (prev < 1 ? prev + 1 : 0))}
                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label="Next set"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 md:gap-6">
            {currentThumbs.map((item, localIdx) => {
              const globalIndex = thumbPage * thumbsPerPage + localIdx;
              const isSelected = globalIndex === activeThumbIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveThumbIndex(globalIndex)}
                  className={`group relative aspect-[4/3] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "ring-4 ring-[#84CC16] scale-[1.02] shadow-md border-transparent"
                      : "border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 hover:shadow-md"
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* SECTION 2: FULL-WIDTH CAMPUS PLAYBOOK GALLERY                  */}
      {/* (NO olive background, NO side margins - stretches edge-to-edge)*/}
      {/* ============================================================== */}
      <div className="w-full relative z-10 px-0 overflow-hidden my-4 md:my-8">
        <CampusPlaybookGallery />
      </div>

      {/* ============================================================== */}
      {/* SECTION 3: IN-PERSON CAMPUS TOUR & VISIT BOOKING CARD          */}
      {/* (Clean transparent background - no heavy black gradient box)  */}
      {/* ============================================================== */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 relative z-10 mt-10 md:mt-14 pt-8 md:pt-10 border-t border-gray-200/80 dark:border-white/10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84CC16]/10 text-[#65A30D] dark:text-[#84CC16] border border-[#84CC16]/20 text-xs font-mono font-bold tracking-wider">
              <Calendar size={13} />
              <span>EXPERIENCE IN PERSON</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              Book a Free Campus Tour &amp; Counselor Session
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Visit our Vikaspuri (Delhi) or Sector 2 (Noida) training hubs. Meet our senior instructors, experience our live multi-monitor labs, and get 1-on-1 career counseling before enrolling.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3.5 shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("openPopupEnquiry"))}
              className="px-7 py-3.5 bg-[#84CC16] hover:bg-[#65A30D] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
            >
              Schedule Campus Visit
            </button>
            <a
              href="https://www.google.com/maps/search/B-54+Krishna+Park+Vikaspuri+New+Delhi+110018"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-white/15 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <span>Delhi Location</span>
              <ExternalLink size={13} />
            </a>
            <a
              href="https://www.google.com/maps/search/B-136+Sector+2+Noida+Uttar+Pradesh+201301"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-white/15 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <span>Noida Location</span>
              <ExternalLink size={13} />
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}
