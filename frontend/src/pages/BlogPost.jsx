import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Facebook, Twitter, Linkedin, MessageCircle, 
  Instagram, Share2, ChevronRight, User, Calendar, 
  Folder, ArrowLeft, Clock, ArrowRight, BookOpen
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import BLOG_DATA from "../data/blogData";
import COURSES_DATA from "../data/coursesData";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import { cachedFetch, API } from "../lib/apiCache";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import ResponsiveImage from "../components/ResponsiveImage";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dark } = useTheme();
  // Try cached data first, then static fallback
  const [blog, setBlog] = useState(() => {
    try {
      const cached = sessionStorage.getItem('api_cache_' + API + '/content/blogs/' + id);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.data) return parsed.data;
      }
      const blogsListCached = sessionStorage.getItem('api_cache_' + API + '/content/blogs');
      if (blogsListCached) {
        const parsedList = JSON.parse(blogsListCached);
        if (Array.isArray(parsedList.data)) {
          const found = parsedList.data.find(b => b.id === id);
          if (found) return found;
        }
      }
    } catch(e) {}
    return BLOG_DATA.find((b) => b.id === id);
  });

  const [allBlogs, setAllBlogs] = useState(() => {
    try {
      const cached = sessionStorage.getItem('api_cache_' + API + '/content/blogs');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.data)) {
          const apiIds = new Set(parsed.data.map(b => b.id));
          const staticOnly = BLOG_DATA.filter(b => !apiIds.has(b.id));
          return [...parsed.data, ...staticOnly];
        }
      }
    } catch(e) {}
    return BLOG_DATA;
  });

  const [loading, setLoading] = useState(() => !blog || !blog.content);

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    // If blog metadata or content body is missing, set loading to true
    setLoading(!blog || !blog.content);

    cachedFetch(`${API}/content/blogs/${id}`, { signal: controller.signal })
      .then(data => {
        if (data) {
          setBlog(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    cachedFetch(`${API}/content/blogs`, { signal: controller.signal })
      .then(data => {
        if (data?.length > 0) {
          const apiIds = new Set(data.map(b => b.id));
          const staticOnly = BLOG_DATA.filter(b => !apiIds.has(b.id));
          setAllBlogs([...data, ...staticOnly]);
        }
      })
      .catch(() => {});

    return () => { clearTimeout(timeout); controller.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (blog) document.title = `${blog.title} | NexxTechs Blog`;
  }, [blog]);

  if (loading && !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28">
        <SEOHead
          title="Loading Blog Post | NexxTechs Blog"
          description="Loading the latest IT career guide and tech article on NexxTechs Blog."
        />
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-[#84CC16]/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#84CC16] rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-bold text-gray-600 dark:text-gray-300 animate-pulse">Loading Blog Post...</h2>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28">
        <SEOHead
          title="Blog Post Not Found | NexxTechs Blog"
          description="The requested blog post could not be found or has been moved."
        />
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Blog post not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-center">
          The article you are looking for might have been deleted, renamed, or is temporarily unavailable.
        </p>
        <Button onClick={() => navigate("/blog/")}>Back to Blog</Button>
      </div>
    );
  }

  const socialLinks = [
    { icon: Facebook, color: "hover:bg-blue-600", name: "Facebook" },
    { icon: Twitter, color: "hover:bg-sky-500", name: "X" },
    { icon: Linkedin, color: "hover:bg-blue-700", name: "LinkedIn" },
    { icon: MessageCircle, color: "hover:bg-green-500", name: "WhatsApp" },
    { icon: Instagram, color: "hover:bg-pink-600", name: "Instagram" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent pb-20 font-sans transition-colors duration-300">
        {/* SEO Head & Breadcrumbs */}
        {blog && (
          <>
            <SEOHead
              title={`${blog.title} | NexxTechs Blog`}
              description={blog.excerpt ? blog.excerpt.substring(0, 160) : `Read ${blog.title} on NexxTechs Blog – expert guides, career tips & IT training insights.`}
              canonical={`/blog/${id}`}
              ogType="article"
              jsonLd={{
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": blog.title,
                "description": blog.excerpt,
                "image": blog.image,
                "author": { "@type": "Organization", "name": "NexxTechs" },
                "publisher": {
                  "@type": "Organization",
                  "name": "NexxTechs",
                  "url": "https://www.nexxtechs.com"
                },
                "datePublished": blog.date,
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://www.nexxtechs.com/blog/${id}`
                }
              }}
            />
            <Breadcrumbs items={[
              { name: "Blog", path: "/blog" },
              { name: blog.title, path: `/blog/${id}` }
            ]} />
          </>
        )}

        <div className="max-w-[1440px] mx-auto px-6 pt-8 md:pt-12">

          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                <span className="flex items-center gap-2"><Clock size={16} className="text-[#84CC16]" /> {blog.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/10" />
                <span className="text-gray-500 dark:text-gray-400">by {blog.author}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-10 leading-tight tracking-tight">
                {blog.title}
              </h1>

              {/* Featured Image */}
              <div className="rounded-[32px] overflow-hidden mb-12 border border-gray-100 dark:border-white/5 shadow-2xl shadow-[#84CC16]/5">
                <ResponsiveImage src={blog.image} alt={`${blog.title} - NexxTechs IT Training Blog`} className="w-full h-auto object-cover max-h-[500px]" />
              </div>

              {/* Table of Contents */}
              {(() => {
                const headingMatches = blog.content?.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
                const headings = headingMatches.map(h => h.replace(/<[^>]+>/g, ''));
                if (headings.length < 2) return null;
                return (
                  <div className="bg-[#F9FAFB] dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl p-6 mb-10">
                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                      <BookOpen size={16} className="text-[#84CC16]" /> Table of Contents
                    </h3>
                    <ol className="space-y-2">
                      {headings.map((heading, i) => (
                        <li key={i} className="text-sm text-[#4B5563] dark:text-gray-400 hover:text-[#84CC16] transition-colors">
                          <span className="text-[#84CC16] font-bold mr-2">{i + 1}.</span>
                          {heading}
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })()}

              {/* Blog Content */}
              {!blog.content ? (
                <div className="space-y-6 animate-pulse py-4">
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full w-11/12"></div>
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full w-4/5"></div>
                  <div className="space-y-3 pt-4">
                    <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-full w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full w-10/12"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full w-9/12"></div>
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-full w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full w-11/12"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full w-5/6"></div>
                  </div>
                </div>
              ) : (
                <article 
                  className={`prose prose-lg max-w-none dark:prose-invert blog-article ${dark ? 'prose-headings:text-white prose-p:text-gray-400 prose-li:text-gray-400' : 'prose-headings:text-gray-900 prose-p:text-gray-600'}`}
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              )}

              {/* Related Courses Section (Internal Linking) */}
              {(() => {
                const blogKeywords = {
                  'artificial-intelligence': ['data-science'],
                  'cyber-security': ['cyber-security'],
                  'data-science': ['data-science', 'data-analytics'],
                  'ethical-hacker': ['cyber-security'],
                  'cyber-security-tools': ['cyber-security'],
                  'cyber-security-career': ['cyber-security'],
                };
                const matchedSlugs = new Set();
                Object.entries(blogKeywords).forEach(([keyword, slugs]) => {
                  if (blog.id?.includes(keyword) || blog.title?.toLowerCase().includes(keyword.replace('-', ' '))) {
                    slugs.forEach(s => matchedSlugs.add(s));
                  }
                });
                // Always add a default if no match found
                if (matchedSlugs.size === 0) {
                  matchedSlugs.add('web-development');
                  matchedSlugs.add('devops');
                }
                const relatedCourses = COURSES_DATA.filter(c => matchedSlugs.has(c.slug)).slice(0, 3);
                
                return (
                  <div className="mt-14 pt-8 border-t border-gray-100 dark:border-white/5">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <BookOpen size={18} className="text-[#84CC16]" /> Related Courses at NexxTechs
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedCourses.map(rc => (
                        <Link key={rc.slug} to={`/course/${rc.slug}/`} className="group block bg-[#F9FAFB] dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-[#84CC16]/40 transition-all duration-300 hover:-translate-y-1">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#84CC16] transition-colors mb-2">{rc.title}</h4>
                          <p className="text-xs text-[#4B5563] dark:text-gray-400 line-clamp-2 mb-3">{rc.tagline}</p>
                          <span className="text-xs font-bold text-[#84CC16] flex items-center gap-1">
                            Explore Course <ArrowRight size={12} />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Bottom Share Section */}
              <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Share this post:</span>
                    <div className="flex items-center gap-2">
                      {socialLinks.map((social, i) => (
                        <button 
                          key={i} 
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 ${social.color} hover:text-white hover:scale-110`}
                          title={social.name}
                        >
                          <social.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Link to="/blog/" className="flex items-center gap-2 text-sm font-bold text-[#84CC16] hover:underline uppercase tracking-widest group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blogs
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              
              {/* Author Profile */}
              <div className="bg-white dark:bg-[#151515] p-8 rounded-[28px] border border-gray-100 dark:border-white/5 text-center group">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-[#84CC16] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-[#84CC16] border-2 border-[#84CC16]/20">
                    <User size={40} fill="currentColor" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">{blog.author}</h3>
                <p className="text-sm font-bold text-[#84CC16] uppercase tracking-widest mb-4">Tech Academy</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Empowering the next generation of tech professionals with industry-leading roadmaps and expert-led training.
                </p>
              </div>

              {/* Share Sidebar */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] border-b border-[#84CC16] pb-3 w-max">Share This Post</h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, i) => (
                    <button 
                      key={i} 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 bg-white dark:bg-[#151515] border border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400 ${social.color} hover:text-white hover:scale-105 shadow-sm`}
                    >
                      <social.icon size={20} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Our Blogs List */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] border-b border-[#84CC16] pb-3 w-max">Our Blogs</h4>
                <div className="space-y-4">
                  {allBlogs.filter(b => b.id !== blog.id).slice(0, 3).map((item) => (
                    <Link key={item.id} to={`/blog/${item.id}/`} className="group block">
                      <div className="flex gap-4 items-start">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-100 dark:border-white/5">
                          <ResponsiveImage src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" pexelsOptions={{ w: 200 }} />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-sm font-bold text-gray-900 dark:text-white leading-tight group-hover:text-[#84CC16] transition-colors line-clamp-2">
                            {item.title}
                          </h5>
                          <span className="text-[10px] text-gray-400 font-bold uppercase mt-2 block">{item.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Archive */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] border-b border-[#84CC16] pb-3 w-max">Archive</h4>
                <div className="relative group">
                   <select className={`w-full appearance-none px-4 py-3 rounded-xl border outline-none transition-all duration-300 ${dark ? 'bg-[#151515] border-white/5 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                      <option>All dates</option>
                      <option>February 2026</option>
                      <option>March 2026</option>
                      <option>April 2026</option>
                   </select>
                   <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                </div>
              </div>

            </aside>

          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-article h2 { font-weight: 900; margin-top: 2.5rem; margin-bottom: 1.5rem; font-size: 1.875rem; letter-spacing: -0.025em; }
        .blog-article h3 { font-weight: 800; margin-top: 2rem; margin-bottom: 1rem; font-size: 1.5rem; }
        .blog-article p { margin-bottom: 1.5rem; line-height: 1.8; }
        .blog-article ul, .blog-article ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .blog-article li { margin-bottom: 0.5rem; }
        .blog-article blockquote { border-left: 4px solid #84CC16; padding-left: 1.5rem; font-style: italic; margin: 2rem 0; background: #84CC1610; padding: 1.5rem; border-radius: 0 1rem 1rem 0; }
        .blog-article strong { color: #84CC16; }
      `}} />
    </PageTransition>
  );
}
