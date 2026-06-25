import WhyChooseUs from "../components/WhyChooseUs";
import CounselorContact from "../components/CounselorContact";
import PageTransition from "../components/PageTransition";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Map, GraduationCap } from "lucide-react";

export default function CareerGuidancePage() {
  return (
    <PageTransition>
      <SEOHead
        title="Career Guidance & IT Counseling | NexxTechs Delhi"
        description="Get free IT career advice and personalized roadmaps for DevOps, Data Science, and Cloud at NexxTechs Vikaspuri. Book your session!"
        canonical="/career-guidance"
      />
      <Breadcrumbs items={[{ name: "Career Guidance", path: "/career-guidance" }]} />
      <div className="min-h-screen">
        <WhyChooseUs />
        <CounselorContact />

        {/* Internal Links Section */}
        <section className="py-16 bg-transparent">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Continue Exploring <span className="text-[#84CC16]">NexxTechs</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/courses/" className="group flex items-center gap-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-[#84CC16]/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-[#84CC16]/10 flex items-center justify-center shrink-0">
                  <BookOpen size={18} className="text-[#84CC16]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#84CC16] transition-colors">Explore All Courses</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">50+ industry-focused programs</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-gray-400 group-hover:text-[#84CC16] group-hover:translate-x-1 transition-all" />
              </Link>

              <Link to="/roadmap/" className="group flex items-center gap-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-[#84CC16]/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Map size={18} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#84CC16] transition-colors">Learning Roadmaps</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Step-by-step career paths</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-gray-400 group-hover:text-[#84CC16] group-hover:translate-x-1 transition-all" />
              </Link>

              <Link to="/placement/" className="group flex items-center gap-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-[#84CC16]/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <GraduationCap size={18} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#84CC16] transition-colors">Placement Records</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">95% placement rate</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-gray-400 group-hover:text-[#84CC16] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
