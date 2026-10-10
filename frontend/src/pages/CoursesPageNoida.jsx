import CoursesGrid from "../components/CoursesGrid";
import PageTransition from "../components/PageTransition";
import TrainingPartners from "../components/TrainingPartners";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import COURSES_DATA from "../data/coursesData";

export default function CoursesPageNoida() {
  // ItemList schema for Google to understand our course catalog
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "IT Training Courses at NexxTechs Noida",
    "description": "Explore 50+ industry-focused IT training courses at NexxTechs Sector 2 Noida",
    "numberOfItems": COURSES_DATA.length,
    "itemListElement": COURSES_DATA.map((course, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": course.title + " in Noida",
      "url": `https://www.nexxtechs.com/course/${course.slug}-noida`,
      "item": {
        "@type": "Course",
        "name": course.title + " in Noida",
        "description": course.tagline,
        "url": `https://www.nexxtechs.com/course/${course.slug}-noida`,
        "provider": {
          "@type": "Organization",
          "name": "NexxTechs",
          "sameAs": "https://www.nexxtechs.com"
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
        title="Explore Top IT & Tech Courses in Noida | NexxTechs"
        description="Browse 50+ industry-focused IT training courses at NexxTechs Sector 2, Noida. Master Web Dev, Data Science, Cyber Security & AI with live projects. Enroll today!"
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
