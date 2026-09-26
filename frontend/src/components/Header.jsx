import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "../context/ThemeContext";

const LOGO_URL = "/assets/logo_black.webp";
const LOGO_DARK_URL = "/assets/logo_white_small.webp";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses/" },
  { label: "Services", href: "/services" },
  { label: "Placement", href: "/placement/" },
  { label: "Roadmap", href: "/roadmap/" },
  { label: "Blog", href: "/blog/" },
];

const CONTACT_INFO = {
  noida: {
    phone: "+91 7987059430",
    phoneLink: "tel:+917987059430",
    email: "info@nexxtechs.com",
    emailLink: "mailto:info@nexxtechs.com",
    address: "B-136 Upper, Ground floor, Sector 2, Noida",
  },
  default: {
    phone: "+91 9217179762",
    phoneLink: "tel:+919217179762",
    email: "info@nexxtechs.com",
    emailLink: "mailto:info@nexxtechs.com",
    address: "B-54 Krishna Park, Vikaspuri",
  }
};

const MEGA_MENU_DATA = {
  "Data Science & AI": [
    { title: "Generative AI", type: "Professional Certification", link: "/course/gen-ai" },
    { title: "Data Science & GenAI", type: "Job Bootcamp", link: "/course/data-science" },
    { title: "Data Analytics", type: "Professional Certification", link: "/course/data-analytics" },
    { title: "Machine Learning Specialist", type: "Professional Certification", link: "/course/data-science" },
  ],
  "Software Development": [
    { title: "Java Full Stack", type: "Job Bootcamp", link: "/course/java-full-stack" },
    { title: "MERN Stack Masterclass", type: "Professional Certification", link: "/course/mern-stack" },
    { title: "Python Full Stack", type: "Job Bootcamp", link: "/course/python-full-stack" },
    { title: "Web Development", type: "Full Stack Certification", link: "/course/web-development" },
    { title: "DSA with Java", type: "Technical Certification", link: "/course/dsa-with-java" },
    { title: "DSA Foundation", type: "Career Kickstarter", link: "/course/dsa" },
  ],
  "Cyber Security": [
    { title: "Cyber Security Professional", type: "Professional Certification", link: "/course/cyber-security" },
    { title: "Ethical Hacking Masterclass", type: "Job Bootcamp", link: "/course/cyber-security" },
  ],
  "Cloud & DevOps": [
    { title: "Cloud Computing Expert", type: "Professional Certification", link: "/course/cloud-computing" },
    { title: "DevOps Engineering", type: "Job Bootcamp", link: "/course/devops" },
    { title: "Azure/AWS Specialist", type: "Cloud Certification", link: "/course/cloud-computing" },
  ],
  "Design & Creative": [
    { title: "UI/UX Design", type: "Professional Certification", link: "/course/ui-ux-design" },
    { title: "Graphic Design", type: "Professional Certification", link: "/course/graphic-design" },
  ],
  "Business & Marketing": [
    { title: "Digital Marketing Expert", type: "Professional Certification", link: "/course/digital-marketing" },
    { title: "SAP Masterclass", type: "Enterprise Certification", link: "/course/sap-masterclass" },
  ]
};

const NOIDA_MEGA_MENU_DATA = {
  "Data Science & AI": [
    { title: "Generative AI", type: "Professional Certification", link: "/course/gen-ai-noida" },
    { title: "Data Science & GenAI", type: "Job Bootcamp", link: "/course/data-science-noida" },
    { title: "Data Analytics", type: "Professional Certification", link: "/course/data-analytics-noida" },
    { title: "Machine Learning Specialist", type: "Professional Certification", link: "/course/data-science-noida" },
  ],
  "Software Development": [
    { title: "Java Full Stack", type: "Job Bootcamp", link: "/course/java-full-stack-noida" },
    { title: "MERN Stack Masterclass", type: "Professional Certification", link: "/course/mern-stack-noida" },
    { title: "Python Full Stack", type: "Job Bootcamp", link: "/course/python-full-stack-noida" },
    { title: "Web Development", type: "Full Stack Certification", link: "/course/web-development-noida" },
    { title: "DSA with Java", type: "Technical Certification", link: "/course/dsa-with-java-noida" },
    { title: "DSA Foundation", type: "Career Kickstarter", link: "/course/dsa-noida" },
  ],
  "Cyber Security": [
    { title: "Cyber Security Professional", type: "Professional Certification", link: "/course/cyber-security-noida" },
    { title: "Ethical Hacking Masterclass", type: "Job Bootcamp", link: "/course/cyber-security-noida" },
  ],
  "Cloud & DevOps": [
    { title: "Cloud Computing Expert", type: "Professional Certification", link: "/course/cloud-computing-noida" },
    { title: "DevOps Engineering", type: "Job Bootcamp", link: "/course/devops-noida" },
    { title: "Azure/AWS Specialist", type: "Cloud Certification", link: "/course/cloud-computing-noida" },
  ],
  "Design & Creative": [
    { title: "UI/UX Design", type: "Professional Certification", link: "/course/ui-ux-design-noida" },
    { title: "Graphic Design", type: "Professional Certification", link: "/course/graphic-design-noida" },
  ],
  "Business & Marketing": [
    { title: "Digital Marketing Expert", type: "Professional Certification", link: "/course/digital-marketing-noida" },
    { title: "SAP Masterclass", type: "Enterprise Certification", link: "/course/sap-masterclass-noida" },
  ]
};

const SERVICES_MEGA_MENU_DATA = {
  "AI & Automation": [
    { title: "AI Consulting", type: "Strategy, Roadmap & ROI", link: "/services/ai-consulting" },
    { title: "RAG Development", type: "GPT-4o + LangChain", link: "/services/rag-development" },
    { title: "AI Agents", type: "Agentic Workflows", link: "/services/ai-agents" },
    { title: "LLM Integration", type: "Claude, Gemini, Llama", link: "/services/llm-integration" },
    { title: "Voice AI", type: "Voice Bots, Call Agents", link: "/services/voice-ai" },
    { title: "CRM Automation", type: "HubSpot, Salesforce AI", link: "/services/crm-automation" },
    { title: "MCP Development", type: "Model Context Protocol", link: "/services/mcp-development" },
    { title: "ML & Predictions", type: "Custom Models", link: "/services/ml-predictions" },
    { title: "Document AI", type: "OCR & Processing", link: "/services/document-ai" },
    { title: "AI Chatbot", type: "Support & Lead Gen", link: "/services/ai-chatbot" },
    { title: "WhatsApp AI", type: "WhatsApp Business API", link: "/services/whatsapp-ai" },
  ],
  "Development": [
    { title: "Web Development", type: "React, Django, Next.js", link: "/services/web-development" },
    { title: "Mobile Apps", type: "Android, iOS, Flutter", link: "/services/mobile-apps" },
    { title: "React Native Apps", type: "One Codebase", link: "/services/react-native" },
    { title: "SaaS Development", type: "Multi-Tenant Platforms", link: "/services/saas-development" },
    { title: "API Integration", type: "REST, GraphQL", link: "/services/api-integration" },
    { title: "Python Development", type: "AI, ML, Data Pipelines", link: "/services/python-development" },
    { title: "FastAPI Development", type: "High-Performance APIs", link: "/services/fastapi" },
    { title: "LangChain Development", type: "RAG Chains, Agents", link: "/services/langchain" },
    { title: "LangGraph Development", type: "Multi-Agent Workflows", link: "/services/langgraph" },
    { title: "Django Development", type: "Admin-Heavy Web Apps", link: "/services/django" },
  ],
  "Cloud & IT": [
    { title: "Cloud Services", type: "AWS EC2, S3, Lambda", link: "/services/cloud-services" },
    { title: "DevOps & CI/CD", type: "GitHub Actions, Docker", link: "/services/devops" },
    { title: "Software Development", type: "Custom Systems", link: "/services/software-development" },
    { title: "Networking", type: "Architecture & Security", link: "/services/networking" },
    { title: "IT Staffing", type: "AI & Dev Talent", link: "/services/it-staffing" },
  ],
  "Website Designing": [
    { title: "Website Designing", type: "Custom Design Services", link: "/services/website-designing" },
    { title: "Static Website Design", type: "Simple Brochure Sites", link: "/services/static-website" },
    { title: "Dynamic Website Design", type: "CMS-Driven Sites", link: "/services/dynamic-website" },
    { title: "Responsive Website", type: "Mobile-First Design", link: "/services/responsive-website" },
    { title: "Business Website", type: "Professional Sites", link: "/services/business-website" },
    { title: "Corporate Website", type: "Enterprise-Grade", link: "/services/corporate-website" },
    { title: "Portfolio Website", type: "Showcase Case Studies", link: "/services/portfolio-website" },
    { title: "Landing Page Design", type: "High-Converting Pages", link: "/services/landing-page" },
    { title: "Ecommerce Website", type: "Online Stores That Sell", link: "/services/ecommerce" },
  ]
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegaMenuLabel, setActiveMegaMenuLabel] = useState(null);
  const [activeDomain, setActiveDomain] = useState(null);
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isNoida = location.pathname.includes('noida');
  const isServicePage = location.pathname.includes('service');
  const contactInfo = isNoida || isServicePage ? CONTACT_INFO.noida : CONTACT_INFO.default;

  const activeCoursesMegaMenuData = isNoida ? NOIDA_MEGA_MENU_DATA : MEGA_MENU_DATA;

  const NAV_LINKS_ENHANCED = NAV_LINKS.map(link => {
    if (link.label === "Courses") {
      return { ...link, isMegaMenu: true, megaMenuData: activeCoursesMegaMenuData };
    }
    return link;
  });

  let activeNavLinks;
  if (isServicePage) {
    activeNavLinks = [
      { 
        label: "Our Services", 
        href: "/services",
        isMegaMenu: true,
        megaMenuData: SERVICES_MEGA_MENU_DATA
      },
      { 
        label: "Industrial Training", 
        isSimpleDropdown: true,
        options: [
          { label: "Nexxtechs Noida", href: "/nexxtechs-noida" },
          { label: "Nexxtechs Delhi", href: "/" }
        ]
      },
      { label: "Enquiry", href: "/service-enquiry" }
    ];
  } else if (isNoida) {
    activeNavLinks = [
      { label: "Home", href: "/nexxtechs-noida" },
      { label: "Courses", href: "/courses", isMegaMenu: true, megaMenuData: activeCoursesMegaMenuData },
      { label: "Services", href: "/services" },
      { label: "Placement", href: "/placement/" },
      { label: "Roadmap", href: "/roadmap/" },
      { label: "Blog", href: "/blog/" },
    ];
  } else {
    activeNavLinks = NAV_LINKS_ENHANCED;
  }

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMegaMenuLabel(null);
  }, [location]);

  return (
    <>
      {/* Sleek Minimal Top Bar */}
      <div className="hidden lg:block bg-[#0A0A0A] text-gray-400 text-xs py-2 px-4 md:px-12 z-[60] relative border-b border-white/5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={contactInfo.emailLink} className="flex items-center gap-1.5 hover:text-[#84CC16] transition-colors">
              <Mail size={13} />
              <span>{contactInfo.email}</span>
            </a>
            <a href={contactInfo.phoneLink} className="flex items-center gap-1.5 hover:text-[#84CC16] transition-colors">
              <Phone size={13} />
              <span>{contactInfo.phone}</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin size={13} />
            <span>{contactInfo.address}</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-[90] w-full transition-all duration-300 ${
          scrolled
            ? dark
              ? "bg-[#0f1117]/85 backdrop-blur-xl shadow-md border-b border-white/10"
              : "bg-white/85 backdrop-blur-xl shadow-sm border-b border-gray-200"
            : dark
              ? "bg-[#0f1117] border-b border-white/5"
              : "bg-white border-b border-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-8 flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to={isNoida ? "/nexxtechs-noida" : "/"} aria-label="Home" className="flex items-center gap-2 shrink-0">
            <img 
              src={dark ? LOGO_DARK_URL : LOGO_URL} 
              alt="NexxTechs - Best IT Training Institute" 
              className="h-12 md:h-16 lg:h-[4.5rem] object-contain transition-all duration-300" 
              width={240}
              height={72}
              fetchPriority="high"
              loading="eager"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center h-full gap-4 xl:gap-8">
            {activeNavLinks.map((link) => {
              const isActive = location.pathname === link.href;

              if (link.isMegaMenu) {
                const isThisMegaMenuOpen = activeMegaMenuLabel === link.label;
                const menuData = link.megaMenuData;
                const currentDomain = activeDomain || Object.keys(menuData)[0];
                const domainData = menuData[currentDomain] || [];

                return (
                  <div 
                    key={link.label} 
                    className="relative h-full flex items-center"
                    onMouseEnter={() => {
                      setActiveMegaMenuLabel(link.label);
                      setActiveDomain(Object.keys(menuData)[0]);
                    }}
                    onMouseLeave={() => setActiveMegaMenuLabel(null)}
                  >
                    <Link
                      to={link.href}
                      className={`flex items-center gap-1 px-3 py-2 text-[15px] font-semibold transition-colors rounded-lg ${
                        isActive || isThisMegaMenuOpen ? "text-[#84CC16]" : dark ? "text-gray-200 hover:text-[#84CC16]" : "text-[#111827] hover:text-[#84CC16]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isThisMegaMenuOpen ? "rotate-180" : ""}`} />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <div className={`absolute top-[90%] left-1/2 -translate-x-1/2 w-[900px] border rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden flex z-[100] ${
                      isThisMegaMenuOpen 
                        ? "opacity-100 visible translate-y-0" 
                        : "opacity-0 invisible translate-y-2"
                    } ${
                      dark ? "bg-[#1a1d27] border-white/10 shadow-black/40" : "bg-white border-gray-100 shadow-xl"
                    }`}>
                      
                      {/* Left Sidebar - Domains */}
                      <div className={`w-1/4 p-4 border-r ${
                        dark ? "bg-[#0f1117] border-white/5" : "bg-gray-50 border-gray-100"
                      }`}>
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Domain</div>
                        <ul className="space-y-1">
                          {Object.keys(menuData).map(domain => (
                            <li 
                              key={domain}
                              onMouseEnter={() => setActiveDomain(domain)}
                              onClick={() => setActiveDomain(domain)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                                currentDomain === domain 
                                  ? dark ? "bg-white/5 text-[#84CC16] font-bold" : "bg-white text-[#84CC16] font-bold shadow-sm"
                                  : dark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-[#111827] hover:bg-white"
                              }`}
                            >
                              <span className="text-[13px]">{domain}</span>
                              <ChevronRight size={12} className={currentDomain === domain ? "opacity-100" : "opacity-0"} />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Content - Courses/Services */}
                      <div className="w-3/4 p-10">
                        <div className="text-xs font-bold text-[#84CC16] uppercase tracking-widest mb-6">Explore {link.label}</div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                          {domainData.map((item, idx) => (
                            <Link 
                              key={idx} 
                              to={item.link || "/"}
                              onClick={() => {
                                setActiveMegaMenuLabel(null);
                                window.scrollTo(0, 0);
                              }}
                              className={`flex items-start gap-3 p-3 rounded-2xl transition-all duration-300 group/course border border-transparent ${
                                dark ? "hover:bg-white/5 hover:border-white/5" : "hover:bg-gray-50 hover:border-gray-100 shadow-sm hover:shadow-md"
                              }`}
                            >
                              <div className="w-8 h-8 rounded-xl bg-[#84CC16]/10 flex items-center justify-center shrink-0 group-hover/course:bg-[#84CC16] transition-colors duration-300">
                                <div className="w-3 h-3 bg-[#84CC16] rounded-sm group-hover/course:bg-black group-hover/course:rotate-45 transition-all duration-300" />
                              </div>
                              <div>
                                <div className={`font-bold text-sm mb-1 group-hover/course:text-[#84CC16] transition-colors ${
                                  dark ? "text-white" : "text-[#111827]"
                                }`}>{item.title}</div>
                                <div className="text-gray-400 text-[11px] font-medium">{item.type}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (link.isSimpleDropdown) {
                return (
                  <div 
                    key={link.label} 
                    className="relative h-full flex items-center group"
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-[15px] font-semibold transition-colors rounded-lg ${
                        dark ? "text-gray-200 hover:text-[#84CC16]" : "text-[#111827] hover:text-[#84CC16]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                    </button>

                    {/* Simple Dropdown */}
                    <div className={`absolute top-[80%] left-0 w-48 border rounded-xl shadow-xl transition-all duration-300 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 flex flex-col py-2 z-[100] ${
                      dark ? "bg-[#1a1d27] border-white/10 shadow-black/40" : "bg-white border-gray-100"
                    }`}>
                      {link.options.map((opt, idx) => (
                        <Link 
                          key={idx}
                          to={opt.href}
                          className={`px-4 py-2 text-sm font-semibold transition-colors ${
                            dark ? "text-gray-300 hover:text-[#84CC16] hover:bg-white/5" : "text-gray-700 hover:text-[#84CC16] hover:bg-gray-50"
                          }`}
                        >
                          {opt.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  target={link.label === "Services" ? "_blank" : undefined}
                  rel={link.label === "Services" ? "noopener noreferrer" : undefined}
                  className={`px-3 py-2 text-[15px] font-semibold transition-colors rounded-lg ${
                    isActive ? "text-[#84CC16]" : dark ? "text-gray-200 hover:text-[#84CC16]" : "text-[#111827] hover:text-[#84CC16]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Theme Toggle + Mobile Toggle */}
          <div className="flex items-center gap-4">


            <Button
              onClick={() => navigate("/contact/")}
              className="hidden sm:inline-flex bg-[#84CC16] text-black font-bold rounded-xl px-8 py-6 hover:bg-[#65A30D] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(132,204,22,0.4)]"
            >
              Enquire Now
            </Button>
            
            <button
              className={`lg:hidden p-2 rounded-lg ${dark ? "text-white" : "text-black"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
 
        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-x-0 top-20 md:top-24 bottom-0 z-40 transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none -translate-y-2"
        } ${dark ? "bg-[#0f1117] border-t border-white/5" : "bg-white border-t border-gray-100"}`}>
          <div className="px-6 py-6 flex flex-col gap-2 h-full overflow-y-auto">
            <div className="text-[10px] font-black text-[#84CC16] uppercase tracking-[0.2em] mb-2 px-4">Navigation</div>
            {activeNavLinks.map((link) => {
              if (link.isSimpleDropdown) {
                return (
                  <div key={link.label} className="flex flex-col border-b border-gray-100 dark:border-white/5">
                    <div className="px-5 py-3.5 text-base font-bold text-gray-400 uppercase text-[11px] tracking-wider">
                      {link.label}
                    </div>
                    {link.options.map((opt, idx) => (
                      <Link
                        key={idx}
                        to={opt.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center pl-8 pr-5 py-3 text-sm font-bold transition-all ${
                          dark ? "text-gray-300 hover:bg-white/5" : "text-[#111827] hover:bg-gray-50"
                        }`}
                      >
                        {opt.label}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  target={link.label === "Services" && !isServicePage ? "_blank" : undefined}
                  rel={link.label === "Services" && !isServicePage ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                className={`flex items-center justify-between px-5 py-3.5 text-base font-bold rounded-xl transition-all ${
                  location.pathname === link.href 
                    ? "text-[#84CC16] bg-[#84CC16]/5 border border-[#84CC16]/20" 
                    : dark ? "text-gray-300 hover:bg-white/5" : "text-[#111827] hover:bg-gray-50"
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight size={18} className={location.pathname === link.href ? "opacity-100" : "opacity-30"} />
              </Link>
              );
            })}
            
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 space-y-4">
              <Button 
                onClick={() => { setMobileOpen(false); navigate("/contact/"); }} 
                className="w-full bg-[#84CC16] text-black font-bold rounded-xl py-6 text-base shadow-lg shadow-[#84CC16]/20 hover:bg-[#65A30D] transition-colors"
              >
                Enquire Now
              </Button>
              
              <div className="flex flex-col gap-4 px-4 pt-2">
                <a href={contactInfo.phoneLink} className="flex items-center gap-3 text-sm text-gray-500 font-bold hover:text-[#84CC16] transition-colors">
                  <Phone size={16} className="text-[#84CC16]" />
                  <span>{contactInfo.phone}</span>
                </a>
                <a href={contactInfo.emailLink} className="flex items-center gap-3 text-sm text-gray-500 font-bold hover:text-[#84CC16] transition-colors">
                  <Mail size={16} className="text-[#84CC16]" />
                  <span>{contactInfo.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
