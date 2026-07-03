import React, { Suspense, lazy } from "react";
import PageTransition from "@/components/PageTransition";
import SEOHead from "@/components/SEOHead";
import EnquiryForm from "@/components/EnquiryForm";
import NoidaImageCarousel from "@/components/NoidaImageCarousel";

// Lazy load other components to maintain performance
const CoursesGrid = lazy(() => import("@/components/CoursesGrid"));
const CareerTransformation = lazy(() => import("@/components/CareerTransformation"));
const VideoTestimonials = lazy(() => import("@/components/VideoTestimonials"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const ComparisonSection = lazy(() => import("@/components/ComparisonSection"));
const StudentProjects = lazy(() => import("@/components/StudentProjects"));
const PlacementSuccess = lazy(() => import("@/components/PlacementSuccess"));
const TrainingPartners = lazy(() => import("@/components/TrainingPartners"));
const TextRevealAnimation = lazy(() => import("@/components/TextRevealAnimation"));
const FAQ = lazy(() => import("@/components/FAQ"));
const CoursePlacementStats = lazy(() => import("@/components/CoursePlacementStats"));

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
        title="Top IT Training Institute in Noida – Nexxtechs"
        description="Join Nexxtechs in Noida for top-notch IT training programs and industry experts. Providing Placement, Certification and affordable fees."
        canonical="/nexxtechs-noida"
      />
      
      {/* First Section: Enquiry Form */}
      <div className="pt-2">
        <EnquiryForm 
          titleText="Nexxtechs" 
          highlightText="Noida" 
          addressText="B-136 Upper, Ground floor, B Block, Sector 2,<br/>Noida, Uttar Pradesh 201301" 
          addressLink="https://www.google.com/maps/search/B-136+Upper,+Ground+floor,+B+Block,+Sector+2,+Noida,+Uttar+Pradesh+201301" 
          defaultBranch="Nexxtechs Noida"
          className="pt-6 pb-24 md:pt-10 md:pb-32 bg-transparent"
        />
      </div>

      {/* Second Section: Promotional Banner Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 mb-16 relative z-10">
        <NoidaImageCarousel />
      </div>

      {/* Rest of the standard offerings */}
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <CoursesGrid layout="marquee" />
      </Suspense>
      <Suspense fallback={null}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={null}>
        <CareerTransformation />
      </Suspense>
      <Suspense fallback={null}>
        <CoursePlacementStats />
      </Suspense>
      <Suspense fallback={null}>
        <VideoTestimonials />
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
        <TextRevealAnimation />
      </Suspense>
      <Suspense fallback={null}>
        <FAQ faqData={NOIDA_FAQ_DATA} />
      </Suspense>
    </PageTransition>
  );
}
