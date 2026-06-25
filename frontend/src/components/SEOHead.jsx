import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_NAME = "NexxTechs";
const BASE_URL = "https://www.nexxtechs.com";
const DEFAULT_OG_IMAGE = "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/o9ol4rh4_white.png";

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

  // Instant direct DOM updates to support SPA navigations without requiring a browser reload
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      descTag.setAttribute('data-rh', 'true');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', description);
  }, [title, description]);

  useEffect(() => {
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      canonicalTag.setAttribute('data-rh', 'true');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullUrl);
  }, [fullUrl]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
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
