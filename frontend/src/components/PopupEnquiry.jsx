import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import axios from "axios";
import { API_ROOT } from "../lib/apiConfig";
import MathCaptcha, { useMathCaptcha } from "./common/MathCaptcha";
import PhoneInputWithCountry, { validatePhone } from "./common/PhoneInputWithCountry";

const API = API_ROOT;

const COURSE_OPTIONS = [
  "Data Science",
  "Data Analytics",
  "Full Stack AI",
  "Web Dev with Gen AI",
  "Python Full Stack with Gen AI",
  "DevOps with AWS",
  "Diploma in Cloud Computing",
  "Diploma in Cyber Security",
  "Data Structures and Algorithm",
  "Web Development + DevOps",
  "Cyber Security",
  "AI & GenAI",
  "Digital Marketing",
  "UI/UX Design",
  "Java Full Stack",
  "DSA with Java",
  "Graphic Design",
  "SAP Masterclass",
];

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
];

export default function PopupEnquiry() {
  const location = useLocation();
  const isNoida = location.pathname.includes('noida');
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [form, setForm] = useState({ name: "", phone: "", course_interested: "", branch: isNoida ? "Nexxtechs Noida" : "Nexxtechs Delhi" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [bannerTitle, setBannerTitle] = useState("");
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [enquiryType, setEnquiryType] = useState('course'); // 'course' or 'service'

  const {
    problem: mathProblem,
    userAnswer: mathAnswer,
    setUserAnswer: setMathAnswer,
    error: mathError,
    refreshProblem: refreshMathProblem,
    validateCaptcha,
  } = useMathCaptcha();

  useEffect(() => {
    if (submitted) return;

    // Show popup every 15 seconds if not closed and not on /services
    const interval = setInterval(() => {
      if (window.location.pathname.includes('/services')) return;
      setOpen((prev) => (submitted ? false : true));
    }, 15000);

    const handleOpenPopup = (e) => {
      if (e && e.detail) {
        setBannerTitle(e.detail.bannerTitle || "");
        setIsWhatsApp(!!e.detail.isWhatsApp);
        setEnquiryType(e.detail.type || 'course');
        if (e.detail.serviceName) {
          setForm(prev => ({ ...prev, course_interested: e.detail.serviceName }));
        }
      } else {
        setBannerTitle(""); // Reset if opened normally
        setIsWhatsApp(false);
        setEnquiryType('course');
      }
      setOpen(true);
    };
    window.addEventListener("openPopupEnquiry", handleOpenPopup);

    return () => {
      clearInterval(interval);
      window.removeEventListener("openPopupEnquiry", handleOpenPopup);
    };
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.course_interested || (enquiryType !== 'service' && !form.branch)) {
      setError("Please fill all required fields");
      return;
    }

    // Name validation: Only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      setError("Name should only contain letters");
      return;
    }

    // Phone validation according to country / postal dial code (exactly 10 digits for India)
    const phoneVal = validatePhone(form.phone, countryCode);
    if (!phoneVal.isValid) {
      setError(phoneVal.error);
      return;
    }

    // Mandatory Math Captcha validation (client-side only, not stored in DB)
    if (!validateCaptcha()) {
      return;
    }

    setError("");
    setLoading(true);
    try {
      const endpoint = enquiryType === 'service' ? `${API}/service-enquiry` : `${API}/enquiry`;
      const payload = enquiryType === 'service'
        ? {
            name: form.name,
            phone: phoneVal.cleanPhone,
            email: form.email || `${form.name.toLowerCase().replace(/\s+/g, '')}@lead.com`,
            service_interested: form.course_interested,
            branch: `Service Page: ${window.location.pathname}`,
            source_url: window.location.pathname
          }
        : { ...form, phone: phoneVal.cleanPhone, branch: `${form.branch} | Page: ${window.location.pathname}` };
        
      const response = await axios.post(endpoint, payload);
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        if (isWhatsApp || enquiryType === 'service') {
          const offerText = bannerTitle ? `%0AOffer: ${encodeURIComponent(bannerTitle)}` : "";
          const msg = enquiryType === 'service' 
            ? `New Service Lead:%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(phoneVal.fullPhone)}%0AService: ${encodeURIComponent(form.course_interested)}${offerText}`
            : `New Enquiry Lead (Popup):%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(phoneVal.fullPhone)}%0ACourse: ${encodeURIComponent(form.course_interested)}%0ABranch: ${encodeURIComponent(form.branch)}${offerText}`;
          const waPhone = enquiryType === 'service' ? "917987059430" : (isNoida ? "917987059430" : "919217179762");
          window.open(`https://wa.me/${waPhone}?text=${msg}`, "_blank");
        }
      } else {
        throw new Error("Backend storage failed");
      }
    } catch (err) {
      console.error("Backend error:", err);
      if (isWhatsApp || enquiryType === 'service') {
        const offerText = bannerTitle ? `%0AOffer: ${encodeURIComponent(bannerTitle)}` : "";
        const msg = enquiryType === 'service' 
            ? `New Service Lead (Backup):%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(phoneVal.fullPhone)}%0AService: ${encodeURIComponent(form.course_interested)}${offerText}`
            : `New Enquiry Lead (Popup Backup):%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(phoneVal.fullPhone)}%0ACourse: ${encodeURIComponent(form.course_interested)}%0ABranch: ${encodeURIComponent(form.branch)}${offerText}`;
        const waPhone = enquiryType === 'service' ? "917987059430" : (isNoida ? "917987059430" : "919217179762");
        window.open(`https://wa.me/${waPhone}?text=${msg}`, "_blank");
        setError("Note: Enquiry submitted via WhatsApp only.");
      } else {
        setError("Failed to submit enquiry. Please try again.");
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
      // Automatically close the modal after 3 seconds upon success
      if (!error) {
        setTimeout(() => setOpen(false), 3000);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95vw] sm:w-full sm:max-w-[600px] max-h-[85dvh] overflow-y-auto bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-2xl">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl md:text-4xl font-black text-[#111827] dark:text-white">
            {enquiryType === 'service' ? (
              <>Service <span className="text-[#84CC16]">Quick Enquiry</span></>
            ) : (
              <>Kickstart Your <span className="text-[#84CC16]">Career</span></>
            )}
          </DialogTitle>
          <DialogDescription className="text-base md:text-lg text-[#4B5563] dark:text-gray-400">
            {enquiryType === 'service' 
              ? "Let us know how we can help your business grow with our technical expertise." 
              : "Tell us what you want to learn, and our tech counselors will guide you."}
          </DialogDescription>
        </DialogHeader>

        {submitted && !error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#F4FCE3] flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-[#84CC16]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">Awesome!</h3>
            <p className="text-[#4B5563] dark:text-gray-400">We will connect with you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {bannerTitle && (
              <div className="bg-[#84CC16]/10 border border-[#84CC16]/20 p-3 rounded-xl mb-4 text-[#111827] dark:text-white text-sm font-semibold text-center shadow-inner">
                Applying for Offer: <span className="text-[#84CC16] font-black">{bannerTitle}</span>
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20"
              />
            </div>

            <PhoneInputWithCountry
              phone={form.phone}
              onChangePhone={(val) => setForm({ ...form, phone: val })}
              countryCode={countryCode}
              onChangeCountryCode={setCountryCode}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">
                {enquiryType === 'service' ? "Service Interested" : "Course Interested"}
              </label>
              <Select
                value={form.course_interested}
                onValueChange={(val) => setForm({ ...form, course_interested: val })}
              >
                <SelectTrigger className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20">
                  <SelectValue placeholder={enquiryType === 'service' ? "Select a service" : "What do you want to learn?"} />
                </SelectTrigger>
                <SelectContent>
                  {enquiryType === 'service' ? (
                    SERVICE_OPTIONS.map((svc) => (
                      <SelectItem key={svc} value={svc}>{svc}</SelectItem>
                    ))
                  ) : (
                    COURSE_OPTIONS.map((course) => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {enquiryType !== 'service' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">Institute Branch</label>
                <Select
                  value={form.branch}
                  onValueChange={(val) => setForm({ ...form, branch: val })}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20">
                    <SelectValue placeholder="Select your branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nexxtechs Delhi">Nexxtechs Delhi</SelectItem>
                    <SelectItem value="Nexxtechs Noida">Nexxtechs Noida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Random math sum question - mandatory but not stored in DB */}
            <MathCaptcha
              problem={mathProblem}
              value={mathAnswer}
              onChange={setMathAnswer}
              error={mathError}
              onRefresh={refreshMathProblem}
            />

            {error && <p className="text-red-500 text-xs font-medium mt-1">{error}</p>}
            {submitted && error && <p className="text-[#84CC16] text-xs font-medium mt-1">Request successfully redirected.</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#84CC16] text-black font-bold rounded-xl py-6 mt-4 text-base hover:bg-[#65A30D] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? "Submitting..." : (enquiryType === 'service' ? "Send Inquiry" : "Book Free Demo")}
              <Send size={16} className="ml-2" />
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
