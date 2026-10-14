import CoursesGrid from "../components/CoursesGrid";
import PageTransition from "../components/PageTransition";
import TrainingPartners from "../components/TrainingPartners";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import COURSES_DATA from "../data/coursesData";

export default function CoursesPage() {
  // ItemList schema for Google to understand our course catalog
  const baseCourses = COURSES_DATA.filter(c => !c.slug.endsWith('-noida'));
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "IT Training Courses at NexxTechs",
    "description": "Explore 50+ industry-focused IT training courses at NexxTechs Vikaspuri Delhi",
    "numberOfItems": baseCourses.length,
    "itemListElement": baseCourses.map((course, index) => ({
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
        title="Top IT Training Courses in Vikaspuri & Janakpuri, Delhi | NexxTechs"
        description="Browse industry-focused IT training courses at NexxTechs Vikaspuri & Janakpuri, Delhi. Master Web Dev, Data Science, Cyber Security & AI with live projects. Enroll today!"
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
