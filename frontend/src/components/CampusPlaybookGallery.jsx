import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from "lucide-react";

// Optimized sequence: starts with campus-7 (center), campus-4 (left), campus-6 (right) matching reference Image 2
export const PLAYBOOK_SLIDES = [
  {
    id: 7,
    src: "/campus/campus-7.webp",
    title: "Community & Mentorship Celebrations",
    location: "Nexxtechs Campus Hub",
    tag: "Campus Life",
    description: "Mentors, students, and young tech aspirants sharing milestone celebrations and tech awareness workshops."
  },
  {
    id: 6,
    src: "/campus/campus-6.webp",
    title: "Live Instructor Tech Demonstrations",
    location: "Noida Campus (Sector 2)",
    tag: "Smart Classroom",
    description: "Senior faculty explaining architecture pipelines and deployment topologies on interactive displays."
  },
  {
    id: 2,
    src: "/campus/campus-2.webp",
    title: "Smart Projection Coding Theatre",
    location: "Noida Campus (Sector 2)",
    tag: "Lecture Hall",
    description: "Ergonomic, air-conditioned lecture hall with high-definition multi-screen coding projection."
  },
  {
    id: 1,
    src: "/campus/campus-1.webp",
    title: "High-Performance Workstation Lab",
    location: "Delhi Campus (Vikaspuri)",
    tag: "Cloud & Dev Lab",
    description: "Dedicated dual-monitor setups configured for high-load containerized workflows and MLOps pipelines."
  },
  {
    id: 3,
    src: "/campus/campus-3.webp",
    title: "Capstone Project Pod & Cloud Testbed",
    location: "Delhi Campus (Vikaspuri)",
    tag: "Project Lab",
    description: "Collaborative pods where student dev teams deploy real-time capstones to AWS and GCP environments."
  },
  {
    id: 10,
    src: "/campus/campus-10.webp",
    title: "1-on-1 Faculty Mentorship & Doubt Desk",
    location: "Delhi Campus (Vikaspuri)",
    tag: "Mentorship",
    description: "Private doubt-solving desks where students debug complex code with guidance from senior practitioners."
  },
  {
    id: 11,
    src: "/campus/campus-11.webp",
    title: "Student Collaboration & Innovation Lounge",
    location: "Noida Campus (Sector 2)",
    tag: "Open Space",
    description: "Flexible brainstorming zone fostering peer programming, internal hackathons, and mock tech interviews."
  },
  {
    id: 12,
    src: "/campus/campus-12.webp",
    title: "Intensive Full Stack & DevOps Lab",
    location: "Delhi Campus (Vikaspuri)",
    tag: "DevOps Pod",
    description: "Industry-standard workstations running Linux and macOS environments for microservices development."
  },
  {
    id: 13,
    src: "/campus/campus-13.webp",
    title: "Cybersecurity & Cloud Simulation Lab",
    location: "Noida Campus (Sector 2)",
    tag: "Cyber Lab",
    description: "Isolated network sandboxes built for simulated vulnerability assessments and network security audits."
  },
  {
    id: 14,
    src: "/campus/campus-14.webp",
    title: "Career Counseling & Placement Suite",
    location: "Delhi Campus (Vikaspuri)",
    tag: "Career Center",
    description: "Dedicated counseling suites where academic advisors craft personalized career roadmaps and resumes."
  },
  {
    id: 15,
    src: "/campus/campus-15.webp",
    title: "AI & Machine Learning Sandbox",
    location: "Noida Campus (Sector 2)",
    tag: "AI Sandbox",
    description: "GPU-accelerated lab environments optimized for training deep learning models and PyTorch algorithms."
  },
  {
    id: 20,
    src: "/campus/campus-20.webp",
    title: "Executive Seminar & Industry Keynote Hall",
    location: "Delhi Campus (Vikaspuri)",
    tag: "Auditorium",
    description: "Multi-media hall hosting corporate hiring drives, industry guest lectures, and graduation ceremonies."
  },
  {
    id: 21,
    src: "/campus/campus-21.webp",
    title: "Campus Welcome Lobby & Reception",
    location: "Delhi Campus (Vikaspuri)",
    tag: "Reception",
    description: "Modern entrance and student check-in lounge designed with welcoming tech-inspired aesthetics."
  },
  {
    id: 8,
    src: "/campus/campus-8.webp",
    title: "Lab Group Coding Sessions",
    location: "Delhi Campus (Vikaspuri)",
    tag: "Hands-on Lab",
    description: "Students engaged in hands-on practical implementation during live evening lab batches."
  },
  {
    id: 4,
    src: "/campus/campus-4.webp",
    title: "Interactive Classroom & Peer Discussions",
    location: "Delhi Campus (Vikaspuri)",
    tag: "Smart Classroom",
    description: "Students collaborating on problem-solving exercises and code reviews during live classroom lectures."
  }
];

export default function CampusPlaybookGallery({ onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const totalSlides = PLAYBOOK_SLIDES.length;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
  };

  // Compute slide positioning relative to active slide
  const getSlideStyle = (index) => {
    let offset = index - currentIndex;
    
    // Normalize offset to circular array
    if (offset > totalSlides / 2) offset -= totalSlides;
    if (offset < -totalSlides / 2) offset += totalSlides;

    const baseTransition = "all 0.55s cubic-bezier(0.25, 1, 0.5, 1)";

    // Center Slide
    if (offset === 0) {
      return {
        transform: "translateX(0%) scale(1)",
        zIndex: 30,
        opacity: 1,
        filter: "brightness(1)",
        pointerEvents: "auto",
        visibility: "visible",
        transition: baseTransition
      };
    }

    // Immediate Left
    if (offset === -1) {
      return {
        transform: "translateX(-65%) scale(0.85)",
        zIndex: 20,
        opacity: 0.85,
        filter: "brightness(0.9)",
        pointerEvents: "auto",
        visibility: "visible",
        transition: baseTransition
      };
    }

    // Outer Left
    if (offset === -2) {
      return {
        transform: "translateX(-115%) scale(0.70)",
        zIndex: 10,
        opacity: 0.5,
        filter: "brightness(0.75)",
        pointerEvents: "auto",
        visibility: "visible",
        transition: baseTransition
      };
    }

    // Far Left (edge peek)
    if (offset === -3) {
      return {
        transform: "translateX(-155%) scale(0.55)",
        zIndex: 5,
        opacity: 0.25,
        filter: "brightness(0.6)",
        pointerEvents: "none",
        visibility: "visible",
        transition: baseTransition
      };
    }

    // Immediate Right
    if (offset === 1) {
      return {
        transform: "translateX(65%) scale(0.85)",
        zIndex: 20,
        opacity: 0.85,
        filter: "brightness(0.9)",
        pointerEvents: "auto",
        visibility: "visible",
        transition: baseTransition
      };
    }

    // Outer Right
    if (offset === 2) {
      return {
        transform: "translateX(115%) scale(0.70)",
        zIndex: 10,
        opacity: 0.5,
        filter: "brightness(0.75)",
        pointerEvents: "auto",
        visibility: "visible",
        transition: baseTransition
      };
    }

    // Far Right (edge peek)
    if (offset === 3) {
      return {
        transform: "translateX(155%) scale(0.55)",
        zIndex: 5,
        opacity: 0.25,
        filter: "brightness(0.6)",
        pointerEvents: "none",
        visibility: "visible",
        transition: baseTransition
      };
    }

    // Off-screen slides
    return {
      transform: offset < 0 ? "translateX(-200%) scale(0.4)" : "translateX(200%) scale(0.4)",
      zIndex: 0,
      opacity: 0,
      pointerEvents: "none",
      visibility: "hidden",
      transition: baseTransition
    };
  };

  const activeSlide = PLAYBOOK_SLIDES[currentIndex];

  return (
    <div className="w-full my-6 md:my-10 px-0">
      {/* 
        Clean transparent full-width container (no olive background, no side margins):
        Seamlessly flows with the page theme.
        3D cover flow perspective,
        viewfinder corner brackets framing center card,
        dark translucent circular navigation buttons.
      */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full text-gray-900 dark:text-white py-6 md:py-12 px-0 overflow-hidden select-none"
      >
        {/* 3D Cover Flow Carousel Deck */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[440px] lg:h-[480px] flex items-center justify-center">
          
          {/* Circular Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-black/75 hover:bg-black active:scale-95 text-white backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl transition-all duration-200 z-40 cursor-pointer"
          >
            <ChevronLeft size={26} className="stroke-[2.5]" />
          </button>

          {/* Circular Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-black/75 hover:bg-black active:scale-95 text-white backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl transition-all duration-200 z-40 cursor-pointer"
          >
            <ChevronRight size={26} className="stroke-[2.5]" />
          </button>

          {/* Slides Track Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {PLAYBOOK_SLIDES.map((slide, index) => {
              const style = getSlideStyle(index);
              const isCenter = index === currentIndex;

              return (
                <div
                  key={slide.id}
                  onClick={() => {
                    if (isCenter) {
                      if (onImageClick) onImageClick(index, PLAYBOOK_SLIDES);
                    } else {
                      setCurrentIndex(index);
                    }
                  }}
                  style={style}
                  className="absolute w-[270px] sm:w-[380px] md:w-[480px] lg:w-[540px] aspect-[16/10] rounded-xl sm:rounded-2xl md:rounded-3xl cursor-pointer group"
                >
                  {/* Photo with rounded container & subtle shadow */}
                  <div className="relative w-full h-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-black/10">
                    <img
                      src={slide.src}
                      alt={slide.title}
                      loading="lazy"
                      className="w-full h-full object-cover select-none"
                      draggable={false}
                    />

                    {/* View Fullscreen Indicator on Center Card Hover */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
                        <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/30 text-white text-xs font-mono font-medium flex items-center gap-2 shadow-xl">
                          <Maximize2 size={13} className="text-[#84CC16]" />
                          <span>View Fullscreen</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Corner Camera Viewfinder Brackets - Framing the outside of the center card */}
                  {isCenter && (
                    <div className="absolute -inset-2.5 sm:-inset-3.5 md:-inset-4 pointer-events-none z-30">
                      {/* Top-Left Bracket */}
                      <span className="absolute top-0 left-0 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 border-t-2 border-l-2 border-gray-900 dark:border-white drop-shadow-md" />
                      {/* Top-Right Bracket */}
                      <span className="absolute top-0 right-0 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 border-t-2 border-r-2 border-gray-900 dark:border-white drop-shadow-md" />
                      {/* Bottom-Left Bracket */}
                      <span className="absolute bottom-0 left-0 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 border-b-2 border-l-2 border-gray-900 dark:border-white drop-shadow-md" />
                      {/* Bottom-Right Bracket */}
                      <span className="absolute bottom-0 right-0 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 border-b-2 border-r-2 border-gray-900 dark:border-white drop-shadow-md" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Playbook Controls & Caption */}
        <div className="relative z-20 mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto px-4 pt-6 border-t border-gray-200 dark:border-white/15 text-xs font-mono text-gray-600 dark:text-gray-300">
          
          {/* Autoplay Toggle & Current Slide Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white border border-gray-200 dark:border-white/20 flex items-center gap-2 transition-colors cursor-pointer"
              title={isPlaying ? "Pause Playbook" : "Play Playbook"}
            >
              {isPlaying ? (
                <>
                  <Pause size={12} className="text-[#65A30D] dark:text-[#84CC16]" />
                  <span>Pause Playbook</span>
                </>
              ) : (
                <>
                  <Play size={12} className="text-[#65A30D] dark:text-[#84CC16]" />
                  <span>Play Playbook</span>
                </>
              )}
            </button>
            <span className="text-gray-500 dark:text-white/60">
              {currentIndex + 1} of {totalSlides}
            </span>
          </div>

          {/* Quick Dots Navigator */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[280px] sm:max-w-none py-1">
            {PLAYBOOK_SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === currentIndex
                    ? "w-7 bg-black dark:bg-[#84CC16]"
                    : "w-2 bg-gray-300 dark:bg-white/30 hover:bg-gray-400 dark:hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Active slide title & location */}
          <div className="hidden sm:inline-flex items-center gap-2 text-[#65A30D] dark:text-[#84CC16] font-semibold">
            <span>●</span>
            <span className="text-gray-800 dark:text-white font-medium">{activeSlide.title}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
