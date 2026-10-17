import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Wifi, 
  Monitor, 
  Users, 
  Sparkles, 
  ExternalLink, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Calendar,
  ArrowRight
} from "lucide-react";
import CampusPlaybookGallery, { PLAYBOOK_SLIDES } from "./CampusPlaybookGallery";

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
  const navigate = useNavigate();
  // State for the top featured section (Image 1 mockup)
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [thumbPage, setThumbPage] = useState(0);

  // Lightbox Modal state
  const [lightboxData, setLightboxData] = useState(null); // { slides: [], index: 0 }

  // 4 thumbnails visible at a time
  const thumbsPerPage = 4;
  const currentThumbs = FEATURED_CAMPUS_ITEMS.slice(thumbPage * thumbsPerPage, (thumbPage + 1) * thumbsPerPage);
  const activeFeatured = FEATURED_CAMPUS_ITEMS[activeThumbIndex] || FEATURED_CAMPUS_ITEMS[0];

  const openLightbox = (index, slides = FEATURED_CAMPUS_ITEMS) => {
    setLightboxData({ slides, index });
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  const nextLightboxPhoto = (e) => {
    if (e) e.stopPropagation();
    if (!lightboxData) return;
    setLightboxData((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.slides.length
    }));
  };

  const prevLightboxPhoto = (e) => {
    if (e) e.stopPropagation();
    if (!lightboxData) return;
    setLightboxData((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.slides.length) % prev.slides.length
    }));
  };

  return (
    <section id="our-campus" className="py-20 md:py-28 bg-white dark:bg-[#0c0d12] transition-colors duration-300 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#84CC16]/8 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">

        {/* ============================================================== */}
        {/* SECTION 1: TOP "OUR CAMPUS" SECTION (EXACT MOCKUP FROM IMAGE 1) */}
        {/* ============================================================== */}
        <div className="mb-14 md:mb-20">
          
          {/* Top Two-Column Grid: Featured Image (Left) + Text & Button (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Featured Large Image Box */}
            <div className="lg:col-span-7">
              <div 
                onClick={() => openLightbox(activeThumbIndex, FEATURED_CAMPUS_ITEMS)}
                className="group relative aspect-[16/10] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200/90 dark:border-white/10 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                <motion.img
                  key={activeFeatured.src}
                  src={activeFeatured.src}
                  alt={activeFeatured.title}
                  initial={{ opacity: 0.4, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-mono font-medium border border-white/20 shadow-md">
                    <MapPin size={12} className="text-[#84CC16]" />
                    {activeFeatured.location}
                  </span>
                </div>

                {/* Zoom indicator on hover */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white flex items-center justify-center shadow-lg">
                    <Maximize2 size={16} />
                  </div>
                </div>

                {/* Bottom title on featured image */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 text-white">
                  <h3 className="text-base sm:text-xl font-bold drop-shadow-md">
                    {activeFeatured.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-1 mt-1 drop-shadow-sm font-normal">
                    {activeFeatured.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Title, Description & Action Button */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5 lg:pl-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84CC16]/10 border border-[#84CC16]/20 text-[#65A30D] dark:text-[#84CC16] text-xs font-mono font-bold uppercase tracking-widest w-fit">
                <Building2 size={13} />
                <span>NEXXTECHS CAMPUS</span>
              </div>

              {/* Bold Clean Heading matching Image 1 */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.12]">
                Our Campus
              </h2>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                Step inside our industry-grade training centers designed for real-world tech mastery. From high-compute multi-monitor workstation labs and dedicated cloud testbeds to personalized faculty doubt desks, our Delhi and Noida campuses give you the immersive environment needed to launch high-paying tech careers.
              </p>

              {/* Quick Facility Bullets */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
                  <span>150+ Lab Workstations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
                  <span>1 Gbps Fiber Dual ISP</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
                  <span>1-on-1 Faculty Mentoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
                  <span>Delhi &amp; Noida Branches</span>
                </div>
              </div>

              {/* Action Button: Lime green pill with 3D bottom bevel matching Image 1 */}
              <div className="pt-3">
                <Link
                  to="/all-courses"
                  className="inline-flex items-center justify-center px-8 py-3.5 sm:py-4 bg-[#bef264] hover:bg-[#b0ec4e] active:translate-y-1 text-black font-extrabold text-sm sm:text-base rounded-2xl shadow-[0_4px_0_0_#4d7c0f] hover:shadow-[0_2px_0_0_#4d7c0f] transition-all duration-150 cursor-pointer tracking-wide"
                >
                  <span>Explore All Courses</span>
                  <ArrowRight size={18} className="ml-2.5 stroke-[2.5]" />
                </Link>
              </div>

            </div>

          </div>

          {/* Bottom Row of 4 Thumbnails (Exact Layout from Image 1) */}
          <div className="mt-8 md:mt-10">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-gray-500 dark:text-gray-400">
              <span>CLICK THUMBNAIL TO PREVIEW LABS</span>
              {FEATURED_CAMPUS_ITEMS.length > thumbsPerPage && (
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
              )}
            </div>

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

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                    {/* Active check pill */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#84CC16] text-black font-mono font-bold text-[10px] shadow">
                        Active
                      </div>
                    )}

                    {/* Title label */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                      <p className="text-[11px] sm:text-xs font-bold line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-gray-300 line-clamp-1 font-mono">
                        {item.location.split("(")[0]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* SECTION 2: CAMPUS PLAYBOOK GALLERY (EXACT 3D WIREFRAME FROM IMAGE 2) */}
        {/* "and just beyond that i want an gallery play book like this"      */}
        {/* ============================================================== */}
        <CampusPlaybookGallery 
          onImageClick={(index, slides) => openLightbox(index, slides)}
        />

        {/* ============================================================== */}
        {/* SECTION 3: IN-PERSON CAMPUS TOUR & VISIT BOOKING CARD          */}
        {/* ============================================================== */}
        <div className="mt-12 md:mt-16 p-7 sm:p-9 md:p-11 bg-gradient-to-r from-black via-gray-950 to-gray-900 text-white rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#84CC16]/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84CC16]/20 text-[#84CC16] text-xs font-mono font-bold tracking-wider">
                <Calendar size={13} />
                <span>EXPERIENCE IN PERSON</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Book a Free Campus Tour &amp; Counselor Session
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Visit our Vikaspuri (Delhi) or Sector 2 (Noida) training hubs. Meet our senior instructors, experience our live multi-monitor labs, and get 1-on-1 career counseling before enrolling.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3.5 shrink-0">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openPopupEnquiry"))}
                className="px-7 py-3.5 bg-[#84CC16] hover:bg-[#65A30D] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95"
              >
                Schedule Campus Visit
              </button>
              <a
                href="https://www.google.com/maps/search/B-54+Krishna+Park+Vikaspuri+New+Delhi+110018"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <span>Delhi Location</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://www.google.com/maps/search/B-136+Sector+2+Noida+Uttar+Pradesh+201301"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <span>Noida Location</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* FULL-SCREEN LIGHTBOX MODAL (USED BY BOTH SECTION 1 AND 2)     */}
      {/* ============================================================== */}
      <AnimatePresence>
        {lightboxData !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 select-none"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50 cursor-pointer border border-white/20"
              aria-label="Close Lightbox"
            >
              <X size={22} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevLightboxPhoto}
              className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50 cursor-pointer border border-white/20"
              aria-label="Previous Photo"
            >
              <ChevronLeft size={26} />
            </button>

            <button
              onClick={nextLightboxPhoto}
              className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50 cursor-pointer border border-white/20"
              aria-label="Next Photo"
            >
              <ChevronRight size={26} />
            </button>

            {/* Content Container */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            >
              <div className="relative w-full max-h-[72vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black/40">
                <img
                  src={lightboxData.slides[lightboxData.index].src}
                  alt={lightboxData.slides[lightboxData.index].title}
                  className="max-w-full max-h-[72vh] object-contain rounded-2xl"
                />
              </div>

              {/* Caption Bar */}
              <div className="w-full mt-4 text-center space-y-1.5 px-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#84CC16]">
                  <MapPin size={12} />
                  <span>{lightboxData.slides[lightboxData.index].location}</span>
                  <span>•</span>
                  <span>{lightboxData.index + 1} of {lightboxData.slides.length}</span>
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">
                  {lightboxData.slides[lightboxData.index].title}
                </h4>
                {lightboxData.slides[lightboxData.index].description && (
                  <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
                    {lightboxData.slides[lightboxData.index].description}
                  </p>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
