import { memo } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";

const TrainingPartners = () => {
  const navigate = useNavigate();
  const partners = [
    {
      name: "CyberHooks Academy",
      desc: "Strategic collaborator for advanced Cyber Security and AI training programs, bridging the gap between learning and industry.",
      image: "/assets/logo/cyberrhookssss.png",
      slug: "/cyberhooks"
    },
    {
      name: "EC-Council",
      desc: "EC-Council offers globally recognized cybersecurity certifications, including CEH, CND, and ECIH, to help professionals advance in the field.",
      image: "/training-partners/eccouncil.jpg",
      link: "https://www.eccouncil.org/"
    },
    {
      name: "N.S.D.C",
      desc: "NSDC is a government-backed organization in India focused on enhancing skill development and vocational training to boost employability.",
      image: "/training-partners/nsdc.jpg",
      link: "https://nsdcindia.org/"
    },
    {
      name: "Skill India",
      desc: "Skill India is an initiative by the Indian government aimed at providing youth with skills training to enhance employability and drive economic growth.",
      image: "/training-partners/skill-india.jpg",
      link: "https://www.skillindiadigital.gov.in/"
    },
    {
      name: "Nasscom",
      desc: "NASSCOM is India's trade association for the IT and BPO industries, driving growth and innovation.",
      image: "/training-partners/nasscom.jpg",
      link: "https://nasscom.in/"
    }
  ];

  return (
    <section className="py-24 bg-transparent" data-testid="training-partners">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-[#4B5563] dark:text-gray-500 mb-4">
            Official Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-bold text-[#111827] dark:text-white mb-4">
            Our Strategic <span className="gradient-text">Partners</span>
          </h2>
          <p className="text-base text-[#4B5563] dark:text-gray-400 max-w-2xl mx-auto">
            We collaborate with industry leaders to bring you certified, world-class training and real-world exposure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center group ${partner.slug || partner.link ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (partner.slug) {
                  window.scrollTo(0,0);
                  navigate(partner.slug);
                } else if (partner.link) {
                  window.open(partner.link, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <div className="w-full h-40 md:h-48 rounded-2xl bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/5 flex items-center justify-center mb-6 shadow-sm group-hover:-translate-y-2 group-hover:border-[#84CC16]/30 transition-all duration-300 overflow-hidden relative">
                <ResponsiveImage 
                  src={partner.image} 
                  alt={`${partner.name} - NexxTechs Training Partner`} 
                  className="w-full h-full object-contain p-2 md:p-3"
                  pexelsOptions={{ w: 300, h: 200, fit: 'inside' }}
                />
                {(partner.slug || partner.link) && (
                  <div className="absolute inset-0 bg-[#84CC16]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-bold text-[#84CC16]">
                      {partner.slug ? "View Collaboration" : "Visit Site"}
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-3">
                {partner.name}
              </h3>
              <p className="text-sm text-[#4B5563] dark:text-gray-400 leading-relaxed">
                {partner.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TrainingPartners);
