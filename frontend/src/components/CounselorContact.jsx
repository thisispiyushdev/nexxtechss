import { useState } from "react";
import { Send, CheckCircle, UserPlus, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { API_ROOT } from "../lib/apiConfig";
import MathCaptcha, { useMathCaptcha } from "./common/MathCaptcha";
import PhoneInputWithCountry, { validatePhone } from "./common/PhoneInputWithCountry";

const API = API_ROOT;

export default function CounselorContact({ isNoida = false }) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const branchPhone = isNoida ? "+91 7987059430" : "+91 9217179762";
  const branchPhoneRaw = isNoida ? "917987059430" : "919217179762";
  const branchTag = isNoida ? "Nexxtechs Noida" : "Nexxtechs Delhi";
  const branchCity = isNoida ? "Noida Sector 2" : "Delhi Vikaspuri";

  const {
    problem: mathProblem,
    userAnswer: mathAnswer,
    setUserAnswer: setMathAnswer,
    error: mathError,
    refreshProblem: refreshMathProblem,
    validateCaptcha,
  } = useMathCaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("Please fill all required fields");
      return;
    }

    // Name validation: Only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      setError("Name should only contain letters");
      return;
    }

    // Phone validation according to country / postal dial code
    const phoneVal = validatePhone(form.phone, countryCode);
    if (!phoneVal.isValid) {
      setError(phoneVal.error);
      return;
    }

    // Math captcha validation (client-side only, not stored in DB)
    if (!validateCaptcha()) {
      return;
    }

    setError("");
    setLoading(true);
    
    // Send branch specific payload
    const payload = { ...form, phone: phoneVal.cleanPhone, course_interested: "Career Counseling", branch: branchTag };
    
    try {
      const response = await axios.post(`${API}/enquiry`, payload);
      
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        const msg = `New Career Counseling Lead (${branchCity}):%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(phoneVal.fullPhone)}`;
        window.open(`https://wa.me/${branchPhoneRaw}?text=${msg}`, "_blank");
        setForm({ name: "", phone: "" });
        refreshMathProblem();
      } else {
        throw new Error("Backend storage failed");
      }
    } catch (err) {
      console.error("Backend error:", err);
      const msg = `New Career Counseling Lead (Backup - ${branchCity}):%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(phoneVal.fullPhone)}`;
      window.open(`https://wa.me/${branchPhoneRaw}?text=${msg}`, "_blank");
      
      setError("Note: Enquiry submitted via WhatsApp. Database storage unavailable.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4FCE3] dark:bg-[#1a1d27] border border-[#84CC16]/20 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-xl shadow-[#84CC16]/5 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <UserPlus size={150} />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-[#84CC16]/20 text-[#65A30D] dark:text-[#84CC16] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Talk to an Expert • {branchCity}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white mb-4 leading-tight">
                Get Free <span className="text-[#84CC16]">Career Counseling</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                Not sure which path to take? Leave your details and our expert counselor at our {branchCity} center will call you directly to guide your career.
              </p>
              
              <div className="flex items-center gap-4 text-[#111827] dark:text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#0f1117] flex items-center justify-center shadow-sm">
                  <Phone size={18} className="text-[#84CC16]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Call us directly ({branchCity})</div>
                  <a href={`tel:${branchPhone}`} className="font-semibold text-gray-900 dark:text-white hover:text-[#84CC16] transition-colors">{branchPhone}</a>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#0f1117] rounded-2xl p-6 md:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-[#F4FCE3] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-[#84CC16]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2">Request Received!</h3>
                  <p className="text-gray-500 dark:text-gray-400">Our counselor will call you soon.</p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full px-6 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Submit Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] dark:text-gray-200 mb-2">Your Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1d27] dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20"
                    />
                  </div>
                  <PhoneInputWithCountry
                    phone={form.phone}
                    onChangePhone={(val) => setForm({ ...form, phone: val })}
                    countryCode={countryCode}
                    onChangeCountryCode={setCountryCode}
                  />

                  {/* Random math sum question - mandatory but not stored in DB */}
                  <MathCaptcha
                    problem={mathProblem}
                    value={mathAnswer}
                    onChange={setMathAnswer}
                    error={mathError}
                    onRefresh={refreshMathProblem}
                  />
                  
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#84CC16] text-black font-semibold rounded-full py-6 mt-4 text-base hover:bg-[#65A30D] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {loading ? "Requesting..." : "Request Call Back"}
                    <Send size={16} className="ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
