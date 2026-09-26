import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2, Shield, Clock, Zap, ArrowRight } from 'lucide-react';
import PageTransition from "@/components/PageTransition";
import SEOHead from "@/components/SEOHead";

const SERVICE_OPTIONS = [
  "AI Consulting",
  "RAG Development",
  "AI Agents",
  "Web Development",
  "Mobile Apps",
  "SaaS Development",
  "Cloud Services",
  "DevOps & CI/CD",
  "Vulnerability Assessment",
  "Social Media Marketing",
  "Performance Marketing",
  "UI/UX Design",
  "Custom Enterprise Solution"
];

const ServiceEnquiryPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: SERVICE_OPTIONS[0],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNum = "917987059430";
    const text = `Hello Nexxtechs Team,%0A%0AI have a *Service Enquiry*:%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Service Interested:* ${formData.service}%0A*Project Scope:* ${formData.message || 'N/A'}`;
    
    window.open(`https://wa.me/${phoneNum}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <SEOHead 
        title="Service Enquiry & Solutions Consultation | Nexxtechs Noida" 
        description="Ready to start your next enterprise AI, web, cloud, or digital marketing project? Get in touch with Nexxtechs Noida technical experts today."
        canonical="/service-enquiry"
      />
      
      <div className="bg-white dark:bg-[#070C17] text-gray-900 dark:text-slate-100 min-h-screen pt-4 pb-20 transition-colors duration-300">
        
        {/* TOP SECTION HEADER */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center pt-8 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 max-w-3xl mx-auto"
          >
            <span className="px-3.5 py-1 rounded-full bg-[#84CC16]/10 text-[#84CC16] text-xs font-mono font-bold uppercase tracking-wider border border-[#84CC16]/30">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Service <span className="text-[#84CC16]">Enquiry</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 font-medium">
              Fill in your details and our lead solution architects in Noida will reach out to discuss your project requirements within 24 hours.
            </p>
          </motion.div>
        </div>

        {/* MAIN ENQUIRY CONTENT GRID */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: DEDICATED SERVICE ENQUIRY FORM */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-7 bg-white dark:bg-[#0B1120] border-2 border-gray-200 dark:border-slate-800 p-6 md:p-10 rounded-2xl shadow-xl relative overflow-hidden"
            >
              {/* Top-Right Decorative Glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-[#84CC16]/20 to-transparent rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/80 pb-4 mb-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Submit Project Requirements
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-medium mt-1">
                    No commitment required. Fast technical feedback & scope estimate.
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#84CC16]/15 text-[#84CC16] text-xs font-mono font-bold uppercase rounded-full border border-[#84CC16]/30">
                  DIRECT NOIDA DESK
                </span>
              </div>

              {submitted ? (
                <div className="bg-[#84CC16]/10 border border-[#84CC16] p-8 rounded-2xl text-center space-y-4 relative z-10">
                  <CheckCircle2 className="w-14 h-14 text-[#84CC16] mx-auto animate-bounce" />
                  <h4 className="font-bold text-gray-900 dark:text-white text-xl">Enquiry Received!</h4>
                  <p className="text-sm text-gray-600 dark:text-slate-300 max-w-md mx-auto">
                    We have redirected your inquiry directly to our lead technical team on WhatsApp (+91 7987059430).
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#84CC16] underline font-bold pt-2 block mx-auto hover:text-[#65A30D]"
                  >
                    Submit Another Service Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  
                  {/* FULL NAME */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                    />
                  </div>

                  {/* PHONE & EMAIL GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">
                        PHONE / WHATSAPP NUMBER *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 7987059430"
                        className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* SERVICE INTERESTED (SERVICE SPECIFIC DROPDOWN - NO INSTITUTE BRANCH) */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">
                      SERVICE INTERESTED *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all cursor-pointer"
                    >
                      {SERVICE_OPTIONS.map((srv, idx) => (
                        <option key={idx} value={srv} className="bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white py-2">
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PROJECT SCOPE / REQUIREMENTS */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">
                      PROJECT REQUIREMENTS / SCOPE
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your objectives, technology preferences, timeline, or scope..."
                      className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold py-4 rounded-xl text-sm tracking-wider uppercase inline-flex items-center justify-center transition-all shadow-lg shadow-[#84CC16]/20"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Service Enquiry
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT COLUMN: NOIDA ONLY CONTACT INFORMATION */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-5 space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Contact Information
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed font-medium">
                  Have urgent queries about our enterprise solutions? Connect directly with our lead architects at our Noida tech office.
                </p>
              </div>

              {/* PHONE CARD (NOIDA NUMBER ONLY) */}
              <div className="bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-slate-800 p-6 rounded-2xl flex items-start space-x-4 shadow-sm hover:border-[#84CC16] transition-colors group">
                <div className="p-3 bg-[#84CC16]/10 text-[#84CC16] rounded-xl border border-[#84CC16]/20 group-hover:bg-[#84CC16] group-hover:text-black transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Call With Solutions Desk
                  </h4>
                  <a href="tel:+917987059430" className="text-base font-bold text-[#84CC16] hover:underline block mt-0.5 font-mono">
                    +91 7987059430
                  </a>
                  <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">Available Mon - Sat (9 AM - 7 PM IST)</span>
                </div>
              </div>

              {/* EMAIL CARD */}
              <div className="bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-slate-800 p-6 rounded-2xl flex items-start space-x-4 shadow-sm hover:border-[#84CC16] transition-colors group">
                <div className="p-3 bg-[#84CC16]/10 text-[#84CC16] rounded-xl border border-[#84CC16]/20 group-hover:bg-[#84CC16] group-hover:text-black transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Email Us
                  </h4>
                  <a href="mailto:info@nexxtechs.com" className="text-base font-bold text-[#84CC16] hover:underline block mt-0.5 font-mono">
                    info@nexxtechs.com
                  </a>
                  <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">For RFPs, proposal docs & partner inquiries</span>
                </div>
              </div>

              {/* NOIDA OFFICE ADDRESS CARD (ONLY NOIDA ADDRESS) */}
              <div className="bg-gradient-to-br from-white via-gray-50 to-[#84CC16]/5 dark:from-[#0B1120] dark:via-[#0B1120] dark:to-[#84CC16]/10 border-2 border-gray-200 dark:border-slate-800 p-6 rounded-2xl flex items-start space-x-4 shadow-md border-l-4 border-l-[#84CC16]">
                <div className="p-3 bg-[#84CC16]/10 text-[#84CC16] rounded-xl border border-[#84CC16]/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center">
                    Visit Our Noida Office
                    <span className="ml-2 px-2 py-0.5 bg-[#84CC16]/20 text-[#84CC16] text-[10px] font-mono font-bold rounded">
                      NOIDA SECTOR 2
                    </span>
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-slate-300 font-medium leading-relaxed pt-1">
                    B-136 Upper, Ground floor, Sector 2, Noida, Uttar Pradesh 201301
                  </p>
                </div>
              </div>

              {/* SERVICE ASSURANCE BADGE */}
              <div className="bg-gray-50 dark:bg-[#070C17] border border-gray-200 dark:border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center text-xs font-bold text-gray-900 dark:text-white">
                  <Shield className="w-4 h-4 text-[#84CC16] mr-2" />
                  <span>Enterprise SLA & Governance</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-normal">
                  All service engagements are protected by NDA, transparent milestone billing, and dedicated post-release maintenance support.
                </p>
              </div>

            </motion.div>

          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default ServiceEnquiryPage;
