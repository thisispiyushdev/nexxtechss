import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_NAME = "NexxTechs";
const BASE_URL = "https://www.nexxtechs.com";
const DEFAULT_OG_IMAGE = "/assets/logo_white.webp";

/**
 * SEOHead – Reusable component for per-page SEO meta tags.
 */
export default function SEOHead({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd = null,
  keywords = null,
}) {
  const location = useLocation();

  // Automatically resolve the path: use the explicitly provided canonical prop if available,
  // otherwise fallback to the current pathname from React Router.
  const activePath = canonical !== undefined ? canonical : location.pathname;

  // Enforce trailing slash normalization to match standard static host behavior
  const normalizedCanonical = activePath.endsWith("/") ? activePath : `${activePath}/`;

  const fullUrl = `${BASE_URL}${normalizedCanonical}`;

  // Rely on react-helmet-async for SEO tags to prevent duplication

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data - Page Specific */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}

      {/* JSON-LD Structured Data - Global Organization & LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "EducationalOrganization",
              "name": "NexxTechs",
              "url": "https://www.nexxtechs.com",
              "logo": "https://www.nexxtechs.com/logo.jpeg",
              "description": location.pathname.includes('noida') 
                ? "Noida's leading IT training institute offering Cloud Computing, DevOps, Full Stack Development, Data Science, Cyber Security and more."
                : "Delhi's leading IT training institute offering Cloud Computing, DevOps, Full Stack Development, Data Science, Cyber Security and more.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": location.pathname.includes('noida') ? "B-136 Upper, Ground floor, B Block, Sector 2" : "B-54 Krishna Park",
                "addressLocality": location.pathname.includes('noida') ? "Noida" : "Vikaspuri",
                "addressRegion": location.pathname.includes('noida') ? "Uttar Pradesh" : "New Delhi",
                "postalCode": location.pathname.includes('noida') ? "201301" : "110018",
                "addressCountry": "IN"
              },
              "telephone": location.pathname.includes('noida') ? "+919217179764" : "+919217179762",
              "email": "info@nexxtechs.com",
              "sameAs": [
                "https://www.instagram.com/nexxtechs.institute",
                "https://www.linkedin.com/company/nexxtechs-private-limited/"
              ]
            },
            {
              "@type": "LocalBusiness",
              "name": "NexxTechs",
              "image": "https://www.nexxtechs.com/logo.jpeg",
              "description": location.pathname.includes('noida')
                ? "Best IT Training Institute in Noida offering DevOps, Cloud Computing, Full Stack Development, Data Science, Cyber Security courses with 95% placement rate."
                : "Best IT Training Institute in Vikaspuri, Delhi offering DevOps, Cloud Computing, Full Stack Development, Data Science, Cyber Security courses with 95% placement rate.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": location.pathname.includes('noida') ? "B-136 Upper, Ground floor, B Block, Sector 2" : "B-54 Krishna Park",
                "addressLocality": location.pathname.includes('noida') ? "Noida" : "Vikaspuri",
                "addressRegion": location.pathname.includes('noida') ? "Uttar Pradesh" : "New Delhi",
                "postalCode": location.pathname.includes('noida') ? "201301" : "110018",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": location.pathname.includes('noida') ? "28.5833" : "28.6417",
                "longitude": location.pathname.includes('noida') ? "77.3167" : "77.0684"
              },
              "telephone": location.pathname.includes('noida') ? "+919217179764" : "+919217179762",
              "email": "info@nexxtechs.com",
              "url": "https://www.nexxtechs.com",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "09:00",
                "closes": "19:00"
              },
              "priceRange": "₹₹",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "312",
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          ]
        })}
      </script>
    </Helmet>
  );
}
