import { Phone, Mail, MapPin, ArrowUp, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { externalLinks } from "../data/externalLinks";
const LOGO_URL = "/assets/logo_white.webp";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses/" },
  { label: "Industrial Training", href: "/courses/" },
  { label: "Placements", href: "/placement/" },
  { label: "Blog", href: "/blog/" },
  { label: "Career Guidance", href: "/career-guidance/" },
  { label: "Contact", href: "/contact/" },
];

const RESOURCES = [
  { label: "Tech Blog", href: "/blog/" },
  { label: "Career Roadmaps", href: "/roadmap/" },
  { label: "Career Guidance", href: "/career-guidance/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
];

const SERVICE_AI_LINKS = [
  { label: "AI Consulting", href: "/services/ai-consulting" },
  { label: "RAG Development", href: "/services/rag-development" },
  { label: "AI Agents", href: "/services/ai-agents" },
  { label: "SaaS Development", href: "/services/saas-development" },
];

const SERVICE_ENG_LINKS = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile App Dev", href: "/services/mobile-app-development" },
  { label: "Cloud Consulting", href: "/services/cloud-consulting" },
  { label: "DevOps & CI/CD", href: "/services/devops-automation" },
];

const SERVICE_SEC_LINKS = [
  { label: "Vulnerability Security", href: "/services/vulnerability-assessment" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  { label: "Performance Marketing", href: "/services/performance-marketing" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const isServicePage = location.pathname.includes('service');
  const isNoida = location.pathname.includes('noida') || isServicePage;

  const contactInfo = isNoida ? {
    phone: "+91 7987059430",
    phoneLink: "tel:+917987059430"
  } : {
    phone: "+91 9217179762",
    phoneLink: "tel:+919217179762"
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 md:pt-20 pb-8" data-testid="footer">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {isServicePage ? (
          /* Dedicated Enterprise IT Services Footer */
          <div className="grid md:grid-cols-4 lg:grid-cols-12 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-3 md:col-span-4 lg:pr-4">
              <img 
                src={LOGO_URL} 
                alt="NexxTechs - Enterprise IT & AI Development Services" 
                className="h-28 md:h-32 mb-4 object-contain" 
                width={200}
                height={128}
                loading="lazy"
              />
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Enterprise IT & AI Solutions empowering modern businesses with scalable, cloud-native, and AI-driven technology.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                {[
                  { name: "facebook", icon: Facebook, url: "https://www.facebook.com/profile.php?id=61574247346379#" },
                  { name: "twitter", icon: Twitter, url: "https://x.com/nexxtechs" },
                  { name: "instagram", icon: Instagram, url: "https://www.instagram.com/nexxtechs.institute" },
                  { name: "linkedin", icon: Linkedin, url: "https://www.linkedin.com/company/nexxtechs-private-limited/" }
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#84CC16] transition-colors group border border-white/10 hover:border-transparent shadow-sm"
                      aria-label={social.name}
                    >
                      <Icon size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Enterprise AI Services */}
            <div className="lg:col-span-2 md:col-span-2">
              <h4 className="font-bold text-white text-base mb-5">AI & Products</h4>
              <ul className="space-y-3 mb-6">
                {SERVICE_AI_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      onClick={scrollToTop}
                      className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Development & Cloud */}
            <div className="lg:col-span-2 md:col-span-2">
              <h4 className="font-bold text-white text-base mb-5">Engineering & Cloud</h4>
              <ul className="space-y-3 mb-6">
                {SERVICE_ENG_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      onClick={scrollToTop}
                      className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cyber Security & Growth */}
            <div className="lg:col-span-2 md:col-span-2">
              <h4 className="font-bold text-white text-base mb-5">Security & Growth</h4>
              <ul className="space-y-3 mb-6">
                {SERVICE_SEC_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      onClick={scrollToTop}
                      className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-black bg-[#84CC16] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#65A30D] transition-all group"
              >
                View All Services
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1 md:col-span-2">
              <h4 className="font-bold text-white text-base mb-5">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/services" onClick={scrollToTop} className="text-gray-400 text-sm hover:text-[#84CC16] block">
                    Services Home
                  </Link>
                </li>
                <li>
                  <Link to="/services/service-enquiry" onClick={scrollToTop} className="text-gray-400 text-sm hover:text-[#84CC16] block">
                    Service Enquiry
                  </Link>
                </li>
                <li>
                  <Link to="/blog/" onClick={scrollToTop} className="text-gray-400 text-sm hover:text-[#84CC16] block">
                    Tech Insights
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy/" onClick={scrollToTop} className="text-gray-400 text-sm hover:text-[#84CC16] block">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Enterprise Desk & Contact Info */}
            <div className="lg:col-span-2 md:col-span-2">
              <h4 className="font-bold text-white text-base mb-5">Enterprise Desk</h4>
              <address className="space-y-3 not-italic">
                <a href="tel:+917987059430" className="flex items-start gap-3 text-gray-400 text-sm hover:text-[#84CC16] transition-colors whitespace-nowrap">
                  <Phone size={14} className="mt-0.5 shrink-0 text-[#84CC16]" />
                  <span>+91 7987059430</span>
                </a>
                <a href="mailto:info@nexxtechs.com" className="flex items-start gap-3 text-gray-400 text-sm hover:text-[#84CC16] transition-colors">
                  <Mail size={14} className="mt-0.5 shrink-0 text-[#84CC16]" />
                  <span>info@nexxtechs.com</span>
                </a>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#84CC16]" />
                  <div>
                    <span className="block font-semibold text-white/90">Noida Development HQ</span>
                    <span>B-136 Upper, Ground floor, B Block, Sector 2, Noida, UP 201301</span>
                  </div>
                </div>
              </address>
            </div>
          </div>
        ) : (
          /* Default Training Institute Footer */
          <div className="grid md:grid-cols-4 lg:grid-cols-12 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-3 md:col-span-4 lg:pr-4">
              <img 
                src={LOGO_URL} 
                alt="NexxTechs - Best IT Training Institute in Vikaspuri Delhi" 
                className="h-32 md:h-36 mb-4 object-contain" 
                width={200}
                height={128}
                loading="lazy"
              />
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Empowering the next generation of tech professionals with industry-focused training and 100% placement assistance.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                {[
                  { name: "facebook", icon: Facebook, url: "https://www.facebook.com/profile.php?id=61574247346379#" },
                  { name: "twitter", icon: Twitter, url: "https://x.com/nexxtechs" },
                  { name: "instagram", icon: Instagram, url: "https://www.instagram.com/nexxtechs.institute" },
                  { name: "linkedin", icon: Linkedin, url: "https://www.linkedin.com/company/nexxtechs-private-limited/" }
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#84CC16] transition-colors group border border-white/10 hover:border-transparent shadow-sm"
                      aria-label={social.name}
                    >
                      <Icon size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h4 className="font-bold text-white text-base mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      onClick={scrollToTop}
                      className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses in Delhi */}
            <div className="lg:col-span-2 md:col-span-2">
              <h4 className="font-bold text-white text-base mb-5">Courses in Delhi</h4>
              <ul className="space-y-3 mb-6">
                {[
                  { label: "Data Science & AI in Delhi", href: "/course/data-science" },
                  { label: "Full Stack Web Dev in Delhi", href: "/course/web-development" },
                  { label: "DevOps Engineering in Delhi", href: "/course/devops" },
                  { label: "Cyber Security in Delhi", href: "/course/cyber-security" },
                  { label: "Cloud Computing in Delhi", href: "/course/cloud-computing" },
                ].map((course) => (
                  <li key={course.label}>
                    <Link
                      to={course.href}
                      onClick={scrollToTop}
                      className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors block"
                    >
                      {course.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/courses/"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-black bg-[#84CC16] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#65A30D] transition-all group"
              >
                View All Courses
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Courses in Noida */}
            <div className="lg:col-span-2 md:col-span-2">
              <h4 className="font-bold text-white text-base mb-5">Courses in Noida</h4>
              <ul className="space-y-3 mb-6">
                {[
                  { label: "Data Science & AI in Noida", href: "/course/data-science-noida" },
                  { label: "Full Stack Web Dev in Noida", href: "/course/web-development-noida" },
                  { label: "DevOps Engineering in Noida", href: "/course/devops-noida" },
                  { label: "Cyber Security in Noida", href: "/course/cyber-security-noida" },
                  { label: "Cloud Computing in Noida", href: "/course/cloud-computing-noida" },
                ].map((course) => (
                  <li key={`noida-${course.label}`}>
                    <Link
                      to={course.href}
                      onClick={scrollToTop}
                      className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors block"
                    >
                      {course.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-1 md:col-span-2">
              <h4 className="font-bold text-white text-base mb-5">Resources</h4>
              <ul className="space-y-3">
                {RESOURCES.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      onClick={scrollToTop}
                      className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Branches */}
            <div className="lg:col-span-1 md:col-span-2">
              <h4 className="font-bold text-white text-base mb-5">Branches</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    onClick={scrollToTop}
                    className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors block"
                  >
                    Nexxtechs Delhi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/nexxtechs-noida"
                    onClick={scrollToTop}
                    className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors block"
                  >
                    Nexxtechs Noida
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="lg:col-span-2 md:col-span-2">
              <h4 className="font-bold text-white text-base mb-5">Contact Us</h4>
              <address className="space-y-3 not-italic">
                <a href={contactInfo.phoneLink} className="flex items-start gap-3 text-gray-400 text-sm hover:text-[#84CC16] transition-colors whitespace-nowrap">
                  <Phone size={14} className="mt-0.5 shrink-0" />
                  <span>{contactInfo.phone}</span>
                </a>
                <a href="mailto:info@nexxtechs.com" className="flex items-start gap-3 text-gray-400 text-sm hover:text-[#84CC16] transition-colors">
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  <span>info@nexxtechs.com</span>
                </a>
                {!isNoida ? (
                  <div className="flex items-start gap-3 text-gray-400 text-sm">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <div>
                      <span className="block font-semibold text-white/90">Delhi Branch</span>
                      <span>B-54 Krishna Park, Vikaspuri, New Delhi - 110018</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 text-gray-400 text-sm">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-[#84CC16]" />
                    <div>
                      <span className="block font-semibold text-white/90">Noida Branch</span>
                      <span>B-136 Upper, Ground floor, B Block, Sector 2, Noida, UP 201301</span>
                    </div>
                  </div>
                )}
              </address>
            </div>
          </div>
        )}

        {/* External Technology Documentations & References */}
        <div className="pt-8 pb-4">
          <details className="group">
            <summary className="text-sm font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-[#84CC16] transition-colors flex items-center justify-center gap-2 select-none">
              External Technology Resources
            </summary>
            <div className="mt-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
                {externalLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-gray-400 hover:text-[#84CC16] whitespace-nowrap"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </details>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} NEXXTECHS. All rights reserved.
            </p>
            <Link
              to="/privacy-policy/"
              onClick={scrollToTop}
              className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors"
            >
              Privacy Policy & Terms
            </Link>
          </div>
          <p className="text-gray-400 text-xs text-center md:text-left w-full mt-2">
            {isServicePage
              ? "NexxTechs – Enterprise IT & AI Solutions Hub | Noida Sector 2 Development HQ | AI Consulting, RAG Development, Custom Web & Mobile Apps, Cloud & Cybersecurity Services"
              : "NexxTechs – Best IT Training Institute in Vikaspuri, New Delhi & Sector 2, Noida | DevOps, Cloud Computing, Full Stack, Cyber Security, Data Science Courses | 100% Placement Assistance"
            }
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#84CC16] flex items-center justify-center hover:bg-[#65A30D] transition-colors shrink-0"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} className="text-black" />
          </button>
        </div>
      </div>
    </footer>
  );
}
