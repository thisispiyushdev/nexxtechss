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
      <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#84CC16] selection:text-black pt-10 md:pt-16 pb-24 md:pb-32 overflow-x-hidden">
        <SEOHead
          title="About Our Founder – Aditya Sharma | Nexxtechs"
          description="Learn about Aditya Sharma, CEO and Founder of Nexxtechs. 10+ years experience in Cloud Architecture, DevOps, and MLOps. Practical industry-oriented training & enterprise advisory."
          canonical="/about-founder"
          ogImage="/trainer/aditya-sharma-bw.webp"
          keywords="Aditya Sharma, Founder Nexxtechs, CEO Nexxtechs, About Founder Nexxtechs, Cloud DevOps MLOps Trainer Delhi, Nexxtechs Leadership"
          jsonLd={structuredData}
        />

        {/* Google Font for Signature */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" 
        />

        {/* SECTION 1: Exact 3-Column Editorial Hero Layout */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-center">
            
            {/* 1. Founder Introduction — Left Column (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6"
            >
              
              {/* Eyebrow Label with subtle lime-green decorative markers */}
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-[#84CC16] inline-block shrink-0 shadow-sm shadow-[#84CC16]/40" />
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-gray-800">
                  NEXXTECHS LEADERSHIP
                </span>
                <span className="w-6 h-[1px] bg-[#84CC16] inline-block" />
              </div>

              {/* Large Two-line Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-black">
                About Our<br />
                <span className="text-[#84CC16]">Founder</span>
              </h1>

              {/* Tagline */}
              <div className="text-xs sm:text-sm font-mono font-bold tracking-[0.3em] uppercase text-gray-500 pt-1">
                LEARN &nbsp;|&nbsp; BUILD &nbsp;|&nbsp; GROW
              </div>

              {/* Biography Paragraphs */}
              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed pt-2">
                <p>
                  Aditya Sharma is the CEO and founder of Nexxtechs, a technology training institute focused on practical, industry-oriented learning in Web Development, DevOps, Cloud, AI and Digital Skills.
                </p>
                <p>
                  With a strong background in Cloud Architecture, DevOps and MLOps, Aditya is passionate about making quality tech education accessible to students and working professionals. His vision is to bridge the gap between academic learning and industry requirements through hands-on training, real projects and mentorship.
                </p>
              </div>

              {/* Handwritten Signature & Designation */}
              <div className="pt-4 space-y-1.5 border-t border-gray-100">
                <div 
                  className="text-3xl sm:text-4xl text-gray-900 select-none tracking-wide pt-1"
                  style={{ fontFamily: "'Dancing Script', cursive, serif" }}
                >
                  Aditya Sharma
                </div>
                <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-gray-500 font-bold">
                  FOUNDER, NEXXTECHS
                </div>
              </div>

              {/* Social Connect Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-none border border-gray-300 hover:border-[#84CC16] hover:bg-[#84CC16]/10 text-gray-800 text-xs font-mono font-semibold tracking-wider transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="Aditya Sharma on LinkedIn"
                >
                  <Linkedin size={14} className="text-[#84CC16]" />
                  <span>LINKEDIN</span>
                  <ExternalLink size={12} className="text-gray-400" />
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-none border border-gray-300 hover:border-[#84CC16] hover:bg-[#84CC16]/10 text-gray-800 text-xs font-mono font-semibold tracking-wider transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="Aditya Sharma on Instagram"
                >
                  <Instagram size={14} className="text-[#84CC16]" />
                  <span>INSTAGRAM</span>
                  <ExternalLink size={12} className="text-gray-400" />
                </a>
              </div>
            </motion.div>

            {/* 2. Founder Portrait — Center-Right (4 cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-4 flex justify-center py-4 lg:py-0"
            >
              <div 
                className="relative inline-block max-w-[340px] sm:max-w-[380px] lg:max-w-none w-full group cursor-pointer"
                onMouseEnter={() => setIsPortraitHovered(true)}
                onMouseLeave={() => setIsPortraitHovered(false)}
              >
                {/* Flat lime-green rectangular accent block: z-0 ensures it stays in front of page bg and never disappears on reload */}
                <div 
                  className={`absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 w-full h-full bg-[#84CC16] z-0 transition-transform duration-300 pointer-events-none ${isPortraitHovered ? "translate-x-1.5 translate-y-1.5" : ""}`} 
                  aria-hidden="true"
                />

                {/* Founder Portrait: relative z-10. Grayscale by default, smooth native hover to full natural color */}
                <img
                  src="/trainer/aditya-sharma-white.webp"
                  alt="Aditya Sharma - Founder & CEO of Nexxtechs"
                  width={896}
                  height={1200}
                  className="relative z-10 w-full h-auto object-cover border border-gray-900 bg-white block shadow-sm [filter:grayscale(100%)] hover:[filter:grayscale(0%)] group-hover:[filter:grayscale(0%)] transition-all duration-500 cursor-pointer"
                  loading="eager"
                />
              </div>
            </motion.div>

            {/* 3. Editorial Details — Far Right Column (3 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-3 space-y-8 pl-0 lg:pl-6"
            >
              
              {/* Category Pills */}
              <div className="space-y-2 text-xs sm:text-[13px] font-mono font-bold tracking-[0.25em] uppercase text-gray-900">
                <div className="hover:text-[#84CC16] transition-colors cursor-default">TECHNOLOGY</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">EDUCATION</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">COMMUNITY</div>
              </div>

              {/* Thin divider line with small green accent */}
              <div className="w-full h-[1px] bg-gray-200 relative">
                <div className="w-8 h-[2px] bg-[#84CC16] absolute top-[-0.5px] left-0" />
              </div>

              {/* Progression Steps */}
              <div className="space-y-2.5 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-gray-500">
                <div className="hover:text-[#84CC16] transition-colors cursor-default">LEARN</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">PRACTICE</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default">BUILD</div>
                <div className="hover:text-[#84CC16] transition-colors cursor-default text-gray-900 font-bold">GET PLACED</div>
              </div>

              {/* Subtle Light-Gray Quote Card */}
              <div className="p-5 bg-gray-50 border-l-2 border-[#84CC16]">
                <p className="text-xs text-gray-600 italic leading-relaxed font-serif">
                  “Empowering people with skills to build a better tomorrow.”
                </p>
              </div>

            </motion.div>

          </div>
        </section>

        {/* SECTION 2: Key Milestones & Production Numbers */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 md:pt-32">
          <div className="border-t border-gray-200 pt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 bg-gray-50/70 border border-gray-200 relative group transition-colors hover:border-[#84CC16]"
              >
                <div className="w-1.5 h-6 bg-[#84CC16] absolute top-0 left-0" />
                <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">10+</div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Years In Industry</div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Enterprise cloud infrastructure design, DevOps transformation, and production operations.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 bg-gray-50/70 border border-gray-200 relative group transition-colors hover:border-[#84CC16]"
              >
                <div className="w-1.5 h-6 bg-[#84CC16] absolute top-0 left-0" />
                <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">10,000+</div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Minds Mentored</div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Students and working engineers transitioned into high-package Cloud, DevOps &amp; AI roles.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 bg-gray-50/70 border border-gray-200 relative group transition-colors hover:border-[#84CC16]"
              >
                <div className="w-1.5 h-6 bg-[#84CC16] absolute top-0 left-0" />
                <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">200+</div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Cloud Topologies</div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Multi-region distributed setups across AWS, Azure, GCP and hybrid environments.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 bg-gray-50/70 border border-gray-200 relative group transition-colors hover:border-[#84CC16]"
              >
                <div className="w-1.5 h-6 bg-[#84CC16] absolute top-0 left-0" />
                <div className="text-3xl sm:text-4xl font-black text-black tracking-tight font-mono">99.999%</div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D] mt-2">Reliability Standard</div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Strict focus on zero-human intervention, GitOps automation, and declarative resilience.
                </p>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* SECTION 3: Deep Technical Experience in the Tech Field */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 md:pt-32">
          <div className="border-t border-gray-200 pt-16">
            
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
                  <span className="w-2.5 h-2.5 bg-[#84CC16]" />
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

            {/* 4 Architectural Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Cloud Architecture */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
                whileHover={{ y: -5 }}
                className="p-7 bg-white border border-gray-200 hover:border-[#84CC16] transition-all duration-300 relative group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 bg-[#84CC16]/10 border border-[#84CC16]/30 flex items-center justify-center text-[#65A30D] mb-5 group-hover:bg-[#84CC16] group-hover:text-black transition-colors duration-200">
                  <Cloud size={20} />
                </div>
                <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                  Multi-Cloud Architecture
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Enterprise AWS &amp; Azure infrastructure design. Building multi-region disaster recovery sites, latency-based Route 53 policies, and secure VPC hybrid cloud topology.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">AWS</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Azure</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">VPC Peering</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">IAM Governance</span>
                </div>
              </motion.div>

              {/* Card 2: Production MLOps */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="p-7 bg-white border border-gray-200 hover:border-[#84CC16] transition-all duration-300 relative group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 bg-[#84CC16]/10 border border-[#84CC16]/30 flex items-center justify-center text-[#65A30D] mb-5 group-hover:bg-[#84CC16] group-hover:text-black transition-colors duration-200">
                  <Cpu size={20} />
                </div>
                <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                  Production MLOps Pipelines
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Orchestrating end-to-end Machine Learning lifecycles with Kubeflow on Kubernetes, experiment tracking via MLflow, Triton Inference Server, and automated data drift monitoring.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Kubeflow</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">MLflow</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Triton</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Model Registry</span>
                </div>
              </motion.div>

              {/* Card 3: DevOps & GitOps */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ y: -5 }}
                className="p-7 bg-white border border-gray-200 hover:border-[#84CC16] transition-all duration-300 relative group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 bg-[#84CC16]/10 border border-[#84CC16]/30 flex items-center justify-center text-[#65A30D] mb-5 group-hover:bg-[#84CC16] group-hover:text-black transition-colors duration-200">
                  <GitBranch size={20} />
                </div>
                <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                  DevOps, GitOps &amp; IaC
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Declarative state realization with Terraform and remote state locking. Production cluster automation with Docker, Kubernetes, Helm charts, and ArgoCD synchronization.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Terraform</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Kubernetes</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">ArgoCD</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Helm</span>
                </div>
              </motion.div>

              {/* Card 4: SRE & Zero Trust */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="p-7 bg-white border border-gray-200 hover:border-[#84CC16] transition-all duration-300 relative group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 bg-[#84CC16]/10 border border-[#84CC16]/30 flex items-center justify-center text-[#65A30D] mb-5 group-hover:bg-[#84CC16] group-hover:text-black transition-colors duration-200">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-base font-bold text-black uppercase tracking-wide mb-2">
                  SRE &amp; Zero-Trust Security
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Full-stack observability with Prometheus and Grafana dashboards. Strict IAM least privilege governance, HashiCorp Vault secrets management, and chaos engineering testing.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Prometheus</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Vault</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Grafana</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700">Trivy</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SECTION 4: Comprehensive Tech Stack & Architectural Tooling */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 md:pt-32">
          <div className="border-t border-gray-200 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Stack Intro */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#84CC16]" />
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
                  <div className="p-4 bg-gray-50 border-l-2 border-black text-xs font-mono text-gray-700">
                    “Tools are transient; architectural patterns and declarative principles are eternal.”
                  </div>
                </div>
              </div>

              {/* Stack Categories Grid */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Cloud & Compute */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4 }}
                  className="p-6 bg-white border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                      Cloud Platforms &amp; Distributed Compute
                    </span>
                    <span className="text-[10px] font-mono text-[#65A30D] font-semibold">Tier-1 Production</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["AWS (EC2, EKS, Lambda, S3, IAM, VPC, Route53)", "Microsoft Azure", "Google Cloud Platform", "Hybrid Data Centers", "Cloudflare CDN & WAF", "Ceph / Distributed Storage"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-50 border border-gray-200 text-xs font-mono text-gray-800 hover:border-[#84CC16] transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* DevOps & IaC */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="p-6 bg-white border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                      Container Orchestration, CI/CD &amp; IaC
                    </span>
                    <span className="text-[10px] font-mono text-[#65A30D] font-semibold">Declarative GitOps</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Kubernetes", "Docker", "Terraform", "ArgoCD", "Helm", "GitHub Actions", "GitLab CI", "Ansible", "Jenkins Pipelines"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-50 border border-gray-200 text-xs font-mono text-gray-800 hover:border-[#84CC16] transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* MLOps & AI Infrastructure */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="p-6 bg-white border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                      MLOps, Model Serving &amp; AI Engineering
                    </span>
                    <span className="text-[10px] font-mono text-[#65A30D] font-semibold">GPU Optimized</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Kubeflow", "MLflow", "Triton Inference Server", "Ray Distributed", "PyTorch", "Hugging Face", "Vector DBs (Milvus/Pinecone)", "RAG Architectures"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-50 border border-gray-200 text-xs font-mono text-gray-800 hover:border-[#84CC16] transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Observability & Security */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="p-6 bg-white border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                      Observability, SRE &amp; DevSecOps
                    </span>
                    <span className="text-[10px] font-mono text-[#65A30D] font-semibold">Zero Trust</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Prometheus", "Grafana Dashboards", "OpenTelemetry", "ELK Stack", "HashiCorp Vault", "SonarQube", "Trivy Scanner", "Chaos Mesh"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-50 border border-gray-200 text-xs font-mono text-gray-800 hover:border-[#84CC16] transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: Career & Leadership Timeline */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 md:pt-32">
          <div className="border-t border-gray-200 pt-16">
            
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-[#84CC16]" />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#65A30D]">
                  CAREER TRAJECTORY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                Engineering Journey &amp; Milestones
              </h2>
            </div>

            <div className="relative border-l-2 border-gray-200 ml-4 sm:ml-6 space-y-12">
              
              {/* Timeline Item 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="relative pl-8 sm:pl-10"
              >
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-2 border-[#84CC16] rounded-none" />
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#65A30D]">
                  2023 — Present
                </div>
                <h3 className="text-lg font-bold text-black mt-1">
                  CEO &amp; Founder — Nexxtechs
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Established Nexxtechs to democratize enterprise-grade engineering training. Architected real-world project curriculums across Cloud Computing, MLOps, DevOps, AI, and Full Stack Engineering. Spearheaded corporate training initiatives for tech teams across Delhi NCR and India.
                </p>
              </motion.div>

              {/* Timeline Item 2 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative pl-8 sm:pl-10"
              >
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-2 border-black rounded-none" />
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                  2020 — 2023
                </div>
                <h3 className="text-lg font-bold text-black mt-1">
                  Lead MLOps &amp; Cloud Infrastructure Consultant
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Architected production AI model training and serving infrastructures. Automated model registries, continuous training loops, and high-throughput GPU inference clusters utilizing Kubeflow, MLflow, and NVIDIA Triton servers.
                </p>
              </motion.div>

              {/* Timeline Item 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative pl-8 sm:pl-10"
              >
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-2 border-black rounded-none" />
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                  2017 — 2020
                </div>
                <h3 className="text-lg font-bold text-black mt-1">
                  Senior DevOps &amp; Cloud Automation Engineer
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Spearheaded automated migration of monolithic architectures to containerized microservices on Kubernetes. Built declarative Terraform modules managing hundreds of AWS and Azure accounts with zero drift.
                </p>
              </motion.div>

              {/* Timeline Item 4 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative pl-8 sm:pl-10"
              >
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-2 border-black rounded-none" />
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                  2014 — 2017
                </div>
                <h3 className="text-lg font-bold text-black mt-1">
                  Systems &amp; Network Infrastructure Engineer
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Specialized in Linux kernel tuning, distributed file storage, high-availability cluster design, firewall configurations, and 24/7 mission-critical operations.
                </p>
              </motion.div>

            </div>

          </div>
        </section>

        {/* SECTION 6: Contact & Advisory Form (Same Visual Theme & Offset Accent Effect) */}
        <section id="contact-founder" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 md:pt-32">
          <div className="border-t border-gray-200 pt-16">
            
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
                  <span className="w-2.5 h-2.5 bg-[#84CC16]" />
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
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 hover:border-[#84CC16] hover:bg-[#84CC16]/10 text-gray-800 text-xs font-mono font-semibold tracking-wider transition-colors"
                  >
                    <Linkedin size={13} className="text-[#84CC16]" />
                    <span>DIRECT LINKEDIN</span>
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 hover:border-[#84CC16] hover:bg-[#84CC16]/10 text-gray-800 text-xs font-mono font-semibold tracking-wider transition-colors"
                  >
                    <Instagram size={13} className="text-[#84CC16]" />
                    <span>DIRECT INSTAGRAM</span>
                  </a>
                </div>
              </motion.div>

              {/* Form Card Right Side (7 cols) with Exact Lime Accent Block Effect */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-7"
              >
                <div className="relative inline-block w-full group">
                  
                  {/* Flat lime-green rectangular accent block: z-0 keeps it visible and never disappearing on reload */}
                  <div 
                    className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 w-full h-full bg-[#84CC16] z-0 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5 pointer-events-none"
                    aria-hidden="true" 
                  />

                  {/* Form Container: relative z-10 ensures it stays above the green block */}
                  <div className="relative z-10 p-7 sm:p-10 bg-white border border-gray-900 shadow-sm">
                    {submitted ? (
                      <div className="text-center py-10 space-y-4">
                        <div className="w-14 h-14 bg-[#84CC16]/20 border border-[#84CC16] rounded-none mx-auto flex items-center justify-center text-[#65A30D]">
                          <CheckCircle2 size={30} />
                        </div>
                        <h3 className="text-2xl font-black text-black">Enquiry Recorded Successfully</h3>
                        <p className="text-sm text-gray-600 max-w-sm mx-auto">
                          Thank you for connecting. Your request has been stored in our main system. Aditya Sharma and the Nexxtechs leadership team will get in touch with you shortly.
                        </p>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="px-6 py-2.5 bg-black text-white hover:bg-[#84CC16] hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          Send Another Enquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        
                        {formError && (
                          <div className="p-3 bg-red-50 border-l-2 border-red-500 text-red-700 text-xs font-medium">
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
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#84CC16] focus:bg-white focus:outline-none text-sm text-gray-900 transition-colors"
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
                              inputClassName="px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#84CC16] focus:bg-white focus:outline-none text-sm text-gray-900 transition-colors"
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
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#84CC16] focus:bg-white focus:outline-none text-sm text-gray-900 transition-colors"
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
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#84CC16] focus:bg-white focus:outline-none text-sm text-gray-900 transition-colors"
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
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#84CC16] focus:bg-white focus:outline-none text-sm text-gray-900 transition-colors"
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
                              inputClassName="px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#84CC16] focus:bg-white focus:outline-none text-sm text-gray-900 transition-colors"
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
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#84CC16] focus:bg-white focus:outline-none text-sm text-gray-900 transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white hover:bg-[#84CC16] hover:text-black font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 disabled:opacity-50 cursor-pointer"
                        >
                          <span>{loading ? "SAVING TO DB..." : "SUBMIT ENQUIRY"}</span>
                          <Send size={14} className="text-[#84CC16] group-hover:text-black" />
                        </button>

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
