import { Helmet } from "react-helmet-async";

const BASE_URL = "https://www.nexxtechs.com";

/**
 * BreadcrumbSchema – Injects BreadcrumbList JSON-LD structured data.
 * 
 * @param {Array} items – Array of { name, path } objects representing the breadcrumb trail.
 *   Example: [{ name: "Courses", path: "/courses" }, { name: "DevOps", path: "/course/devops" }]
 *   Home is automatically prepended.
 */
export default function BreadcrumbSchema({ items = [] }) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL + "/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": BASE_URL + item.path
      }))
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbList)}
      </script>
    </Helmet>
  );
}
