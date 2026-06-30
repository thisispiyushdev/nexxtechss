import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "../context/ThemeContext";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/bmqusq6t_black.png";
const LOGO_DARK_URL = "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/joiartmj_white.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses/" },
  { label: "Placement", href: "/placement/" },
  { label: "Collaborator", href: "/cyberhooks/" },
  { label: "Roadmap", href: "/roadmap/" },
  { label: "Blog", href: "/blog/" },
];

const MEGA_MENU_DATA = {
  "Data Science & AI": [
    { title: "Data Science & GenAI", type: "Job Bootcamp", link: "/course/data-science/" },
    { title: "Data Analytics", type: "Professional Certification", link: "/course/data-analytics/" },
    { title: "Machine Learning Specialist", type: "Professional Certification", link: "/course/data-science/" },
  ],
  "Software Development": [
    { title: "Java Full Stack", type: "Job Bootcamp", link: "/course/java-full-stack/" },
    { title: "MERN Stack Masterclass", type: "Professional Certification", link: "/course/mern-stack/" },
    { title: "Python Full Stack", type: "Job Bootcamp", link: "/course/python-full-stack/" },
    { title: "Web Development", type: "Full Stack Certification", link: "/course/web-development/" },
    { title: "DSA with Java", type: "Technical Certification", link: "/course/dsa-with-java/" },
    { title: "DSA Foundation", type: "Career Kickstarter", link: "/course/dsa/" },
  ],
  "Cyber Security": [
    { title: "Cyber Security Professional", type: "Professional Certification", link: "/course/cyber-security/" },
    { title: "Ethical Hacking Masterclass", type: "Job Bootcamp", link: "/course/cyber-security/" },
  ],
  "Cloud & DevOps": [
    { title: "Cloud Computing Expert", type: "Professional Certification", link: "/course/cloud-computing/" },
    { title: "DevOps Engineering", type: "Job Bootcamp", link: "/course/devops/" },
    { title: "Azure/AWS Specialist", type: "Cloud Certification", link: "/course/cloud-computing/" },
  ],
  "Design & Creative": [
    { title: "UI/UX Design", type: "Professional Certification", link: "/course/ui-ux-design/" },
    { title: "Graphic Design", type: "Professional Certification", link: "/course/graphic-design/" },
  ],
  "Business & Marketing": [
    { title: "Digital Marketing Expert", type: "Professional Certification", link: "/course/digital-marketing/" },
    { title: "SAP Masterclass", type: "Enterprise Certification", link: "/course/sap-masterclass/" },
  ]
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDomain, setActiveDomain] = useState("Data Science & AI");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Sleek Minimal Top Bar */}
      <div className="hidden lg:block bg-[#0A0A0A] text-gray-400 text-xs py-2 px-4 md:px-12 z-[60] relative border-b border-white/5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="mailto:info@nexxtechs.com" className="flex items-center gap-1.5 hover:text-[#84CC16] transition-colors">
              <Mail size={13} />
              <span>info@nexxtechs.com</span>
            </a>
            <a href="tel:+919217179762" className="flex items-center gap-1.5 hover:text-[#84CC16] transition-colors">
              <Phone size={13} />
              <span>+91 9217179762</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin size={13} />
            <span>B-54 Krishna Park, Vikaspuri</span>
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
          <Link to="/" aria-label="Home" className="flex items-center gap-2 shrink-0">
            <img 
              src={dark ? LOGO_DARK_URL : LOGO_URL} 
              alt="NexxTechs - Best IT Training Institute" 
              className="h-10 md:h-12 object-contain" 
              width={160}
              height={48}
              fetchPriority="high"
              loading="eager"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center h-full gap-4 xl:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;

              if (link.label === "Courses") {
                return (
                  <div 
                    key={link.label} 
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <Link
                      to={link.href}
                      className={`flex items-center gap-1 px-3 py-2 text-[15px] font-semibold transition-colors rounded-lg ${
                        isActive || megaMenuOpen ? "text-[#84CC16]" : dark ? "text-gray-200 hover:text-[#84CC16]" : "text-[#111827] hover:text-[#84CC16]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${megaMenuOpen ? "rotate-180" : ""}`} />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <div className={`absolute top-[90%] left-1/2 -translate-x-1/2 w-[900px] border rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden flex z-[100] ${
                      megaMenuOpen 
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
                          {Object.keys(MEGA_MENU_DATA).map(domain => (
                            <li 
                              key={domain}
                              onMouseEnter={() => setActiveDomain(domain)}
                              onClick={() => setActiveDomain(domain)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                                activeDomain === domain 
                                  ? dark ? "bg-white/5 text-[#84CC16] font-bold" : "bg-white text-[#84CC16] font-bold shadow-sm"
                                  : dark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-[#111827] hover:bg-white"
                              }`}
                            >
                              <span className="text-[13px]">{domain}</span>
                              <ChevronRight size={12} className={activeDomain === domain ? "opacity-100" : "opacity-0"} />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Content - Courses */}
                      <div className="w-3/4 p-10">
                        <div className="text-xs font-bold text-[#84CC16] uppercase tracking-widest mb-8">Programs in {activeDomain}</div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                          {MEGA_MENU_DATA[activeDomain].map((course, idx) => (
                            <Link 
                              key={idx} 
                              to={course.link || "/courses"}
                              onClick={() => {
                                setMegaMenuOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 group/course border border-transparent ${
                                dark ? "hover:bg-white/5 hover:border-white/5" : "hover:bg-gray-50 hover:border-gray-100 shadow-sm hover:shadow-md"
                              }`}
                            >
                              <div className="w-10 h-10 rounded-xl bg-[#84CC16]/10 flex items-center justify-center shrink-0 group-hover/course:bg-[#84CC16] transition-colors duration-300">
                                <div className="w-4 h-4 bg-[#84CC16] rounded-sm group-hover/course:bg-black group-hover/course:rotate-45 transition-all duration-300" />
                              </div>
                              <div>
                                <div className={`font-bold text-sm mb-1 group-hover/course:text-[#84CC16] transition-colors ${
                                  dark ? "text-white" : "text-[#111827]"
                                }`}>{course.title}</div>
                                <div className="text-gray-400 text-[11px] font-medium">{course.type}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
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
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className={`p-2.5 rounded-full transition-all duration-300 hover:scale-110 ${
                dark ? "bg-white/5 text-gray-300 hover:text-white" : "bg-gray-100 text-[#111827]"
              }`}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-5 py-3.5 text-base font-bold rounded-xl transition-all ${
                  location.pathname === link.href 
                    ? "text-[#84CC16] bg-[#84CC16]/5 border border-[#84CC16]/20" 
                    : dark ? "text-gray-300 hover:bg-white/5" : "text-[#111827] hover:bg-gray-50"
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight size={18} className={location.pathname === link.href ? "opacity-100" : "opacity-30"} />
              </Link>
            ))}
            
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 space-y-4">
              <Button 
                onClick={() => { setMobileOpen(false); navigate("/contact/"); }} 
                className="w-full bg-[#84CC16] text-black font-bold rounded-xl py-6 text-base shadow-lg shadow-[#84CC16]/20 hover:bg-[#65A30D] transition-colors"
              >
                Enquire Now
              </Button>
              
              <div className="flex flex-col gap-4 px-4 pt-2">
                <a href="tel:+919217179762" className="flex items-center gap-3 text-sm text-gray-500 font-bold hover:text-[#84CC16] transition-colors">
                  <Phone size={16} className="text-[#84CC16]" />
                  <span>+91 9217179762</span>
                </a>
                <a href="mailto:info@nexxtechs.com" className="flex items-center gap-3 text-sm text-gray-500 font-bold hover:text-[#84CC16] transition-colors">
                  <Mail size={16} className="text-[#84CC16]" />
                  <span>info@nexxtechs.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
