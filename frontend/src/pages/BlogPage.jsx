import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Folder, Calendar, User, ArrowRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import BLOG_DATA from "../data/blogData";
import { useTheme } from "../context/ThemeContext";
import { cachedFetch, API } from "../lib/apiCache";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";

export default function BlogPage() {
  const { dark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState(BLOG_DATA);

  useEffect(() => {
    document.title = "Tech Blog | DevOps, AI, Cyber Security Guides | NexxTechs";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    cachedFetch(`${API}/content/blogs`, { signal: controller.signal })
      .then(data => {
        if (data?.length > 0) {
          const apiIds = new Set(data.map(b => b.id));
          const staticOnly = BLOG_DATA.filter(b => !apiIds.has(b.id));
          setBlogs([...data, ...staticOnly]);
        }
      })
      .catch(() => {});

    return () => { clearTimeout(timeout); controller.abort(); };
  }, []);

  const categories = ["All", "Our blog"];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent pb-20 font-sans transition-colors duration-300">
        <SEOHead
          title="Tech Blog & Industry Guides | NexxTechs IT Training"
          description="Read expert guides on DevOps, AI, and Cyber Security. Career tips and industry insights from NexxTechs IT Training Delhi."
          canonical="/blog"
        />
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
        <div className="max-w-[1440px] mx-auto px-6 pt-8 md:pt-12">
          {/* Page H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 text-center">
            Tech Blog & <span className="text-[#84CC16]">Guides</span>
          </h1>
          <p className="text-base text-[#4B5563] dark:text-gray-400 max-w-2xl mx-auto text-center mb-10">
            Expert insights, career roadmaps, and industry guides from NexxTechs IT Training Institute Vikaspuri Delhi
          </p>
          
          {/* Filters and Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-100 dark:border-white/5 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Blogs:</span>
              <div className="flex flex-wrap items-center gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm font-bold transition-all duration-300 relative py-1 ${
                      activeCategory === cat 
                        ? "text-gray-900 dark:text-white" 
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#84CC16] rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#84CC16] transition-colors duration-300" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 outline-none focus:ring-2 focus:ring-[#84CC16]/20 ${
                  dark 
                    ? "bg-[#1A1A1A] border-white/5 text-white focus:border-[#84CC16]/50" 
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84CC16]"
                }`}
              />
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link 
                key={blog.id} 
                to={`/blog/${blog.id}/`}
                className="group flex flex-col bg-white dark:bg-[#151515] rounded-[24px] overflow-hidden border border-gray-100 dark:border-white/5 hover:border-[#84CC16]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#84CC16]/10"
              >
                {/* Image Area */}
                <div className="relative h-56 overflow-hidden bg-black">
                  <img 
                    src={blog.image} 
                    alt={`${blog.title} - NexxTechs IT Training Blog Delhi`} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                    loading="lazy"
                  />
                  {/* Author on Image */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#84CC16] flex items-center justify-center text-black">
                      <User size={14} fill="currentColor" />
                    </div>
                    <span className="text-white text-xs font-bold tracking-wide drop-shadow-md">{blog.author}</span>
                  </div>
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-[#84CC16] transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#84CC16] uppercase tracking-wider">
                      <Folder size={12} className="fill-[#84CC16]/20" />
                      <span>{blog.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No blogs found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try searching with different keywords or categories.</p>
            </div>
          )}


        </div>
      </div>
    </PageTransition>
  );
}
