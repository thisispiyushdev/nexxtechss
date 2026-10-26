import React from "react";
import PageTransition from "../components/PageTransition";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import CareerLaunchSection from "../components/CareerLaunch/CareerLaunchSection";
import WhyChooseUs from "../components/WhyChooseUs";
import CounselorContact from "../components/CounselorContact";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Map, GraduationCap, MapPin } from "lucide-react";

export default function CareerLaunchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const branchParam = (searchParams.get("branch") || "").toLowerCase();

  const isNoida =
    location.pathname.toLowerCase().includes("noida") ||
    branchParam.includes("noida") ||
    location.search.toLowerCase().includes("noida") ||
    (typeof document !== "undefined" && (document.referrer || "").toLowerCase().includes("noida"));

  return (
    <PageTransition>
      <SEOHead
        title={isNoida ? "Career Launch – Find Your Best Tech Course in Noida | NexxTechs" : "Career Launch – Find Your Best Tech Course | NexxTechs"}
        description={isNoida ? "Take our interactive 2-minute Career Launch quiz to discover your ideal IT career track, personalized curriculum, and 100% placement roadmap at NexxTechs Noida Sector 2." : "Take our interactive 2-minute Career Launch quiz to discover your ideal IT career track, personalized curriculum, and 100% placement roadmap at NexxTechs."}
        canonical={isNoida ? "/career-launch-noida" : "/career-launch"}
      />
      <Breadcrumbs items={[{ name: "Career Launch", path: isNoida ? "/career-launch?branch=noida" : "/career-launch" }]} />

      {/* Dynamic Branch Switcher Tab */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <MapPin size={14} className="text-[#84CC16]" />
          <span>Active Center Details:</span>
          <span className="font-bold text-gray-900 dark:text-white">
            {isNoida ? "Noida Sector 2 (B-136 Upper, Sector 2)" : "Delhi Center (B-54 Vikaspuri)"}
          </span>
        </div>

        <div className="inline-flex items-center p-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => navigate("/career-launch")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              !isNoida
                ? "bg-[#84CC16] text-black shadow-md shadow-[#84CC16]/20"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Delhi Vikaspuri
          </button>
          <button
            type="button"
            onClick={() => navigate("/career-launch?branch=noida")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              isNoida
                ? "bg-[#84CC16] text-black shadow-md shadow-[#84CC16]/20"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Noida Sector 2
          </button>
        </div>
      </div>

      <div className="min-h-screen">
        {/* Main Career Launch Assessment & Course Explorer */}
        <CareerLaunchSection isEmbedded={false} isNoida={isNoida} />

        {/* Why NexxTechs Training */}
        <WhyChooseUs />

        {/* Direct Counselor Consultation */}
        <CounselorContact isNoida={isNoida} />

        {/* Internal Links Exploration Section */}
        <section className="py-16 bg-transparent">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Continue Exploring <span className="text-[#84CC16]">NexxTechs</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                to="/courses/"
                className="group flex items-center gap-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-[#84CC16]/40 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#84CC16]/10 flex items-center justify-center shrink-0">
                  <BookOpen size={18} className="text-[#84CC16]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#84CC16] transition-colors">
                    Explore All Courses
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">50+ industry-focused programs</p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto text-gray-400 group-hover:text-[#84CC16] group-hover:translate-x-1 transition-all"
                />
              </Link>

              <Link
                to="/roadmap/"
                className="group flex items-center gap-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-[#84CC16]/40 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Map size={18} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#84CC16] transition-colors">
                    Learning Roadmaps
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Step-by-step career paths</p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto text-gray-400 group-hover:text-[#84CC16] group-hover:translate-x-1 transition-all"
                />
              </Link>

              <Link
                to="/placement/"
                className="group flex items-center gap-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-[#84CC16]/40 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <GraduationCap size={18} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#84CC16] transition-colors">
                    Placement Records
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">95% placement rate & hiring partners</p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto text-gray-400 group-hover:text-[#84CC16] group-hover:translate-x-1 transition-all"
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
