import React from "react";
import ResponsiveImage from "./ResponsiveImage";

const COMPANY_LOGOS = [
  { name: "Google", domain: "google.com", url: "https://www.google.com" },
  { name: "Swiggy", domain: "swiggy.com", url: "https://www.swiggy.com" },
  { name: "Amazon", domain: "amazon.com", url: "https://www.amazon.com" },
  { name: "Netflix", domain: "netflix.com", url: "https://www.netflix.com" },
  { name: "Microsoft", domain: "microsoft.com", url: "https://www.microsoft.com" },
  { name: "Zomato", domain: "zomato.com", url: "https://www.zomato.com" },
  { name: "Goldman Sachs", domain: "goldmansachs.com", url: "https://www.goldmansachs.com" },
  { name: "Flipkart", domain: "flipkart.com", url: "https://www.flipkart.com" },
  { name: "PayPal", domain: "paypal.com", url: "https://www.paypal.com" },
  { name: "Apple", domain: "apple.com", url: "https://www.apple.com" },
  { name: "Adobe", domain: "adobe.com", url: "https://www.adobe.com" },
  { name: "Slack", domain: "slack.com", url: "https://slack.com" },
  { name: "Salesforce", domain: "salesforce.com", url: "https://www.salesforce.com" },
  { name: "Spotify", domain: "spotify.com", url: "https://www.spotify.com" },
  { name: "IBM", domain: "ibm.com", url: "https://www.ibm.com" },
];

export default function CourseHiringPartners() {
  return (
    <section className="py-16 bg-transparent border-t border-gray-100 dark:border-white/5 overflow-hidden flex justify-center w-full">
      <div className="w-full max-w-[1440px] px-4 md:px-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          3+ years of <span className="text-[#84CC16]">transforming careers</span>
        </h3>
        
        {/* Double Marquee Container */}
        <div className="relative w-full flex flex-col gap-8 group overflow-hidden py-2">
          {/* Fading Edges */}
          <div className="absolute top-0 left-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-[#f8faf5] dark:from-[#0a0c10] to-transparent z-10 pointer-events-none opacity-80"></div>
          <div className="absolute top-0 right-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-[#f8faf5] dark:from-[#0a0c10] to-transparent z-10 pointer-events-none opacity-80"></div>
          
          {/* First Row (Left to Right) */}
          <div className="flex w-max animate-scroll">
            {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((company, i) => (
              <a
                key={`row1-${i}`}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center min-w-[120px] md:min-w-[140px] h-16 md:h-20 mx-2 px-4 bg-white/60 dark:bg-white/5 border border-gray-200/60 dark:border-white/5 rounded-2xl hover:border-[#84CC16]/50 shadow-sm hover:shadow-lg transition-all duration-300 group/link"
              >
                <img
                  src={`https://logo.clearbit.com/${company.domain}?size=256`}
                  alt={`${company.name} logo`}
                  loading="lazy"
                  className="h-8 md:h-10 w-auto object-contain drop-shadow-md group-hover/link:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    if (e.target.src.includes('clearbit')) {
                      e.target.src = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.${company.domain}&size=128`;
                    } else {
                      e.target.style.display = 'none';
                    }
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
