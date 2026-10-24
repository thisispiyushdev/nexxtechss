import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import SEOHead from "../components/SEOHead";
import axios from "axios";
import { API_ROOT } from "../lib/apiConfig";
import MathCaptcha, { useMathCaptcha } from "../components/common/MathCaptcha";
import PhoneInputWithCountry, { validatePhone } from "../components/common/PhoneInputWithCountry";
import WorkshopSection from "../components/WorkshopSection";
import { 
  Linkedin, 
  Instagram, 
  ExternalLink, 
  Cpu, 
  Cloud, 
  GitBranch, 
  ShieldCheck, 
  CheckCircle2, 
  Send,
  Sparkles,
  ArrowRight,
  Terminal,
  MapPin,
  Clock,
  Award,
  Users,
  Building2,
  BookOpen,
  Quote,
  Layers,
  ZoomIn,
  X,
  GraduationCap,
  Briefcase,
  Target
} from "lucide-react";

// Institute Collage Photos with locations, tags and descriptions
const INSTITUTE_GALLERY = [
  {
    id: 1,
    src: "/campus/campus-1.webp",
    title: "High-Performance Workstation Lab",
    category: "labs",
    categoryLabel: "Advanced Lab",
    location: "Delhi Campus (Vikaspuri)",
    description: "Equipped with dual-monitor high-compute rigs specifically optimized for Cloud, MLOps, and Full Stack microservices development.",
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    id: 2,
    src: "/campus/campus-2.webp",
    title: "Smart Projection Coding Lecture Hall",
    category: "classrooms",
    categoryLabel: "Lecture Theatre",
    location: "Noida Campus (Sector 2)",
    description: "Spacious, air-conditioned lecture theatre with high-definition multi-screen coding projection and live instructor displays.",
    span: "col-span-1"
  },
  {
    id: 3,
    src: "/campus/campus-3.webp",
    title: "Collaborative Capstone Project Pods",
    category: "pods",
    categoryLabel: "Project Pod",
    location: "Delhi Campus (Vikaspuri)",
    description: "Dedicated team pods where students collaborate on real-world deployment pipelines, Docker clusters, and production-ready applications.",
    span: "col-span-1"
  },
  {
    id: 6,
    src: "/campus/campus-6.webp",
    title: "Live Technical Demonstrations & Code Review",
    category: "classrooms",
    categoryLabel: "Interactive Room",
    location: "Noida Campus (Sector 2)",
    description: "Senior faculty demonstrating live infrastructure deployments and conducting interactive peer code reviews.",
    span: "col-span-1"
  },
  {
    id: 7,
    src: "/campus/campus-7.webp",
    title: "Campus Community & Student Hackathons",
    category: "events",
    categoryLabel: "Campus Life",
    location: "Nexxtechs Campus Hub",
    description: "Mentors, tech leads, and students sharing milestone celebrations, alumni meetups, and tech workshops.",
    span: "col-span-1 md:col-span-2"
  },
  {
    id: 10,
    src: "/campus/campus-10.webp",
    title: "1-on-1 Faculty Mentorship & Doubt Desk",
    category: "pods",
    categoryLabel: "Mentorship",
    location: "Delhi Campus (Vikaspuri)",
    description: "Personalized guidance stations where senior trainers sit 1-on-1 with learners to debug code and review architectures.",
    span: "col-span-1"
  },
  {
    id: 11,
    src: "/campus/campus-11.webp",
    title: "Innovation Lounge & Peer Programming",
    category: "pods",
    categoryLabel: "Open Lounge",
    location: "Noida Campus (Sector 2)",
    description: "Open discussion spaces fostering peer programming, internal hackathons, and mock technical interview simulations.",
    span: "col-span-1"
  },
  {
    id: 12,
    src: "/campus/campus-12.webp",
    title: "Intensive Full Stack & DevOps Lab",
    category: "labs",
    categoryLabel: "DevOps Lab",
    location: "Delhi Campus (Vikaspuri)",
    description: "Ergonomic seating and dedicated power hubs ensuring seamless, full-day intensive hands-on bootcamps.",
    span: "col-span-1"
  },
  {
    id: 13,
    src: "/campus/campus-13.webp",
    title: "Cyber Security & Cloud Simulation Lab",
    category: "labs",
    categoryLabel: "Cyber Lab",
    location: "Noida Campus (Sector 2)",
    description: "Isolated networking topologies and cloud testbeds for simulated penetration testing and infrastructure ops.",
    span: "col-span-1"
  },
  {
    id: 15,
    src: "/campus/campus-15.webp",
    title: "AI & Machine Learning GPU Sandbox",
    category: "labs",
    categoryLabel: "AI Sandbox",
    location: "Noida Campus (Sector 2)",
    description: "GPU-accelerated lab environments optimized for training deep learning models, LLMs, and PyTorch pipelines.",
    span: "col-span-1"
  },
  {
    id: 20,
    src: "/campus/campus-20.webp",
    title: "Executive Seminar & Industry Keynote Hall",
    category: "events",
    categoryLabel: "Keynote Hall",
    location: "Delhi Campus (Vikaspuri)",
    description: "Multi-media presentation hall hosting industry guest speakers, hiring drives, and alumni workshops.",
    span: "col-span-1 md:col-span-2"
  }
];

const COURSE_OPTIONS = [
  "Cloud & MLOps Advisory (Founder Direct)",
  "DevOps with AWS & Kubernetes",
  "Diploma in Cloud Computing",
  "AI & Generative AI Bootcamp",
  "Full Stack AI & Machine Learning",
  "Data Science & Advanced Analytics",
  "Java Full Stack Developer",
  "Python Full Stack with Gen AI",
  "Cyber Security & Ethical Hacking",
  "Diploma in Cyber Security",
  "Data Structures & Algorithms",
  "UI/UX Design Masterclass",
  "Digital Marketing Masterclass",
  "Campus Visit / Counseling Session",
  "General Institute Enquiry"
];

// Motion animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export default function AboutUsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const savedBranch = typeof window !== 'undefined' ? sessionStorage.getItem('active_branch') : null;
  const isNoida = location.pathname.includes("noida") || searchParams.get("branch") === "noida" || savedBranch === "noida";

  const LINKEDIN_ADITYA = "https://www.linkedin.com/in/aditya-sharma-538391283/";
  const INSTAGRAM_ADITYA = "https://www.instagram.com/aadityaa.parashar/";
  const LINKEDIN_NITISH = "https://in.linkedin.com/in/nitish-kaushal46";
  const LINKEDIN_MEGHESH = "https://www.linkedin.com/in/meghesh-kumar-984333246/";

  // Portrait hover color states
  const [isAdityaHovered, setIsAdityaHovered] = useState(false);
  const [isNitishHovered, setIsNitishHovered] = useState(false);
  const [isMegheshHovered, setIsMegheshHovered] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Gallery filter
  const [activeCategory, setActiveCategory] = useState("all");

  // Contact / Enquiry Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course_interested: "Campus Visit / Counseling Session",
    branch: isNoida ? "Nexxtechs Noida" : "Nexxtechs Delhi",
    message: ""
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Sync default branch when isNoida updates
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      branch: isNoida ? "Nexxtechs Noida" : prev.branch || "Nexxtechs Delhi"
    }));
  }, [isNoida]);

  const {
    problem: mathProblem,
    userAnswer: mathAnswer,
    setUserAnswer: setMathAnswer,
    error: mathError,
    refreshProblem: refreshMathProblem,
    validateCaptcha,
  } = useMathCaptcha();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.course_interested || !form.branch) {
      setFormError("Please fill in all required fields (Name, Phone, Course, Branch).");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(form.name.trim())) {
      setFormError("Name should only contain letters and spaces.");
      return;
    }

    const phoneVal = validatePhone(form.phone, countryCode);
    if (!phoneVal.isValid) {
      setFormError(phoneVal.error);
      return;
    }

    if (!validateCaptcha()) {
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_ROOT}/enquiry`, {
        name: form.name.trim(),
        phone: phoneVal.cleanPhone,
        course_interested: form.course_interested,
        branch: form.branch,
        source: isNoida ? "About Us Page (Noida Hub) - Nexxtechs" : "About Us Page - Nexxtechs"
      });

      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        setForm({
          name: "",
          phone: "",
          email: "",
          course_interested: "Campus Visit / Counseling Session",
          branch: isNoida ? "Nexxtechs Noida" : "Nexxtechs Delhi",
          message: ""
        });
        refreshMathProblem();
      } else {
        throw new Error("Backend storage failed");
      }
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setFormError(
        err.response?.data?.errors?.[0]?.message || 
        err.response?.data?.error || 
        "Failed to save enquiry to main database. Please check connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredGallery = activeCategory === "all" 
    ? INSTITUTE_GALLERY 
    : INSTITUTE_GALLERY.filter(item => item.category === activeCategory);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Nexxtechs",
    "url": isNoida ? "https://www.nexxtechs.com/about-us?branch=noida" : "https://www.nexxtechs.com/about-us",
    "logo": "https://www.nexxtechs.com/assets/logo_black.webp",
    "description": "Nexxtechs is a premier IT and software training institute in Delhi and Noida, founded by Aditya Sharma, Nitish Kaushal, and Meghesh Kumar. Offering industry-grade hands-on training in Cloud Computing, DevOps, Full Stack AI, Cyber Security, and Data Science.",
    "founders": [
      {
        "@type": "Person",
        "name": "Aditya Sharma",
        "jobTitle": "Founder & CEO",
        "url": "https://www.nexxtechs.com/about-founder",
        "sameAs": [LINKEDIN_ADITYA, INSTAGRAM_ADITYA]
      },
      {
        "@type": "Person",
        "name": "Nitish Kaushal",
        "jobTitle": "Founder & Director",
        "sameAs": [LINKEDIN_NITISH]
      },
      {
        "@type": "Person",
        "name": "Meghesh Kumar",
        "jobTitle": "Founder & Cybersecurity Specialist",
        "sameAs": [LINKEDIN_MEGHESH]
      }
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "B-136 Upper, Ground floor, Sector 2",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201301",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "B-54 Krishna Park, Vikaspuri",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110018",
        "addressCountry": "IN"
      }
    ]
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#84CC16] selection:text-black pt-6 md:pt-10 pb-24 md:pb-32 overflow-x-hidden">
        <SEOHead
          title={isNoida 
            ? "About Nexxtechs Noida – Premier IT Training Institute Sector 2 Noida" 
            : "About Us – Best IT Training Institute in Delhi & Noida | Nexxtechs"}
          description="Learn about Nexxtechs, premier technology training institute in Delhi NCR founded by Aditya Sharma, Nitish Kaushal, and Meghesh Kumar. Explore our vision, founder words, industry labs, hands-on technical workshops, and real-world pedagogy."
          canonical={isNoida ? "/about-us?branch=noida" : "/about-us"}
          ogImage="/campus/campus-1.webp"
          keywords="About Nexxtechs, IT Training Institute Delhi, IT Training Institute Noida, Aditya Sharma Nexxtechs, Nitish Kaushal Nexxtechs, Meghesh Kumar Nexxtechs, Founder Nexxtechs, Cybersecurity Specialist, Cloud Computing Institute, DevOps Training Institute, Nexxtechs Campuses"
          jsonLd={structuredData}
        />

        {/* Google Font for Signatures */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" 
        />

        {/* ============================================================== */}
        {/* SECTION 1: Exact 3-Column Editorial Hero Layout (Borderless)   */}
        {/* ============================================================== */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-4 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            
            {/* 1. Institute Introduction — Left Column (5 cols) */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 space-y-6"
            >
              
              {/* Large Two-line Heading */}
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-black">
                About Our<br />
                <span className="text-[#84CC16]">{isNoida ? "Noida Hub" : "Institute"}</span>
              </motion.h1>

              {/* Mission & Story Paragraphs */}
              <motion.div variants={fadeInUp} className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed pt-2">
                <p>
                  Nexxtechs is a premier technology training institute and engineering accelerator headquartered in Delhi NCR. Founded on the principle of practical excellence, we bridge the gap between traditional textbook education and high-scale production engineering.
                </p>
                <p>
                  {isNoida 
                    ? "Our Noida campus (Sector 2) serves as a dedicated innovation corridor equipped with high-compute labs, smart coding projection rooms, and dedicated AI/ML sandboxes right at the heart of Noida's IT ecosystem."
                    : "With state-of-the-art innovation hubs in Vikaspuri (Delhi) and Sector 2 (Noida), we provide immersive, mentor-led programs across Cloud Computing, DevOps, MLOps, Full Stack AI, Cyber Security, and Data Science. Our students build and deploy live production systems, earning industry respect and top placement packages."}
                </p>
              </motion.div>

              {/* Campus Highlights Badges (Borderless Pill Styling) */}
              <motion.div variants={fadeInUp} className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                {isNoida ? (
                  <>
                    <span className="px-3.5 py-1.5 bg-gray-100 text-gray-800 font-semibold rounded-full flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#84CC16]" /> Noida Campus (Sector 2)
                    </span>
                    <span className="px-3.5 py-1.5 bg-gray-100 text-gray-700 rounded-full flex items-center gap-1.5">
                      <MapPin size={13} className="text-gray-400" /> Delhi Flagship (Vikaspuri)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-3.5 py-1.5 bg-gray-100 text-gray-800 rounded-full flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#84CC16]" /> Delhi Campus (Vikaspuri)
                    </span>
                    <span className="px-3.5 py-1.5 bg-gray-100 text-gray-800 rounded-full flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#84CC16]" /> Noida Campus (Sector 2)
                    </span>
                  </>
                )}
              </motion.div>

              {/* Action Buttons with Framer Motion hover & tap */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-3">
                <motion.a
                  href="#founders-section"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-4 bg-black text-white hover:bg-[#84CC16] hover:text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-black/10 transition-colors duration-200 cursor-pointer"
                >
                  <span>Meet Our Founders</span>
                  <ArrowRight size={15} className="text-[#84CC16] group-hover:text-black" />
                </motion.a>

                <motion.a
                  href="#institute-collage"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-4 bg-gray-100 hover:bg-[#84CC16]/20 text-gray-900 font-mono text-xs font-semibold tracking-wider rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  <span>View Campus Gallery</span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* 2. Institute Hero Photo — Center Column (4 cols) with Framer Motion spring physics & Borderless Rounded Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex justify-center py-4 lg:py-0"
            >
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative inline-block max-w-[360px] sm:max-w-[420px] lg:max-w-none w-full group cursor-pointer"
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
              >
                {/* Flat lime-green rectangular accent block: z-0 keeps it visible */}
                <div 
                  className={`absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 w-full h-full bg-[#84CC16] rounded-3xl z-0 transition-transform duration-300 pointer-events-none ${isHeroHovered ? "translate-x-2 translate-y-2" : ""}`} 
                  aria-hidden="true"
                />

                {/* Institute Hero Image: Borderless rounded-3xl with smooth shadow */}
                <div className="relative z-10 rounded-3xl bg-white shadow-2xl overflow-hidden">
                  <img
                    src={isNoida ? "/campus/campus-2.webp" : "/campus/campus-1.webp"}
                    alt="Nexxtechs Advanced IT Lab - Dual Monitor Cloud & MLOps Rigs"
                    width={896}
                    height={600}
                    className="w-full h-auto object-cover block [filter:grayscale(100%)] hover:[filter:grayscale(0%)] group-hover:[filter:grayscale(0%)] transition-all duration-500 cursor-pointer"
                    loading="eager"
                  />
                  <div className="p-4 bg-black text-white text-[11px] font-mono flex items-center justify-between">
                    <span className="text-[#84CC16] font-bold">
                      {isNoida ? "NOIDA TECH HUB (SECTOR 2)" : "CAMPUS COMMAND CENTER"}
                    </span>
                    <span className="text-gray-400">DELHI &amp; NOIDA</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* 3. Editorial Details — Far Right Column (3 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="lg:col-span-3 space-y-7 pl-0 lg:pl-4 xl:pl-6"
            >
              
              {/* Category Pills */}
              <div className="space-y-2 text-xs sm:text-[13px] font-mono font-bold tracking-[0.25em] uppercase text-gray-900">
                <div className="hover:text-[#84CC16] transition-colors cursor-default">PRACTICAL MASTERY</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">PRODUCTION LABS</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">DIRECT MENTORSHIP</div>
              </div>

              {/* Progression Steps */}
              <div className="space-y-2.5 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-gray-500">
                <div className="hover:text-[#84CC16] transition-colors cursor-default">01. ARCHITECT</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">02. DEPLOY LIVE</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">03. DEBUG IN PROD</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default text-gray-900 font-bold">04. LAUNCH CAREER</div>
              </div>

              {/* Subtle Light-Gray Quote Card (Borderless with soft shadow) */}
              <motion.div 
                whileHover={{ y: -3 }}
                className="p-6 bg-gray-50/90 rounded-2xl shadow-sm relative overflow-hidden"
              >
                <div className="w-1.5 h-8 bg-[#84CC16] absolute top-4 left-0 rounded-r-full" />
                <p className="text-xs text-gray-600 italic leading-relaxed font-serif pl-2">
                  “We do not teach syntax from slides. We build engineers through live production clusters and real-world architectures.”
                </p>
                <div className="mt-3 text-[10px] font-mono uppercase tracking-wider text-gray-500 font-bold pl-2">
                  — The Nexxtechs Creed
                </div>
              </motion.div>

            </motion.div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 2: Key Milestones & Institutional Impact Numbers       */}
        {/* ============================================================== */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="p-7 sm:p-9 bg-gray-50/80 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(132,204,22,0.12)] relative group transition-all duration-300 overflow-hidden"
            >
              <div className="w-full h-1 bg-gradient-to-r from-[#84CC16] to-[#a3e635] absolute top-0 left-0" />
              <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">10,000+</div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Minds Mentored</div>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Students, graduates, and working tech professionals trained and transitioned into high-package roles.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="p-7 sm:p-9 bg-gray-50/80 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(132,204,22,0.12)] relative group transition-all duration-300 overflow-hidden"
            >
              <div className="w-full h-1 bg-gradient-to-r from-[#84CC16] to-[#a3e635] absolute top-0 left-0" />
              <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">350+</div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Hiring Partners</div>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Tier-1 tech companies, MNCs, fintech leaders, and high-growth startups actively hiring from Nexxtechs.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="p-7 sm:p-9 bg-gray-50/80 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(132,204,22,0.12)] relative group transition-all duration-300 overflow-hidden"
            >
              <div className="w-full h-1 bg-gradient-to-r from-[#84CC16] to-[#a3e635] absolute top-0 left-0" />
              <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">94.6%</div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Placement Success</div>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Dedicated placement cell with personalized portfolio curation, resume building, and mock technical rounds.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="p-7 sm:p-9 bg-gray-50/80 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(132,204,22,0.12)] relative group transition-all duration-300 overflow-hidden"
            >
              <div className="w-full h-1 bg-gradient-to-r from-[#84CC16] to-[#a3e635] absolute top-0 left-0" />
              <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">2 Campuses</div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Delhi NCR Centers</div>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Prime locations in Vikaspuri (West Delhi) and Sector 2 (Noida) featuring high-compute workstation labs.
              </p>
            </motion.div>

          </motion.div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 3: The Founders — Leadership (Borderless Dual Cards)   */}
        {/* ============================================================== */}
        <section id="founders-section" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
                Meet Our <span className="text-[#84CC16]">Founders</span>
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
              Led by visionary technologists and industry pioneers, Nexxtechs is built to deliver world-class practical engineering excellence.
            </p>
          </motion.div>

          {/* FOUNDERS SHOWCASE: 3-column responsive grid with Framer Motion slide-in */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* ================= FOUNDER 1: ADITYA SHARMA ================= */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="bg-gray-50/70 rounded-3xl p-7 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] flex flex-col justify-between relative group transition-all duration-300 overflow-hidden"
            >
              <div className="w-full h-1 bg-gradient-to-r from-[#84CC16] to-[#a3e635] absolute top-0 left-0" />
              
              <div className="space-y-6">
                {/* Portrait with Flat Green Offset Accent Block */}
                <div className="flex justify-center sm:justify-start">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative inline-block max-w-[280px] sm:max-w-[300px] w-full group cursor-pointer"
                    onMouseEnter={() => setIsAdityaHovered(true)}
                    onMouseLeave={() => setIsAdityaHovered(false)}
                  >
                    {/* Lime offset block */}
                    <div 
                      className={`absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 w-full h-full bg-[#84CC16] rounded-2xl z-0 transition-transform duration-300 pointer-events-none ${isAdityaHovered ? "translate-x-2 translate-y-2" : ""}`} 
                      aria-hidden="true"
                    />

                    {/* Image with grayscale hover */}
                    <div className="relative z-10 w-full h-[320px] sm:h-[350px] overflow-hidden rounded-2xl bg-white shadow-lg">
                      <img
                        src="/trainer/aditya-sharma-white.webp"
                        alt="Aditya Sharma - Founder & CEO of Nexxtechs"
                        width={896}
                        height={1200}
                        className="w-full h-full object-cover block [filter:grayscale(100%)] hover:[filter:grayscale(0%)] group-hover:[filter:grayscale(0%)] transition-all duration-500 cursor-pointer"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Title & Bio */}
                <div>
                  <div className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#65A30D]">
                    FOUNDER &amp; CHIEF EXECUTIVE OFFICER (CEO)
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-1">
                    Aditya Sharma
                  </h3>
                  <div className="text-xs font-mono text-gray-500 tracking-wider uppercase mt-1">
                    Cloud Architect &nbsp;•&nbsp; MLOps &amp; DevOps Specialist &nbsp;•&nbsp; Tech Educator
                  </div>
                </div>

                <p className="text-gray-600 text-sm sm:text-[14.5px] leading-relaxed">
                  Aditya Sharma is the CEO and founder of Nexxtechs. With over a decade of hands-on experience designing distributed cloud architectures, GitOps deployment engines, and high-throughput MLOps pipelines, he has spearheaded technological transformations for enterprise teams across India and abroad.
                </p>

                <p className="text-gray-600 text-sm sm:text-[14.5px] leading-relaxed">
                  Recognizing that academia had drifted far away from production realities, Aditya architected Nexxtechs to make enterprise-grade tech education accessible through hands-on terminal mastery and real production deployments.
                </p>

                {/* Key Domains (Borderless chips) */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <div className="text-[11px] font-mono font-bold text-black uppercase">Cloud Architecture</div>
                    <div className="text-[9.5px] text-gray-500 mt-0.5">AWS &amp; Azure Multi-Region</div>
                  </div>
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <div className="text-[11px] font-mono font-bold text-black uppercase">Production MLOps</div>
                    <div className="text-[9.5px] text-gray-500 mt-0.5">Kubeflow &amp; MLflow</div>
                  </div>
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <div className="text-[11px] font-mono font-bold text-black uppercase">GitOps &amp; IaC</div>
                    <div className="text-[9.5px] text-gray-500 mt-0.5">Kubernetes &amp; Terraform</div>
                  </div>
                </div>
              </div>

              {/* Sign-off & Social Links */}
              <div className="pt-6 mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div 
                    className="text-3xl text-gray-900 select-none tracking-wide"
                    style={{ fontFamily: "'Dancing Script', cursive, serif" }}
                  >
                    Aditya Sharma
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-gray-500 font-bold">
                    FOUNDER &amp; CEO, NEXXTECHS
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <motion.a
                    href={LINKEDIN_ADITYA}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-gray-800 text-xs font-mono font-semibold tracking-wider rounded-xl shadow-sm hover:shadow hover:bg-[#84CC16] hover:text-black transition-colors"
                    aria-label="Aditya Sharma on LinkedIn"
                  >
                    <Linkedin size={13} className="text-[#84CC16] group-hover:text-black" />
                    <span>LINKEDIN</span>
                  </motion.a>

                  <motion.a
                    href={INSTAGRAM_ADITYA}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-gray-800 text-xs font-mono font-semibold tracking-wider rounded-xl shadow-sm hover:shadow hover:bg-[#84CC16] hover:text-black transition-colors"
                    aria-label="Aditya Sharma on Instagram"
                  >
                    <Instagram size={13} className="text-[#84CC16] group-hover:text-black" />
                    <span>INSTAGRAM</span>
                  </motion.a>

                  <Link
                    to="/about-founder"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-black hover:text-[#84CC16] underline underline-offset-4 transition-colors ml-1"
                  >
                    <span>Full Bio</span>
                    <ExternalLink size={11} />
                  </Link>
                </div>
              </div>

            </motion.div>

            {/* ================= FOUNDER 2: NITISH KAUSHAL ================= */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-gray-50/70 rounded-3xl p-7 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] flex flex-col justify-between relative group transition-all duration-300 overflow-hidden"
            >
              <div className="w-full h-1 bg-gradient-to-r from-[#84CC16] to-[#a3e635] absolute top-0 left-0" />
              
              <div className="space-y-6">
                {/* Portrait with Flat Green Offset Accent Block */}
                <div className="flex justify-center sm:justify-start">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative inline-block max-w-[280px] sm:max-w-[300px] w-full group cursor-pointer"
                    onMouseEnter={() => setIsNitishHovered(true)}
                    onMouseLeave={() => setIsNitishHovered(false)}
                  >
                    {/* Lime offset block */}
                    <div 
                      className={`absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 w-full h-full bg-[#84CC16] rounded-2xl z-0 transition-transform duration-300 pointer-events-none ${isNitishHovered ? "translate-x-2 translate-y-2" : ""}`} 
                      aria-hidden="true"
                    />

                    {/* Image container: clean rectangular crop without outer borders */}
                    <div className="relative z-10 w-full h-[320px] sm:h-[350px] overflow-hidden rounded-2xl bg-white shadow-lg">
                      <img
                        src="/trainer/nitish-kaushal.png"
                        alt="Nitish Kaushal - Founder & Director of Nexxtechs"
                        width={421}
                        height={458}
                        className="w-full h-full object-cover scale-[1.14] origin-center block [filter:grayscale(100%)] hover:[filter:grayscale(0%)] group-hover:[filter:grayscale(0%)] transition-all duration-500 cursor-pointer"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Title & Bio */}
                <div>
                  <div className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#65A30D]">
                    FOUNDER &amp; DIRECTOR
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-1">
                    Nitish Kaushal
                  </h3>
                  <div className="text-xs font-mono text-gray-500 tracking-wider uppercase mt-1">
                    Institutional Strategy &nbsp;•&nbsp; Corporate Alliances &nbsp;•&nbsp; Talent Development
                  </div>
                </div>

                <p className="text-gray-600 text-sm sm:text-[14.5px] leading-relaxed">
                  Nitish Kaushal is the Founder and Director of Nexxtechs. Guiding institutional growth, corporate partnerships, and operational excellence, he has been instrumental in establishing Nexxtechs as Delhi NCR’s leading career-oriented technology institute.
                </p>

                <p className="text-gray-600 text-sm sm:text-[14.5px] leading-relaxed">
                  With an unwavering focus on student outcomes, Nitish spearheads the corporate placement network of 350+ hiring partners, campus expansions across Delhi and Noida, and industry alignment programs that connect learners directly with recruiters and technology executives.
                </p>

                {/* Key Domains (Borderless chips) */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <div className="text-[11px] font-mono font-bold text-black uppercase">Institutional Strategy</div>
                    <div className="text-[9.5px] text-gray-500 mt-0.5">Scale &amp; Operations</div>
                  </div>
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <div className="text-[11px] font-mono font-bold text-black uppercase">Corporate Alliances</div>
                    <div className="text-[9.5px] text-gray-500 mt-0.5">350+ Hiring Tie-ups</div>
                  </div>
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <div className="text-[11px] font-mono font-bold text-black uppercase">Talent Placement</div>
                    <div className="text-[9.5px] text-gray-500 mt-0.5">Career Acceleration</div>
                  </div>
                </div>
              </div>

              {/* Sign-off & Social Links */}
              <div className="pt-6 mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div 
                    className="text-3xl text-gray-900 select-none tracking-wide"
                    style={{ fontFamily: "'Dancing Script', cursive, serif" }}
                  >
                    Nitish Kaushal
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-gray-500 font-bold">
                    FOUNDER &amp; DIRECTOR, NEXXTECHS
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <motion.a
                    href={LINKEDIN_NITISH}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-800 text-xs font-mono font-semibold tracking-wider rounded-xl shadow-sm hover:shadow hover:bg-[#84CC16] hover:text-black transition-colors"
                    aria-label="Nitish Kaushal on LinkedIn"
                  >
                    <Linkedin size={14} className="text-[#84CC16] group-hover:text-black" />
                    <span>DIRECT LINKEDIN</span>
                    <ExternalLink size={11} className="text-gray-400 group-hover:text-black" />
                  </motion.a>
                </div>
              </div>

            </motion.div>

            {/* ================= FOUNDER 3: MEGHESH KUMAR ================= */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="bg-gray-50/70 rounded-3xl p-7 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] flex flex-col justify-between relative group transition-all duration-300 overflow-hidden"
            >
              <div className="w-full h-1 bg-gradient-to-r from-[#84CC16] to-[#a3e635] absolute top-0 left-0" />
              
              <div className="space-y-6">
                {/* Portrait with Flat Green Offset Accent Block */}
                <div className="flex justify-center sm:justify-start">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative inline-block max-w-[280px] sm:max-w-[300px] w-full group cursor-pointer"
                    onMouseEnter={() => setIsMegheshHovered(true)}
                    onMouseLeave={() => setIsMegheshHovered(false)}
                  >
                    {/* Lime offset block */}
                    <div 
                      className={`absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 w-full h-full bg-[#84CC16] rounded-2xl z-0 transition-transform duration-300 pointer-events-none ${isMegheshHovered ? "translate-x-2 translate-y-2" : ""}`} 
                      aria-hidden="true"
                    />

                    {/* Image with grayscale hover */}
                    <div className="relative z-10 w-full h-[320px] sm:h-[350px] overflow-hidden rounded-2xl bg-white shadow-lg">
                      <img
                        src="/trainer/meghesh-kumar.webp"
                        alt="Meghesh Kumar - Founder & Cybersecurity Specialist of Nexxtechs"
                        width={800}
                        height={800}
                        className="w-full h-full object-cover block [filter:grayscale(100%)] hover:[filter:grayscale(0%)] group-hover:[filter:grayscale(0%)] transition-all duration-500 cursor-pointer"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Title & Bio */}
                <div>
                  <div className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#65A30D]">
                    FOUNDER &amp; CYBERSECURITY SPECIALIST
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-1">
                    Meghesh Kumar
                  </h3>
                  <div className="text-xs font-mono text-gray-500 tracking-wider uppercase mt-1">
                    Ethical Hacking &nbsp;•&nbsp; SOC Operations &nbsp;•&nbsp; Threat Defense
                  </div>
                </div>

                <p className="text-gray-600 text-sm sm:text-[14.5px] leading-relaxed">
                  Meghesh Kumar is the Founder and Cybersecurity Specialist at Nexxtechs. With deep expertise spanning offensive security, penetration testing, threat hunting, and enterprise vulnerability management, he spearheads the cybersecurity curriculum and real-world defense training labs across Nexxtechs campuses.
                </p>

                <p className="text-gray-600 text-sm sm:text-[14.5px] leading-relaxed">
                  Holding premier certifications including CEH and CCNA, Meghesh focuses on empowering students to navigate real-world attack vectors, conduct red-team simulations, and safeguard mission-critical infrastructures against modern digital threats.
                </p>

                {/* Key Domains (Borderless chips) */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <div className="text-[11px] font-mono font-bold text-black uppercase">Offensive Security</div>
                    <div className="text-[9.5px] text-gray-500 mt-0.5">CEH &amp; Pentesting</div>
                  </div>
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <div className="text-[11px] font-mono font-bold text-black uppercase">Network Defense</div>
                    <div className="text-[9.5px] text-gray-500 mt-0.5">CCNA &amp; SOC Ops</div>
                  </div>
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <div className="text-[11px] font-mono font-bold text-black uppercase">Threat Hunting</div>
                    <div className="text-[9.5px] text-gray-500 mt-0.5">SIEM &amp; Forensics</div>
                  </div>
                </div>
              </div>

              {/* Sign-off & Social Links */}
              <div className="pt-6 mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div 
                    className="text-3xl text-gray-900 select-none tracking-wide"
                    style={{ fontFamily: "'Dancing Script', cursive, serif" }}
                  >
                    Meghesh Kumar
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-gray-500 font-bold">
                    FOUNDER &amp; CYBERSECURITY SPECIALIST, NEXXTECHS
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <motion.a
                    href={LINKEDIN_MEGHESH}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-800 text-xs font-mono font-semibold tracking-wider rounded-xl shadow-sm hover:shadow hover:bg-[#84CC16] hover:text-black transition-colors"
                    aria-label="Meghesh Kumar on LinkedIn"
                  >
                    <Linkedin size={14} className="text-[#84CC16] group-hover:text-black" />
                    <span>DIRECT LINKEDIN</span>
                    <ExternalLink size={11} className="text-gray-400 group-hover:text-black" />
                  </motion.a>
                </div>
              </div>

            </motion.div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 4: Words from Our Founders (Unified Leadership Vision) */}
        {/* ============================================================== */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gray-50/90 border border-gray-200/80 rounded-3xl p-8 sm:p-14 lg:p-16 shadow-sm overflow-hidden"
          >
            <div className="w-full h-1.5 bg-gradient-to-r from-[#84CC16] via-[#a3e635] to-[#84CC16] absolute top-0 left-0" />

            <div className="relative z-10 max-w-5xl space-y-8">
              
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900">
                  Words from <span className="text-[#84CC16]">Our Founders</span>
                </h2>
              </div>

              {/* Dual / Triple Quote Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
                
                {/* Words from Aditya Sharma */}
                <div className="space-y-4 p-6 sm:p-8 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold text-[#65A30D] uppercase tracking-wider">
                      ADITYA SHARMA — PRACTICAL ENGINEERING
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base font-serif italic leading-relaxed">
                      “Theory will never solve a production Kubernetes outage or an automated CI/CD pipeline failure. Real tech companies do not hire certificates—they hire people who can sit down at a terminal, understand distributed systems, write clean resilient code, and deploy without breaking production. At Nexxtechs, every lesson is code in production.”
                    </p>
                  </div>
                  <div className="pt-2">
                    <div 
                      className="text-2xl text-gray-900 select-none"
                      style={{ fontFamily: "'Dancing Script', cursive, serif" }}
                    >
                      Aditya Sharma
                    </div>
                    <div className="text-[10px] font-mono text-[#65A30D] uppercase tracking-wider font-bold">
                      FOUNDER &amp; CEO
                    </div>
                  </div>
                </div>

                {/* Words from Nitish Kaushal */}
                <div className="space-y-4 p-6 sm:p-8 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold text-[#65A30D] uppercase tracking-wider">
                      NITISH KAUSHAL — CAREER ACCELERATION
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base font-serif italic leading-relaxed">
                      “Our commitment to students goes far beyond classroom training—it is about genuine career transformation. We hold daily doubt desks, simulate tough technical interviews, and connect learners directly with 350+ corporate hiring partners who value real problem-solvers. Your growth is our singular metric of success.”
                    </p>
                  </div>
                  <div className="pt-2">
                    <div 
                      className="text-2xl text-gray-900 select-none"
                      style={{ fontFamily: "'Dancing Script', cursive, serif" }}
                    >
                      Nitish Kaushal
                    </div>
                    <div className="text-[10px] font-mono text-[#65A30D] uppercase tracking-wider font-bold">
                      FOUNDER &amp; DIRECTOR
                    </div>
                  </div>
                </div>

                {/* Words from Meghesh Kumar */}
                <div className="space-y-4 p-6 sm:p-8 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold text-[#65A30D] uppercase tracking-wider">
                      MEGHESH KUMAR — OFFENSIVE SECURITY &amp; DEFENSE
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base font-serif italic leading-relaxed">
                      “In modern cybersecurity, passive textbook theory cannot stop a live zero-day breach or a stealth ransomware outbreak. Defense demands understanding the adversary—mastering packet inspection, reconnaissance, threat hunting, and defensive telemetry. At Nexxtechs, we train security engineers to think like elite ethical hackers and defend mission-critical systems with unwavering confidence.”
                    </p>
                  </div>
                  <div className="pt-2">
                    <div 
                      className="text-2xl text-gray-900 select-none"
                      style={{ fontFamily: "'Dancing Script', cursive, serif" }}
                    >
                      Meghesh Kumar
                    </div>
                    <div className="text-[10px] font-mono text-[#65A30D] uppercase tracking-wider font-bold">
                      FOUNDER &amp; CYBERSECURITY SPECIALIST
                    </div>
                  </div>
                </div>

              </div>

              {/* 3 Core Tenets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div className="space-y-1.5 p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm">
                  <div className="text-xs font-mono font-bold text-[#65A30D] uppercase tracking-wider">
                    01. LIVE PROD CODE
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    Zero useless slide theory. Every concept is accompanied by live deployments on AWS, Docker &amp; Kubernetes.
                  </p>
                </div>
                <div className="space-y-1.5 p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm">
                  <div className="text-xs font-mono font-bold text-[#65A30D] uppercase tracking-wider">
                    02. PRACTITIONER MENTORS
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    Taught directly by active Cloud Architects, DevOps Engineers, and AI Leads with decades of combined experience.
                  </p>
                </div>
                <div className="space-y-1.5 p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm">
                  <div className="text-xs font-mono font-bold text-[#65A30D] uppercase tracking-wider">
                    03. OUTCOME OBSESSED
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    100% focused on interview conversion, package growth, and transforming students into day-one contributors.
                  </p>
                </div>
              </div>

            </div>

          </motion.div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 5: Institute Photo Collage (Direct User Requirement)  */}
        {/* ============================================================== */}
        <section id="institute-collage" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          
          {/* Collage Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10"
          >
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
                Institute <span className="text-[#84CC16]">Photo Collage</span>
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
              A glimpse inside our high-compute workstation labs, smart projection classrooms, project pods, and mentorship hubs across Delhi &amp; Noida.
            </p>
          </motion.div>

          {/* Category Filter Tabs (Borderless Pill Buttons) */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {[
              { id: "all", label: "All Spaces" },
              { id: "labs", label: "High-Compute Labs" },
              { id: "classrooms", label: "Smart Classrooms" },
              { id: "pods", label: "Mentorship & Project Pods" },
              { id: "events", label: "Campus Life & Keynotes" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-[#84CC16] text-black shadow-md shadow-[#84CC16]/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Collage Grid Layout (Borderless cards with smooth shadow & scale hover) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <AnimatePresence>
              {filteredGallery.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative overflow-hidden rounded-3xl bg-gray-100 shadow-sm hover:shadow-2xl ${item.span || ""}`}
                >
                  {/* Photo with grayscale to color hover */}
                  <div className="relative aspect-[4/3] w-full h-full min-h-[220px] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-500 [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-105"
                    />
                    
                    {/* Dark gradient overlay for text readability on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white" />

                    {/* Top Location Badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-[10px] font-mono text-[#84CC16] font-bold uppercase tracking-wider">
                        {item.categoryLabel}
                      </span>
                    </div>

                    {/* Bottom Content overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-5 z-10 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-[10px] font-mono text-gray-300 flex items-center gap-1 mb-1">
                        <MapPin size={11} className="text-[#84CC16]" />
                        <span>{item.location}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#84CC16] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-300 mt-1 line-clamp-2 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </section>

        {/* ============================================================== */}
        {/* SECTION 5.5: Live Technical Workshops & Masterclasses (Collage)*/}
        {/* ============================================================== */}
        <WorkshopSection />

        {/* ============================================================== */}
        {/* SECTION 6: Core Pillars (Borderless Modern Cards)              */}
        {/* ============================================================== */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                Why Serious Learners Choose Nexxtechs
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-md mt-4 md:mt-0 leading-relaxed">
              We engineered our curriculum, labs, and mentorship ecosystem to mirror enterprise engineering environments from day one.
            </p>
          </motion.div>

          {/* 4 Architectural Cards (Borderless with soft shadows and lift) */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            
            {/* Card 1 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="p-8 bg-gray-50/80 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(132,204,22,0.12)] transition-all duration-300 relative group overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/15 flex items-center justify-center text-[#65A30D] mb-5 group-hover:bg-[#84CC16] group-hover:text-black transition-colors duration-200">
                <Terminal size={22} />
              </div>
              <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                Enterprise Workstation Labs
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Dual-monitor setups, dedicated cloud testbeds, and isolated simulation sandbox clusters configured for intensive daily engineering bootcamps.
              </p>
              <div className="mt-5 pt-4 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">Dual Screens</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">Linux / macOS</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">AWS / Azure</span>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="p-8 bg-gray-50/80 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(132,204,22,0.12)] transition-all duration-300 relative group overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/15 flex items-center justify-center text-[#65A30D] mb-5 group-hover:bg-[#84CC16] group-hover:text-black transition-colors duration-200">
                <Users size={22} />
              </div>
              <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                1-on-1 Faculty Mentorship
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Dedicated faculty doubt-solving desks where students sit 1-on-1 with senior architects to review code, troubleshoot errors, and optimize codebases.
              </p>
              <div className="mt-5 pt-4 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">Daily Doubt Hours</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">Code Reviews</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">Personalized</span>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="p-8 bg-gray-50/80 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(132,204,22,0.12)] transition-all duration-300 relative group overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/15 flex items-center justify-center text-[#65A30D] mb-5 group-hover:bg-[#84CC16] group-hover:text-black transition-colors duration-200">
                <Award size={22} />
              </div>
              <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                Guaranteed Placement Drive
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Rigorous mock technical interviews, LinkedIn profile optimization, Github portfolio architecture, and direct interview pipelines with 350+ hiring partners.
              </p>
              <div className="mt-5 pt-4 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">350+ Partners</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">Mock Tech Rounds</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">HR Prep</span>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="p-8 bg-gray-50/80 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(132,204,22,0.12)] transition-all duration-300 relative group overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/15 flex items-center justify-center text-[#65A30D] mb-5 group-hover:bg-[#84CC16] group-hover:text-black transition-colors duration-200">
                <Layers size={22} />
              </div>
              <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                Real Capstone Projects
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every learner completes production-ready applications: multi-tier e-commerce with microservices, LLM rag agents, or end-to-end GitOps pipelines.
              </p>
              <div className="mt-5 pt-4 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">Dockerized</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">Cloud Deployed</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">Tested in Prod</span>
              </div>
            </motion.div>

          </motion.div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 7: Our Campuses (Borderless Modern Cards)              */}
        {/* ============================================================== */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
              Our Physical Campuses
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Easily accessible via Delhi Metro, featuring secure parking, high-speed fiber internet, and student recreation areas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Noida Campus Card (Prioritized on Noida view, borderless with smooth shadow) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5 }}
              className={`p-8 sm:p-10 rounded-3xl relative transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(132,204,22,0.12)] overflow-hidden ${
                isNoida ? "bg-white ring-2 ring-[#84CC16] shadow-xl" : "bg-gray-50/80"
              }`}
            >
              <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
              <div className="text-xs font-mono font-bold text-[#65A30D] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>IT INDUSTRY CORRIDOR</span>
                {isNoida && <span className="px-3 py-1 bg-[#84CC16] text-black text-[10px] font-bold rounded-full">ACTIVE CAMPUS</span>}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-black mt-2">Noida Campus (Sector 2)</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Located right in Noida's premier technology belt. Features smart projection coding classrooms, dedicated AI/ML GPU sandboxes, and corporate training rooms.
              </p>
              <div className="mt-6 space-y-3 text-xs font-mono text-gray-700 pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#84CC16] shrink-0 mt-0.5" />
                  <span>B-136 Upper, Ground Floor, Sector 2, Noida, Uttar Pradesh - 201301</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-[#84CC16] shrink-0" />
                  <span>Open: Mon - Sun (8:00 AM – 8:00 PM)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Building2 size={16} className="text-[#84CC16] shrink-0" />
                  <span>Walking distance from Noida Sector 15 Metro Station</span>
                </div>
              </div>
              <div className="mt-6">
                <motion.a
                  href="tel:+917987059430"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black hover:text-[#84CC16] transition-colors"
                >
                  <span>CALL NOIDA CAMPUS: +91 7987059430</span>
                  <ArrowRight size={13} className="text-[#84CC16]" />
                </motion.a>
              </div>
            </motion.div>

            {/* Delhi Campus Card */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`p-8 sm:p-10 rounded-3xl relative transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(132,204,22,0.12)] overflow-hidden ${
                !isNoida ? "bg-white ring-2 ring-[#84CC16] shadow-xl" : "bg-gray-50/80"
              }`}
            >
              <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
              <div className="text-xs font-mono font-bold text-[#65A30D] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>FLAGSHIP ACADEMY</span>
                {!isNoida && <span className="px-3 py-1 bg-[#84CC16] text-black text-[10px] font-bold rounded-full">HEADQUARTERS</span>}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-black mt-2">Delhi Campus (Vikaspuri)</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Our premier technical center equipped with multi-workstation cloud labs, collaborative capstone pods, executive seminar hall, and faculty counseling suites.
              </p>
              <div className="mt-6 space-y-3 text-xs font-mono text-gray-700 pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#84CC16] shrink-0 mt-0.5" />
                  <span>B-54 Krishna Park, Outer Ring Road, Vikaspuri, New Delhi - 110018</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-[#84CC16] shrink-0" />
                  <span>Open: Mon - Sun (8:00 AM – 8:00 PM)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Building2 size={16} className="text-[#84CC16] shrink-0" />
                  <span>Near Janakpuri West Metro Station (Blue &amp; Magenta Lines)</span>
                </div>
              </div>
              <div className="mt-6">
                <motion.a
                  href="tel:+919217179762"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black hover:text-[#84CC16] transition-colors"
                >
                  <span>CALL DELHI CAMPUS: +91 9217179762</span>
                  <ArrowRight size={13} className="text-[#84CC16]" />
                </motion.a>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 8: Contact & Campus Tour Enquiry Form (Borderless)     */}
        {/* ============================================================== */}
        <section id="contact-about" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Form Info Left Side (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight">
                Book A Free <br />
                <span className="text-[#84CC16]">Campus Tour</span>
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                Visit our campuses in {isNoida ? "Noida or Delhi" : "Delhi or Noida"}. Experience our high-compute workstation labs, attend a free live demo session with senior faculty, and get a customized 1-on-1 career roadmap.
              </p>

              <div className="space-y-3 pt-2 text-xs font-mono text-gray-600">
                <div className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-[#84CC16] shrink-0" />
                  <span>Noida Campus: B-136 Upper, Ground Floor, Sector 2 (Near Sec-15 Metro)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-[#84CC16] shrink-0" />
                  <span>Delhi Campus: B-54 Krishna Park, Vikaspuri (Near Janakpuri West)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={15} className="text-[#84CC16] shrink-0" />
                  <span>Counseling Hours: Monday – Sunday, 9 AM – 7 PM</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <motion.a
                  href="tel:+917987059430"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-semibold tracking-wider transition-colors ${
                    isNoida 
                      ? "bg-[#84CC16] text-black font-bold shadow-lg shadow-[#84CC16]/25" 
                      : "bg-gray-100 text-gray-800 hover:bg-[#84CC16] hover:text-black"
                  }`}
                >
                  <span>CALL NOIDA (+91 7987059430)</span>
                </motion.a>
                <motion.a
                  href="tel:+919217179762"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-semibold tracking-wider transition-colors ${
                    !isNoida 
                      ? "bg-[#84CC16] text-black font-bold shadow-lg shadow-[#84CC16]/25" 
                      : "bg-gray-100 text-gray-800 hover:bg-[#84CC16] hover:text-black"
                  }`}
                >
                  <span>CALL DELHI (+91 9217179762)</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Form Card Right Side (7 cols) with Exact Lime Accent Block Effect & Borderless Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="relative inline-block w-full group">
                
                {/* Flat lime-green rectangular accent block: z-0 keeps it visible */}
                <div 
                  className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-full h-full bg-[#84CC16] rounded-3xl z-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none"
                  aria-hidden="true" 
                />

                {/* Form Container: Borderless rounded-3xl with rich soft shadow */}
                <div className="relative z-10 p-8 sm:p-12 bg-white rounded-3xl shadow-2xl">
                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-4"
                    >
                      <div className="w-16 h-16 bg-[#84CC16]/20 rounded-full mx-auto flex items-center justify-center text-[#65A30D]">
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 className="text-2xl font-black text-black">Enquiry Recorded Successfully</h3>
                      <p className="text-sm text-gray-600 max-w-sm mx-auto">
                        Thank you for reaching out to Nexxtechs. Our senior counselor will connect with you within 2 business hours to schedule your campus tour and free demo session.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSubmitted(false)}
                        className="px-7 py-3 bg-black text-white hover:bg-[#84CC16] hover:text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                      >
                        Send Another Enquiry
                      </motion.button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      
                      {formError && (
                        <div className="p-3.5 bg-red-50 rounded-xl border-l-4 border-red-500 text-red-700 text-xs font-medium">
                          {formError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* 1. Name */}
                        <div>
                          <div className="h-5 mb-2 flex items-center">
                            <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                              Your Name *
                            </label>
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full h-12 px-4 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all"
                          />
                        </div>

                        {/* 2. Phone */}
                        <div>
                          <div className="h-5 mb-2 flex items-center">
                            <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                              Phone Number *
                            </label>
                          </div>
                          <PhoneInputWithCountry
                            label={false}
                            phone={form.phone}
                            onChangePhone={(p) => setForm({ ...form, phone: p })}
                            countryCode={countryCode}
                            onChangeCountryCode={setCountryCode}
                            className="space-y-0"
                            containerClassName="h-12 bg-gray-50/90 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-[#84CC16] shadow-sm transition-all border-0"
                            inputClassName="text-sm py-0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* 3. Course */}
                        <div>
                          <div className="h-5 mb-2 flex items-center">
                            <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                              Course / Interest *
                            </label>
                          </div>
                          <select
                            value={form.course_interested}
                            onChange={(e) => setForm({ ...form, course_interested: e.target.value })}
                            className="w-full h-12 px-4 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all cursor-pointer"
                          >
                            {COURSE_OPTIONS.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        {/* 4. Branch */}
                        <div>
                          <div className="h-5 mb-2 flex items-center">
                            <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                              Preferred Branch *
                            </label>
                          </div>
                          <select
                            value={form.branch}
                            onChange={(e) => setForm({ ...form, branch: e.target.value })}
                            className="w-full h-12 px-4 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all cursor-pointer"
                          >
                            <option value="Nexxtechs Noida">Nexxtechs Noida (Sector 2)</option>
                            <option value="Nexxtechs Delhi">Nexxtechs Delhi (Vikaspuri / Janakpuri)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* 5. Email */}
                        <div>
                          <div className="h-5 mb-2 flex items-center">
                            <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                              Email Address (Optional)
                            </label>
                          </div>
                          <input
                            type="email"
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full h-12 px-4 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all"
                          />
                        </div>

                        {/* 6. Captcha */}
                        <div>
                          <MathCaptcha
                            problem={mathProblem}
                            value={mathAnswer}
                            onChange={(e) => setMathAnswer(e.target.value)}
                            error={mathError}
                            onRefresh={refreshMathProblem}
                            className="space-y-0"
                            headerClassName="h-5 mb-2"
                            labelClassName="text-xs font-mono font-bold uppercase tracking-wider text-gray-700"
                            inputClassName="h-12 px-4 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all border-0"
                          />
                        </div>
                      </div>

                      {/* 7. Message */}
                      <div>
                        <div className="h-5 mb-2 flex items-center">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                            Message or Questions (Optional)
                          </label>
                        </div>
                        <textarea
                          rows={3}
                          placeholder="Tell us what you would like to discuss during your campus visit..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full p-4 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-black text-white hover:bg-[#84CC16] hover:text-black font-mono text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-black/10 hover:shadow-[#84CC16]/30 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                      >
                        <span>{loading ? "SAVING ENQUIRY..." : "BOOK CAMPUS VISIT"}</span>
                        <Send size={15} className="text-[#84CC16] group-hover:text-black" />
                      </motion.button>

                    </form>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
}
