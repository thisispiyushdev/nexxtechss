import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import COURSES_DATA from "../data/coursesData";
import { 
  Code, BrainCircuit, PenTool, ShieldAlert, ServerCog, Cloud, 
  TrendingUp, Coffee, PieChart, ChevronRight, CheckCircle, 
  Map, Zap, ArrowRight, Clock, Users, BookOpen, Award, Globe, Send,
  ChevronDown, Target, Check, Phone, ExternalLink
} from "lucide-react";
import gsap from "gsap";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import axios from "axios";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import { API_ROOT } from "../lib/apiConfig";

const API = API_ROOT;

const iconMap = {
  "web-development": Code,
  "ui-ux-design": PenTool,
  "graphic-design": PenTool,
  "digital-marketing": TrendingUp,
  "data-analytics": PieChart,
  "data-science": BrainCircuit,
  "cloud-computing": Cloud,
  "cyber-security": ShieldAlert,
  "devops": ServerCog,
  "dsa": Code,
  "java-full-stack": Coffee,
  "python-full-stack": Code,
  "sap-masterclass": Globe,
  "mern-stack": Code,
  "dsa-with-java": Coffee,
};

const uniformPalette = { 
  bg: "bg-white dark:bg-[#151515]", 
  cardBg: "bg-gray-100 dark:bg-[#1A1A1A]", 
  border: "border-gray-200 dark:border-white/5 hover:border-[#84CC16]/40", 
  animation: "hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#84CC16]/10",
  text: "text-gray-900 dark:text-white", 
  badge: "bg-gradient-to-r from-[#84CC16]/20 to-[#84CC16]/5 text-[#65a30d] dark:text-[#84CC16] border border-[#84CC16]/20", 
  badgeText: "Roadmap" 
};

export default function RoadmapPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [demoPopupOpen, setDemoPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", course_interested: "" });
  const [checkedTopics, setCheckedTopics] = useState([]);
  const [expandedPhase, setExpandedPhase] = useState(0);

  const listRef = useRef(null);
  const detailRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDemoPopupOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!selectedCourse && listRef.current) {
      gsap.fromTo(
        ".roadmap-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out", clearProps: "transform" }
      );
    } else if (selectedCourse && detailRef.current) {
      gsap.fromTo(
        ".phase-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [selectedCourse]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.course_interested) {
      setError("Please fill all fields");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      setError("Name should only contain letters");
      return;
    }

    if (!/^\d+$/.test(form.phone)) {
      setError("Phone number should only contain numbers");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API}/enquiry`, form);
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        const msg = `New Roadmap Discussion Request (Blogs Page):%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0ACourse: ${encodeURIComponent(form.course_interested)}`;
        window.open(`https://wa.me/919217179762?text=${msg}`, "_blank");
      } else {
        throw new Error("Backend storage failed");
      }
    } catch (err) {
      console.error("Backend error:", err);
      const msg = `New Roadmap Discussion Request (Blogs Page Backup):%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0ACourse: ${encodeURIComponent(form.course_interested)}`;
      window.open(`https://wa.me/919217179762?text=${msg}`, "_blank");
      setError("Note: Enquiry submitted via WhatsApp only.");
      setSubmitted(true);
    } finally {
      setLoading(false);
      if (!error) {
        setTimeout(() => setDemoPopupOpen(false), 3000);
      }
    }
  };

  const toggleTopic = (topicId) => {
    setCheckedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const renderListView = () => {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-8 md:py-12" ref={listRef}>
        
        {/* Page Hero Heading */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#84CC16]/10 border border-[#84CC16]/20 text-[#65A30D] dark:text-[#84CC16] text-sm font-bold tracking-wide uppercase mb-6">
            <Zap size={14} className="fill-[#84CC16]" />
            Ignite Your Potential
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            Blogs and Roadmaps for <span className="text-[#84CC16]">Tech Enthusiast</span> Students
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Fuel your curiosity and accelerate your tech career. Dive into expert-curated learning paths, industry insights, and step-by-step guides designed to transform absolute beginners into job-ready innovators.
          </p>
        </div>

        {/* Roadmap Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {COURSES_DATA.map((course, index) => {
            const palette = uniformPalette;
            const Icon = iconMap[course.slug] || Code;
            
            return (
              <div key={course.slug} className={`roadmap-card flex flex-col ${palette.bg} rounded-[28px] p-6 sm:p-8 relative overflow-hidden group cursor-pointer border ${palette.border} ${palette.animation} transition-all duration-500 z-10`} onClick={() => { setSelectedCourse(course); setExpandedPhase(0); window.scrollTo(0, 0); }}>
                {/* Dynamic Gradient Background Glow */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-[#84CC16] rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
                
                {/* Subtle top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#84CC16]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${palette.cardBg} border border-gray-200 dark:border-white/5 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}>
                        <Icon size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-[#84CC16] transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white max-w-[140px] leading-tight tracking-tight group-hover:text-[#84CC16] transition-colors duration-300">{course.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] ${palette.badge}`}>
                      {palette.badgeText}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-transparent">
                      <Clock size={14} className="text-[#84CC16]" /> {course.duration}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed flex-grow">
                    {course.overview}
                  </p>

                  <div className="flex items-center gap-3 mb-8 bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-transparent group-hover:border-[#84CC16]/20 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                      <Award size={16} className="text-orange-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-0.5">Skill Level</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{course.level}</span>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between mt-auto pt-5 border-t border-gray-100 dark:border-white/10 group-hover:border-[#84CC16]/30 transition-colors duration-300`}>
                    <span className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#84CC16] transition-colors duration-300">View Roadmap Details</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/5 group-hover:bg-[#84CC16] transition-colors duration-300`}>
                      <ArrowRight size={16} className="text-gray-900 dark:text-white group-hover:text-black transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Structured Learning */}
          <div className="bg-white dark:bg-[#151515] rounded-[28px] p-8 relative overflow-hidden group border border-gray-200 dark:border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] border border-blue-100 dark:border-blue-500/10 shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <BookOpen size={26} className="text-blue-600 dark:text-blue-500" />
              </div>
              <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-blue-500 transition-colors duration-300">Structured Learning</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Follow a step-by-step curriculum meticulously crafted by industry veterans.</p>
            </div>
          </div>

          {/* Card 2: Industry Recognition */}
          <div className="bg-white dark:bg-[#151515] rounded-[28px] p-8 relative overflow-hidden group border border-gray-200 dark:border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-[#1A1A1A] border border-purple-100 dark:border-purple-500/10 shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Award size={26} className="text-purple-600 dark:text-purple-500" />
              </div>
              <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-purple-500 transition-colors duration-300">Industry Recognition</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Acquire verified skills that are highly valued by top tech companies globally.</p>
            </div>
          </div>

          {/* Card 3: Community Support */}
          <div className="bg-white dark:bg-[#151515] rounded-[28px] p-8 relative overflow-hidden group border border-gray-200 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-[#1A1A1A] border border-emerald-100 dark:border-emerald-500/10 shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Users size={26} className="text-emerald-600 dark:text-emerald-500" />
              </div>
              <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-emerald-500 transition-colors duration-300">Community Support</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Join an active community of thousands of learners on the exact same journey.</p>
            </div>
          </div>
        </div>

        {/* Premium Bento Box Information Section */}
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Value Proposition Card */}
            <div className="lg:col-span-2 bg-white dark:bg-[#151515] rounded-3xl p-8 md:p-10 border border-gray-200 dark:border-white/5 relative overflow-hidden shadow-sm dark:shadow-none group">
              <div className="absolute -top-10 -right-10 opacity-5 dark:opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                <Map size={240} />
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <TrendingUp size={14} /> Clear Path to Success
                </div>
                
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                  Stop wandering. <br/>
                  <span className="text-[#84CC16]">Start executing.</span>
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-10 max-w-xl leading-relaxed">
                  The tech landscape is massive and overwhelming. Don't get stuck in tutorial hell. Our expertly crafted roadmaps eliminate the guesswork, giving you a proven, linear path from absolute beginner to industry-ready professional.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-transparent transition-colors hover:bg-gray-100 dark:hover:bg-white/10">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1a1b1e] shadow-sm flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5">
                      <Target size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">Structured Learning</h4>
                      <p className="text-xs text-gray-500">Step-by-step curriculum</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-transparent transition-colors hover:bg-gray-100 dark:hover:bg-white/10">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1a1b1e] shadow-sm flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5">
                      <CheckCircle size={20} className="text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">Zero Guesswork</h4>
                      <p className="text-xs text-gray-500">Learn exactly what matters</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-transparent transition-colors hover:bg-gray-100 dark:hover:bg-white/10">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1a1b1e] shadow-sm flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5">
                      <Award size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">Job-Ready Skills</h4>
                      <p className="text-xs text-gray-500">Practical, real-world focus</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-transparent transition-colors hover:bg-gray-100 dark:hover:bg-white/10">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1a1b1e] shadow-sm flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5">
                      <Users size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">Community Backed</h4>
                      <p className="text-xs text-gray-500">Join thousands of learners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Highlight Card */}
            <div className="bg-[#84CC16] rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-lg shadow-[#84CC16]/20 group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
              
              <div className="w-20 h-20 bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
                <Zap size={36} className="text-black fill-black" />
              </div>
              
              <h3 className="text-3xl font-extrabold text-black mb-4 relative z-10 leading-tight">
                Ready to level up?
              </h3>
              
              <p className="text-black/80 font-medium mb-10 relative z-10">
                Pick a roadmap from the grid above and start your journey today.
              </p>
              
              <div className="flex flex-col gap-3 w-full relative z-10">
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 flex items-center gap-3 w-full justify-center text-lg"
                >
                  Explore Paths <ArrowRight size={20} />
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('openPopupEnquiry', { 
                      detail: { isWhatsApp: true, bannerTitle: 'Contact Expert (Roadmap)' } 
                    }));
                  }}
                  className="bg-white/20 hover:bg-white/30 text-black px-8 py-4 rounded-xl font-bold hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center gap-3 w-full justify-center text-lg"
                >
                  Contact to our expert <Phone size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Categories Bottom Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-gray-200 dark:border-white/5 text-center hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-colors group cursor-default shadow-sm dark:shadow-none">
              <Code size={28} className="mx-auto mb-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <h4 className="font-bold text-gray-900 dark:text-white">Development</h4>
              <p className="text-xs text-gray-500 mt-2">Frontend & Backend</p>
            </div>
            
            <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-gray-200 dark:border-white/5 text-center hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-colors group cursor-default shadow-sm dark:shadow-none">
              <BrainCircuit size={28} className="mx-auto mb-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
              <h4 className="font-bold text-gray-900 dark:text-white">AI & Data</h4>
              <p className="text-xs text-gray-500 mt-2">Machine Learning</p>
            </div>
            
            <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-gray-200 dark:border-white/5 text-center hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-colors group cursor-default shadow-sm dark:shadow-none">
              <Cloud size={28} className="mx-auto mb-4 text-gray-400 group-hover:text-cyan-500 transition-colors" />
              <h4 className="font-bold text-gray-900 dark:text-white">Infrastructure</h4>
              <p className="text-xs text-gray-500 mt-2">Cloud & Security</p>
            </div>
            
            <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-gray-200 dark:border-white/5 text-center hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-colors group cursor-default shadow-sm dark:shadow-none">
              <Globe size={28} className="mx-auto mb-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
              <h4 className="font-bold text-gray-900 dark:text-white">Enterprise</h4>
              <p className="text-xs text-gray-500 mt-2">Business Tools</p>
            </div>
          </div>
        </div>



      </div>
    );
  };

  const getOfficialLink = (query) => {
    if (!query || typeof query !== 'string') return '#';
    const q = query.toLowerCase();
    if (q.includes('react')) return 'https://react.dev/';
    if (q.includes('node')) return 'https://nodejs.org/';
    if (q.includes('express')) return 'https://expressjs.com/';
    if (q.includes('mongo') || q.includes('database')) return 'https://www.mongodb.com/docs/';
    if (q.includes('python')) return 'https://docs.python.org/3/';
    if (q.includes('django')) return 'https://docs.djangoproject.com/';
    if ((q.includes('java ') || q.includes('java')) && !q.includes('javascript')) return 'https://docs.oracle.com/en/java/';
    if (q.includes('javascript') || q.includes('js')) return 'https://javascript.info/';
    if (q.includes('html')) return 'https://html.spec.whatwg.org/multipage/';
    if (q.includes('css')) return 'https://www.w3.org/Style/CSS/';
    if (q.includes('web')) return 'https://web.dev/';
    if (q.includes('aws') || q.includes('amazon')) return 'https://aws.amazon.com/documentation/';
    if (q.includes('azure')) return 'https://learn.microsoft.com/en-us/azure/';
    if (q.includes('google cloud') || q.includes('gcp')) return 'https://cloud.google.com/docs';
    if (q.includes('docker') || q.includes('container') || q.includes('devops')) return 'https://docs.docker.com/';
    if (q.includes('kubernetes')) return 'https://kubernetes.io/docs/';
    if (q.includes('linux') || q.includes('ubuntu')) return 'https://ubuntu.com/tutorials';
    if (q.includes('git')) return 'https://git-scm.com/doc';
    if (q.includes('data science') || q.includes('pandas') || q.includes('numpy')) return 'https://pandas.pydata.org/docs/';
    if (q.includes('machine learning') || q.includes('ai') || q.includes('scikit')) return 'https://scikit-learn.org/stable/';
    if (q.includes('deep learning') || q.includes('tensorflow')) return 'https://www.tensorflow.org/api_docs';
    if (q.includes('cyber') || q.includes('security') || q.includes('hack')) return 'https://www.kali.org/docs/';
    if (q.includes('network')) return 'https://www.cisco.com/c/en/us/support/index.html';
    if (q.includes('ui') || q.includes('ux') || q.includes('design') || q.includes('figma')) return 'https://help.figma.com/';
    if (q.includes('marketing') || q.includes('seo')) return 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide';
    if (q.includes('sql') || q.includes('mysql')) return 'https://dev.mysql.com/doc/';
    if (q.includes('api')) return 'https://swagger.io/docs/';
    if (q.includes('excel')) return 'https://support.microsoft.com/en-us/excel';
    if (q.includes('power bi')) return 'https://learn.microsoft.com/en-us/power-bi/';
    if (q.includes('tableau')) return 'https://help.tableau.com/';
    if (q.includes('snowflake')) return 'https://docs.snowflake.com/';
    if (q.includes('jupyter')) return 'https://docs.jupyter.org/';
    if (q.includes('sap') || q.includes('fiori') || q.includes('joule')) return 'https://help.sap.com/docs/';
    if (q.includes('abap')) return 'https://help.sap.com/docs/SAP_NETWEAVER';
    if (q.includes('jasper')) return 'https://help.jasper.ai/';
    if (q.includes('performance max') || q.includes('google ads')) return 'https://support.google.com/google-ads/';
    if (q.includes('klaviyo')) return 'https://help.klaviyo.com/';
    if (q.includes('framer')) return 'https://www.framer.com/academy/';
    if (q.includes('midjourney')) return 'https://docs.midjourney.com/';
    if (q.includes('galileo')) return 'https://docs.usegalileo.ai/';
    if (q.includes('spline')) return 'https://docs.spline.design/';
    if (q.includes('firefly') || q.includes('adobe')) return 'https://helpx.adobe.com/firefly/user-guide.html';
    if (q.includes('canva')) return 'https://www.canva.com/help/';
    if (q.includes('dall-e') || q.includes('chatgpt') || q.includes('openai')) return 'https://platform.openai.com/docs/';
    if (q.includes('cursor')) return 'https://docs.cursor.com/';
    if (q.includes('vercel')) return 'https://vercel.com/docs';
    if (q.includes('next.js') || q.includes('next')) return 'https://nextjs.org/docs';
    if (q.includes('tailwind')) return 'https://tailwindcss.com/docs';
    if (q.includes('zustand')) return 'https://zustand-demo.pmnd.rs/';
    if (q.includes('fastapi')) return 'https://fastapi.tiangolo.com/';
    if (q.includes('github') || q.includes('copilot')) return 'https://docs.github.com/';
    if (q.includes('argocd') || q.includes('gitops')) return 'https://argo-cd.readthedocs.io/';
    if (q.includes('terraform')) return 'https://developer.hashicorp.com/terraform/docs';
    if (q.includes('prometheus')) return 'https://prometheus.io/docs/';
    if (q.includes('leetcode')) return 'https://leetcode.com/explore/';
    if (q.includes('codeforces')) return 'https://codeforces.com/help';
    if (q.includes('visualgo')) return 'https://visualgo.net/en';
    if (q.includes('intellij')) return 'https://www.jetbrains.com/help/idea/';
    if (q.includes('spring boot') || q.includes('spring')) return 'https://spring.io/projects/spring-boot';
    if (q.includes('kafka')) return 'https://kafka.apache.org/documentation/';
    if (q.includes('burp suite') || q.includes('burp')) return 'https://portswigger.net/burp/documentation';
    if (q.includes('kali')) return 'https://www.kali.org/docs/';
    if (q.includes('crowdstrike')) return 'https://www.crowdstrike.com/resources/';
    if (q.includes('wormgpt') || q.includes('threat hunting')) return 'https://owasp.org/';
    if (q.includes('bedrock')) return 'https://docs.aws.amazon.com/bedrock/';
    if (q.includes('serverless')) return 'https://www.serverless.com/framework/docs';
    if (q.includes('huggingface') || q.includes('hugging face')) return 'https://huggingface.co/docs';
    if (q.includes('langchain')) return 'https://python.langchain.com/docs/get_started/introduction';
    if (q.includes('vertex')) return 'https://cloud.google.com/vertex-ai/docs';
    if (q.includes('pinecone')) return 'https://docs.pinecone.io/';
    
    return `https://devdocs.io/#q=${encodeURIComponent(query)}`;
  };

  const renderDetailView = () => {
    if (!selectedCourse) return null;

    const totalTopics = selectedCourse.modules.reduce((acc, m) => acc + m.topics.length, 0);
    const coursePrefix = `${selectedCourse.slug}-`;
    const completedTopics = checkedTopics.filter(id => id.startsWith(coursePrefix)).length;
    const progressPercentage = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

    return (
      <div className="max-w-5xl mx-auto px-6 py-12" ref={detailRef}>
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setSelectedCourse(null)}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={20} className="text-gray-900 dark:text-white rotate-180" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedCourse.title} Roadmap</h1>
        </div>

        {/* Premium Progress Tracker Widget */}
        <div className="relative overflow-hidden bg-white dark:bg-[#111318] border border-gray-200 dark:border-white/5 rounded-3xl p-6 md:p-8 mb-10 shadow-xl shadow-gray-200/50 dark:shadow-none group hover:border-[#84CC16]/30 transition-all duration-500">
          {/* Animated Background Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-[#84CC16]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#84CC16]/20 transition-all duration-700"></div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 relative z-10 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#84CC16] to-[#4d7c0f] flex items-center justify-center shadow-lg shadow-[#84CC16]/30 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Target size={28} className="text-white" />
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white font-black text-2xl tracking-tight">Your Progress</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">Keep the momentum going!</p>
              </div>
            </div>
            <div className="sm:text-right">
              <div className="flex items-baseline sm:justify-end gap-1">
                <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 font-black text-5xl tracking-tighter">{progressPercentage}</h4>
                <span className="text-[#84CC16] font-bold text-2xl">%</span>
              </div>
            </div>
          </div>

          <div className="h-3 md:h-4 bg-gray-100 dark:bg-[#1A1D24] rounded-full overflow-hidden mb-8 relative border border-gray-200 dark:border-white/5 shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#65A30D] to-[#84CC16] transition-all duration-1000 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute top-0 right-0 w-16 h-full bg-white/30 blur-md"></div>
              <div className="absolute top-0 right-0 w-2 h-full bg-white/60"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 md:gap-5 mb-6 relative z-10">
            {/* Completed */}
            <div className="bg-white dark:bg-gradient-to-b dark:from-[#1A1D24] dark:to-[#111318] rounded-2xl p-4 md:p-6 text-center border border-gray-200 dark:border-[#84CC16]/20 relative overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-sm dark:shadow-[0_0_15px_rgba(132,204,22,0.05)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#84CC16] to-transparent opacity-70"></div>
              <div className="w-10 h-10 mx-auto bg-[#84CC16]/10 rounded-full flex items-center justify-center mb-3">
                <CheckCircle size={18} className="text-[#84CC16]" />
              </div>
              <h5 className="text-gray-900 dark:text-white font-black text-3xl md:text-4xl mb-1">{completedTopics}</h5>
              <p className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Completed</p>
            </div>

            {/* Remaining */}
            <div className="bg-white dark:bg-gradient-to-b dark:from-[#1A1D24] dark:to-[#111318] rounded-2xl p-4 md:p-6 text-center border border-gray-200 dark:border-white/5 relative overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40"></div>
              <div className="w-10 h-10 mx-auto bg-orange-500/10 rounded-full flex items-center justify-center mb-3">
                <Clock size={18} className="text-orange-500" />
              </div>
              <h5 className="text-gray-900 dark:text-white font-black text-3xl md:text-4xl mb-1">{totalTopics - completedTopics}</h5>
              <p className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Remaining</p>
            </div>

            {/* Total */}
            <div className="bg-white dark:bg-gradient-to-b dark:from-[#1A1D24] dark:to-[#111318] rounded-2xl p-4 md:p-6 text-center border border-gray-200 dark:border-white/5 relative overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40"></div>
              <div className="w-10 h-10 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                <Target size={18} className="text-blue-500" />
              </div>
              <h5 className="text-gray-900 dark:text-white font-black text-3xl md:text-4xl mb-1">{totalTopics}</h5>
              <p className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-[#1A1D24] dark:to-[#111318] border border-gray-200 dark:border-white/10 rounded-xl p-4 md:p-5 flex items-center gap-4 relative z-10 overflow-hidden group/banner hover:border-[#84CC16]/20 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#84CC16]/10 flex items-center justify-center shrink-0 group-hover/banner:scale-110 group-hover/banner:bg-[#84CC16]/20 transition-all duration-300">
              <Zap size={20} className="text-[#84CC16] fill-[#84CC16]" />
            </div>
            <div>
              <h6 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-0.5">Ready to start?</h6>
              <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Your learning journey begins now. Let's do this! ✨</p>
            </div>
          </div>
        </div>

        {/* Modules/Phases List */}
        <div className="space-y-4 mb-16">
          {selectedCourse.modules.map((module, index) => {
            const isExpanded = expandedPhase === index;
            const modulePrefix = `${selectedCourse.slug}-${index}-`;
            const moduleCompleted = module.topics.filter((_, tIndex) => checkedTopics.includes(`${modulePrefix}${tIndex}`)).length;

            return (
              <div key={index} className="phase-item border border-gray-200 dark:border-white/5 rounded-xl bg-white dark:bg-[#1a1b1e] overflow-hidden mb-4 shadow-sm dark:shadow-none">
                <div 
                  className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedPhase(isExpanded ? null : index)}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center font-bold text-gray-900 dark:text-white text-sm">
                      {index + 1}
                    </div>
                    <h4 className="text-gray-900 dark:text-white font-semibold text-lg">{module.name}</h4>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                      {moduleCompleted}/{module.topics.length}
                    </span>
                    <ChevronDown size={18} className={`text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-gray-900 dark:text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'}`} />
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#151619]">
                    <ul className="space-y-3 mt-4">
                      {module.topics.map((topic, tIndex) => {
                        const topicId = `${modulePrefix}${tIndex}`;
                        const isChecked = checkedTopics.includes(topicId);
                        
                        return (
                          <li 
                            key={tIndex} 
                            className="flex items-start gap-3 cursor-pointer group"
                            onClick={() => toggleTopic(topicId)}
                          >
                            <div className={`mt-0.5 shrink-0 w-5 h-5 rounded flex items-center justify-center border ${isChecked ? 'bg-[#84CC16] border-[#84CC16]' : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400'} transition-colors`}>
                              {isChecked && <Check size={14} className="text-white dark:text-black font-bold" />}
                            </div>
                            <span className={`text-sm flex-1 ${isChecked ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'} transition-colors leading-relaxed`}>
                              {topic}
                            </span>
                            <a
                              href={getOfficialLink(topic)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-gray-400 hover:text-[#84CC16] shrink-0"
                              title={`Search documentation for ${topic}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={14} />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Official Reference & Documentation Links Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Globe className="text-[#84CC16]" size={24} />
            Official Documentation & References
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {(selectedCourse.trendingTools || []).slice(0, 4).map((tool, tIndex) => (
              <a 
                key={tIndex}
                href={getOfficialLink(tool)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5 transition-colors group"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#84CC16] transition-colors line-clamp-1">
                  {tool} Documentation
                </span>
                <ExternalLink size={16} className="text-gray-400 group-hover:text-[#84CC16] transition-colors" />
              </a>
            ))}
            <a 
              href={getOfficialLink(selectedCourse.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-[#84CC16]/10 hover:bg-[#84CC16]/20 border border-[#84CC16]/20 transition-colors group md:col-span-2 lg:col-span-1"
            >
              <span className="text-sm font-medium text-[#84CC16]">
                Complete {selectedCourse.title} Reference Guide
              </span>
              <ExternalLink size={16} className="text-[#84CC16]" />
            </a>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-white dark:bg-[#1e2025] rounded-2xl p-10 text-center border border-gray-200 dark:border-white/5 mb-10 shadow-sm dark:shadow-none">
          <Clock size={32} className="text-gray-900 dark:text-white mx-auto mb-4 opacity-80" />
          <p className="text-gray-600 dark:text-gray-300 font-medium mb-8">Start your journey today and unlock your potential!</p>
          <button 
            onClick={() => setSelectedCourse(null)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-gray-300 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg text-gray-900 dark:text-white font-medium transition-colors"
          >
            <ChevronRight size={16} className="rotate-180" /> Back to All Roadmaps
          </button>
        </div>
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent pb-20 font-sans transition-colors duration-300">
        <SEOHead
          title="Career Roadmaps | IT Learning Paths | NexxTechs Delhi"
          description="Structured career roadmaps for DevOps, Full Stack, Data Science & more. Start your IT journey with NexxTechs step-by-step guides."
          canonical="/roadmap"
        />
        <Breadcrumbs items={[{ name: "Roadmaps", path: "/roadmap" }]} />
        {selectedCourse ? renderDetailView() : renderListView()}
      </div>

      {/* Demo Inquiry Popup */}
      <Dialog open={demoPopupOpen} onOpenChange={setDemoPopupOpen}>
        <DialogContent className="sm:max-w-[450px] bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-2xl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-2xl font-bold text-[#111827] dark:text-white">
              Discuss Roadmap with <span className="text-[#84CC16]">Tech Experts</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-[#4B5563] dark:text-gray-400">
              Connect with our industry professionals to plan your tech career. Fill out the form below.
            </DialogDescription>
          </DialogHeader>

          {submitted && !error ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#F4FCE3] flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-[#84CC16]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Success!</h3>
              <p className="text-gray-600 dark:text-gray-400">Redirecting to your roadmap...</p>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">Full Name</label>
                <Input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">Phone Number</label>
                <Input
                  type="tel"
                  required
                  placeholder="Enter your mobile number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">Course Interested In</label>
                <Select
                  value={form.course_interested}
                  onValueChange={(val) => setForm({ ...form, course_interested: val })}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 h-auto focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20">
                    <SelectValue placeholder="Select a Course" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-200 bg-white dark:bg-[#1a1d27] dark:border-gray-700">
                    {COURSES_DATA.map((c) => (
                      <SelectItem key={c.slug} value={c.title} className="focus:bg-[#84CC16]/10 focus:text-[#84CC16] cursor-pointer rounded-lg mx-1 my-0.5">
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && <p className="text-red-500 text-xs font-medium mt-1">{error}</p>}
              {submitted && error && <p className="text-[#84CC16] text-xs font-medium mt-1">Request captured, redirecting...</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#84CC16] text-black font-bold rounded-xl py-6 mt-4 text-base hover:bg-[#65A30D] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 shadow-[0_0_15px_rgba(132,204,22,0.4)]"
              >
                {loading ? "Submitting..." : "Discuss Now"}
                <Send size={16} className="ml-2" />
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
