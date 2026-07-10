import React, { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import topTrainersData from "../data/topTrainersData";

export default function TagPage() {
  const { tagSlug } = useParams();

  // Find all posts that contain the tag
  const matchingPosts = useMemo(() => {
    if (!tagSlug) return [];
    const results = [];
    
    // We reverse engineer the slug back to matching logic.
    // Since tags are arbitrary strings, we will slugify each tag in our data
    // and see if it matches the current tagSlug.
    Object.keys(topTrainersData).forEach(slug => {
      const data = topTrainersData[slug];
      const hasTag = data.tags.some(t => {
        const tSlug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        return tSlug === tagSlug;
      });

      if (hasTag) {
        // Find the actual tag name for display purposes (take the first match)
        const actualTag = data.tags.find(t => {
          const tSlug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          return tSlug === tagSlug;
        });

        results.push({
          postSlug: slug,
          postData: data,
          actualTag: actualTag
        });
      }
    });
    
    return results;
  }, [tagSlug]);

  if (!tagSlug) {
    return <Navigate to="/" replace />;
  }

  const displayTagName = matchingPosts.length > 0 ? matchingPosts[0].actualTag : tagSlug.replace(/-/g, ' ');

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent pb-20 font-sans transition-colors duration-300">
        <SEOHead
          title={`${displayTagName} - Tag Archive | Nexxtechs`}
          description={`Browse all training programs and articles tagged with ${displayTagName}.`}
        />
        
        <Breadcrumbs items={[{ name: `Tag: ${displayTagName}`, path: `/tag/${tagSlug}` }]} />
        
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12">
          {/* Header */}
          <header className="mb-10 border-b border-gray-200 dark:border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Tag: {displayTagName}
            </h1>
          </header>

          {/* Posts List */}
          {matchingPosts.length > 0 ? (
            <div className="space-y-16 mb-16">
              {matchingPosts.map(({ postSlug, postData }) => {
                // Determine a featured image (first trainer's image or fallback)
                const featuredImage = postData.trainers && postData.trainers[0] && postData.trainers[0].image 
                  ? postData.trainers[0].image 
                  : "/assets/logo_white.webp";
                
                return (
                  <section key={postSlug} className="max-w-4xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#c22757] dark:text-[#e83e8c] hover:text-[#9e1657] dark:hover:text-[#ff6baf] transition-colors mb-4 mt-0">
                      <Link to={`/${postSlug}`} className="no-underline text-inherit">
                        {postData.title}
                      </Link>
                    </h2>
                    
                    <div className="relative mb-6 group overflow-hidden rounded-lg shadow-sm bg-gray-200 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                      <Link to={`/${postSlug}`}>
                        <img 
                          src={featuredImage} 
                          alt={postData.title} 
                          className="w-full h-auto object-cover max-h-[400px] transition-transform duration-500 group-hover:scale-105 my-0"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                      {postData.intro.substring(0, 300)}...
                    </p>
                    <Link to={`/${postSlug}`} className="inline-block mt-4 text-[#84CC16] font-semibold hover:underline">
                      Read more &raquo;
                    </Link>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="py-12">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">No results found for tag "{displayTagName}"</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">It seems we can't find any articles matching this tag. Try exploring our other courses or trainers.</p>
              <Link to="/courses" className="px-6 py-3 bg-[#84CC16] text-white font-bold rounded-lg hover:bg-[#65a30d] transition-colors">
                Explore Courses
              </Link>
            </div>
          )}
        </article>
      </div>
    </PageTransition>
  );
}
