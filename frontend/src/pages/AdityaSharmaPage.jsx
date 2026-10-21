import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import SEOHead from "../components/SEOHead";
import axios from "axios";
import { API_ROOT } from "../lib/apiConfig";
import MathCaptcha, { useMathCaptcha } from "../components/common/MathCaptcha";
import PhoneInputWithCountry, { validatePhone } from "../components/common/PhoneInputWithCountry";
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
  Users
} from "lucide-react";

// Framer Motion Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const COURSE_OPTIONS = [
  "Cloud & MLOps Advisory (Founder Direct)",
  "Corporate Tech Team Upskilling",
  "DevOps with AWS",
  "Diploma in Cloud Computing",
  "AI & GenAI",
  "Full Stack AI",
  "Data Science",
  "Data Analytics",
  "Web Dev with Gen AI",
  "Python Full Stack with Gen AI",
  "Cyber Security",
  "Diploma in Cyber Security",
  "Data Structures and Algorithm",
  "University Campus Masterclass / Keynote",
  "General Leadership Enquiry"
];

export default function AdityaSharmaPage() {
  const LINKEDIN_URL = "https://www.linkedin.com/in/aditya-sharma-538391283/";
  const INSTAGRAM_URL = "https://www.instagram.com/aadityaa.parashar/";

  // Portrait hover color state
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  // Contact / Enquiry Form State — Identical structure to main EnquiryForm
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course_interested: "Cloud & MLOps Advisory (Founder Direct)",
    branch: "Nexxtechs Delhi",
    message: ""
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

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
        source: "Founder Page - Aditya Sharma"
      });

      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        setForm({
          name: "",
          phone: "",
          email: "",
          course_interested: "Cloud & MLOps Advisory (Founder Direct)",
          branch: "Nexxtechs Delhi",
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aditya Sharma",
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "Nexxtechs",
      "url": "https://www.nexxtechs.com"
    },
    "description": "Aditya Sharma is the CEO and founder of Nexxtechs, a technology training institute focused on practical, industry-oriented learning in Cloud Computing, DevOps, MLOps, AI and Digital Skills.",
    "image": "https://www.nexxtechs.com/trainer/aditya-sharma-white.webp",
    "url": "https://www.nexxtechs.com/about-founder",
    "sameAs": [
      LINKEDIN_URL,
      INSTAGRAM_URL
    ]
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#84CC16] selection:text-black pt-6 md:pt-10 pb-24 md:pb-32 overflow-x-hidden">
        <SEOHead
          title="Aditya Sharma – Founder & CEO of Nexxtechs | Cloud & MLOps Architect"
          description="Learn about Aditya Sharma, CEO and Founder of Nexxtechs. 10+ years in Cloud Architecture, DevOps & MLOps. Learn from an industry leader shaping practical tech education."
          canonical="/about-founder"
          ogImage="/trainer/aditya-sharma-white.webp"
          keywords="Aditya Sharma Nexxtechs, Founder Nexxtechs, Aditya Sharma CEO, Cloud Architect Delhi, DevOps Trainer Delhi NCR, MLOps Mentor, Nexxtechs Founder"
          jsonLd={structuredData}
        />

        {/* Google Font for Signature */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" 
        />

        {/* ============================================================== */}
        {/* SECTION 1: Exact 3-Column Editorial Hero Layout (Borderless)   */}
        {/* ============================================================== */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-4 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            
            {/* 1. Founder Biography & Vision — Left Column (5 cols) */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 space-y-6"
            >
              
              {/* Eyebrow Label with subtle lime-green decorative markers */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-[#84CC16] inline-block shrink-0 shadow-sm shadow-[#84CC16]/40" />
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-gray-800">
                  FOUNDER &amp; CHIEF EXECUTIVE OFFICER
                </span>
                <span className="w-8 h-[2px] bg-[#84CC16] inline-block" />
              </motion.div>

              {/* Exact Editorial Headline matching reference styling */}
              <motion.div variants={fadeInUp}>
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-black tracking-tight leading-[1.05]">
                  Aditya <br />
                  <span className="text-[#84CC16] inline-block">Sharma</span>
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.div variants={fadeInUp} className="text-xs sm:text-sm font-mono font-bold tracking-[0.3em] uppercase text-gray-500 pt-1">
                LEARN &nbsp;|&nbsp; BUILD &nbsp;|&nbsp; GROW
              </motion.div>

              {/* Biography Paragraphs */}
              <motion.div variants={fadeInUp} className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed pt-2">
                <p>
                  Aditya Sharma is the CEO and founder of Nexxtechs, a premier technology training institute focused on practical, industry-oriented learning in Web Development, DevOps, Cloud Computing, AI, and Digital Engineering.
                </p>
                <p>
                  With a strong background in Cloud Architecture, DevOps and MLOps, Aditya is passionate about making quality tech education accessible to students and working professionals. His vision is to bridge the gap between academic learning and industry requirements through hands-on training, real projects and mentorship.
                </p>
              </motion.div>

              {/* Handwritten Signature & Designation */}
              <motion.div variants={fadeInUp} className="pt-4 space-y-1.5">
                <div 
                  className="text-3xl sm:text-4xl text-gray-900 select-none tracking-wide pt-1"
                  style={{ fontFamily: "'Dancing Script', cursive, serif" }}
                >
                  Aditya Sharma
                </div>
                <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-gray-500 font-bold">
                  FOUNDER, NEXXTECHS
                </div>
              </motion.div>

              {/* Social Connect Icons (Borderless rounded pills) */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 pt-2">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 hover:bg-[#84CC16] hover:text-black text-gray-800 text-xs font-mono font-semibold tracking-wider transition-colors shadow-sm"
                  aria-label="Aditya Sharma on LinkedIn"
                >
                  <Linkedin size={14} className="text-[#65A30D]" />
                  <span>LINKEDIN</span>
                  <ExternalLink size={12} className="opacity-60" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 hover:bg-[#84CC16] hover:text-black text-gray-800 text-xs font-mono font-semibold tracking-wider transition-colors shadow-sm"
                  aria-label="Aditya Sharma on Instagram"
                >
                  <Instagram size={14} className="text-[#65A30D]" />
                  <span>INSTAGRAM</span>
                  <ExternalLink size={12} className="opacity-60" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* 2. Founder Portrait — Center Column (4 cols) with Framer Motion spring physics & Borderless Container */}
            <motion.div 
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="lg:col-span-4 flex justify-center py-4 lg:py-0"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative inline-block max-w-[340px] sm:max-w-[380px] lg:max-w-none w-full group cursor-pointer"
                onMouseEnter={() => setIsPortraitHovered(true)}
                onMouseLeave={() => setIsPortraitHovered(false)}
              >
                {/* Flat lime-green rounded accent block: z-0 */}
                <div 
                  className={`absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 w-full h-full bg-[#84CC16] rounded-3xl z-0 transition-transform duration-300 pointer-events-none ${isPortraitHovered ? "translate-x-1.5 translate-y-1.5" : ""}`} 
                  aria-hidden="true"
                />

                {/* Founder Portrait: relative z-10, rounded-3xl borderless with rich shadow */}
                <img
                  src="/trainer/aditya-sharma-white.webp"
                  alt="Aditya Sharma - Founder & CEO of Nexxtechs"
                  width={896}
                  height={1200}
                  className="relative z-10 w-full h-auto object-cover rounded-3xl bg-white block shadow-xl [filter:grayscale(100%)] hover:[filter:grayscale(0%)] group-hover:[filter:grayscale(0%)] transition-all duration-500 cursor-pointer"
                  loading="eager"
                />
              </motion.div>
            </motion.div>

            {/* 3. Editorial Details — Far Right Column (3 cols) */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3 space-y-8 pl-0 lg:pl-6"
            >
              
              {/* Category Pills */}
              <motion.div variants={fadeInUp} className="space-y-2 text-xs sm:text-[13px] font-mono font-bold tracking-[0.25em] uppercase text-gray-900">
                <div className="hover:text-[#84CC16] transition-colors cursor-default">TECHNOLOGY</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">EDUCATION</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">COMMUNITY</div>
              </motion.div>

              {/* Accent Marker */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <span className="w-8 h-[3px] bg-[#84CC16] inline-block rounded-full" />
                <span className="w-2 h-[3px] bg-gray-300 inline-block rounded-full" />
              </motion.div>

              {/* Progression Steps */}
              <motion.div variants={fadeInUp} className="space-y-2.5 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-gray-500">
                <div className="hover:text-[#84CC16] transition-colors cursor-default">01. LEARN</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">02. PRACTICE</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">03. BUILD</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default text-gray-900 font-bold">04. GET PLACED</div>
              </motion.div>

              {/* Subtle Light-Gray Quote Card (Borderless with soft shadow) */}
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-6 bg-gray-50/90 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
                  <span className="text-[10px] font-mono font-bold text-[#65A30D] uppercase tracking-wider">FOUNDER VISION</span>
                </div>
                <p className="text-xs text-gray-600 italic leading-relaxed font-serif">
                  “Empowering people with real terminal skills to build a resilient tomorrow.”
                </p>
              </motion.div>

            </motion.div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 2: Key Milestones & Production Numbers (Borderless)    */}
        {/* ============================================================== */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          <div className="pt-8">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 sm:p-10 bg-gray-50/80 rounded-3xl relative transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(132,204,22,0.12)] overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">10+</div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Years In Industry</div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Enterprise cloud infrastructure design, DevOps transformation, and production operations.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 sm:p-10 bg-gray-50/80 rounded-3xl relative transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(132,204,22,0.12)] overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">10,000+</div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Minds Mentored</div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Students and working engineers transitioned into high-package Cloud, DevOps &amp; AI roles.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 sm:p-10 bg-gray-50/80 rounded-3xl relative transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(132,204,22,0.12)] overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">200+</div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Cloud Topologies</div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Multi-region distributed setups across AWS, Azure, GCP and hybrid environments.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 sm:p-10 bg-gray-50/80 rounded-3xl relative transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(132,204,22,0.12)] overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">99.999%</div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Reliability Standard</div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Strict focus on zero-human intervention, GitOps automation, and declarative resilience.
                </p>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 3: Deep Technical Experience in the Tech Field         */}
        {/* ============================================================== */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          <div className="pt-8">
            
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-12"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#84CC16] rounded-full" />
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#65A30D]">
                    CORE EXPERTISE
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                  Aditya Sharma’s Technical Field Experience
                </h2>
              </div>
              <p className="text-sm text-gray-600 max-w-md mt-4 md:mt-0 leading-relaxed">
                A decade of hands-on mastery in production-scale distributed computing, MLOps lifecycles, and automated delivery platforms.
              </p>
            </motion.div>

            {/* 4 Architectural Cards (Borderless Modern Cards) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Cloud Architecture */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-gray-50/80 rounded-3xl relative transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(132,204,22,0.12)] overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="w-12 h-12 bg-[#84CC16]/20 rounded-2xl flex items-center justify-center text-[#65A30D] mb-5">
                  <Cloud size={24} />
                </div>
                <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                  Multi-Cloud Architecture
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Enterprise AWS &amp; Azure infrastructure design. Building multi-region disaster recovery sites, latency-based Route 53 policies, and secure VPC hybrid cloud topology.
                </p>
                <div className="mt-5 pt-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">AWS</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Azure</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">VPC Peering</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">IAM Governance</span>
                </div>
              </motion.div>

              {/* Card 2: DevOps & Kubernetes */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-gray-50/80 rounded-3xl relative transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(132,204,22,0.12)] overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="w-12 h-12 bg-[#84CC16]/20 rounded-2xl flex items-center justify-center text-[#65A30D] mb-5">
                  <GitBranch size={24} />
                </div>
                <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                  GitOps &amp; Kubernetes
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Zero-touch GitOps deployment pipelines using ArgoCD and Helm. Enterprise Kubernetes cluster management with automated scaling, ingress controllers, and mesh telemetry.
                </p>
                <div className="mt-5 pt-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Kubernetes</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Docker</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Terraform</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">ArgoCD</span>
                </div>
              </motion.div>

              {/* Card 3: MLOps Infrastructure */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-gray-50/80 rounded-3xl relative transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(132,204,22,0.12)] overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="w-12 h-12 bg-[#84CC16]/20 rounded-2xl flex items-center justify-center text-[#65A30D] mb-5">
                  <Cpu size={24} />
                </div>
                <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                  Production MLOps
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  End-to-end Machine Learning pipelines with Kubeflow, MLflow, and NVIDIA Triton server. Automating model training loops, drift monitoring, and low-latency inference serving.
                </p>
                <div className="mt-5 pt-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Kubeflow</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">MLflow</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Triton</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Ray Core</span>
                </div>
              </motion.div>

              {/* Card 4: DevSecOps & SRE */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-gray-50/80 rounded-3xl relative transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(132,204,22,0.12)] overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="w-12 h-12 bg-[#84CC16]/20 rounded-2xl flex items-center justify-center text-[#65A30D] mb-5">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                  DevSecOps &amp; SRE
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Shift-left security integration: image scanning with Trivy, secret management with HashiCorp Vault, Prometheus &amp; Grafana observability stacks, and SLO/error budget management.
                </p>
                <div className="mt-5 pt-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Vault</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Trivy</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Prometheus</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white rounded-lg shadow-sm text-gray-700 font-medium">Grafana</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 4: Comprehensive Tech Stack & Architectural Tooling    */}
        {/* ============================================================== */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          <div className="pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Stack Intro */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#84CC16] rounded-full" />
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#65A30D]">
                    ENTERPRISE TOOLING
                  </span>
                </div>
                <h2 className="text-3xl font-black text-black tracking-tight">
                  Production Tech Stack &amp; Toolchain
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Battle-tested tools and frameworks utilized across 10+ years of building resilient cloud architectures and automated ML delivery systems.
                </p>
                <div className="pt-2">
                  <div className="p-5 bg-gray-50/90 rounded-2xl shadow-sm text-xs font-mono text-gray-700">
                    “Tools are transient; architectural patterns and declarative principles are eternal.”
                  </div>
                </div>
              </div>

              {/* Stack Categories Grid (Borderless Rounded Cards) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Cloud & Compute */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className="p-7 bg-gray-50/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                      Cloud Platforms &amp; Distributed Compute
                    </span>
                    <span className="text-[10px] font-mono text-[#65A30D] font-semibold px-2.5 py-1 bg-[#84CC16]/10 rounded-full">Tier-1 Production</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["AWS (EC2, EKS, Lambda, S3, IAM, VPC, Route53)", "Microsoft Azure", "Google Cloud Platform", "Hybrid Data Centers", "Cloudflare CDN & WAF", "Ceph / Distributed Storage"].map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 bg-white rounded-xl shadow-sm text-xs font-mono text-gray-800 font-medium hover:bg-[#84CC16] hover:text-black transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* DevOps & IaC */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-7 bg-gray-50/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                      Container Orchestration, CI/CD &amp; IaC
                    </span>
                    <span className="text-[10px] font-mono text-[#65A30D] font-semibold px-2.5 py-1 bg-[#84CC16]/10 rounded-full">Declarative GitOps</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Kubernetes", "Docker", "Terraform", "ArgoCD", "Helm", "GitHub Actions", "GitLab CI", "Ansible", "Jenkins Pipelines"].map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 bg-white rounded-xl shadow-sm text-xs font-mono text-gray-800 font-medium hover:bg-[#84CC16] hover:text-black transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* MLOps & AI Infrastructure */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ y: -4 }}
                  className="p-7 bg-gray-50/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                      MLOps, Model Serving &amp; AI Engineering
                    </span>
                    <span className="text-[10px] font-mono text-[#65A30D] font-semibold px-2.5 py-1 bg-[#84CC16]/10 rounded-full">GPU Optimized</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Kubeflow", "MLflow", "Triton Inference Server", "Ray Distributed", "PyTorch", "Hugging Face", "Vector DBs (Milvus/Pinecone)", "RAG Architectures"].map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 bg-white rounded-xl shadow-sm text-xs font-mono text-gray-800 font-medium hover:bg-[#84CC16] hover:text-black transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Observability & Security */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="p-7 bg-gray-50/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                      Observability, SRE &amp; DevSecOps
                    </span>
                    <span className="text-[10px] font-mono text-[#65A30D] font-semibold px-2.5 py-1 bg-[#84CC16]/10 rounded-full">Zero Trust</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Prometheus", "Grafana Dashboards", "OpenTelemetry", "ELK Stack", "HashiCorp Vault", "SonarQube", "Trivy Scanner", "Chaos Mesh"].map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 bg-white rounded-xl shadow-sm text-xs font-mono text-gray-800 font-medium hover:bg-[#84CC16] hover:text-black transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

              </div>

            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 5: Career & Leadership Timeline (Borderless Cards)     */}
        {/* ============================================================== */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          <div className="pt-8">
            
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-[#84CC16] rounded-full" />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#65A30D]">
                  CAREER TRAJECTORY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                Engineering Journey &amp; Milestones
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Timeline Item 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-gray-50/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#84CC16]/20 text-[#65A30D] rounded-full text-xs font-mono font-bold">
                    2023 — Present
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">CURRENT LEADERSHIP</span>
                </div>
                <h3 className="text-xl font-bold text-black mt-1">
                  CEO &amp; Founder — Nexxtechs
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Established Nexxtechs to democratize enterprise-grade engineering training. Architected real-world project curriculums across Cloud Computing, MLOps, DevOps, AI, and Full Stack Engineering. Spearheaded corporate training initiatives for tech teams across Delhi NCR and India.
                </p>
              </motion.div>

              {/* Timeline Item 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-gray-50/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#84CC16]/20 text-[#65A30D] rounded-full text-xs font-mono font-bold">
                    2020 — 2023
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">ENTERPRISE CONSULTING</span>
                </div>
                <h3 className="text-xl font-bold text-black mt-1">
                  Lead MLOps &amp; Cloud Infrastructure Consultant
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Architected production AI model training and serving infrastructures. Automated model registries, continuous training loops, and high-throughput GPU inference clusters utilizing Kubeflow, MLflow, and NVIDIA Triton servers.
                </p>
              </motion.div>

              {/* Timeline Item 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-gray-50/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#84CC16]/20 text-[#65A30D] rounded-full text-xs font-mono font-bold">
                    2017 — 2020
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">PLATFORM SCALE</span>
                </div>
                <h3 className="text-xl font-bold text-black mt-1">
                  Senior DevOps &amp; Cloud Automation Engineer
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Spearheaded automated migration of monolithic architectures to containerized microservices on Kubernetes. Built declarative Terraform modules managing hundreds of AWS and Azure accounts with zero drift.
                </p>
              </motion.div>

              {/* Timeline Item 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-gray-50/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-full h-1.5 bg-[#84CC16] absolute top-0 left-0" />
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#84CC16]/20 text-[#65A30D] rounded-full text-xs font-mono font-bold">
                    2014 — 2017
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">SYSTEMS &amp; KERNEL</span>
                </div>
                <h3 className="text-xl font-bold text-black mt-1">
                  Systems &amp; Network Infrastructure Engineer
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Specialized in Linux kernel tuning, distributed file storage, high-availability cluster design, firewall configurations, and 24/7 mission-critical operations.
                </p>
              </motion.div>

            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 6: Contact & Advisory Form (Borderless with Accent)    */}
        {/* ============================================================== */}
        <section id="contact-founder" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-28">
          <div className="pt-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Form Info Left Side (5 cols) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-5 space-y-6"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#84CC16] rounded-full" />
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-gray-800">
                    DIRECT ENGAGEMENT
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight">
                  Connect With <br />
                  <span className="text-[#84CC16]">Aditya Sharma</span>
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed">
                  Whether you are seeking executive cloud consulting for your enterprise, looking to conduct a high-impact campus masterclass, or exploring professional MLOps &amp; DevOps upskilling at Nexxtechs, reach out directly.
                </p>

                <div className="space-y-3 pt-2 text-xs font-mono text-gray-600">
                  <div className="flex items-center gap-2.5">
                    <MapPin size={15} className="text-[#84CC16] shrink-0" />
                    <span>Nexxtechs HQ: Janakpuri &amp; Vikaspuri, New Delhi</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={15} className="text-[#84CC16] shrink-0" />
                    <span>Noida Tech Hub: Sector 2, Noida, Uttar Pradesh</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={15} className="text-[#84CC16] shrink-0" />
                    <span>Advisory Availability: Mon - Sat (By Appointment)</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 hover:bg-[#84CC16] hover:text-black text-gray-800 text-xs font-mono font-semibold tracking-wider transition-colors shadow-sm"
                  >
                    <Linkedin size={13} className="text-[#65A30D]" />
                    <span>DIRECT LINKEDIN</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 hover:bg-[#84CC16] hover:text-black text-gray-800 text-xs font-mono font-semibold tracking-wider transition-colors shadow-sm"
                  >
                    <Instagram size={13} className="text-[#65A30D]" />
                    <span>DIRECT INSTAGRAM</span>
                  </motion.a>
                </div>
              </motion.div>

              {/* Form Card Right Side (7 cols) with Exact Lime Accent Block Effect & Borderless Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-7"
              >
                <div className="relative inline-block w-full group">
                  
                  {/* Flat lime-green rounded accent block: z-0 */}
                  <div 
                    className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 w-full h-full bg-[#84CC16] rounded-3xl z-0 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5 pointer-events-none"
                    aria-hidden="true" 
                  />

                  {/* Form Container: relative z-10 ensures it stays above the green block */}
                  <div className="relative z-10 p-8 sm:p-12 bg-white rounded-3xl shadow-2xl">
                    {submitted ? (
                      <div className="text-center py-10 space-y-4">
                        <div className="w-16 h-16 bg-[#84CC16]/20 rounded-full mx-auto flex items-center justify-center text-[#65A30D]">
                          <CheckCircle2 size={36} />
                        </div>
                        <h3 className="text-2xl font-black text-black">Enquiry Recorded Successfully</h3>
                        <p className="text-sm text-gray-600 max-w-sm mx-auto">
                          Thank you for connecting. Your request has been stored in our main system. Aditya Sharma and the Nexxtechs leadership team will get in touch with you shortly.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSubmitted(false)}
                          className="px-7 py-3 bg-black text-white hover:bg-[#84CC16] hover:text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                        >
                          Send Another Enquiry
                        </motion.button>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        
                        {formError && (
                          <div className="p-3.5 bg-red-50 rounded-xl border-l-4 border-red-500 text-red-700 text-xs font-medium">
                            {formError}
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Enter your full name"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className="w-full px-4 py-3.5 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all"
                            />
                          </div>

                          <div>
                            <PhoneInputWithCountry
                              phone={form.phone}
                              onChangePhone={(p) => setForm({ ...form, phone: p })}
                              countryCode={countryCode}
                              onChangeCountryCode={setCountryCode}
                              className="w-full"
                              labelClassName="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2"
                              inputClassName="px-4 py-3.5 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                              Course / Interest *
                            </label>
                            <select
                              value={form.course_interested}
                              onChange={(e) => setForm({ ...form, course_interested: e.target.value })}
                              className="w-full px-4 py-3.5 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all"
                            >
                              {COURSE_OPTIONS.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                              Institute Branch *
                            </label>
                            <select
                              value={form.branch}
                              onChange={(e) => setForm({ ...form, branch: e.target.value })}
                              className="w-full px-4 py-3.5 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all"
                            >
                              <option value="Nexxtechs Delhi">Nexxtechs Delhi (Vikaspuri / Janakpuri)</option>
                              <option value="Nexxtechs Noida">Nexxtechs Noida (Sector 2)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                              Email Address (Optional)
                            </label>
                            <input
                              type="email"
                              placeholder="name@example.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="w-full px-4 py-3.5 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all"
                            />
                          </div>

                          <div>
                            {/* Anti-spam Math Captcha from standard EnquiryForm */}
                            <MathCaptcha
                              problem={mathProblem}
                              value={mathAnswer}
                              onChange={(e) => setMathAnswer(e.target.value)}
                              error={mathError}
                              onRefresh={refreshMathProblem}
                              labelClassName="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-1"
                              inputClassName="px-4 py-3 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                            Message / Requirements (Optional)
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Tell us how Aditya Sharma or Nexxtechs can help you or your organization..."
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full px-4 py-3.5 bg-gray-50/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-sm text-gray-900 shadow-sm transition-all resize-none"
                          />
                        </div>

                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-black text-white hover:bg-[#84CC16] hover:text-black font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-lg"
                        >
                          <span>{loading ? "SAVING TO DB..." : "SUBMIT ENQUIRY"}</span>
                          <Send size={14} className="text-[#84CC16] group-hover:text-black" />
                        </motion.button>

                      </form>
                    )}
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
}
