import { useRef, useState, useEffect, memo } from "react";
import ResponsiveImage from "./ResponsiveImage";
import { Quote, Star, Users, Building2, Trophy } from "lucide-react";
import { cachedFetch, API } from "@/lib/apiCache";

const ICON_MAP = { Users, Building2, Trophy };

const FALLBACK_STATS = [
  { icon: "Users", value: 5000, suffix: "+", label: "Students Trained" },
  { icon: "Building2", value: 100, suffix: "+", label: "Hiring Partners" },
  { icon: "Trophy", value: 500, suffix: "+", label: "Students Placed" },
];

const FALLBACK_REVIEWS = [
  { name: "Lakshya Jonwal", role: "Full Stack Developer", company: "Amazon", image: "/students/lakshya.png", text: "NEXXTECHS transformed my career. The hands-on training with real projects gave me the confidence to crack interviews at top tech giants." },
  { name: "Vikram Rathod", role: "UI/UX Designer", company: "Zomato", image: "/students/vikram.png", text: "The design principles I learned here helped me build a world-class portfolio. The mentorship is truly personalized." },
  { name: "Vansh", role: "Cyber Security Analyst", company: "Deloitte", image: "/students/vansh.png", text: "Mastering ethical hacking was made easy with the advanced labs and expert guidance at NEXXTECHS." },
  { name: "Arpan Dewadi", role: "Data Scientist", company: "American Express", image: "/students/arpan.png", text: "Turning complex data into insights is a superpower I gained here. The Data Science module is incredibly practical." },
  { name: "Sahil Maan", role: "DevOps Engineer", company: "Microsoft", image: "/students/sahil.png", text: "Cloud computing and CI/CD pipelines felt daunting until I joined NEXXTECHS. Now I handle massive enterprise architectures." },
  { name: "Anuj", role: "Digital Marketing Lead", company: "Flipkart", image: "/students/anuj.png", text: "The growth hacking strategies and performance marketing skills I developed here have been invaluable." },
];

const GOOGLE_REVIEWS = [
  { name: "Aman Sharma", role: "Software Engineer", company: "via Google Reviews", text: "The trainers are highly experienced. NexxTechs is the best institute for Java Full Stack in Vikaspuri. The placement assistance is top-notch!" },
  { name: "Priya Singh", role: "Data Analyst", company: "via Google Reviews", text: "Great place to learn Data Science. The curriculum is very industry-oriented and the hands-on projects really help in building a strong portfolio." },
  { name: "Rohit Verma", role: "Frontend Developer", company: "via Google Reviews", text: "I joined the MERN Stack course and got a job within a month of completion. Highly recommended for anyone looking to switch to IT." },
  { name: "Sneha Gupta", role: "Digital Marketer", company: "via Google Reviews", text: "The faculty here is amazing. They explain complex concepts in a very simple way. Best decision of my life to join Nexxtechs." },
  { name: "Vikash Kumar", role: "Cloud Architect", company: "via Google Reviews", text: "Excellent environment and practical labs. The AWS and Azure modules were incredibly detailed. Got multiple offers!" },
  { name: "Neha Sharma", role: "UI/UX Designer", company: "via Google Reviews", text: "Loved the UI/UX bootcamp! The mentors provide personalized feedback which helped me refine my design skills tremendously." },
];

const COMPANY_LOGOS = [
  { name: "Netflix", domain: "netflix.com", url: "https://www.netflix.com" },
  { name: "Microsoft", domain: "microsoft.com", url: "https://www.microsoft.com" },
  { name: "Zomato", domain: "zomato.com", url: "https://www.zomato.com" },
  { name: "Goldman Sachs", domain: "goldmansachs.com", url: "https://www.goldmansachs.com" },
  { name: "Flipkart", domain: "flipkart.com", url: "https://www.flipkart.com" },
  { name: "PayPal", domain: "paypal.com", url: "https://www.paypal.com" },
  { name: "Stripe", domain: "stripe.com", url: "https://stripe.com" },
  { name: "OpenAI", domain: "openai.com", url: "https://openai.com" },
  { name: "Paytm", domain: "paytm.com", url: "https://paytm.com" },
  { name: "Google", domain: "google.com", url: "https://www.google.com" },
];


const PlacementSuccess = () => {
  const sectionRef = useRef(null);
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [showGoogleReviews, setShowGoogleReviews] = useState(false);

  // Fetch reviews and stats from the backend API
  useEffect(() => {
    cachedFetch(`${API}/content/reviews`)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setReviews(data);
      })
      .catch(() => { /* keep fallback */ });

    cachedFetch(`${API}/content/stats`)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setStats(data);
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  // Dynamically import GSAP only when section is visible (perf optimization)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Skip GSAP animations on mobile for smooth scrolling
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      el.querySelectorAll('.testimonial-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
      el.querySelectorAll('.placement-stat-number').forEach(num => {
        const target = num.getAttribute('data-target');
        const suffix = num.getAttribute('data-suffix') || '';
        num.innerText = target + suffix;
      });
      return;
    }

    let cancelled = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !cancelled) {
        observer.disconnect();
        Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapMod, stMod]) => {
          if (cancelled) return;
          const gsap = gsapMod.default || gsapMod.gsap;
          const ScrollTrigger = stMod.ScrollTrigger;
          gsap.registerPlugin(ScrollTrigger);
          gsap.fromTo(el.querySelectorAll(".testimonial-card"), { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: ".testimonials-grid", start: "top 95%" }
          });
          el.querySelectorAll('.placement-stat-number').forEach((num) => {
            const targetValue = parseInt(num.getAttribute('data-target'));
            const suffix = num.getAttribute('data-suffix') || "";
            gsap.to(num, { innerText: targetValue, duration: 1.5, snap: { innerText: 1 }, ease: "power2.out",
              scrollTrigger: { trigger: num, start: "top 95%", once: true },
              onUpdate: function() { num.innerText = Math.floor(this.targets()[0].innerText) + suffix; }
            });
          });
        });
      }
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => { cancelled = true; observer.disconnect(); };
  }, [reviews, stats]);

  return (
    <section
      id="placement"
      ref={sectionRef}
      className="py-24 md:py-32 bg-transparent transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-black dark:text-white">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs lg:text-sm tracking-widest uppercase font-bold text-[#84CC16] mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Placement & <span className="text-[#84CC16]">Success</span>
          </h2>
          <p className="text-base text-[#4B5563] dark:text-gray-300 max-w-2xl mx-auto">
            Our students are making their mark in top companies across India
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 stats-grid">
          {stats.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] || Users;
            return (
              <div key={i} className="text-center bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
                {Icon && <Icon size={32} className="text-[#84CC16] mx-auto mb-4" />}
                <div 
                  className="text-3xl md:text-4xl font-black mb-2 placement-stat-number"
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                >
                  0
                </div>
                <div className="text-xs md:text-sm font-medium text-[#4B5563] dark:text-gray-400 uppercase tracking-wide">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${showGoogleReviews ? 'mb-20' : 'mb-10'} testimonials-grid`}>
          {reviews.map((t, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/10 rounded-2xl p-8 shadow-lg flex flex-col testimonial-card"
            >
              <Quote size={32} className="text-[#84CC16] mb-6 opacity-40 shrink-0" />
              <p className="text-[#4B5563] dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8 italic flex-grow">
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-6 shrink-0">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-[#84CC16] text-[#84CC16]" />
                ))}
              </div>
              <div className="flex items-center gap-4 shrink-0 border-t border-gray-100 dark:border-white/5 pt-6">
                <div className="min-w-0">
                  <div className="font-bold text-[#0A0A0A] dark:text-white text-base truncate">{t.name}</div>
                  <div className="text-xs text-[#84CC16] font-medium truncate">{t.role} {t.company ? `• ${t.company}` : ''}</div>
                </div>
              </div>
            </div>
          ))}
          
          {showGoogleReviews && GOOGLE_REVIEWS.map((t, i) => (
            <div 
              key={`google-${i}`} 
              className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/10 rounded-2xl p-8 shadow-lg flex flex-col testimonial-card animate-fade-in"
            >
              <Quote size={32} className="text-[#84CC16] mb-6 opacity-40 shrink-0" />
              <p className="text-[#4B5563] dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8 italic flex-grow">
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-6 shrink-0">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-[#84CC16] text-[#84CC16]" />
                ))}
              </div>
              <div className="flex items-center gap-4 shrink-0 border-t border-gray-100 dark:border-white/5 pt-6">
                <div className="min-w-0">
                  <div className="font-bold text-[#0A0A0A] dark:text-white text-base truncate">{t.name}</div>
                  <div className="text-xs text-[#84CC16] font-medium truncate">{t.role} • {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showGoogleReviews && (
          <div className="flex justify-center mb-20">
            <button 
              onClick={() => setShowGoogleReviews(true)}
              className="px-8 py-3 bg-white dark:bg-[#1a1d27] border border-gray-200 dark:border-white/10 hover:border-[#84CC16] dark:hover:border-[#84CC16] rounded-xl font-bold text-[#0A0A0A] dark:text-white transition-all duration-300 flex items-center gap-2 hover:shadow-lg group"
            >
              Load More Reviews 
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#84CC16] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
              </svg>
            </button>
          </div>
        )}

        {/* Why Students Trust Us */}
        <div className="pt-12 mt-12 border-t border-gray-100 dark:border-white/5">
          <div className="text-center mb-12">
            <h3 className="text-lg md:text-2xl font-black text-[#0A0A0A] dark:text-white tracking-tight uppercase">
              Why Students <span className="text-[#84CC16]">Trust</span> Us
            </h3>
            <p className="text-sm text-[#4B5563] dark:text-gray-400 mt-2">What sets our training apart from the rest</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Hands-On Projects", desc: "Build 10+ real-world projects with live deployments, not just theoretical knowledge." },
              { icon: "🧑‍🏫", title: "Industry Mentors", desc: "Learn directly from professionals working at top MNCs with 10+ years of experience." },
              { icon: "🚀", title: "Placement Support", desc: "Dedicated career cell with mock interviews, resume building & direct company referrals." },
            ].map((item, i) => (
              <div key={i} className="relative bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/10 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-[#84CC16]/40 dark:hover:border-[#84CC16]/40 transition-all duration-300 hover:-translate-y-1 group">
                <div className="text-4xl mb-5">{item.icon}</div>
                <h4 className="text-lg font-bold text-[#0A0A0A] dark:text-white mb-3 group-hover:text-[#84CC16] transition-colors">{item.title}</h4>
                <p className="text-sm text-[#4B5563] dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Recognition */}
        <div className="pt-16 mt-16 border-t border-gray-100 dark:border-white/5">
          <div className="text-center mb-12">
            <h3 className="text-lg md:text-2xl font-black text-[#0A0A0A] dark:text-white tracking-tight uppercase">
              Certifications & <span className="text-[#84CC16]">Recognition</span>
            </h3>
            <p className="text-sm text-[#4B5563] dark:text-gray-400 mt-2">Industry-recognized credentials that boost your resume</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { logo: "/assets/logo/cybersecurity.jpeg", name: "Cyber Security" },
              { logo: "/assets/logo/ai_new.jpeg", name: "AI & ML" },
              { logo: "/assets/logo/cloud.jpeg", name: "Cloud Computing" },
              { logo: "/assets/logo/ds.jpeg", name: "Data Science" },
            ].map((cert, i) => (
              <div key={i} className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/10 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center hover:border-[#84CC16]/40 dark:hover:border-[#84CC16]/40 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg group">
                <div className="mb-6 h-16 md:h-20 flex items-center justify-center">
                  <ResponsiveImage src={cert.logo} alt={cert.name} className="h-full w-auto object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" pexelsOptions={{ h: 100 }} />
                </div>
                <p className="text-lg md:text-xl font-bold text-[#0A0A0A] dark:text-white group-hover:text-[#84CC16] transition-colors">{cert.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hiring Partners Marquee */}
        <div className="pt-16 mt-16 border-t border-gray-100 dark:border-white/5 relative">
          <div className="text-center mb-10">
            <h3 className="text-lg md:text-2xl font-black text-[#0A0A0A] dark:text-white tracking-tight uppercase">
              Our <span className="text-[#84CC16]">Placement</span> Partners
            </h3>
            <p className="text-sm md:text-base font-bold text-[#4B5563] dark:text-gray-400 tracking-[0.2em] uppercase mt-4">
              OUR GRADUATES WORK AT TOP GLOBAL ENGINEERING TEAMS
            </p>
          </div>
          <div className="relative w-full flex overflow-hidden group py-4">
            <div className="absolute top-0 left-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-white dark:from-[#0a0c13] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-white dark:from-[#0a0c13] to-transparent z-10 pointer-events-none"></div>
            <div className="flex w-max animate-scroll">
              {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((company, i) => (
                <a
                  key={`${company.name}-${i}`}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={company.name}
                  className="flex flex-row items-center justify-center h-16 md:h-20 mx-8 md:mx-12 px-4 transition-all duration-300 group/link gap-3 relative"
                >
                  <img
                    src={`https://logo.clearbit.com/${company.domain}?size=128`}
                    alt={`${company.name} logo`}
                    loading="lazy"
                    decoding="async"
                    width="32"
                    height="32"
                    className="h-6 md:h-8 w-6 md:w-8 object-contain group-hover/link:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      if (e.target.src.includes('clearbit')) {
                        e.target.src = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.${company.domain}&size=128`;
                      } else {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                      }
                    }}
                  />
                  <span className="text-xl md:text-2xl font-black text-[#0A0A0A] dark:text-white group-hover/link:text-[#84CC16] tracking-tight whitespace-nowrap">
                    {company.name}
                  </span>
                  
                  {/* Vertical Separator Line */}
                  <div className="absolute right-[-2rem] md:right-[-3rem] top-1/2 -translate-y-1/2 w-px h-6 md:h-8 bg-gray-200 dark:bg-white/10 group-last:hidden"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(PlacementSuccess);
