import CoursesGrid from "../components/CoursesGrid";
import PageTransition from "../components/PageTransition";
import TrainingPartners from "../components/TrainingPartners";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import COURSES_DATA from "../data/coursesData";

export default function CoursesPageNoida() {
  // ItemList schema for Google to understand our course catalog
  const baseCourses = COURSES_DATA.filter(c => !c.slug.endsWith('-noida'));
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "IT Training Courses at NexxTechs Noida",
    "description": "Explore 50+ industry-focused IT training courses at NexxTechs Sector 2 Noida",
    "numberOfItems": baseCourses.length,
    "itemListElement": baseCourses.map((course, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": course.title + " in Noida",
      "url": `https://www.nexxtechs.com/course/${course.slug}-noida`,
      "item": {
        "@type": "Course",
        "name": course.title + " in Noida",
        "description": course.tagline ? course.tagline.replace(/Delhi/g, "Noida") : "Professional IT training course in Noida",
        "url": `https://www.nexxtechs.com/course/${course.slug}-noida`,
        "provider": {
          "@type": "Organization",
          "name": "NexxTechs Noida",
          "sameAs": "https://www.nexxtechs.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "B-136 Upper, Ground floor, B Block, Sector 2",
            "addressLocality": "Noida",
            "postalCode": "201301",
            "addressCountry": "IN"
          }
        },
        "timeRequired": course.duration,
        "educationalLevel": course.level,
        "offers": {
          "@type": "Offer",
          "category": "Fee-based",
          "priceCurrency": "INR",
          "price": "0",
          "url": `https://www.nexxtechs.com/course/${course.slug}-noida`
        }
      }
    }))
  };

  return (
    <PageTransition>
      <SEOHead
        title="Top IT Training Courses in Noida Sector 2 | NexxTechs"
        description="Browse 50+ industry-focused IT training courses at NexxTechs Noida Sector 2. Master Web Dev, Data Science, Cyber Security & AI with live projects. Enroll today!"
        canonical="/courses-noida"
        jsonLd={itemListSchema}
      />
      <Breadcrumbs items={[
        { name: "Nexxtechs Noida", path: "/nexxtechs-noida" },
        { name: "Courses", path: "/courses-noida" }
      ]} />
      <div className="min-h-screen">
        <h1 className="sr-only">IT Training Courses at NexxTechs Noida</h1>
        <CoursesGrid />
        <TrainingPartners />
      </div>
    </PageTransition>
  );
}
