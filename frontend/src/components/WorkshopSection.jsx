import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Award, 
  Maximize2, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Calendar,
  Layers
} from "lucide-react";

// 5 Real Workshop Photos with descriptive SEO metadata
const WORKSHOP_PHOTOS = [
  {
    id: "workshop-group",
    src: "/workshop/workshop-group-nexxtechs.jpeg",
    title: "NexxTechs Technical Bootcamp & Milestone Cohort",
    category: "Full Cohort Session",
    tag: "Batch Milestone",
    location: "NexxTechs Main Campus Hub",
    description: "Students, trainers, and career mentors gathering after an intensive 6-hour production deployment and microservices architecture workshop.",
    span: "col-span-12 lg:col-span-7 row-span-2 min-h-[380px] lg:min-h-[480px]",
    featured: true
  },
  {
    id: "workshop-aditya-seminar",
    src: "/workshop/workshop-aditya-sharma-seminar.jpeg",
    title: "Live Cloud & DevOps Architecture Teardown by Aditya Sharma",
    category: "Founder Masterclass",
    tag: "Live Architecture",
    location: "Executive Keynote Hall",
    description: "Founder & CEO Aditya Sharma breaking down live cloud infrastructure, Kubernetes pods, and production CI/CD workflows on large interactive displays.",
    span: "col-span-12 sm:col-span-6 lg:col-span-5 min-h-[230px] aspect-[4/3]",
    featured: false
  },
  {
    id: "workshop-live-coding",
    src: "/workshop/workshop-live-coding-students.jpeg",
    title: "Hands-On Hackathon & Terminal Coding Session",
    category: "Practical Lab",
    tag: "Hands-on Rigs",
    location: "High-Compute Smart Lab",
    description: "Students working on dedicated multi-screen developer laptops, writing clean algorithms, debugging runtime exceptions, and pushing code to Git.",
    span: "col-span-12 sm:col-span-6 lg:col-span-5 min-h-[230px] aspect-[4/3]",
    featured: false
  },
  {
    id: "workshop-classroom",
    src: "/workshop/workshop-classroom-training-session.jpeg",
    title: "Interactive Software Engineering & Cloud Masterclass",
    category: "Tech Seminar",
    tag: "Interactive Hall",
    location: "Smart Lecture Theatre",
    description: "Immersive deep-dive into enterprise system architecture, distributed microservices, and modern database scaling strategies.",
    span: "col-span-12 sm:col-span-6 lg:col-span-6 min-h-[240px] aspect-[16/10]",
    featured: false
  },
  {
    id: "workshop-mentors",
    src: "/workshop/workshop-team-mentors.jpeg",
    title: "Mentor Doubt Resolution & 1-on-1 Code Reviews",
    category: "Mentorship",
    tag: "1-on-1 Review",
    location: "Collaborative Project Pods",
    description: "Senior faculty reviewing student capstone repositories, optimizing API response times, and simulating real technical interview rounds.",
    span: "col-span-12 sm:col-span-6 lg:col-span-6 min-h-[240px] aspect-[16/10]",
    featured: false
  }
];

const WORKSHOP_HIGHLIGHTS = [
  {
    icon: Terminal,
    title: "100% Practical Terminal Labs",
    desc: "Every workshop attendee works on live IDEs, staging servers, and production-like cloud sandboxes."
  },
  {
    icon: Zap,
    title: "Live System Teardowns",
    desc: "Step-by-step architectural breakdown of high-throughput systems, microservices, and distributed pipelines."
  },
  {
    icon: Users,
    title: "Founder & Lead Architect Access",
    desc: "Direct guidance and code reviews by senior practitioners including Aditya Sharma, Nitish Kaushal, and Meghesh Kumar."
  },
  {
    icon: Award,
    title: "Verifiable Project Credential",
    desc: "Earn official participation credentials validating hands-on skills to showcase on LinkedIn and tech resumes."
  }
];

const WorkshopSection = ({ className = "" }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      }
    };
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto]);

  return (
    <section 
      id="technical-workshops" 
      aria-label="Technical Workshops and Hands-On Seminars at NexxTechs"
      className={`py-16 md:py-24 bg-transparent transition-colors duration-300 relative overflow-hidden ${className}`}
    >
      {/* Schema.org Structured Data for SEO: EducationalEvent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventSeries",
            "name": "NexxTechs Live Hands-On Technical Workshops & Industry Seminars",
            "description": "Intensive hands-on technical workshops, live architecture teardowns, coding hackathons, and corporate masterclasses in Delhi & Noida by NexxTechs Institute.",
            "organizer": {
              "@type": "EducationalOrganization",
              "name": "NexxTechs Institute of Technology",
              "url": "https://www.nexxtechs.com"
            },
            "location": [
              {
                "@type": "Place",
                "name": "NexxTechs Delhi Campus",
                "address": "B-54 Krishna Park, Vikaspuri, New Delhi, Delhi 110018"
              },
              {
                "@type": "Place",
                "name": "NexxTechs Noida Campus",
                "address": "B-136 Upper, Ground Floor, Sector 2, Noida, Uttar Pradesh 201301"
              }
            ],
            "subEvent": WORKSHOP_PHOTOS.map((w, idx) => ({
              "@type": "EducationalEvent",
              "position": idx + 1,
              "name": w.title,
              "description": w.description,
              "image": w.src,
              "eventStatus": "https://schema.org/EventScheduled"
            }))
          })
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">

        {/* ============================================================== */}
        {/* SECTION HEADER: SEO RICH & USER VALUE                         */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#84CC16]/10 text-[#65A30D] dark:text-[#84CC16] border border-[#84CC16]/20 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm">
              <Sparkles size={14} className="stroke-[2.5]" />
              <span>INDUSTRY WORKSHOPS &amp; SEMINARS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15]">
              Hands-On Technical <span className="text-[#84CC16]">Workshops</span> &amp; Masterclasses
            </h2>

            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Experience the energy of NexxTechs' real-world tech bootcamps in <strong className="text-gray-900 dark:text-white font-semibold">Delhi &amp; Noida</strong>. Our workshops combine live architecture teardowns, collaborative coding sprints, and direct mentor code reviews to bridge the gap between classroom theory and enterprise tech standards.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 bg-gray-50 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-gray-200/80 dark:border-white/10 shrink-0">
            <div className="pr-4 border-r border-gray-200 dark:border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">50+</div>
              <div className="text-[11px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Workshops Held</div>
            </div>
            <div className="pr-4 border-r border-gray-200 dark:border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-[#84CC16]">1,200+</div>
              <div className="text-[11px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Learners Trained</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">100%</div>
              <div className="text-[11px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hands-On Labs</div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COLLAGE: 5 REAL WORKSHOP PHOTOS IN MODERN BENTO GRID          */}
        {/* ============================================================== */}
        <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16">
          {WORKSHOP_PHOTOS.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-white/10 bg-gray-100 dark:bg-[#13151f] shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer ${photo.span}`}
              title={`Click to expand ${photo.title}`}
            >
              {/* Photo Image */}
              <div className="relative w-full h-full min-h-[220px] overflow-hidden">
                <img
                  src={photo.src}
                  alt={`${photo.title} - NexxTechs Technical Workshop in Delhi Noida`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle dark gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-6 text-white" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#84CC16] border border-[#84CC16]/30 shadow-sm">
                    {photo.tag}
                  </span>
                </div>

                {/* Top Right Zoom Icon */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 group-hover:bg-[#84CC16] text-white group-hover:text-black backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md">
                  <Maximize2 size={15} />
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10 text-white">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-300 mb-1.5">
                    <MapPin size={12} className="text-[#84CC16] shrink-0" />
                    <span className="line-clamp-1">{photo.location}</span>
                  </div>
                  
                  <h3 className={`font-black text-white group-hover:text-[#84CC16] transition-colors leading-snug line-clamp-2 ${
                    photo.featured ? "text-lg sm:text-2xl" : "text-base sm:text-lg"
                  }`}>
                    {photo.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 mt-1.5 line-clamp-2 hidden sm:block opacity-90 group-hover:opacity-100 transition-opacity">
                    {photo.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* SEO CONTENT PILLARS: WHY WORKSHOPS AT NEXTECHS MATTER         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-gray-200 dark:border-white/10">
          {WORKSHOP_HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="p-5 sm:p-6 rounded-2xl bg-gray-50/70 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 hover:border-[#84CC16]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#84CC16]/15 text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center mb-3">
                  <Icon size={20} className="stroke-[2.2]" />
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* ============================================================== */}
      {/* HIGH-DEFINITION LIGHTBOX MODAL VIEWER                         */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[92vh] w-full bg-white dark:bg-[#13151f] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 cursor-default flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-black/75 hover:bg-[#84CC16] text-white hover:text-black rounded-full transition-colors cursor-pointer shadow-lg"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Image Box */}
              <div className="relative w-full max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Modal Info Footer */}
              <div className="p-6 bg-white dark:bg-[#13151f] space-y-2 border-t border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#65A30D] dark:text-[#84CC16] uppercase tracking-wider">
                  <span>{selectedPhoto.category}</span>
                  <span>•</span>
                  <span>{selectedPhoto.location}</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {selectedPhoto.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default memo(WorkshopSection);
