import CoursesGrid from "../components/CoursesGrid";
import PageTransition from "../components/PageTransition";
import TrainingPartners from "../components/TrainingPartners";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import COURSES_DATA from "../data/coursesData";

export default function CoursesPage() {
  // ItemList schema for Google to understand our course catalog
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "IT Training Courses at NexxTechs",
    "description": "Explore 50+ industry-focused IT training courses at NexxTechs Vikaspuri Delhi",
    "numberOfItems": COURSES_DATA.length,
    "itemListElement": COURSES_DATA.map((course, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": course.title,
      "url": `https://www.nexxtechs.com/course/${course.slug}`,
      "item": {
        "@type": "Course",
        "name": course.title,
        "description": course.tagline,
        "url": `https://www.nexxtechs.com/course/${course.slug}`,
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
          "url": `https://www.nexxtechs.com/course/${course.slug}`
        }
      }
    }))
  };

  return (
    <PageTransition>
      <SEOHead
        title="IT Training Courses in Delhi | Cloud & DevOps | NexxTechs"
        description="Explore 50+ IT training courses at NexxTechs Delhi. Master DevOps, Cloud, Data Science & more with placement support. Enroll today!"
        canonical="/courses"
        jsonLd={itemListSchema}
      />
      <Breadcrumbs items={[{ name: "Courses", path: "/courses" }]} />
      <div className="min-h-screen">
        <h1 className="sr-only">IT Training Courses at NexxTechs</h1>
        <CoursesGrid />
        <TrainingPartners />
      </div>
    </PageTransition>
  );
}
