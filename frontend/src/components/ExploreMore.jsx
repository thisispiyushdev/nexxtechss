import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const EXPLORE_LINKS = [
  { label: "Tech Blog & Guides", href: "/blog/" },
  { label: "Career Roadmaps", href: "/roadmap/" },
  { label: "Career Guidance & Counseling", href: "/career-guidance/" },
  { label: "Placement Success Stories", href: "/placement/" },
  { label: "CyberHooks Partnership", href: "/cyberhooks/" },
  { label: "Contact Us", href: "/contact/" },
];

export default function ExploreMore({ isCollaborator }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className={`py-12 relative z-10 ${isCollaborator ? 'bg-gray-50 dark:bg-[#050505] border-t border-gray-200 dark:border-white/5' : 'bg-transparent border-t border-gray-200 dark:border-white/5'}`} data-testid="explore-more">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-8">
          Explore More at <span className="text-[#84CC16]">NexxTechs</span>
        </h3>
        
        <div className="flex flex-wrap justify-center gap-4">
          {EXPLORE_LINKS.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-[#84CC16] hover:text-black hover:border-[#84CC16] dark:hover:bg-[#84CC16] dark:hover:text-black dark:hover:border-[#84CC16] transition-all duration-300 shadow-sm dark:shadow-none"
            >
              {link.label}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
