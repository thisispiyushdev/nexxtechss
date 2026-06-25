import React, { useEffect, useRef } from 'react';
import PageTransition from "@/components/PageTransition";
import { Shield, Rocket, Target, Globe, BookOpen, Users, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function CyberHooks() {
  const container = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    // Animations for hero section
    gsap.from(".hero-elem", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Scroll animations for gallery images
    gsap.utils.toArray(".gallery-img").forEach((img) => {
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });

  }, { scope: container });

  const galleryImages = [
    "/cyberhooks/image1.png",
    "/cyberhooks/image2.png",
    "/cyberhooks/image3.png",
    "/cyberhooks/image4.png",
    "/cyberhooks/image5.png",
    "/cyberhooks/image6.png",
    "/cyberhooks/image7.png",
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground dark:bg-[#050505] dark:text-white selection:bg-[#84CC16] selection:text-black" ref={container}>
        <SEOHead
          title="Cyber Security & AI Training | CyberHooks × NexxTechs Delhi"
          description="Master Cyber Security and AI with CyberHooks at NexxTechs. Industry-leading expertise and hands-on labs in Delhi. Enroll today!"
          canonical="/cyberhooks"
        />
        <Breadcrumbs items={[{ name: "CyberHooks", path: "/cyberhooks" }]} />
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#84CC16]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
            <div className="absolute inset-0 opacity-5 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: "url('/collab/hero.png')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background dark:via-[#050505]/80 dark:to-[#050505]"></div>
          </div>

          <div className="max-w-[1440px] mx-auto px-6 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="hero-elem inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted dark:bg-white/5 border border-border dark:border-white/10 text-emerald-600 dark:text-[#84CC16] text-sm font-medium mb-8 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84CC16] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84CC16]"></span>
                  </span>
                  Official Training Partner
                </div>
                <h1 className="hero-elem text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
                  NexxTechs <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#84CC16] to-emerald-400">× CyberHooks</span>
                </h1>
                <p className="hero-elem text-xl md:text-2xl text-muted-foreground dark:text-gray-400 max-w-2xl leading-relaxed mb-10 font-light">
                  Empowering the future of technology through our strategic partnership. Industry-leading expertise in Cyber Security, AI, and Advanced Technology Training.
                </p>
                
                <div className="hero-elem flex flex-wrap gap-4 items-stretch sm:items-center">
                  <a 
                    href="https://www.cyberhooks.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-8 py-4 bg-[#84CC16] text-black font-bold rounded-2xl hover:bg-[#65A30D] transition-all hover:-translate-y-1 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(132,204,22,0.3)]"
                  >
                    Explore Academy <ArrowUpRight size={20} />
                  </a>
                  <a 
                    href="#campus"
                    className="flex-1 sm:flex-none px-8 py-4 bg-muted dark:bg-white/5 text-foreground dark:text-white font-bold rounded-2xl hover:bg-muted/80 dark:hover:bg-white/10 border border-border dark:border-white/10 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 backdrop-blur-md"
                  >
                    View Campus
                  </a>
                </div>
              </div>
              
              <div className="hero-elem relative hidden lg:block">
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-border dark:border-white/10 shadow-2xl">
                  <img src={galleryImages[0]} alt="CyberHooks Campus" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-[#050505] via-transparent to-transparent"></div>
                </div>
                {/* Floating Card */}
                <div className="absolute -bottom-10 -left-10 bg-card/80 dark:bg-white/10 backdrop-blur-xl border border-border dark:border-white/20 p-6 rounded-3xl shadow-2xl">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#84CC16] flex items-center justify-center text-black">
                      <Shield size={32} />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-foreground dark:text-white">500+</div>
                      <div className="text-sm text-muted-foreground dark:text-gray-300 uppercase tracking-wider font-medium">Careers Launched</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="campus" className="py-32 relative z-10 bg-muted/30 dark:bg-[#0A0A0A]">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-4">Inside <span className="text-[#84CC16]">CyberHooks</span></h2>
                <p className="text-xl text-muted-foreground dark:text-gray-400">Experience our state-of-the-art training facilities and vibrant tech community.</p>
              </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryImages.slice(1).map((img, idx) => (
                <div 
                  key={idx} 
                  className="gallery-img relative rounded-3xl overflow-hidden group border border-border dark:border-white/5 bg-background dark:bg-white/5 break-inside-avoid"
                >
                  <img 
                    src={img} 
                    alt={`CyberHooks Campus - IT Training Facility ${idx + 1}`} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 dark:from-[#050505]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Expertise */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-cover bg-fixed" style={{ backgroundImage: "url('/collab/hero.png')" }}></div>
          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Domain</span></h2>
              <p className="text-xl text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">Specialized training programs delivered by industry veterans</p>
            </div>

            <div className="expertise-container grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Cyber Security", 
                  desc: "From Ethical Hacking to Advanced Penetration Testing, Network Defense, and Threat Hunting.",
                  icon: Shield,
                  color: "from-red-500/20 to-rose-500/5",
                  border: "border-red-500/20 hover:border-red-500/50",
                  text: "text-red-400"
                },
                { 
                  title: "Artificial Intelligence", 
                  desc: "Mastering Machine Learning, Deep Neural Networks, GenAI, and AI-driven solution development.",
                  icon: Rocket,
                  color: "from-blue-500/20 to-indigo-500/5",
                  border: "border-blue-500/20 hover:border-blue-500/50",
                  text: "text-blue-400"
                },
                { 
                  title: "Digital Design", 
                  desc: "Visual communication, UI/UX, interaction design, and creative strategy for modern digital brands.",
                  icon: BookOpen,
                  color: "from-[#84CC16]/20 to-[#84CC16]/5",
                  border: "border-[#84CC16]/20 hover:border-[#84CC16]/50",
                  text: "text-[#84CC16]"
                }
              ].map((item, idx) => (
                <div key={idx} className={`expertise-card p-1 rounded-3xl bg-gradient-to-b ${item.color} ${item.border} backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 group`}>
                  <div className="bg-card/90 dark:bg-[#0A0A0A]/90 h-full rounded-[23px] p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-muted dark:bg-white/5 flex items-center justify-center mb-8 border border-border dark:border-white/5 group-hover:scale-110 transition-transform duration-500 ${item.text}`}>
                      <item.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground dark:text-white">{item.title}</h3>
                    <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Contact Section */}
        <section className="py-32 bg-muted/30 dark:bg-[#0A0A0A] border-t border-border dark:border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#84CC16]/5 rounded-full blur-[100px]"></div>
          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">Find Us at Our <br/><span className="text-[#84CC16]">Collaborative Hub</span></h2>
                <p className="text-xl text-muted-foreground dark:text-gray-400 mb-10 leading-relaxed">
                  Visit our state-of-the-art academy to experience hands-on learning and discuss your career roadmap with our tech experts.
                </p>

                <div className="space-y-8">
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-background dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#84CC16]/20 group-hover:border-[#84CC16]/30 transition-colors">
                      <MapPin className="text-[#84CC16]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground dark:text-white mb-2">Visit Academy</h4>
                      <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
                        B-54, 2nd Floor, New Krishna Park, Vikaspuri,<br/>
                        Opp. Unity One Mall, Near Janakpuri West Metro Station,<br/>
                        New Delhi - 110018
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-background dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#84CC16]/20 group-hover:border-[#84CC16]/30 transition-colors">
                      <Phone className="text-[#84CC16]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground dark:text-white mb-2">Call Us Directly</h4>
                      <div className="flex flex-col gap-2">
                        <a href="tel:+919990401826" className="text-muted-foreground dark:text-gray-400 hover:text-[#84CC16] transition-colors text-lg">+91 9990401826</a>
                        <a href="tel:+919217179762" className="text-muted-foreground dark:text-gray-400 hover:text-[#84CC16] transition-colors text-lg">+91 9217179762</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-background dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#84CC16]/20 group-hover:border-[#84CC16]/30 transition-colors">
                      <Mail className="text-[#84CC16]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground dark:text-white mb-2">Email Us</h4>
                      <a href="mailto:info@cyberhooks.in" className="text-muted-foreground dark:text-gray-400 hover:text-[#84CC16] transition-colors text-lg">info@cyberhooks.in</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="min-h-[450px] aspect-auto md:aspect-square rounded-[2rem] overflow-hidden border border-border dark:border-white/10 p-6 md:p-8 bg-card dark:bg-[#0A0A0A] relative group shadow-2xl">
                  {/* Abstract Grid Map Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(132,204,22,0.15)_0%,transparent_70%)]"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
                  
                  {/* Map Pin UI */}
                  <div className="relative h-full flex flex-col items-center justify-center text-center z-10">
                    <div className="w-24 h-24 rounded-full bg-[#84CC16]/10 flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 rounded-full border-2 border-[#84CC16] animate-ping opacity-20 duration-1000"></div>
                      <div className="absolute inset-2 rounded-full border border-[#84CC16]/30 animate-spin-slow"></div>
                      <div className="w-16 h-16 rounded-full bg-[#84CC16]/20 flex items-center justify-center backdrop-blur-md">
                        <MapPin className="text-[#84CC16]" size={32} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground dark:text-white mb-2">Janakpuri West</h3>
                    <p className="text-muted-foreground dark:text-gray-400 mb-8 max-w-[250px]">Situated in the heart of New Delhi's education and technology hub.</p>
                    
                    <a 
                      href="https://maps.app.goo.gl/GrUfMGzkPhBLYczN6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-[#84CC16] text-black font-bold rounded-2xl hover:bg-[#65A30D] transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(132,204,22,0.2)] flex items-center gap-2"
                    >
                      <MapPin size={18} /> Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </section>
      </div>
    </PageTransition>
  );
}
