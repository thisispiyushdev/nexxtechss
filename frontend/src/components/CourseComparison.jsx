import React from "react";
import { CheckCircle2, XCircle, Zap, Shield, Target, Rocket, Award, Users, BookOpen, BadgeIndianRupee, Star, Sparkles } from "lucide-react";

const FEATURES = [
  { name: "Live Interactive Classes", icon: Users },
  { name: "AI-Integrated Curriculum", icon: Zap },
  { name: "Industry-Grade Projects", icon: Rocket },
  { name: "Production Deployment", icon: Shield },
  { name: "System Design Fundamentals", icon: Target },
  { name: "100% Placement Assistance", icon: Award },
  { name: "1-on-1 Mentorship", icon: Star },
  { name: "Resume & Portfolio Building", icon: BookOpen },
  { name: "Affordable Fee Structure", icon: BadgeIndianRupee }
];

const DATA = {
  youtuber: [false, false, true, true, false, false, false, false, true],
  nexxtechs: [true, true, true, true, true, true, true, true, true],
  others: [false, true, false, false, true, false, false, false, false]
};

export default function CourseComparison({ courseTitle = "NexxTechs" }) {
  return (
    <section className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#84CC1615,transparent_50%)] pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
            Why <span className="text-[#84CC16]">NexxTechs</span> Wins
          </h2>
          <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Compare and choose your future</p>
        </div>

        <div className="relative bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-8 text-left w-1/3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                        <Sparkles size={20} className="text-[#84CC16]" />
                      </div>
                      <span className="text-gray-400 text-sm font-black uppercase tracking-widest">Features</span>
                    </div>
                  </th>
                  <th className="p-8 text-center bg-white/[0.01]">
                    <span className="text-gray-500 text-xs font-black uppercase tracking-widest opacity-50">Youtuber Courses</span>
                  </th>
                  <th className="p-0 relative">
                    <div className="absolute inset-0 bg-[#84CC16]/5 pointer-events-none"></div>
                    <div className="h-full flex flex-col items-center justify-center p-8 border-x border-[#84CC16]/20 relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#84CC16] shadow-[0_0_15px_#84CC16]"></div>
                      <img src="/assets/logo_white_small.webp" alt="Logo" className="h-4 w-auto mb-3 brightness-125" />
                      <span className="text-[#84CC16] text-sm font-black uppercase tracking-tighter truncate max-w-[150px]">
                        {courseTitle}
                      </span>
                    </div>
                  </th>
                  <th className="p-8 text-center bg-white/[0.01]">
                    <span className="text-gray-500 text-xs font-black uppercase tracking-widest opacity-50">Other Institutes</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((feat, i) => (
                  <tr key={i} className="group border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-gray-500 group-hover:text-[#84CC16] transition-colors">
                          <feat.icon size={16} />
                        </div>
                        <span className="text-gray-800 dark:text-gray-300 font-bold text-lg">{feat.name}</span>
                      </div>
                    </td>
                    
                    {/* Youtuber Data */}
                    <td className="p-6 text-center bg-white/[0.01]">
                      <div className="flex justify-center">
                        {DATA.youtuber[i] ? (
                          <CheckCircle2 size={18} className="text-gray-600" />
                        ) : (
                          <XCircle size={18} className="text-gray-800 opacity-40" />
                        )}
                      </div>
                    </td>

                    {/* NexxTechs Data */}
                    <td className="p-0 relative">
                      <div className="absolute inset-0 bg-[#84CC16]/[0.02] pointer-events-none"></div>
                      <div className="flex justify-center py-6 border-x border-[#84CC16]/10 relative">
                        <div className="w-9 h-9 rounded-xl bg-[#84CC16] flex items-center justify-center shadow-[0_0_20px_#84CC1640] group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={20} className="text-black" />
                        </div>
                      </div>
                    </td>

                    {/* Others Data */}
                    <td className="p-6 text-center bg-white/[0.01]">
                      <div className="flex justify-center">
                        {DATA.others[i] ? (
                          <CheckCircle2 size={18} className="text-gray-600" />
                        ) : (
                          <XCircle size={18} className="text-gray-800 opacity-40" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <button 
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('openPopupEnquiry', { 
                detail: { isWhatsApp: true, bannerTitle: `Interested in ${courseTitle}` } 
              }));
            }}
            className="relative group overflow-hidden bg-[#84CC16] hover:bg-[#a3e635] text-black font-black px-12 py-5 rounded-2xl transition-all duration-300 shadow-[0_20px_40px_-10px_#84CC1640]"
          >
            <div className="flex items-center gap-3 text-lg uppercase tracking-tight">
              Reserve Your Spot in {courseTitle}
              <Rocket size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
          <p className="mt-6 text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">Limited seats available for the next batch</p>
        </div>
      </div>
    </section>
  );
}
