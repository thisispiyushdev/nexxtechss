import { useEffect, useRef, useState } from "react";
import { GraduationCap, Briefcase, Code, IndianRupee, Award } from "lucide-react";

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gray-50 dark:bg-transparent transition-colors duration-300"
      data-testid="why-choose-us-section"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#84CC16]/10 text-[#65A30D] dark:text-[#84CC16] text-xs font-bold tracking-[0.2em] uppercase mb-4 border border-[#84CC16]/20">
            Why NEXXTECHS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-[#111827] dark:text-white mb-6">
            Why Choose <span className="text-[#84CC16]">Us</span>
          </h2>
          <p className="text-lg md:text-xl text-[#4B5563] dark:text-gray-400 max-w-2xl mx-auto font-medium">
            We don't just teach code. We build careers. Here's why thousands of students trust us with their future.
          </p>
        </div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Placement Assistance - Large Highlighted Card (Spans 2 columns) */}
          <div 
            className={`md:col-span-2 bg-[#84CC16] rounded-[32px] p-8 md:p-12 relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#84CC16]/20 transition-all duration-500 ${visible ? "animate-float-up" : "opacity-0"}`}
            style={{ animationDelay: '0ms' }}
          >
            <div className="absolute -right-10 -bottom-10 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
              <Briefcase size={280} className="text-black" />
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-black/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-black/5">
                <Briefcase size={32} className="text-black" />
              </div>
              <h3 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-black mb-4 tracking-tight">100% Placement Assistance</h3>
              <p className="text-black/80 font-medium text-lg max-w-md leading-relaxed">
                Our dedicated placement cell and strong industry partnerships ensure you don't just learn skills, but you actually land your dream job in top tech companies.
              </p>
            </div>
          </div>

          {/* 2. Industry Expert Trainers */}
          <div 
            className={`bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl dark:shadow-none transition-all duration-500 ${visible ? "animate-float-up" : "opacity-0"}`}
            style={{ animationDelay: '100ms' }}
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:scale-125 transition-transform duration-700">
              <GraduationCap size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap size={28} className="text-blue-600 dark:text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Expert Trainers</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Learn directly from professionals who have 10+ years of real-world, hands-on experience in top tier tech companies.
              </p>
            </div>
          </div>

          {/* 3. Real Projects */}
          <div 
            className={`bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl dark:shadow-none transition-all duration-500 ${visible ? "animate-float-up" : "opacity-0"}`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute bottom-0 right-0 opacity-5 dark:opacity-10 translate-x-1/4 translate-y-1/4 group-hover:-translate-x-2 transition-transform duration-700">
              <Code size={160} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-purple-50 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Code size={28} className="text-purple-600 dark:text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Real Projects</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Stop watching tutorials. Build a robust portfolio with 20+ live, production-grade projects across web, AI, and cloud platforms.
              </p>
            </div>
          </div>

          {/* 4. Affordable Fees */}
          <div 
            className={`bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl dark:shadow-none transition-all duration-500 ${visible ? "animate-float-up" : "opacity-0"}`}
            style={{ animationDelay: '300ms' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-5 group-hover:rotate-12 transition-transform duration-700">
              <IndianRupee size={200} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                <IndianRupee size={28} className="text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Affordable Fees</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                We believe premium education should be accessible. Enjoy transparent pricing with extremely flexible EMI options.
              </p>
            </div>
          </div>

          {/* 5. Industry Certification */}
          <div 
            className={`bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl dark:shadow-none transition-all duration-500 ${visible ? "animate-float-up" : "opacity-0"}`}
            style={{ animationDelay: '400ms' }}
          >
            <div className="absolute -top-4 -right-4 opacity-5 dark:opacity-10 group-hover:-rotate-12 transition-transform duration-700">
              <Award size={140} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Award size={28} className="text-orange-600 dark:text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Industry Certification</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Graduate with recognized certifications that add undeniable, real-world value to your resume and LinkedIn profile.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
