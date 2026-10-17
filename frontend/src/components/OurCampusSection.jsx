import React, { useState } from "react";
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
  Calendar
} from "lucide-react";

export const CAMPUS_PHOTOS = [
  {
    id: 1,
    src: "/campus/campus-1.webp",
    title: "Advanced IT Lab & Workstations",
    category: "labs",
    location: "Delhi Campus (Vikaspuri)",
    description: "Equipped with high-performance multi-monitor systems for Cloud, MLOps and Full Stack development."
  },
  {
    id: 2,
    src: "/campus/campus-2.webp",
    title: "Interactive Smart Classroom",
    category: "classrooms",
    location: "Noida Campus (Sector 2)",
    description: "Spacious, air-conditioned lecture halls with live screen mirroring and instructor coding displays."
  },
  {
    id: 3,
    src: "/campus/campus-3.webp",
    title: "Real-World Project Workspace",
    category: "labs",
    location: "Delhi Campus (Vikaspuri)",
    description: "Dedicated project pods where students collaborate on live deployment pipelines and industry capstones."
  },
  {
    id: 4,
    src: "/campus/campus-10.webp",
    title: "Mentorship & 1-on-1 Doubt Desk",
    category: "mentorship",
    location: "Delhi Campus (Vikaspuri)",
    description: "Personalized guidance zones where senior trainers assist students with code debugging and architectural reviews."
  },
  {
    id: 5,
    src: "/campus/campus-11.webp",
    title: "Collaborative Student Hub",
    category: "mentorship",
    location: "Noida Campus (Sector 2)",
    description: "Open discussion spaces fostering peer programming, hackathons, and mock interview preparations."
  },
  {
    id: 6,
    src: "/campus/campus-12.webp",
    title: "Modern Tech Training Hall",
    category: "classrooms",
    location: "Delhi Campus (Vikaspuri)",
    description: "Ergonomic seating and dedicated power hubs ensuring seamless, full-day intensive bootcamps."
  },
  {
    id: 7,
    src: "/campus/campus-13.webp",
    title: "Cyber Security & Cloud Simulation Lab",
    category: "labs",
    location: "Noida Campus (Sector 2)",
    description: "Isolated networking topologies and cloud testbeds for simulated penetration testing and infrastructure ops."
  },
  {
    id: 8,
    src: "/campus/campus-14.webp",
    title: "Counseling & Career Guidance Suite",
    category: "mentorship",
    location: "Delhi Campus (Vikaspuri)",
    description: "Dedicated counseling rooms where academic advisors help learners build personalized career roadmaps."
  },
  {
    id: 9,
    src: "/campus/campus-15.webp",
    title: "Full Stack Development Pod",
    category: "labs",
    location: "Noida Campus (Sector 2)",
    description: "Dedicated Linux and macOS-ready workstations optimized for containerized workflows and AI development."
  },
  {
    id: 10,
    src: "/campus/campus-20.webp",
    title: "Executive Seminar & Keynote Room",
    category: "classrooms",
    location: "Delhi Campus (Vikaspuri)",
    description: "Multi-media presentation hall hosting industry guest speakers, hiring drives, and alumni workshops."
  },
  {
    id: 11,
    src: "/campus/campus-21.webp",
    title: "Campus Reception & Visitor Lounge",
    category: "mentorship",
    location: "Delhi Campus (Vikaspuri)",
    description: "Welcoming reception and check-in lobby for enrolled students, corporate partners, and visiting candidates."
  },
  {
    id: 12,
    src: "/campus/campus-18.webp",
    title: "Data Science & AI Sandbox",
    category: "labs",
    location: "Noida Campus (Sector 2)",
    description: "GPU-accelerated virtual environments for training deep learning models and large language model fine-tuning."
  }
];

export default function OurCampusSection({ currentBranch = "all" }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter photos based on category
  const filteredPhotos = CAMPUS_PHOTOS.filter(photo => {
    if (selectedCategory === "all") return true;
    return photo.category === selectedCategory;
  });

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="our-campus" className="py-24 md:py-32 bg-gray-50/50 dark:bg-[#0c0d12] transition-colors duration-300 relative overflow-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#84CC16]/5 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#84CC16]/10 border border-[#84CC16]/20 text-[#65A30D] dark:text-[#84CC16] text-xs font-mono font-bold uppercase tracking-widest">
              <Building2 size={14} />
              <span>LIFE AT NEXXTECHS</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.15]">
              Explore Our <span className="text-[#84CC16]">Campuses</span> &amp; Infrastructure
            </h2>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Step inside our world-class training centers in Delhi (Vikaspuri) and Noida (Sector 2). Purpose-built for intensive hands-on coding, live lab simulations, and personalized faculty mentorship.
            </p>
          </div>

          {/* Quick Facility Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 shrink-0 font-mono">
            <div className="p-3.5 bg-white dark:bg-[#151722] border border-gray-200 dark:border-white/10 rounded-xl shadow-xs">
              <Monitor size={18} className="text-[#84CC16] mb-1.5" />
              <div className="text-xs font-bold text-gray-900 dark:text-white">150+ Systems</div>
              <div className="text-[10px] text-gray-500">Dedicated Labs</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-[#151722] border border-gray-200 dark:border-white/10 rounded-xl shadow-xs">
              <Wifi size={18} className="text-[#84CC16] mb-1.5" />
              <div className="text-xs font-bold text-gray-900 dark:text-white">1 Gbps Fiber</div>
              <div className="text-[10px] text-gray-500">High-Speed Net</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-[#151722] border border-gray-200 dark:border-white/10 rounded-xl shadow-xs">
              <Users size={18} className="text-[#84CC16] mb-1.5" />
              <div className="text-xs font-bold text-gray-900 dark:text-white">1-on-1 Help</div>
              <div className="text-[10px] text-gray-500">Lab Instructors</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-[#151722] border border-gray-200 dark:border-white/10 rounded-xl shadow-xs">
              <MapPin size={18} className="text-[#84CC16] mb-1.5" />
              <div className="text-xs font-bold text-gray-900 dark:text-white">2 Hubs</div>
              <div className="text-[10px] text-gray-500">Delhi &amp; Noida</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-gray-200 dark:border-gray-800">
          {[
            { id: "all", label: "All Facilities" },
            { id: "labs", label: "Computer & Cloud Labs" },
            { id: "classrooms", label: "Smart Classrooms" },
            { id: "mentorship", label: "Mentorship & Lounges" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? "bg-black text-white dark:bg-[#84CC16] dark:text-black shadow-sm"
                  : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200/60 dark:hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Campus Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className="group relative bg-white dark:bg-[#141620] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              {/* Image Container with Zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Location Badge Overlay */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono font-medium border border-white/20">
                    <MapPin size={11} className="text-[#84CC16]" />
                    {photo.location}
                  </span>
                </div>

                {/* Hover Maximize Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md flex items-center justify-center text-gray-900 dark:text-white shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>

              {/* Photo Caption Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#65A30D] dark:group-hover:text-[#84CC16] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="capitalize">{photo.category.replace("-", " ")}</span>
                  <span className="text-[#65A30D] dark:text-[#84CC16] font-semibold flex items-center gap-1">
                    View High-Res <ExternalLink size={10} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Campus Visit Banner */}
        <div className="mt-16 p-8 md:p-10 bg-gradient-to-r from-black to-gray-900 text-white rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">
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
                Visit our Vikaspuri (Delhi) or Sector 2 (Noida) branches. Meet our senior instructors, experience our live labs, and get 1-on-1 career counseling before enrolling.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openPopupEnquiry"))}
                className="px-7 py-3.5 bg-[#84CC16] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#65A30D] transition-colors shadow-lg cursor-pointer"
              >
                Schedule Campus Visit
              </button>
              <a
                href="https://www.google.com/maps/search/B-54+Krishna+Park+Vikaspuri+New+Delhi+110018"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <span>Delhi Location</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://www.google.com/maps/search/B-136+Sector+2+Noida+Uttar+Pradesh+201301"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <span>Noida Location</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight size={28} />
            </button>

            {/* Lightbox Content Container */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            >
              <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={filteredPhotos[lightboxIndex].src}
                  alt={filteredPhotos[lightboxIndex].title}
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl"
                />
              </div>

              {/* Caption Bar */}
              <div className="w-full mt-4 text-center space-y-1 px-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#84CC16]">
                  <MapPin size={12} />
                  <span>{filteredPhotos[lightboxIndex].location}</span>
                  <span>•</span>
                  <span>{lightboxIndex + 1} of {filteredPhotos.length}</span>
                </div>
                <h4 className="text-lg md:text-xl font-bold text-white">
                  {filteredPhotos[lightboxIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
                  {filteredPhotos[lightboxIndex].description}
                </p>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
