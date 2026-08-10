import React, { useEffect, useState } from "react";
import { GraduationCap, Briefcase, Building2, Code, MapPin, CheckCircle, Quote, Phone, Mail, MessageCircle } from "lucide-react";

export function NoidaWhyChooseUs() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    const el = document.getElementById("why-choose");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="why-choose" className={`py-16 md:py-24 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#84CC16]/10 text-[#65A30D] dark:text-[#84CC16] text-xs font-bold tracking-[0.2em] uppercase mb-4 border border-[#84CC16]/20">
            Why Nexxtechs Noida
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-[#111827] dark:text-white mb-6">
            Focus on <span className="text-[#84CC16]">Practical Skills</span>
          </h2>
          <p className="text-lg md:text-xl text-[#4B5563] dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Choosing the right training institute can make a significant difference. At Nexxtechs Noida, we focus on practical skills along with strong conceptual understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-500 animate-float-up" style={{ animationDelay: '0ms' }}>
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap size={28} className="text-blue-600 dark:text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Experienced Trainers</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Learn from trainers who guide students through technical concepts with practical explanations and real-world examples.
            </p>
          </div>

          <div className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-500 animate-float-up" style={{ animationDelay: '100ms' }}>
            <div className="w-14 h-14 bg-purple-50 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Code size={28} className="text-purple-600 dark:text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Live Project-Based Learning</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Our courses include live projects and practical learning, allowing students to apply what they learn and gain experience.
            </p>
          </div>

          <div className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-500 animate-float-up" style={{ animationDelay: '200ms' }}>
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Building2 size={28} className="text-emerald-600 dark:text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Better Learning Environment</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              We provide a professional and comfortable environment where students can focus on learning, ask questions, and interact with trainers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NoidaPracticalTraining() {
  return (
    <section id="practical-training" className="py-16 md:py-24 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/2 space-y-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#84CC16]/10 text-[#65A30D] dark:text-[#84CC16] text-xs font-bold tracking-[0.2em] uppercase mb-4 border border-[#84CC16]/20">
            Career Growth
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white leading-tight">
            Practical IT Training for <span className="text-[#84CC16]">Career Growth</span>
          </h2>
          <p className="text-lg text-[#4B5563] dark:text-gray-400 leading-relaxed">
            Learning technology only through theory is not enough to build confidence in the workplace. That's why our training approach combines conceptual learning with practical application.
          </p>
          <p className="text-lg font-semibold text-[#111827] dark:text-white">Students get opportunities to:</p>
          <ul className="space-y-4">
            {[
              "Understand concepts through practical examples",
              "Work on live projects",
              "Develop technical skills",
              "Learn from experienced trainers",
              "Ask questions and receive guidance",
              "Gain practical exposure to industry-related tasks",
              "Build confidence for future career opportunities"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 animate-float-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#84CC16]/20 flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-[#84CC16]" />
                </div>
                <span className="text-[#4B5563] dark:text-gray-300 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#84CC16]/30 to-transparent blur-2xl rounded-[40px] opacity-50"></div>
          <div className="relative bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Move Beyond Completing a Course</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              Our goal is to help students move beyond simply completing a course and develop skills they can actually use in the real world.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
              <Briefcase size={40} className="text-[#84CC16]" />
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">100% Practical</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Industry-oriented approach</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NoidaWhoCanJoin() {
  return (
    <section id="who-can-join" className="py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white mb-6">
            Who Can <span className="text-[#84CC16]">Join Nexxtechs Noida?</span>
          </h2>
          <p className="text-lg text-[#4B5563] dark:text-gray-400 max-w-2xl mx-auto">
            Our IT training programs can be suitable for everyone looking to build a tech career.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "12th Pass Students", desc: "Students who have completed Class 12 and want to explore technology and IT career options can start learning relevant technical skills." },
            { title: "Freshers", desc: "If you are a fresher looking to enter the IT industry, practical training can help you build foundational knowledge and project experience." },
            { title: "Build Technical Skills", desc: "Students interested in areas such as AI, Data Science, Cyber Security, Cloud Computing, DevOps or Full Stack Development can choose a suitable path." },
            { title: "Career Starters", desc: "If you are currently unemployed and looking to develop job-oriented technical skills, Nexxtechs Noida can help you explore suitable options." }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-[#151515] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 hover:border-[#84CC16] dark:hover:border-[#84CC16] transition-colors animate-float-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NoidaLocation() {
  return (
    <section id="location" className="py-16 md:py-24 bg-[#84CC16]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/3">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
            Why Choose Our Noida Location?
          </h2>
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-black/10">
            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-black shrink-0 mt-1" />
              <p className="text-black font-bold text-lg">
                B-136 Upper, Ground Floor, B Block, Sector 2, Noida, Uttar Pradesh – 201301
              </p>
            </div>
            <p className="text-black/80 font-medium mt-4 text-sm">
              The institute is located near Noida Sector 15 Metro Station, making it convenient for students travelling from different parts of Noida.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-2/3 grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Convenient Location</h3>
            <p className="text-gray-600 text-sm">Our Sector 2 location provides easy access for students from nearby Noida areas.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Environment</h3>
            <p className="text-gray-600 text-sm">Learn in a comfortable environment with guidance from trainers.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Career-Focused Training</h3>
            <p className="text-gray-600 text-sm">Designed to help students develop relevant skills and understanding.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NoidaTestimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50 dark:bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white mb-6">
            What Our <span className="text-[#84CC16]">Students Say</span>
          </h2>
          <p className="text-lg text-[#4B5563] dark:text-gray-400 max-w-2xl mx-auto">
            Real experiences from students can help you understand what learning at Nexxtechs Noida is like.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#151515] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 relative group hover:-translate-y-2 transition-all shadow-xl dark:shadow-none animate-float-up" style={{ animationDelay: '0ms' }}>
            <Quote size={40} className="text-[#84CC16]/20 absolute top-8 right-8" />
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic mb-8 relative z-10">
              “I learned cyber security from Nexxtechs Noida and it is best institute in Noida for cyber security. I like the ambience and trainer also. Sagar sir gives me best instructions and I am learning very good. Join Nexxtechs Noida for best learning experience.”
            </p>
            <div className="font-bold text-gray-900 dark:text-white mt-auto">— Cyber Security Student</div>
          </div>
          <div className="bg-white dark:bg-[#151515] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 relative group hover:-translate-y-2 transition-all shadow-xl dark:shadow-none animate-float-up" style={{ animationDelay: '100ms' }}>
            <Quote size={40} className="text-[#84CC16]/20 absolute top-8 right-8" />
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic mb-8 relative z-10">
              “NexxTechs is one of the best institutes in Noida for a Cloud Computing course. The trainers are knowledgeable, supportive, and explain concepts clearly with practical examples. The ambience is professional and comfortable for learning.”
            </p>
            <div className="font-bold text-gray-900 dark:text-white mt-auto">— Cloud Computing Student</div>
          </div>
          <div className="bg-white dark:bg-[#151515] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 relative group hover:-translate-y-2 transition-all shadow-xl dark:shadow-none animate-float-up" style={{ animationDelay: '200ms' }}>
            <Quote size={40} className="text-[#84CC16]/20 absolute top-8 right-8" />
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic mb-8 relative z-10">
              “I’m currently enrolled in the Data Science with AI program at NexxTechs Institute, and it’s been an amazing experience. The curriculum is practical, the faculty is supportive, and the focus on real-world applications makes learning both engaging and valuable.”
            </p>
            <div className="font-bold text-gray-900 dark:text-white mt-auto">— Data Science & AI Student</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NoidaStartCareerCTA() {
  return (
    <section id="start-career" className="py-16 md:py-24 bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-gray-50 dark:bg-[#151515] rounded-[40px] p-8 md:p-16 border border-gray-200 dark:border-white/5 text-center shadow-xl dark:shadow-none max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-[#111827] dark:text-white mb-6">
            Start Your IT Career with <span className="text-[#84CC16]">Nexxtechs Noida</span>
          </h2>
          <p className="text-lg text-[#4B5563] dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            The IT industry offers opportunities across areas such as Artificial Intelligence, Data Science, Cyber Security, Cloud Computing, DevOps and Full Stack Development. Take the first step toward your IT career today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="tel:7987059430" className="flex items-center gap-2 bg-[#111827] dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform w-full sm:w-auto justify-center">
              <Phone size={20} /> Call 7987059430
            </a>
            <a href="https://wa.me/917987059430" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform w-full sm:w-auto justify-center">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
            <button onClick={() => window.dispatchEvent(new CustomEvent("openPopupEnquiry"))} className="flex items-center gap-2 bg-[#84CC16] text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform w-full sm:w-auto justify-center">
              <Mail size={20} /> Enquire Now
            </button>
          </div>
          
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            <p>Address: B-136 Upper, Ground Floor, B Block, Sector 2, Noida, Uttar Pradesh 201301</p>
            <p className="mt-2">Timings: 8:00 AM – 8:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
