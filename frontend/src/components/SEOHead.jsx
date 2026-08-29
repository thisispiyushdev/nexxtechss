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

  // Enforce trailing slash normalization (except for the root homepage path)
  const normalizedCanonical = activePath === "/" 
    ? "/" 
    : (activePath.endsWith("/") ? activePath : `${activePath}/`);

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

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
