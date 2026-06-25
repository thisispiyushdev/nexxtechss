import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const NEWS_ARTICLES = [
  {
    publisher: "Times of India",
    headline: "Young professionals must embrace continuous upskilling in the age of AI",
    logo: "https://logo.clearbit.com/timesofindia.indiatimes.com",
    link: "https://timesofindia.indiatimes.com/",
  },
  {
    publisher: "The Economic Times",
    headline: "Tech grads sign up for 'bootcamps' to be more employable",
    logo: "https://logo.clearbit.com/economictimes.indiatimes.com",
    link: "https://economictimes.indiatimes.com/",
  },
  {
    publisher: "CXOToday",
    headline: "Unconventional approach upskills students, yields 2.2x salary increase",
    logo: "https://logo.clearbit.com/cxotoday.com",
    link: "https://cxotoday.com/",
  }
];

const NewsPublisherLogo = ({ article }) => {
  const [error, setError] = useState(false);

  return (
    <div className="w-24 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden px-2 text-center">
      {!error ? (
        <img 
          src={article.logo} 
          alt={article.publisher} 
          className="max-h-8 max-w-full object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <span className="text-[10px] font-bold text-black">{article.publisher}</span>
      )}
    </div>
  );
};

export default function CourseNews() {
  return (
    <section className="py-20 bg-[#0f1117] border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-10 tracking-tight">
          In The <span className="text-[#84CC16]">News</span>
        </h3>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Feature News */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#1a1d27] to-[#0A0A0A] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-[#84CC16]/50 transition-colors">
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full">
              <h4 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#84CC16] transition-colors">
                NexxTechs Alumni Lead the AI Revolution
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                Our graduates are securing top roles at leading tech firms, proving that rigorous, project-based learning outpaces traditional degrees.
              </p>
              
              <div className="w-full h-40 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-6 relative group-hover:shadow-[0_0_30px_rgba(132,204,22,0.3)] transition-shadow">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <img src="/assets/nexxtechs-logo-square.png" alt="NexxTechs" className="h-10 w-10 object-contain rounded-md bg-white p-1" onError={(e) => e.target.style.display = 'none'} />
                  <span className="text-white font-bold text-xl px-2">X</span>
                  <img src="https://logo.clearbit.com/naukri.com" alt="Naukri" className="h-10 object-contain brightness-0 invert" onError={(e) => e.target.style.display = 'none'} />
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Stack of News */}
          <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
            {NEWS_ARTICLES.map((article, i) => (
              <a 
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
                className="bg-[#1a1d27] border border-white/5 hover:border-[#84CC16]/30 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <NewsPublisherLogo article={article} />
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg group-hover:text-[#84CC16] transition-colors leading-snug">
                    {article.headline}
                  </h4>
                </div>
                <ArrowUpRight size={20} className="text-gray-500 group-hover:text-[#84CC16] shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
