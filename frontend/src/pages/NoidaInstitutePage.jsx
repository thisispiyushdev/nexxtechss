import React, { Suspense, lazy } from "react";
import PageTransition from "@/components/PageTransition";
import SEOHead from "@/components/SEOHead";
import NoidaEnquiryBanner from "@/components/NoidaEnquiryBanner";
import NoidaHeroSection from "@/components/NoidaHeroSection";
import EnquiryForm from "@/components/EnquiryForm";

// Lazy load other components to maintain performance
const NoidaWhyChooseUs = lazy(() => import("@/components/NoidaSEOContent").then(module => ({ default: module.NoidaWhyChooseUs })));
const NoidaPracticalTraining = lazy(() => import("@/components/NoidaSEOContent").then(module => ({ default: module.NoidaPracticalTraining })));
const NoidaWhoCanJoin = lazy(() => import("@/components/NoidaSEOContent").then(module => ({ default: module.NoidaWhoCanJoin })));
const NoidaLocation = lazy(() => import("@/components/NoidaSEOContent").then(module => ({ default: module.NoidaLocation })));
const NoidaTestimonials = lazy(() => import("@/components/NoidaSEOContent").then(module => ({ default: module.NoidaTestimonials })));

const CoursesGrid = lazy(() => import("@/components/CoursesGrid"));
const CareerTransformation = lazy(() => import("@/components/CareerTransformation"));
const CoursePlacementStats = lazy(() => import("@/components/CoursePlacementStats"));
const ComparisonSection = lazy(() => import("@/components/ComparisonSection"));
const StudentProjects = lazy(() => import("@/components/StudentProjects"));
const PlacementSuccess = lazy(() => import("@/components/PlacementSuccess"));
const TrainingPartners = lazy(() => import("@/components/TrainingPartners"));
const TextRevealAnimation = lazy(() => import("@/components/TextRevealAnimation"));
const FAQ = lazy(() => import("@/components/FAQ"));

const NOIDA_FAQ_DATA = [
  {
    question: "Where is NexxTechs Institute located in Noida?",
    answer: "Our Noida branch is located at B-136 Upper, Ground floor, B Block, Sector 2, Noida, Uttar Pradesh 201301."
  },
  {
    question: "Are demo classes available at the Noida branch?",
    answer: "Yes, demo sessions are available for selected courses at our Sector 2, Noida campus so students can understand the teaching methodology before enrollment."
  },
  {
    question: "Do you offer placement assistance in Noida?",
    answer: "Absolutely. We support our students with placement assistance, interview preparation, and career counseling specifically tailored for opportunities in Delhi-NCR."
  },
  {
    question: "Which IT courses are offered at the Noida Institute?",
    answer: "We offer high-demand courses including Data Science, Cyber Security, Cloud Computing, Full Stack Development, and Digital Marketing."
  },
  {
    question: "Is there any public transport connectivity to Sector 2, Noida?",
    answer: "Yes, our institute is easily accessible via the Sector 15 Noida metro station and various bus routes, making it convenient to travel from any part of Delhi NCR."
  }
];

export default function NoidaInstitutePage() {
  return (
    <PageTransition>
      <SEOHead
        title="Top Institute for IT Training Courses in Noida – Nexxtechs"
        description="Nexxtechs is the No.1 Training Company in Noida with top-notch IT training programs and industry experts. Providing Placement, Certification and affordable fees."
        canonical="/nexxtechs-noida"
      />
      
      {/* First Section: Hero Section */}
      <NoidaHeroSection />

      {/* Rest of the standard offerings */}
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <CoursesGrid layout="marquee" />
      </Suspense>

      <div className="py-4">
        <NoidaEnquiryBanner 
          titleText="Nexxtechs" 
          highlightText="Noida"
          addressText="B-136 Upper, Ground floor, B Block, Sector 2,<br/>Noida, Uttar Pradesh 201301"
          addressLink="https://www.google.com/maps/search/B-136+Upper,+Ground+floor,+B+Block,+Sector+2,+Noida,+Uttar+Pradesh+201301" 
          defaultBranch="Nexxtechs Noida"
          buttonText="Book Free Demo"
          compact={true}
        />
      </div>
      <Suspense fallback={null}>
        <NoidaWhyChooseUs />
      </Suspense>
      <Suspense fallback={null}>
        <CareerTransformation />
      </Suspense>
      <Suspense fallback={null}>
        <NoidaPracticalTraining />
      </Suspense>
      <Suspense fallback={null}>
        <CoursePlacementStats />
      </Suspense>
      <Suspense fallback={null}>
        <NoidaWhoCanJoin />
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
        <NoidaLocation />
      </Suspense>
      <Suspense fallback={null}>
        <TrainingPartners />
      </Suspense>
      <Suspense fallback={null}>
        <TextRevealAnimation />
      </Suspense>
      <Suspense fallback={null}>
        <NoidaTestimonials />
      </Suspense>
      <Suspense fallback={null}>
        <EnquiryForm />
      </Suspense>
      <Suspense fallback={null}>
        <FAQ faqData={NOIDA_FAQ_DATA} />
      </Suspense>
    </PageTransition>
  );
}
