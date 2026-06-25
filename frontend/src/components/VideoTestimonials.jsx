import { useEffect, useRef, useState } from "react";
import { Play, CheckCircle } from "lucide-react";

export default function VideoTestimonials() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState({});

  const handlePlay = (id) => {
    setPlaying((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const videos = [
    { id: "sOSO95LfmrU", title: "Student Testimonial 1" },
    { id: "L8VqZHLVG4g", title: "Student Testimonial 2" }
  ];

  return (
    <section
      id="video-testimonials"
      ref={sectionRef}
      className="py-16 md:py-24 bg-transparent transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Video Grid */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`relative bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-[32px] overflow-hidden group hover:-translate-y-2 hover:shadow-2xl dark:shadow-none hover:shadow-[#84CC16]/10 transition-all duration-500 ${visible ? "animate-float-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Aspect Ratio Container for Vertical Video (9:16) */}
              <div className="relative w-full bg-black" style={{ paddingTop: '177.77%' }}>
                {!playing[video.id] ? (
                  <div 
                    className="absolute top-0 left-0 w-full h-full cursor-pointer flex items-end justify-center pb-8 lg:pb-12 overflow-hidden"
                    onClick={() => handlePlay(video.id)}
                  >
                    {/* Thumbnail Image */}
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      onError={(e) => { e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`; }}
                      alt={video.title}
                      className="absolute top-0 left-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-105"
                    />
                    
                    {/* Custom Play Button at the bottom */}
                    <div className="relative z-10 w-12 h-12 lg:w-16 lg:h-16 bg-[#84CC16] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(132,204,22,0.4)] group-hover:scale-110 group-hover:bg-[#65A30D] transition-all duration-300">
                      <Play className="w-5 h-5 lg:w-6 lg:h-6 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&controls=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Text & Description */}
        <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
          <div 
            className={`transition-all duration-700 ${visible ? "animate-float-up" : "opacity-0 translate-y-8"}`}
            style={{ animationDelay: "200ms" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#84CC16]/10 text-[#65A30D] dark:text-[#84CC16] text-xs font-bold tracking-[0.2em] uppercase mb-4 border border-[#84CC16]/20">
              Career Guidance
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-[#111827] dark:text-white mb-6">
              Expert Career <span className="text-[#84CC16]">Insights</span>
            </h2>
            <p className="text-lg md:text-xl text-[#4B5563] dark:text-gray-400 font-medium leading-relaxed">
              Unlock your potential with our specialized insights. Discover how personalized career counseling can kickstart and accelerate your journey in the tech industry.
            </p>
          </div>

          <div 
            className={`space-y-4 text-base md:text-lg text-[#4B5563] dark:text-gray-400 leading-relaxed transition-all duration-700 ${visible ? "animate-float-up" : "opacity-0 translate-y-8"}`}
            style={{ animationDelay: "400ms" }}
          >
            <p>
              Get direct advice from industry experts to navigate the ever-evolving tech landscape. From understanding current market demands to selecting the right technology stack, our guidance is designed to set you up for long-term success.
            </p>
            <p>
              Join us for our exclusive <strong>2 Days Free Career Counseling</strong> sessions. Whether you are a beginner looking to start strong or a professional aiming to upskill, our counseling is tailored to your unique career goals.
            </p>
          </div>

          <ul 
            className={`space-y-4 pt-4 transition-all duration-700 ${visible ? "animate-float-up" : "opacity-0 translate-y-8"}`}
            style={{ animationDelay: "600ms" }}
          >
            {[
              "Personalized 1-on-1 Roadmap Creation",
              "Expert Industry Mentorship",
              "2 Days Free Career Counseling Sessions",
            ].map((item, idx) => (
              <li 
                key={idx} 
                className={`flex items-center gap-3 transition-all duration-500 ${visible ? "animate-float-up" : "opacity-0"}`}
                style={{ animationDelay: `${700 + (idx * 150)}ms` }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#84CC16]/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[#84CC16]" />
                </div>
                <span className="text-[#111827] dark:text-gray-300 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
