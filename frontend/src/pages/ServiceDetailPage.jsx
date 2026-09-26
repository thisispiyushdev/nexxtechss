import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, Zap, ArrowRight, Shield, Cpu, Code, Globe, 
  Cloud, Smartphone, BarChart, PenTool, MessageSquare, ExternalLink, 
  Sparkles, Layers, ChevronRight, ChevronDown, HelpCircle, FileText, Check, Send, Wrench
} from 'lucide-react';
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { servicesData, serviceAliases } from '@/data/servicesData';

const categoryIcons = {
  "AI & Automation": <Cpu className="w-5 h-5 text-[#84CC16]" />,
  "Development": <Code className="w-5 h-5 text-[#84CC16]" />,
  "Cloud & IT": <Cloud className="w-5 h-5 text-[#84CC16]" />,
  "Marketing & Design": <Globe className="w-5 h-5 text-[#84CC16]" />
};

// Distinct creative corner glow styles for section cards
const sectionCardVariants = [
  // Variant 0: Top-right green corner glow + left glowing accent bar
  {
    wrapperClass: "relative overflow-hidden bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-[#84CC16]",
    glowClass: "absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-[#84CC16]/20 via-[#84CC16]/5 to-transparent rounded-full blur-xl pointer-events-none"
  },
  // Variant 1: Top-left radial corner glow + subtle border highlight
  {
    wrapperClass: "relative overflow-hidden bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border-t-2 border-t-[#84CC16]/60",
    glowClass: "absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#84CC16]/15 via-transparent to-transparent rounded-tl-2xl pointer-events-none"
  },
  // Variant 2: Dark glassmorphic background gradient + bottom-right glow
  {
    wrapperClass: "relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-[#84CC16]/5 dark:from-[#0B1120] dark:via-[#0B1120] dark:to-[#84CC16]/10 border border-gray-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all",
    glowClass: "absolute -bottom-10 -right-10 w-36 h-36 bg-[#84CC16]/15 rounded-full blur-2xl pointer-events-none"
  },
  // Variant 3: Double corner glow accents (top-left & bottom-right)
  {
    wrapperClass: "relative overflow-hidden bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border-r-4 border-r-[#84CC16]",
    glowClass: "absolute -top-12 -left-12 w-32 h-32 bg-[#84CC16]/15 rounded-full blur-xl pointer-events-none"
  }
];

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  // Hero Section Quick Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Normalize slug using alias if present
  const resolvedSlug = serviceAliases[serviceId] || serviceId;
  const service = servicesData[resolvedSlug] || servicesData["ai-consulting"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const phone = "+917987059430";
    const text = `Hello Nexxtechs Team,%0A%0AI am interested in your *${service.title}* service.%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Requirements:* ${formData.message}`;
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  // Fallback title formatter
  const displayTitle = service ? service.title : (serviceId ? serviceId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Service Details');

  return (
    <PageTransition>
      <SEOHead 
        title={service.seoTitle} 
        description={service.metaDescription}
        keywords={service.keywords ? service.keywords.join(', ') : null}
        canonical={`/services/${service.slug}`}
      />
      
      {/* Container with ZERO top padding to eliminate space below fixed header */}
      <div className="bg-white dark:bg-[#070C17] text-gray-900 dark:text-slate-100 min-h-screen pt-0 pb-20 transition-colors duration-300">
        
        {/* FLUSH BREADCRUMB BAR - REMOVED TOP GAP */}
        <div className="border-b border-gray-100 dark:border-slate-800/80 bg-white dark:bg-[#070C17] py-2.5 mb-6">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-8 flex items-center justify-between text-sm">
            <Link 
              to="/services" 
              className="inline-flex items-center text-gray-600 dark:text-slate-400 hover:text-[#84CC16] dark:hover:text-[#84CC16] font-semibold transition-colors group text-xs md:text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" /> 
              Back to All Services
            </Link>
            <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500 dark:text-slate-400 font-medium">
              <Link to="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <Link to="/services" className="hover:text-gray-900 dark:hover:text-white">Services</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-[#84CC16] font-semibold">{displayTitle}</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-8 space-y-12">
          
          {/* HERO SECTION: LEFT DETAILS + RIGHT ENQUIRY FORM WITH CORNER GLOW EFFECT */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#84CC16]/10 text-[#84CC16] text-xs font-bold uppercase tracking-wider border border-[#84CC16]/30 shadow-sm">
                <span className="mr-2">{categoryIcons[service.category] || <Zap className="w-4 h-4 text-[#84CC16]" />}</span>
                {service.category} Solutions
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                {service.title}
                <span className="block text-[#84CC16] text-xl md:text-3xl mt-2 font-bold tracking-normal">
                  {service.tagline}
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 leading-relaxed font-medium">
                {service.heroIntro}
              </p>

              {/* Keywords Tag Cloud */}
              <div className="flex flex-wrap gap-2 pt-1">
                {service.keywords && service.keywords.slice(0, 5).map((kw, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 font-mono rounded-lg">
                    #{kw}
                  </span>
                ))}
              </div>

              {/* Quick Action CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={`https://wa.me/917987059430?text=Hi%20Nexxtechs,%20I%20want%20to%20discuss%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold text-sm tracking-wide inline-flex items-center transition-all shadow-lg shadow-[#84CC16]/20 rounded-xl group"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discuss via WhatsApp
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("openPopupEnquiry", { detail: { type: "service", serviceName: service.title } }))}
                  className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white font-bold text-sm transition-all rounded-xl cursor-pointer"
                >
                  Quick Inquiry Popup
                </button>
              </div>
            </div>

            {/* HERO RIGHT COLUMN: ENQUIRY FORM WITH CREATIVE CORNER GLOW EFFECT & ROUNDED CORNERS */}
            <div className="lg:col-span-5" id="hero-enquiry">
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-[#0B1120] border-2 border-gray-200 dark:border-slate-800 p-6 md:p-7 shadow-2xl rounded-2xl relative overflow-hidden group hover:border-[#84CC16]/50 transition-colors"
              >
                {/* Creative Corner Glow Backdrop */}
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-[#84CC16]/25 via-[#84CC16]/10 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/80 pb-4 mb-5 relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Quick Service Inquiry
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 font-medium mt-0.5">
                      Get custom architecture & quote for <span className="text-[#84CC16] font-semibold">{service.title}</span>
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#84CC16]/20 text-[#84CC16] text-[10px] font-mono font-bold uppercase rounded-full border border-[#84CC16]/40 shadow-sm">
                    24H RESPONSE
                  </span>
                </div>

                {submitted ? (
                  <div className="bg-[#84CC16]/10 border border-[#84CC16] p-6 rounded-xl text-center space-y-3 relative z-10">
                    <CheckCircle2 className="w-12 h-12 text-[#84CC16] mx-auto animate-bounce" />
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Inquiry Sent Successfully!</h4>
                    <p className="text-xs text-gray-600 dark:text-slate-300">
                      Redirecting you to our technical architect team via WhatsApp (+91 7987059430).
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#84CC16] underline font-bold pt-2 block mx-auto"
                    >
                      Send another requirement
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-gray-700 dark:text-slate-300 mb-1">YOUR NAME *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-semibold text-gray-700 dark:text-slate-300 mb-1">EMAIL ADDRESS *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-gray-700 dark:text-slate-300 mb-1">PHONE / WHATSAPP *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 7987059430"
                          className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold text-gray-700 dark:text-slate-300 mb-1">PROJECT REQUIREMENT</label>
                      <textarea
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={`Tell us briefly about your goals for ${service.title}...`}
                        className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold py-3.5 rounded-xl text-sm tracking-wider uppercase inline-flex items-center justify-center transition-all shadow-md shadow-[#84CC16]/20"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit & Chat on WhatsApp
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* TOOLS & TECHNOLOGIES SECTION WITH TOP-LEFT GLOW ACCENT */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50/80 dark:bg-[#0B1120] border-2 border-gray-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden"
          >
            {/* Soft Top-Left Corner Radial Glow */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#84CC16]/15 via-transparent to-transparent rounded-tl-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 dark:border-slate-800/80 pb-4 mb-6 gap-2 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#84CC16]/10 border border-[#84CC16]/30 text-[#84CC16] rounded-xl shadow-sm">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Tools & Technologies Stack
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 font-medium">
                    Core tech stack, frameworks & cloud integrations powering our <span className="text-[#84CC16] font-semibold">{service.title}</span> architecture
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#84CC16]/20 text-[#84CC16] text-xs font-mono font-bold uppercase rounded-full border border-[#84CC16]/40 self-start md:self-auto shadow-sm">
                ENTERPRISE STACK
              </span>
            </div>

            {/* 8 LOGOS ALIGNED GRID WITH INDIVIDUAL ITEM HOVER GLOW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
              {service.techLogos && service.techLogos.map((tech, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="bg-white dark:bg-[#070C17] border border-gray-200 dark:border-slate-800/90 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2.5 group hover:border-[#84CC16] transition-all shadow-sm hover:shadow-lg hover:shadow-[#84CC16]/10"
                >
                  <div className="w-12 h-12 flex items-center justify-center p-1.5 bg-gray-50 dark:bg-slate-900/90 rounded-xl group-hover:bg-[#84CC16]/10 transition-colors">
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <Code className="w-6 h-6 text-[#84CC16] hidden" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 dark:text-slate-200 truncate w-full font-mono">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* MAIN CONTENT SECTIONS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* LEFT CONTENT COLUMN (8 COLUMNS) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* SECTION: DETAILED SECTIONS WITH VARYING CREATIVE ACCENT EFFECTS */}
              <div className="space-y-6">
                {service.sections && service.sections.map((sec, idx) => {
                  const styleVariant = sectionCardVariants[idx % sectionCardVariants.length];
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className={styleVariant.wrapperClass}
                    >
                      {/* Unique Corner Glow Effect per Section */}
                      <div className={styleVariant.glowClass} />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3.5">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
                            <span className="text-sm font-mono text-[#84CC16] mr-3 font-bold">0{idx + 1}.</span>
                            {sec.title}
                          </h2>
                          <span className="text-xs font-mono font-bold text-[#84CC16]/60 bg-[#84CC16]/10 px-2.5 py-1 rounded-full border border-[#84CC16]/20">
                            SECTION 0{idx + 1}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-base md:text-lg font-normal">
                          {sec.content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* SECTION: TYPICAL USE CASES WITH TOP-CENTER ACCENT LINE & CORNER GLOW */}
              {service.useCases && service.useCases.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-[#0B1120] border-2 border-gray-200 dark:border-slate-800 p-7 md:p-8 rounded-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#84CC16]/10 rounded-bl-full blur-xl pointer-events-none" />

                  <div className="flex items-center space-x-3 mb-6 relative z-10">
                    <div className="p-2 bg-[#84CC16]/10 rounded-xl text-[#84CC16] border border-[#84CC16]/30">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Typical Enterprise Use Cases</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {service.useCases.map((useCase, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white dark:bg-[#070C17] border border-gray-200 dark:border-slate-800 p-4 rounded-xl flex items-start space-x-3.5 hover:border-[#84CC16] transition-all shadow-sm hover:shadow-md group"
                      >
                        <div className="p-1 bg-[#84CC16]/10 text-[#84CC16] rounded-lg group-hover:bg-[#84CC16] group-hover:text-black transition-colors">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        </div>
                        <span className="text-gray-800 dark:text-slate-200 font-semibold text-sm md:text-base pt-0.5">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SECTION: OUR METHODOLOGY & PROCESS WITH STEP HOVER ACCENTS */}
              {service.process && service.process.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-5"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#84CC16]/10 rounded-xl text-[#84CC16] border border-[#84CC16]/30">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Delivery Methodology</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                    {service.process.map((step, idx) => (
                      <div 
                        key={idx}
                        className="bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-slate-800 p-4 rounded-2xl text-center space-y-1.5 relative overflow-hidden group hover:border-[#84CC16] transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="absolute top-0 right-0 w-8 h-8 bg-[#84CC16]/10 rounded-bl-xl pointer-events-none" />
                        <span className="text-[11px] font-mono text-[#84CC16] font-bold px-2 py-0.5 bg-[#84CC16]/10 rounded-full inline-block">
                          STEP 0{idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{step}</h4>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SERVICE CTA BANNER WITH GLOW AURA & ROUNDED CORNERS */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-slate-950 via-[#0b1329] to-slate-900 text-white p-8 rounded-2xl border-2 border-[#84CC16]/40 shadow-2xl relative overflow-hidden space-y-4"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 space-y-3">
                  <h3 className="text-2xl font-bold text-[#84CC16]">Ready to build with Nexxtechs?</h3>
                  <p className="text-slate-300 text-base leading-relaxed">
                    {service.ctaText}
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/917987059430?text=Hi%20Nexxtechs,%20I%20want%20to%20start%20with%20${encodeURIComponent(service.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold text-sm inline-flex items-center transition-all rounded-xl shadow-lg shadow-[#84CC16]/30"
                    >
                      Schedule Solution Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* RIGHT SIDEBAR COLUMN: TRUST & WHATSAPP CARDS WITH UNIQUE EFFECTS */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                
                {/* TRUST BADGE SIDEBAR BOX WITH LEFT BORDER ACCENT */}
                <div className="bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-slate-800 p-6 rounded-2xl space-y-4 shadow-sm border-l-4 border-l-[#84CC16] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#84CC16]/10 rounded-bl-full pointer-events-none" />

                  <div className="flex items-center space-x-2.5 text-gray-900 dark:text-white font-bold text-base relative z-10">
                    <Shield className="w-5 h-5 text-[#84CC16]" />
                    <span>Why Partner With Nexxtechs?</span>
                  </div>
                  <ul className="space-y-3 text-xs md:text-sm text-gray-600 dark:text-slate-300 relative z-10">
                    <li className="flex items-center"><Check className="w-4 h-4 text-[#84CC16] mr-2 flex-shrink-0" /> Production-ready enterprise architecture</li>
                    <li className="flex items-center"><Check className="w-4 h-4 text-[#84CC16] mr-2 flex-shrink-0" /> Zero lock-in enterprise contracts</li>
                    <li className="flex items-center"><Check className="w-4 h-4 text-[#84CC16] mr-2 flex-shrink-0" /> Direct access to lead solution architects</li>
                    <li className="flex items-center"><Check className="w-4 h-4 text-[#84CC16] mr-2 flex-shrink-0" /> 24/7 post-deployment support</li>
                  </ul>
                </div>

                {/* WHATSAPP QUICK ACTION CARD WITH PULSING GLOW BACKGROUND */}
                <div className="bg-gradient-to-br from-[#84CC16]/15 via-[#84CC16]/5 to-transparent border-2 border-[#84CC16]/40 p-6 rounded-2xl space-y-3 text-center relative overflow-hidden shadow-lg">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#84CC16]/20 rounded-full blur-xl pointer-events-none" />

                  <div className="relative z-10 space-y-3">
                    <MessageSquare className="w-8 h-8 text-[#84CC16] mx-auto animate-bounce" />
                    <h4 className="font-bold text-gray-900 dark:text-white text-base">Need Immediate Assistance?</h4>
                    <p className="text-xs text-gray-600 dark:text-slate-300">
                      Connect directly with our lead architects on WhatsApp for instant project estimation.
                    </p>
                    <a
                      href="https://wa.me/917987059430?text=Hi%20Nexxtechs,%20I%20have%20an%20urgent%20service%20query."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider inline-flex items-center justify-center transition-all shadow-md shadow-[#84CC16]/20"
                    >
                      Chat on WhatsApp: +91 7987059430
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* SERVICE SPECIFIC FAQS SECTION - STRETCHED FULL-WIDTH */}
          {service.faqs && service.faqs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full mt-16 pt-12 border-t-2 border-gray-200 dark:border-slate-800 space-y-8"
            >
              <div className="text-center space-y-3">
                <span className="px-3.5 py-1.5 rounded-full bg-[#84CC16]/10 text-[#84CC16] text-xs font-mono font-bold uppercase tracking-wider border border-[#84CC16]/30">
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                  Got Questions About <span className="text-[#84CC16]">{service.title}</span>?
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
                  Find key insights on strategy, timelines, data privacy, tech stack, and delivery for our {service.title} services.
                </p>
              </div>

              <div className="w-full space-y-3.5 max-w-[1380px] mx-auto">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`w-full rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? "bg-white dark:bg-[#0B1120] border-[#84CC16] shadow-lg shadow-[#84CC16]/5 border-l-4 border-l-[#84CC16]"
                          : "bg-white dark:bg-[#0B1120] border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 dark:text-white text-base md:text-lg cursor-pointer select-none"
                      >
                        <span className="flex-1 leading-snug">{faq.question}</span>
                        <div className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                          isOpen ? "bg-[#84CC16] text-black rotate-180" : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400"
                        }`}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-5 pb-6 text-gray-600 dark:text-slate-300 text-sm md:text-base leading-relaxed border-t border-gray-100 dark:border-slate-800/80 pt-4 font-normal">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};

export default ServiceDetailPage;
