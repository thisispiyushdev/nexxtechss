import React, { Suspense, lazy, useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PromoBanner from "@/components/PromoBanner";
import HeroSection from "@/components/HeroSection";
import { prefetchHomepageData } from "@/lib/apiCache";

// Prefetch all homepage API data in parallel IMMEDIATELY (before React mounts)
prefetchHomepageData();

// Global recovery for ChunkLoadErrors (occurs when static file hashes change after a new deployment)
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    const message = e.message || "";
    const isChunkLoadFailed = message.includes("Loading chunk") || 
                              message.includes("ChunkLoadError") || 
                              message.includes("MIME type");
    if (isChunkLoadFailed) {
      const hasReloaded = sessionStorage.getItem("chunk_reload_failed");
      if (!hasReloaded) {
        sessionStorage.setItem("chunk_reload_failed", "true");
        window.location.reload();
      }
    }
  }, true);
}

// Lazy load layout shell components (not needed for initial paint)
const FloatingButtons = lazy(() => import("@/components/FloatingButtons"));
const PopupEnquiry = lazy(() => import("@/components/PopupEnquiry"));
const GoogleReviewBar = lazy(() => import("@/components/GoogleReviewBar"));
const PageTransition = lazy(() => import("@/components/PageTransition"));

// Lazy load heavy components
// Background3D removed — replaced with CSS gradient for mobile performance
const CoursesGrid = lazy(() => import("@/components/CoursesGrid"));
const VideoTestimonials = lazy(() => import("@/components/VideoTestimonials"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const StudentProjects = lazy(() => import("@/components/StudentProjects"));
const PlacementSuccess = lazy(() => import("@/components/PlacementSuccess"));
const TrainingPartners = lazy(() => import("@/components/TrainingPartners"));
const EnquiryForm = lazy(() => import("@/components/EnquiryForm"));
const CareerTransformation = lazy(() => import("@/components/CareerTransformation"));
const ExploreMore = lazy(() => import("@/components/ExploreMore"));
const TextRevealAnimation = lazy(() => import("@/components/TextRevealAnimation"));
const FAQ = lazy(() => import("@/components/FAQ"));
const ComparisonSection = lazy(() => import("@/components/ComparisonSection"));


// Lazy load pages
const CourseDetail = lazy(() => import("@/pages/CourseDetail"));
const CoursesPage = lazy(() => import("@/pages/CoursesPage"));
const PlacementPage = lazy(() => import("@/pages/PlacementPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const RoadmapPage = lazy(() => import("@/pages/RoadmapPage"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const CareerGuidancePage = lazy(() => import("@/pages/CareerGuidancePage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const CyberHooks = lazy(() => import("@/pages/CyberHooks"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const TopTrainersPage = lazy(() => import("@/pages/TopTrainersPage"));
const NoidaInstitutePage = lazy(() => import("@/pages/NoidaInstitutePage"));
// Basic loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Deferred rendering wrapper — delays mounting by N seconds to avoid blocking initial paint
function DeferredRender({ children, delay = 2000 }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!show) return null;
  return children;
}

// Enforces trailing slashes on all client-side navigations
function TrailingSlashRedirect() {
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname !== '/' && !location.pathname.endsWith('/')) {
      // Sanitize pathname to prevent double slashes from being evaluated as protocol-relative URLs
      const safePath = location.pathname.replace(/^\/+/, '/');
      // Use window.history.replaceState to avoid triggering a new React Router navigation cycle
      // which can sometimes cause double-renders if using navigate()
      window.history.replaceState(null, '', `${safePath}/${location.search}${location.hash}`);
    }
  }, [location]);

  return null;
}

function HomePage() {
  return (
    <PageTransition>
      <SEOHead
        title="Top Institute for IT Training Courses in Delhi – Nexxtechs"
        description="Nexxtechs is the No.1 Training Company in Delhi with top-notch IT training programs and industry experts. Providing Placement, Certification and affordable fees."
        canonical="/"
      />
      <PromoBanner />
      <HeroSection />
      <Suspense fallback={<div className="h-96" />}>
        <CoursesGrid />
      </Suspense>
      <DeferredRender delay={500}>
        <Suspense fallback={null}>
          <CareerTransformation />
        </Suspense>
        <Suspense fallback={null}>
          <VideoTestimonials />
        </Suspense>
        <Suspense fallback={null}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={null}>
          <ComparisonSection />
        </Suspense>
        <Suspense fallback={null}>
          <StudentProjects />
        </Suspense>
        <Suspense fallback={null}>
          <PlacementSuccess />
        </Suspense>
        <Suspense fallback={null}>
          <TrainingPartners />
        </Suspense>
        <Suspense fallback={null}>
          <EnquiryForm />
        </Suspense>
        <Suspense fallback={null}>
          <TextRevealAnimation />
        </Suspense>
        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
      </DeferredRender>
    </PageTransition>
  );
}

function PublicLayout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCoursePage = location.pathname.startsWith("/course");

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 relative z-0 overflow-x-hidden w-full max-w-[100vw]" data-testid="app-root">
      <Header />
      <main className="relative z-10 w-full overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </main>
      {(!isHomePage && !isCoursePage) && (
        <Suspense fallback={null}>
          <ExploreMore isCollaborator={location.pathname === '/cyberhooks'} />
        </Suspense>
      )}
      <Footer />
      {/* Defer non-critical floating UI by 2 seconds to avoid blocking initial paint */}
      <DeferredRender delay={2000}>
        <Suspense fallback={null}>
          <FloatingButtons />
        </Suspense>
        <Suspense fallback={null}>
          <GoogleReviewBar />
        </Suspense>
        <Suspense fallback={null}>
          <PopupEnquiry />
        </Suspense>
      </DeferredRender>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Clear chunk reload flag on successful mount
    sessionStorage.removeItem("chunk_reload_failed");
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <TrailingSlashRedirect />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Admin routes — NO Header, Footer, Background3D */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Public routes — with full site layout */}
            <Route path="/*" element={
              <PublicLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/placement" element={<PlacementPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/roadmap" element={<RoadmapPage />} />
                  <Route path="/career-guidance" element={<CareerGuidancePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/cyberhooks" element={<CyberHooks />} />
                  <Route path="/course/:slug" element={<CourseDetail />} />
                  <Route path="/top-5-cloud-computing-trainers-in-india" element={<TopTrainersPage />} />
                  <Route path="/top-5-devops-trainers-in-india" element={<TopTrainersPage />} />
                  <Route path="/top-5-digital-marketing-trainers-in-india" element={<TopTrainersPage />} />
                  <Route path="/top-5-cyber-security-trainers-in-india" element={<TopTrainersPage />} />
                  <Route path="/top-5-graphic-design-trainers-in-india" element={<TopTrainersPage />} />
                  <Route path="/top-5-personal-development-trainers-in-india" element={<TopTrainersPage />} />
                  <Route path="/top-5-data-science-trainers-in-india" element={<TopTrainersPage />} />
                  <Route path="/nexxtechs-noida" element={<NoidaInstitutePage />} />
                </Routes>
              </PublicLayout>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
