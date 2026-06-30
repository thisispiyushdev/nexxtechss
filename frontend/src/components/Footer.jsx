import { Phone, Mail, MapPin, ArrowUp, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { externalLinks } from "../data/externalLinks";const LOGO_URL = "/assets/logo_white.webp";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses/" },
  { label: "Placements", href: "/placement/" },
  { label: "Blog", href: "/blog/" },
  { label: "Career Guidance", href: "/career-guidance/" },
  { label: "Contact", href: "/contact/" },
];


const RESOURCES = [
  { label: "Tech Blog", href: "/blog/" },
  { label: "Career Roadmaps", href: "/roadmap/" },
  { label: "Career Guidance", href: "/career-guidance/" },
  { label: "CyberHooks Partnership", href: "/cyberhooks/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
];

export default function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 md:pt-20 pb-8" data-testid="footer">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 md:col-span-3 lg:pr-4">
            <img 
              src={LOGO_URL} 
              alt="NexxTechs - Best IT Training Institute in Vikaspuri Delhi" 
              className="h-32 md:h-36 mb-4 object-contain" 
              width={200}
              height={128}
              loading="lazy"
              fetchPriority="low"
            />
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Empowering the next generation of tech professionals with industry-focused training and 100% placement assistance.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { name: "facebook", icon: Facebook, url: "https://www.instagram.com/nexxtechs.institute" },
                { name: "twitter", icon: Twitter, url: "https://www.instagram.com/nexxtechs.institute" },
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
                    data-testid={`social-${social.name}`}
                    aria-label={social.name}
                  >
                    <Icon size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={scrollToTop}
                    className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white text-base mb-5">Courses</h4>
            <ul className="space-y-3 mb-6">
              {[
                { label: "Data Science & AI", href: "/course/data-science/" },
                { label: "Full Stack Web Dev", href: "/course/web-development/" },
                { label: "DevOps Engineering", href: "/course/devops/" },
                { label: "Cyber Security", href: "/course/cyber-security/" },
                { label: "Cloud Computing", href: "/course/cloud-computing/" },
              ].map((course) => (
                <li key={course.label}>
                  <Link
                    to={course.href}
                    onClick={scrollToTop}
                    className="text-gray-400 text-sm hover:text-[#84CC16] transition-colors"
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

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white text-base mb-5">Resources</h4>
            <ul className="space-y-3">
              {RESOURCES.map((link) => (
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

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white text-base mb-5">Contact Us</h4>
            <address className="space-y-3 not-italic">
              <a href="tel:+919217179762" className="flex items-start gap-3 text-gray-400 text-sm hover:text-[#84CC16] transition-colors" data-testid="footer-phone">
                <Phone size={14} className="mt-0.5 shrink-0" />
                <span>+91 9217179762</span>
              </a>
              <a href="mailto:info@nexxtechs.com" className="flex items-start gap-3 text-gray-400 text-sm hover:text-[#84CC16] transition-colors" data-testid="footer-email">
                <Mail size={14} className="mt-0.5 shrink-0" />
                <span>info@nexxtechs.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm" data-testid="footer-address">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>B-54 Krishna Park, Vikaspuri, New Delhi - 110018</span>
              </div>
            </address>
          </div>
        </div>

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
            NexxTechs – Best IT Training Institute in Vikaspuri, New Delhi | DevOps, Cloud Computing, Full Stack, Cyber Security, Data Science Courses | 100% Placement Assistance
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#84CC16] flex items-center justify-center hover:bg-[#65A30D] transition-colors"
            data-testid="scroll-to-top-btn"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} className="text-black" />
          </button>
        </div>
      </div>
    </footer>
  );
}
