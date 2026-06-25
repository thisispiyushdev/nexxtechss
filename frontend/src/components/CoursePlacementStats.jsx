import React from "react";
import { BookOpen, UserCheck, Briefcase, GraduationCap, Trophy } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";

const FEATURES = [
  {
    title: "Profile Building",
    desc: "Get tailored feedback on your LinkedIn, GitHub, and Resume to stand out to recruiters.",
    icon: UserCheck
  },
  {
    title: "Mock Interviews",
    desc: "Multiple rounds of technical and HR mock interviews with experts from top tech companies.",
    icon: Briefcase
  },
  {
    title: "Placement Support",
    desc: "Direct referrals and placement assistance across our network of 500+ hiring partners.",
    icon: Trophy
  },
  {
    title: "Career Mentorship",
    desc: "Personalized career guidance and roadmap planning from industry veterans.",
    icon: GraduationCap
  }
];

export default function CoursePlacementStats() {
  return (
    <section className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#84CC16]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Main Stats Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
            Transforming <span className="text-[#84CC16]">Careers</span>
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">Join our successful alumni at top global firms</p>
        </div>

        {/* Highlighted Banner Box */}
        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/10 rounded-[3rem] p-8 md:p-12 mb-16 relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#84CC16]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Image side */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <ResponsiveImage 
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Student Success" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#84CC16] p-6 rounded-3xl shadow-[0_20px_40px_-10px_#84CC1660] hidden md:block transform rotate-3">
                <div className="text-black font-black text-3xl leading-none">5000+</div>
                <div className="text-black/70 text-[10px] font-bold uppercase tracking-widest mt-1">Students Placed</div>
              </div>
            </div>

            {/* Stats side */}
            <div className="space-y-10">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
                Industry-Leading <span className="text-[#84CC16]">Success Metrics</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-3xl p-8 hover:border-[#84CC16]/30 transition-colors group/card">
                  <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Highest Package</div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white mb-6 group-hover/card:text-[#84CC16] transition-colors">10 LPA</div>
                  <div className="flex items-end gap-1.5 h-12">
                    {[4, 6, 5, 8, 10].map((v, i) => (
                      <div key={i} className={`flex-1 rounded-t-sm transition-all duration-500 ${i === 4 ? 'bg-[#84CC16]' : 'bg-gray-200 dark:bg-white/10'}`} style={{ height: `${(v/10)*100}%` }}></div>
                    ))}
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-3xl p-8 hover:border-[#84CC16]/30 transition-colors group/card">
                  <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Average Package</div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white mb-6 group-hover/card:text-[#84CC16] transition-colors">5-6 LPA</div>
                  <div className="flex items-end gap-1.5 h-12 relative">
                    <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-gray-100 dark:bg-white/5"></div>
                    {[3, 5, 4, 6, 5].map((v, i) => (
                      <div key={i} className={`w-1 mx-auto rounded-full transition-all duration-500 ${i === 3 ? 'bg-[#84CC16] h-full shadow-[0_0_15px_#84CC16]' : 'bg-gray-200 dark:bg-white/10 h-1/2'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, i) => (
            <div key={i} className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/5 rounded-[2rem] p-8 hover:border-[#84CC16]/20 transition-all group hover:-translate-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-6 text-[#84CC16] group-hover:bg-[#84CC16] group-hover:text-black transition-all">
                <feat.icon size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#84CC16] transition-colors">{feat.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
