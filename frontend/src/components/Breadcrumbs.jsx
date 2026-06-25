import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const BASE_URL = "https://www.nexxtechs.com";

/**
 * Breadcrumbs – Renders a visible breadcrumb navigation bar with BreadcrumbList JSON-LD.
 * Google strongly prefers VISIBLE breadcrumbs over hidden schema-only breadcrumbs.
 * 
 * @param {Array} items – Array of { name, path } objects representing the breadcrumb trail.
 *   Example: [{ name: "Courses", path: "/courses" }, { name: "DevOps", path: "/course/devops" }]
 *   Home is automatically prepended.
 */
export default function Breadcrumbs({ items = [] }) {
  const location = useLocation();

  // Don't render breadcrumbs on the homepage
  if (location.pathname === "/" || items.length === 0) return null;

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
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbList)}
        </script>
      </Helmet>

      <nav
        aria-label="Breadcrumb"
        className="w-full bg-gray-50/50 dark:bg-black/30 backdrop-blur-sm border-b border-gray-200 dark:border-white/5"
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 py-2.5">
          <ol className="flex items-center gap-1.5 text-xs md:text-sm flex-wrap">
            {/* Home */}
            <li className="flex items-center gap-1.5">
              <Link
                to="/"
                className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-[#84CC16] dark:hover:text-[#84CC16] transition-colors"
              >
                <Home size={13} className="shrink-0" />
                <span>Home</span>
              </Link>
            </li>

            {/* Separator + Items */}
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-gray-400 dark:text-gray-600 shrink-0" />
                  {isLast ? (
                    <span className="text-[#84CC16] font-medium truncate max-w-[200px] md:max-w-none">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-gray-500 dark:text-gray-400 hover:text-[#84CC16] dark:hover:text-[#84CC16] transition-colors truncate max-w-[200px] md:max-w-none"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
