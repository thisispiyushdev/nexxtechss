import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import EnquiryForm from "../components/EnquiryForm";
import topTrainersData from "../data/topTrainersData";
import { useTheme } from "../context/ThemeContext";

export default function TopTrainersPage() {
  const location = useLocation();
  const { dark } = useTheme();
  
  // Extract the slug from the URL (e.g., "/top-5-cloud-computing-trainers-in-india/" -> "top-5-cloud-computing-trainers-in-india")
  const fullSlug = location.pathname.replace(/^\/+|\/+$/g, '');
  const pageData = topTrainersData[fullSlug];

  if (!pageData) {
    // If someone visits an invalid topic, redirect to homepage or 404
    return <Navigate to="/" replace />;
  }

  const category = pageData.title.replace("Top 5 Best ", "").replace(" Trainers in India", "");

  const extractCity = (locationStr, idx = 0) => {
    const techCities = ["Bangalore", "Pune", "Hyderabad", "Mumbai", "Chennai", "Gurgaon"];
    const fallbackCity = techCities[idx % techCities.length];
    
    if (!locationStr) return fallbackCity;
    const loc = locationStr.toLowerCase();
    if (loc.includes('delhi') || loc.includes('nexxtechs')) return 'Delhi';
    if (loc.includes('bangalore') || loc.includes('bengaluru')) return 'Bangalore';
    if (loc.includes('mumbai')) return 'Mumbai';
    if (loc.includes('gurgaon') || loc.includes('gurugram')) return 'Gurgaon';
    if (loc.includes('hyderabad')) return 'Hyderabad';
    if (loc.includes('pune')) return 'Pune';
    if (loc.includes('chennai')) return 'Chennai';
    if (loc.includes('noida')) return 'Noida';
    
    let result = fallbackCity;
    const match = locationStr.match(/\((.*?)\)/);
    if (match) {
      const parts = match[1].split(',');
      result = parts[parts.length - 1].trim();
    }
    
    if (result.toLowerCase() === 'india' || result.trim() === '') {
      return fallbackCity;
    }
    return result;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent pb-20 font-sans transition-colors duration-300">
        <SEOHead
          title={pageData.metaTitle}
          description={pageData.metaDescription}
        />
        
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: pageData.title, path: `/${fullSlug}` }]} />
        
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {pageData.title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {pageData.intro}
            </p>
          </header>

          {/* Trainers List - Simple Blog Style */}
          <div className="space-y-12 mb-16">
            {pageData.trainers.map((trainer, index) => (
              <section key={index} className="prose prose-lg max-w-none dark:prose-invert">
                <div className="mt-8 mb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {index + 1}. {trainer.name} <span className="font-semibold text-gray-700 dark:text-gray-300">(Best {category} Trainer in {extractCity(trainer.location, index)})</span>
                  </h2>
                  <p className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 flex flex-wrap gap-x-4 gap-y-2">
                    <span>Location: {trainer.location}</span>
                    {trainer.experience && (
                      <span className="text-[#84CC16]">| Experience: {trainer.experience}</span>
                    )}
                  </p>
                </div>
                
                {index === 0 && trainer.image && (
                  <img 
                    src={trainer.image} 
                    alt={`${trainer.name} - Top Trainer in ${trainer.location}`} 
                    className="w-full h-auto rounded-lg shadow-sm mb-6 bg-gray-200 dark:bg-white/5"
                    fetchPriority="high"
                    loading="eager"
                    decoding="sync"
                  />
                 )}
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                  {trainer.description}
                </p>
              </section>
            ))}
          </div>

          {/* FAQs - Simple List */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-6">
              {pageData.faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-8 mb-12">
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              <span className="text-gray-600 dark:text-gray-400 mr-1">Tagged</span>
              {pageData.tags.map((tag, index) => {
                const t = tag.toLowerCase();
                let url = "/courses";
                if (t.includes("top") || t.includes("best trainer") || t.includes("expert") || t.includes("in india")) url = `/${fullSlug}`;
                else if (t.includes("placement") || t.includes("job") || t.includes("salary")) url = "/placement";
                else if (t.includes("roadmap") || t.includes("career") || t.includes("path")) url = "/roadmap";
                else if (fullSlug.includes("cloud")) url = "/course/cloud-computing";
                else if (fullSlug.includes("devops")) url = "/course/devops";
                else if (fullSlug.includes("digital-marketing")) url = "/course/digital-marketing";
                else if (fullSlug.includes("cyber-security")) url = "/course/cyber-security";
                else if (fullSlug.includes("graphic-design")) url = "/course/graphic-design";
                else if (fullSlug.includes("data-science")) url = "/course/data-science";

                return (
                  <React.Fragment key={index}>
                    <a 
                      href={url}
                      className="text-[#c22757] dark:text-[#e83e8c] underline hover:text-[#9e1657] dark:hover:text-[#ff6baf] transition-colors"
                    >
                      {t}
                    </a>
                    {index < pageData.tags.length - 1 && ", "}
                  </React.Fragment>
                );
              })}
            </p>
          </div>

          {/* Related Articles / Other Modules */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-12 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Explore Other Training Modules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(topTrainersData).filter(key => key !== fullSlug).map((key) => (
                <a 
                  key={key} 
                  href={`/${key}`} 
                  className="p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#84CC16] dark:hover:border-[#84CC16] bg-gray-50 dark:bg-white/5 hover:bg-[#84CC16]/5 transition-colors group flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#84CC16] transition-colors">
                    {topTrainersData[key].title}
                  </span>
                  <span className="text-[#84CC16] font-bold ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </article>

        {/* Enquiry Form Section */}
        <EnquiryForm />

      </div>
    </PageTransition>
  );
}
