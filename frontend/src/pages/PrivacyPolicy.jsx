import React, { useEffect } from 'react';
import PageTransition from "@/components/PageTransition";
import { Shield, BookOpen, CreditCard, Users, Mail, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="pb-24 min-h-screen">
        <SEOHead
          title="Privacy Policy | Nexxtechs IT Training Institute"
          description="Read the NexxTechs privacy policy to understand how we collect, use, and protect your personal data and information while you browse our training website."
          canonical="/privacy-policy"
        />
        <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />
        <div className="max-w-5xl mx-auto px-6 pt-8 md:pt-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy & <span className="gradient-text">Terms of Service</span></h1>
            <p className="text-gray-400">NexxTechs Institute - Effective Date: April 2026</p>
          </div>

          <div className="space-y-12">
            {/* Section 1 */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/20 flex items-center justify-center">
                  <Shield className="text-[#84CC16]" />
                </div>
                <h2 className="text-2xl font-bold">1. Introduction</h2>
              </div>
              <p className="text-gray-400 leading-relaxed">
                At NexxTechs Institute, we are committed to protecting your privacy and providing a transparent understanding of our policies. This page outlines how we collect, use, and protect your information, along with our course-related terms and conditions.
              </p>
            </section>

            {/* Section 2 */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">2. Information We Collect</h2>
              </div>
              <p className="text-gray-400 mb-4">We may collect the following information when you interact with our website or services:</p>
              <ul className="grid md:grid-cols-2 gap-3">
                {['Name', 'Phone number', 'Email address', 'Course preferences', 'Form submissions'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 & 4 */}
            <div className="grid md:grid-cols-2 gap-8">
              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-4">3. How We Use Data</h2>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>• Contact regarding courses</li>
                  <li>• Provide consultations and support</li>
                  <li>• Improve training programs</li>
                  <li>• Send updates and offers</li>
                </ul>
                <p className="mt-4 text-xs text-[#84CC16]">We do not sell or share your personal information with third parties without your consent.</p>
              </section>
              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-4">4. Data Protection</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We implement appropriate security measures to protect your personal information from unauthorized access, misuse, or disclosure.
                </p>
              </section>
            </div>

            {/* Section 5, 6, 7 */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                  <BookOpen className="text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold">Course Policies</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <span className="text-[#84CC16]">5.</span> Course Duration
                  </h3>
                  <p className="text-gray-400 text-sm">All courses are valid for 1 year from enrollment. Students must complete the course within this period.</p>
                </div>

                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-400">
                    <CreditCard size={20} />
                    6. Fees Policy (Non-Refundable)
                  </h3>
                  <p className="text-gray-300 text-sm">All fees paid are strictly non-refundable. Once payment is made, it cannot be canceled, transferred, or refunded under any circumstances.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <span className="text-[#84CC16]">7.</span> Rejoining Policy
                  </h3>
                  <p className="text-gray-400 text-sm">Students can rejoin within the 1-year validity period, subject to batch availability. No refund for unused duration.</p>
                </div>
              </div>
            </section>

            {/* Section 8 & 9 */}
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <h3 className="text-lg font-bold mb-3">8. Student Responsibility</h3>
                  <p className="text-gray-400 text-sm">Attend classes regularly and complete assignments. Institute is not responsible for absence.</p>
               </div>
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <h3 className="text-lg font-bold mb-3">9. Changes to Policy</h3>
                  <p className="text-gray-400 text-sm">NexxTechs reserves the right to update or modify this policy at any time without prior notice.</p>
               </div>
            </div>

            {/* Section 10 */}
            <section className="bg-gradient-to-br from-[#84CC16]/20 to-transparent border border-[#84CC16]/30 rounded-3xl p-8 md:p-10 text-center">
              <h2 className="text-2xl font-bold mb-6">10. Contact Us</h2>
              <div className="flex flex-col md:flex-row justify-center gap-8">
                <a href="mailto:info@nexxtechs.com" className="flex items-center gap-3 hover:text-[#84CC16] transition-colors">
                  <Mail className="text-[#84CC16]" />
                  <span>info@nexxtechs.com</span>
                </a>
                <div className="flex items-center gap-3">
                  <Phone className="text-[#84CC16]" />
                  <span>+91 9217179762 / 9217179764</span>
                </div>
              </div>
            </section>

            <p className="text-center text-gray-500 text-sm italic">
              By enrolling in our courses or using our website, you agree to the above terms and policies.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
