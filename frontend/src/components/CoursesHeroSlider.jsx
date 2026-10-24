import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Cloud,
  Brain,
  Shield,
  Code2,
  BarChart3,
  Layers,
  Palette,
  Building2,
  Sparkles,
} from "lucide-react";

// Tech Icon Renderers
function TechChipIcon({ type, label }) {
  switch (type) {
    case "mongo":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path
            d="M12 2C11.5 3 7 9 7 14C7 17.5 9.5 20.5 12 22C14.5 20.5 17 17.5 17 14C17 9 12.5 3 12 2Z"
            fill="#10B981"
          />
          <path
            d="M12 2V22C12.8 21.5 14 20 14.8 18.5C16 16.2 16.5 14 16.5 12.5C16.5 8 13 4 12 2Z"
            fill="#059669"
          />
        </svg>
      );
    case "express":
      return (
        <div className="w-5 h-5 rounded-full bg-black text-white text-[10px] font-black flex items-center justify-center tracking-tighter">
          ex
        </div>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#06B6D4" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#06B6D4" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#06B6D4" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#06B6D4" />
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path
            d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z"
            fill="#22C55E"
          />
          <text x="12" y="14.5" fill="#064E3B" fontSize="7" fontWeight="bold" textAnchor="middle">JS</text>
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path
            d="M11.8 2C8.2 2 8.4 3.5 8.4 3.5L8.4 5.2H12.2V5.7H5.2C3.5 5.7 2 7 2 10.2C2 13.4 3.1 13.4 3.1 13.4L4.5 13.4V11.5C4.5 9.4 6.3 9.4 6.3 9.4H10.1C11.9 9.4 12 8 12 8V3.7C12 3.7 12.3 2 11.8 2Z"
            fill="#3B82F6"
          />
          <path
            d="M12.2 22C15.8 22 15.6 20.5 15.6 20.5V18.8H11.8V18.3H18.8C20.5 18.3 22 17 22 13.8C22 10.6 20.9 10.6 20.9 10.6L19.5 10.6V12.5C19.5 14.6 17.7 14.6 17.7 14.6H13.9C12.1 14.6 12 16 12 16V20.3C12 20.3 11.7 22 12.2 22Z"
            fill="#F59E0B"
          />
        </svg>
      );
    case "aws":
      return (
        <div className="w-6 h-5 text-[#FF9900] text-[10px] font-black flex items-center justify-center leading-none">
          AWS
        </div>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0284C7">
          <rect x="3" y="11" width="3" height="2" rx="0.5" />
          <rect x="7" y="11" width="3" height="2" rx="0.5" />
          <rect x="11" y="11" width="3" height="2" rx="0.5" />
          <rect x="7" y="8" width="3" height="2" rx="0.5" />
          <rect x="11" y="8" width="3" height="2" rx="0.5" />
          <rect x="15" y="11" width="3" height="2" rx="0.5" />
          <path d="M22 13.5C21.5 13.5 20.5 13.8 20 14.5C18.5 13.5 16.5 14 15 14.5H2C2 18.5 5.5 21 11.5 21C18 21 21.8 17.5 22 13.5Z" />
        </svg>
      );
    case "k8s":
      return (
        <div className="w-5 h-5 rounded-full bg-[#326CE5] text-white text-[9px] font-black flex items-center justify-center">
          K8s
        </div>
      );
    case "pytorch":
      return (
        <div className="w-5 h-5 rounded-full bg-[#EE4C2C] text-white text-[9px] font-bold flex items-center justify-center">
          🔥
        </div>
      );
    case "genai":
      return (
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 text-white text-[9px] font-black flex items-center justify-center">
          AI
        </div>
      );
    case "powerbi":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#F2C811">
          <rect x="3" y="13" width="4" height="8" rx="1" />
          <rect x="10" y="8" width="4" height="13" rx="1" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
      );
    case "sql":
      return (
        <div className="w-5 h-5 rounded-md bg-[#00758F] text-white text-[8px] font-black flex items-center justify-center">
          SQL
        </div>
      );
    case "shield":
      return (
        <div className="w-5 h-5 text-red-500 font-bold flex items-center justify-center">
          🛡️
        </div>
      );
    case "kali":
      return (
        <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[8px] font-black flex items-center justify-center">
          KALI
        </div>
      );
    case "figma":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <rect x="6" y="2" width="6" height="6" rx="3" fill="#F24E1E" />
          <rect x="12" y="2" width="6" height="6" rx="3" fill="#FF7262" />
          <rect x="6" y="8" width="6" height="6" rx="3" fill="#A259FF" />
          <circle cx="15" cy="11" r="3" fill="#1ABCFE" />
          <rect x="6" y="14" width="6" height="6" rx="3" fill="#0ACF83" />
        </svg>
      );
    case "sap":
      return (
        <div className="w-6 h-5 rounded bg-[#008FD3] text-white text-[9px] font-black flex items-center justify-center tracking-tight">
          SAP
        </div>
      );
    case "java":
      return (
        <div className="w-5 h-5 text-[#EA580C] text-[10px] font-black flex items-center justify-center">
          ☕
        </div>
      );
    default:
      return (
        <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200">
          {label?.slice(0, 3) || "DEV"}
        </span>
      );
  }
}

// Badge Icon helper
function BadgeIcon({ name }) {
  const props = { size: 20, className: "text-emerald-600 dark:text-emerald-400 stroke-[2.2]" };
  switch (name) {
    case "trending":
      return <TrendingUp {...props} />;
    case "cloud":
      return <Cloud {...props} />;
    case "brain":
      return <Brain {...props} />;
    case "shield":
      return <Shield {...props} />;
    case "code":
      return <Code2 {...props} />;
    case "chart":
      return <BarChart3 {...props} />;
    case "layers":
      return <Layers {...props} />;
    case "palette":
      return <Palette {...props} />;
    case "building":
      return <Building2 {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}

const COURSES = [
  {
    tag: "Most Popular",
    tagColor: "#FF6B00",
    title: "Grow with",
    highlight: "MERN STACK + GEN AI",
    highlightColor: "#FF6B00",
    desc: "Join our MERN Stack Development Program and learn modern web development under expert guidance. Master frontend, backend, APIs, databases, and Gen-AI tools with practical training. Become a skilled industry-ready full-stack developer with real-world project experience.",
    topics: ["MongoDB", "Express.js", "React 19", "Node.js", "Next.js 15", "Gen-AI Tools"],
    chips: [
      { type: "mongo", label: "MongoDB" },
      { type: "express", label: "Express" },
      { type: "react", label: "React" },
      { type: "node", label: "Node.js" },
    ],
    image: "/course-images/mern_genai_hero.jpg",
    fallbackImage: "/course-images/Web-Development.webp",
    badge: {
      icon: "trending",
      title: "Live Campaigns",
      subtitle: "Real brand experience",
    },
    slug: "web-development",
    courseOption: "Web Dev with Gen AI",
  },
  {
    tag: "In Demand",
    tagColor: "#38BDF8",
    title: "Scale with",
    highlight: "CLOUD & DEVOPS",
    highlightColor: "#38BDF8",
    desc: "Master cloud platforms and automation. Learn deployment, CI/CD pipelines and infrastructure the way modern engineering teams run it across AWS, Azure, Docker, Kubernetes, and Terraform.",
    topics: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    chips: [
      { type: "aws", label: "AWS" },
      { type: "docker", label: "Docker" },
      { type: "k8s", label: "K8s" },
      { type: "code", label: "CI/CD" },
    ],
    image: "/course-images/cloud_devops_hero.jpg",
    fallbackImage: "/course-images/DevOps.webp",
    badge: {
      icon: "cloud",
      title: "Hands-on Labs",
      subtitle: "Industry tools & Multi-Cloud",
    },
    slug: "devops",
    courseOption: "DevOps with AWS",
  },
  {
    tag: "Future Ready",
    tagColor: "#A855F7",
    title: "Innovate with",
    highlight: "DATA SCIENCE & GEN AI",
    highlightColor: "#A855F7",
    desc: "Turn raw data into predictive intelligence. Master Python, Machine Learning, Deep Learning, NLP, and cutting-edge Generative AI & Large Language Models (LLMs) with deployable capstone projects.",
    topics: ["Python", "Machine Learning", "Deep Learning", "LLMs & RAG", "Prompt Eng.", "MLOps"],
    chips: [
      { type: "python", label: "Python" },
      { type: "pytorch", label: "PyTorch" },
      { type: "genai", label: "GenAI" },
      { type: "sql", label: "SQL" },
    ],
    image: "/course-images/datascience_ai_hero.jpg",
    fallbackImage: "/course-images/Data-Science.webp",
    badge: {
      icon: "brain",
      title: "AI Production Labs",
      subtitle: "Build & Deploy Real LLMs",
    },
    slug: "data-science",
    courseOption: "Data Science",
  },
  {
    tag: "High Career Growth",
    tagColor: "#F59E0B",
    title: "Decide with",
    highlight: "DATA ANALYTICS & BI",
    highlightColor: "#F59E0B",
    desc: "Transform enterprise data into actionable executive insights. Master Advanced Excel, SQL, Python for EDA, Power BI, and Tableau with live corporate dashboards and real-world case studies.",
    topics: ["Advanced SQL", "Power BI", "Tableau", "Python for EDA", "Business Intelligence", "DAX"],
    chips: [
      { type: "powerbi", label: "Power BI" },
      { type: "sql", label: "SQL" },
      { type: "python", label: "Python" },
      { type: "node", label: "Excel" },
    ],
    image: "/course-images/Data-Analytics.webp",
    fallbackImage: "/course-images/Data-Analytics.webp",
    badge: {
      icon: "chart",
      title: "Portfolio Ready",
      subtitle: "Live Datasets & Dashboards",
    },
    slug: "data-analytics",
    courseOption: "Data Analytics",
  },
  {
    tag: "Secure The Future",
    tagColor: "#EF4444",
    title: "Defend with",
    highlight: "CYBER SECURITY & ETHICAL HACKING",
    highlightColor: "#EF4444",
    desc: "Understand how cyber attacks happen and how to systematically stop them. Master network penetration testing, Kali Linux, Metasploit, web application security (OWASP Top 10), and SOC incident response.",
    topics: ["Networking", "Ethical Hacking", "VAPT", "Kali Linux", "Burp Suite", "Security Ops"],
    chips: [
      { type: "kali", label: "Kali Linux" },
      { type: "shield", label: "Security" },
      { type: "code", label: "VAPT" },
      { type: "node", label: "Defense" },
    ],
    image: "/course-images/cybersecurity_hero.jpg",
    fallbackImage: "/course-images/Cyber-Security.webp",
    badge: {
      icon: "shield",
      title: "Practical Labs",
      subtitle: "Live Attack & Defense Sandboxes",
    },
    slug: "cyber-security",
    courseOption: "Cyber Security",
  },
  {
    tag: "Creative + Growth",
    tagColor: "#10B981",
    title: "Create with",
    highlight: "DIGITAL MARKETING & UI/UX",
    highlightColor: "#10B981",
    desc: "Learn SEO, high-converting social media ads, and performance marketing, or design intuitive digital interfaces from wireframes to high-fidelity Figma prototypes with live brand campaigns.",
    topics: ["SEO & SEM", "Google & Meta Ads", "Figma", "UX Research", "Framer", "Performance Marketing"],
    chips: [
      { type: "figma", label: "Figma" },
      { type: "node", label: "Google Ads" },
      { type: "react", label: "Meta Ads" },
      { type: "python", label: "SEO" },
    ],
    image: "/course-images/uiux_marketing_hero.jpg",
    fallbackImage: "/course-images/Digital-Marketing.webp",
    badge: {
      icon: "palette",
      title: "Live Campaigns",
      subtitle: "Real brand experience & ROI",
    },
    slug: "digital-marketing",
    courseOption: "Digital Marketing",
  },
  {
    tag: "Enterprise Standard",
    tagColor: "#FB923C",
    title: "Power with",
    highlight: "JAVA FULL STACK & SPRING BOOT",
    highlightColor: "#FB923C",
    desc: "Become an Enterprise Java Developer. Master Core Java, Spring Boot 3, Hibernate, Microservices architecture, Kafka event streaming, and modern React 19 frontends for Fortune 500 tech stacks.",
    topics: ["Java 17+", "Spring Boot 3", "Microservices", "Hibernate JPA", "Kafka", "React 19"],
    chips: [
      { type: "java", label: "Java" },
      { type: "react", label: "React" },
      { type: "node", label: "Spring Boot" },
      { type: "sql", label: "PostgreSQL" },
    ],
    image: "/course-images/java-fullstack.webp",
    fallbackImage: "/course-images/java-fullstack.webp",
    badge: {
      icon: "layers",
      title: "Enterprise Grade",
      subtitle: "Microservices & Cloud Architectures",
    },
    slug: "java-full-stack",
    courseOption: "Java Full Stack",
  },
  {
    tag: "Enterprise Skills",
    tagColor: "#38BDF8",
    title: "Specialize in",
    highlight: "SAP MASTERCLASS",
    highlightColor: "#38BDF8",
    desc: "Build in-demand enterprise skills with SAP modules taught by experienced corporate trainers. Master SAP FICO, MM, and modern S/4HANA migration aimed at high-paying ERP roles.",
    topics: ["SAP FICO", "SAP MM", "S/4HANA Migration", "General Ledger", "Integration", "Live ERP Scenarios"],
    chips: [
      { type: "sap", label: "SAP" },
      { type: "sql", label: "HANA" },
      { type: "node", label: "FICO" },
      { type: "code", label: "MM" },
    ],
    image: "/course-images/SAP.webp",
    fallbackImage: "/course-images/SAP.webp",
    badge: {
      icon: "building",
      title: "Expert Trainers",
      subtitle: "Job-Ready ERP Outcomes",
    },
    slug: "sap-masterclass",
    courseOption: "SAP Masterclass",
  },
];

const AUTOPLAY_MS = 5000;

export default function CoursesHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const total = COURSES.length;

  const goToSlide = useCallback(
    (index) => {
      setCurrentIndex((index + total) % total);
    },
    [total]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Autoplay setup
  useEffect(() => {
    if (isPaused || isDragging) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isDragging, total]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch Handlers for Mobile Swiping
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      nextSlide();
    } else if (dragOffset > 50) {
      prevSlide();
    }
    setDragOffset(0);
  };

  // Mouse Drag Handlers for Desktop Swiping
  const handleMouseDown = (e) => {
    // Only drag with left mouse button and not clicking on buttons or links
    if (e.button !== 0 || e.target.closest("button") || e.target.closest("a")) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -60) {
      nextSlide();
    } else if (dragOffset > 60) {
      prevSlide();
    }
    setDragOffset(0);
  };

  // Button actions
  const handleEnroll = (course) => {
    window.dispatchEvent(
      new CustomEvent("openPopupEnquiry", {
        detail: {
          course_interested: course.courseOption || course.highlight,
          bannerTitle: `Enroll in ${course.highlight}`,
          type: "course",
        },
      })
    );
  };

  const handleExplore = (slug) => {
    navigate(`/course/${slug}`);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="NexxTechs courses slider"
      data-testid="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) handleMouseUp();
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`relative w-full overflow-hidden select-none bg-gradient-to-br from-[#041d14] via-[#072c1e] to-[#02130d] text-white transition-all duration-300 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Background Ambient Glow Accents */}
      <div
        className="pointer-events-none absolute -top-40 right-10 w-[550px] h-[550px] rounded-full blur-[140px] opacity-25"
        style={{
          background: `radial-gradient(circle, ${COURSES[currentIndex].highlightColor} 0%, rgba(16,185,129,0.3) 60%, transparent 100%)`,
        }}
      />
      <div className="pointer-events-none absolute bottom-0 left-10 w-[450px] h-[450px] rounded-full blur-[130px] opacity-20 bg-emerald-600/25" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Main Slider Track */}
      <div
        className="flex w-full"
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          transition: isDragging ? "none" : "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)",
          willChange: "transform",
        }}
      >
        {COURSES.map((course, idx) => {
          const isActive = idx === currentIndex;

          return (
            <div
              key={idx}
              className="min-w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 px-6 sm:px-10 md:px-14 lg:px-20 py-12 sm:py-16 lg:py-20 max-w-[1440px] mx-auto min-h-[540px] lg:min-h-[580px]"
            >
              {/* ---------- Left Content Column (7 cols) ---------- */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-5 z-10">
                {/* Tag pill */}
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm border"
                    style={{
                      backgroundColor: `${course.tagColor}1A`,
                      color: course.tagColor,
                      borderColor: `${course.tagColor}40`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: course.tagColor }}
                    />
                    {course.tag}
                  </span>
                </div>

                {/* Main Heading */}
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-black tracking-tight leading-[1.08] text-white"
                  data-testid="hero-heading"
                >
                  <span className="block text-white/95 font-extrabold">{course.title}</span>
                  <span
                    className="block font-black mt-1"
                    style={{ color: course.highlightColor }}
                  >
                    {course.highlight}
                  </span>
                </h1>

                {/* Description */}
                <p
                  className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal"
                  data-testid="hero-subtext"
                >
                  {course.desc}
                </p>

                {/* Topic tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {course.topics.map((topic, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] sm:text-xs px-3 py-1 rounded-md bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-gray-200 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => handleEnroll(course)}
                    data-testid="hero-enroll-btn"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-[0_8px_24px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    onClick={() => handleExplore(course.slug)}
                    data-testid="hero-demo-btn"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 active:bg-white/5 border border-white/25 hover:border-white/40 backdrop-blur-sm transition-all duration-200 cursor-pointer"
                  >
                    <Play size={14} className="fill-white" />
                    <span>Explore Course</span>
                  </button>
                </div>

                {/* Rating & Social Proof Stats */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {"★★★★★".split("").map((star, sIdx) => (
                      <span key={sIdx} className="text-sm sm:text-base leading-none">
                        ★
                      </span>
                    ))}
                    <span className="font-bold text-white ml-1.5 text-sm">4.6</span>
                  </div>
                  <span className="text-gray-500 font-bold">·</span>
                  <span className="font-medium text-gray-200">25,000+ reviews</span>
                  <span className="text-gray-500 font-bold">·</span>
                  <span className="font-medium text-gray-200">8,000+ Certified</span>
                  <span className="text-gray-500 font-bold hidden md:inline">·</span>
                  <span className="font-medium text-gray-200 hidden md:inline">
                    200+ Brands Partnered
                  </span>
                </div>
              </div>

              {/* ---------- Right Visual Column (5 cols) ---------- */}
              <div className="lg:col-span-5 relative w-full flex items-center justify-center">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/15 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm">
                  {/* Visual Image */}
                  <img
                    src={course.image}
                    alt={course.highlight}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 pointer-events-none"
                    onError={(e) => {
                      if (course.fallbackImage && e.target.src !== course.fallbackImage) {
                        e.target.src = course.fallbackImage;
                      }
                    }}
                    loading={isActive ? "eager" : "lazy"}
                  />

                  {/* Dark subtle gradient overlay to ensure badge and chips contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Left Floating Tech Chips (Stacked Vertically) */}
                  <div className="absolute left-3.5 sm:left-4 top-4 sm:top-5 flex flex-col gap-2.5 z-20">
                    {course.chips.map((chip, cIdx) => (
                      <div
                        key={cIdx}
                        title={chip.label}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border border-white/60 dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
                      >
                        <TechChipIcon type={chip.type} label={chip.label} />
                      </div>
                    ))}
                  </div>

                  {/* Floating Badge (Bottom-Left) */}
                  <div className="absolute left-3.5 sm:left-5 bottom-3.5 sm:bottom-5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-900 dark:text-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.3)] border border-white/40 dark:border-white/10 flex items-center gap-3 z-20 max-w-[88%] sm:max-w-xs transition-transform hover:-translate-y-1 duration-300">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <BadgeIcon name={course.badge.icon} />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {course.badge.title}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">
                        {course.badge.subtitle}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- Navigation Arrows ---------- */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xl z-30 group"
      >
        <ChevronLeft size={22} className="transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xl z-30 group"
      >
        <ChevronRight size={22} className="transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* ---------- Indicator Dots ---------- */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {COURSES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? "w-8 bg-[#FF6B00] shadow-[0_0_12px_rgba(255,107,0,0.6)]"
                : "w-2 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
