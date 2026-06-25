import React, { useState } from "react";
import { Plus } from "lucide-react";
import SEOHead from "./SEOHead";

export default function CourseFAQ({ faqs, courseTitle }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-transparent border-t border-white/5 overflow-hidden flex justify-center">
      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full">
        {/* SEO Schema */}
        <SEOHead
          title=""
          description=""
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          }}
        />

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Frequently Asked <span className="text-[#84CC16]">Questions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
            Everything you need to know about <span className="text-[#84CC16] font-bold">{courseTitle}</span> course at NexxTechs Vikaspuri, Delhi
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`group transition-all duration-500 rounded-[2rem] border ${
                openIndex === i 
                  ? "bg-white dark:bg-[#111111] border-[#84CC16] shadow-[0_20px_50px_rgba(132,204,22,0.15)]" 
                  : "bg-gray-50 dark:bg-[#0A0A0A] border-gray-200 dark:border-white/5 hover:border-[#84CC16]/30"
              }`}
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex items-center justify-between p-8 text-left"
              >
                <h3 className={`text-lg md:text-2xl font-black transition-colors duration-300 pr-8 ${
                  openIndex === i ? "text-[#84CC16]" : "text-gray-900 dark:text-white"
                }`}>
                  {faq.q}
                </h3>
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  openIndex === i 
                    ? "bg-[#84CC16] text-black rotate-45 shadow-[0_0_20px_#84CC16]" 
                    : "bg-gray-200 dark:bg-white/5 text-gray-500 group-hover:text-[#84CC16]"
                }`}>
                  <Plus size={28} strokeWidth={3} />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  openIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-8 pt-0">
                  <div className="h-[2px] w-12 bg-[#84CC16]/30 mb-6 rounded-full"></div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
