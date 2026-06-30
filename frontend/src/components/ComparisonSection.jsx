import { CheckCircle2, XCircle, Layers } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const LOGO_URL = "/assets/logo_black.webp";
const LOGO_DARK_URL = "/assets/logo_white_small.webp";

export default function ComparisonSection() {
  const { dark } = useTheme();

  const nexxtechsPoints = [
    "Highly Affordable, No Quality Cuts",
    "Project-Based, Skill-First Learning",
    "Continuously Updated With Industry Trends",
    "Internal Hackathons, Challenges & Face-Offs",
    "Industry-Relevant, Job-Oriented Curriculum"
  ];

  const othersPoints = [
    "High Fees With Compromised Quality",
    "Theory-Centric Learning",
    "Outdated, Static Curriculum",
    "No Competitive Learning Environment",
    "Limited Practical Exposure"
  ];

  return (
    <section className="py-20 md:py-28 bg-transparent overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111827] dark:text-white tracking-tight">
            What Sets <span className="text-[#84CC16]">NexxTechs</span> Apart <br className="hidden md:block" /> From Other Coders
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Container */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-[32px] overflow-hidden ${
            dark ? "bg-[#111827]/40 border-white/5" : "bg-white border-gray-100 shadow-xl"
          }`}>
            
            {/* NexxTechs Column */}
            <div className={`p-8 md:p-12 relative border-r ${
              dark ? "border-white/5" : "border-gray-100 bg-[#F4FCE3]/20"
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#84CC16]/5 to-transparent opacity-50" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10 border-b border-[#84CC16]/20 pb-6">
                  <img 
                    src={dark ? LOGO_DARK_URL : LOGO_URL} 
                    alt="NexxTechs Logo" 
                    className="h-10 object-contain"
                  />
                </div>

                <ul className="space-y-6">
                  {nexxtechsPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="mt-1 bg-[#84CC16]/20 p-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 size={18} className="text-[#84CC16]" />
                      </div>
                      <span className={`text-lg font-bold leading-tight ${
                        dark ? "text-gray-200" : "text-[#111827]"
                      }`}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Glow effect for NexxTechs */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#84CC16] opacity-10 blur-[80px]" />
            </div>

            {/* Others Column */}
            <div className={`p-8 md:p-12 relative ${
              dark ? "bg-[#0A0A0A]/40" : "bg-gray-50/50"
            }`}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10 border-b border-gray-200 dark:border-white/10 pb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-white/5 flex items-center justify-center">
                    <Layers size={20} className="text-gray-500" />
                  </div>
                  <span className={`text-2xl font-black ${
                    dark ? "text-gray-400" : "text-gray-500"
                  }`}>
                    Others
                  </span>
                </div>

                <ul className="space-y-6">
                  {othersPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-4 opacity-70">
                      <div className="mt-1 p-1">
                        <XCircle size={18} className="text-orange-500/60" />
                      </div>
                      <span className={`text-lg font-semibold leading-tight ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Floating badge to emphasize NexxTechs */}
          <div className="absolute -top-4 -left-4 bg-[#84CC16] text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg z-20">
            Recommended
          </div>
        </div>
      </div>
    </section>
  );
}
