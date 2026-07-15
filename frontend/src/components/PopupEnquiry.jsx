import { useState, useEffect } from "react";
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

export default function PopupEnquiry() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", course_interested: "", branch: "Nexxtechs Delhi" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [bannerTitle, setBannerTitle] = useState("");
  const [isWhatsApp, setIsWhatsApp] = useState(false);

  useEffect(() => {
    // Show popup after 8 seconds instead of 500ms to avoid blocking initial paint
    const timer = setTimeout(() => {
      setOpen(true);
    }, 8000);

    const handleOpenPopup = (e) => {
      if (e && e.detail) {
        setBannerTitle(e.detail.bannerTitle || "");
        setIsWhatsApp(!!e.detail.isWhatsApp);
      } else {
        setBannerTitle(""); // Reset if opened normally
        setIsWhatsApp(false);
      }
      setOpen(true);
    };
    window.addEventListener("openPopupEnquiry", handleOpenPopup);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("openPopupEnquiry", handleOpenPopup);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.course_interested || !form.branch) {
      setError("Please fill all fields");
      return;
    }

    // Name validation: Only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      setError("Name should only contain letters");
      return;
    }

    // Phone validation: Only numbers
    if (!/^\d+$/.test(form.phone)) {
      setError("Phone number should only contain numbers");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const payload = { ...form, branch: `${form.branch} | Page: ${window.location.pathname}` };
      const response = await axios.post(`${API}/enquiry`, payload);
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        if (isWhatsApp) {
          const offerText = bannerTitle ? `%0AOffer: ${encodeURIComponent(bannerTitle)}` : "";
          const msg = `New Enquiry Lead (Popup):%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0ACourse: ${encodeURIComponent(form.course_interested)}%0ABranch: ${encodeURIComponent(form.branch)}${offerText}`;
          window.open(`https://wa.me/919217179762?text=${msg}`, "_blank");
        }
      } else {
        throw new Error("Backend storage failed");
      }
    } catch (err) {
      console.error("Backend error:", err);
      if (isWhatsApp) {
        const offerText = bannerTitle ? `%0AOffer: ${encodeURIComponent(bannerTitle)}` : "";
        const msg = `New Enquiry Lead (Popup Backup):%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0ACourse: ${encodeURIComponent(form.course_interested)}%0ABranch: ${encodeURIComponent(form.branch)}${offerText}`;
        window.open(`https://wa.me/919217179762?text=${msg}`, "_blank");
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
            Kickstart Your <span className="text-[#84CC16]">Career</span>
          </DialogTitle>
          <DialogDescription className="text-base md:text-lg text-[#4B5563] dark:text-gray-400">
            Tell us what you want to learn, and our tech counselors will guide you.
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

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">Phone Number</label>
              <Input
                type="tel"
                placeholder="Enter your mobile number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">Course Interested</label>
              <Select
                value={form.course_interested}
                onValueChange={(val) => setForm({ ...form, course_interested: val })}
              >
                <SelectTrigger className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20">
                  <SelectValue placeholder="What do you want to learn?" />
                </SelectTrigger>
                <SelectContent>
                  {COURSE_OPTIONS.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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

            {error && <p className="text-red-500 text-xs font-medium mt-1">{error}</p>}
            {submitted && error && <p className="text-[#84CC16] text-xs font-medium mt-1">Request successfully redirected.</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#84CC16] text-black font-bold rounded-xl py-6 mt-4 text-base hover:bg-[#65A30D] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Book Free Demo"}
              <Send size={16} className="ml-2" />
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
