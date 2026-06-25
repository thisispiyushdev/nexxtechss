/**
 * prerender-meta.js
 * 
 * Generates per-route index.html files with unique <title>, <meta description>,
 * and <link rel="canonical"> tags so that Google sees unique content for each page.
 * 
 * This runs after `craco build` and does NOT require a headless browser.
 * It simply copies the built index.html and rewrites the meta tags for each route.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const BUILD_DIR = path.join(__dirname, "build");
const BASE_URL = "https://www.nexxtechs.com";

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", (err) => reject(err));
  });
}

// Define unique SEO metadata for every route
const ROUTES = [
  {
    path: "/",
    title: "Top Institute for IT Training Courses in Delhi – Nexxtechs",
    description: "Nexxtechs is the No.1 Training Company in Delhi with top-notch IT training programs and industry experts. Providing Placement, Certification and affordable fees.",
  },
  {
    path: "/courses",
    title: "Explore Top IT & Tech Courses in Delhi | NexxTechs",
    description: "Browse 50+ industry-focused IT training courses at NexxTechs Vikaspuri. Master Web Dev, Data Science, Cyber Security & AI with live projects. Enroll today!",
  },
  {
    path: "/placement",
    title: "Placement Success – 95% Placement Rate | NexxTechs",
    description: "Discover NexxTechs placement success stories. Over 5000+ students placed at top MNCs with a 95% placement rate. Check our reviews and top salary packages.",
  },
  {
    path: "/blog",
    title: "Tech Blog: AI, Cyber Security & Data Science Guide",
    description: "Read expert guides on Artificial Intelligence, Cyber Security, Data Science, and DevOps. Get top IT career insights from NexxTechs industry mentors today.",
  },
  {
    path: "/roadmap",
    title: "Career Roadmaps for IT & Tech Careers | NexxTechs",
    description: "Follow our step-by-step career roadmaps for Data Science, DevOps, Full Stack, and Cyber Security. Plan your tech career successfully with NexxTechs Delhi.",
  },
  {
    path: "/cyberhooks",
    title: "CyberHooks Partnership – Cyber Security & AI Training",
    description: "Explore NexxTechs strategic partnership with CyberHooks for advanced Cyber Security, Ethical Hacking, and AI courses. Get industry-certified in Delhi now.",
  },
  {
    path: "/career-guidance",
    title: "Free IT Career Guidance & Counseling | NexxTechs",
    description: "Get free IT career counseling from NexxTechs experts. Receive personalized guidance to choose the right tech course and accelerate your career in New Delhi.",
  },
  {
    path: "/contact",
    title: "Contact Us – NexxTechs IT Training Vikaspuri Delhi",
    description: "Contact NexxTechs for course inquiries, free counseling, and enrollment. Visit us at B-54 Krishna Park, Vikaspuri, New Delhi 110018 or call +91 9217179762.",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Nexxtechs IT Training Institute",
    description: "Read the NexxTechs privacy policy to understand how we collect, use, and protect your personal data and information while you browse our training website.",
  },
  {
    path: "/admin",
    title: "Admin Portal | NexxTechs IT Training Institute",
    description: "Secure administrative access portal for NexxTechs IT Training Institute staff and management. Please log in with your authorized credentials to continue.",
  },
  // Course detail pages
  {
    path: "/course/data-analytics",
    title: "Top Data Analytics Course in Delhi | NexxTechs",
    description: "Join NexxTechs Data Analytics Course in Delhi and learn Excel, SQL, Power BI & analytics skills through practical training.",
  },
  {
    path: "/course/data-science",
    title: "Master Data Science & GenAI Course in Delhi | NexxTechs",
    description: "Master Data Science, Machine Learning & Generative AI with practical training at NexxTechs, Delhi. Learn with real-world projects.",
  },
  {
    path: "/course/cloud-computing",
    title: "Cloud Computing Course in Delhi | NexxTechs",
    description: "Learn AWS, Azure & GCP with hands-on training at NexxTechs. Build cloud computing skills with real-time projects in Delhi.",
  },
  {
    path: "/course/cyber-security",
    title: "Best Cyber Security Course in Delhi | NexxTechs",
    description: "Master ethical hacking, network security & cyber defense with NexxTechs Cyber Security course in Delhi. Practical learning included.",
  },
  {
    path: "/course/devops",
    title: "DevOps Engineering Course in Delhi | NexxTechs",
    description: "Learn Docker, Kubernetes, Jenkins & CI/CD tools with practical DevOps training at NexxTechs in Delhi. Build industry-ready skills.",
  },
  {
    path: "/course/dsa",
    title: "DSA Course in Python & C++ | NexxTechs",
    description: "Master Data Structures & Algorithms in Python and C++ for coding interviews, placements & FAANG preparation at NexxTechs.",
  },
  {
    path: "/course/python-full-stack",
    title: "Best Full-Stack Web Development training institute in Delhi",
    description: "Join the best Full Stack Web Development training institute in Delhi at Nexxtechs. Learn MERN, frontend, backend & live projects.",
  },
  {
    path: "/course/web-development",
    title: "Full Stack Web Development Course | NexxTechs",
    description: "Become a Full Stack Web Developer with practical frontend & backend training at NexxTechs. Learn MERN with live projects.",
  },
  {
    path: "/course/ui-ux-design",
    title: "Best UI/UX Design Course in Delhi | NexxTechs",
    description: "Learn UI/UX design, wireframing, prototyping & Figma tools at NexxTechs. Build creative design skills with practical projects.",
  },
  {
    path: "/course/graphic-design",
    title: "Best Graphic Design Course in Delhi | NexxTechs",
    description: "Master Photoshop, Illustrator & CorelDRAW with NexxTechs Graphic Design training in Delhi. Learn through live creative projects.",
  },
  {
    path: "/course/digital-marketing",
    title: "Digital Marketing Course in Delhi | NexxTechs",
    description: "Learn SEO, Google Ads, Meta Ads & social media marketing with practical Digital Marketing training at NexxTechs Delhi.",
  },
  {
    path: "/course/java-full-stack",
    title: "Best Java Full Stack Course in Delhi | Nexxtechs",
    description: "Join the best Java Full Stack Development Course in Delhi at Nexxtechs. Learn Java, Spring Boot, React & projects in just 6 months.",
  },
  {
    path: "/course/sap-masterclass",
    title: "SAP Course in Delhi (FICO, MM & S/4HANA)",
    description: "Join SAP training at NexxTechs and learn FICO, MM & S/4HANA modules with practical sessions and industry-focused projects.",
  },
  {
    path: "/course/mern-stack",
    title: "MERN Stack Development Course in Delhi | NexxTechs",
    description: "Learn MongoDB, Express, React & Node.js with live projects at NexxTechs. Join the best MERN Stack Development Course in Delhi.",
  },
  {
    path: "/course/dsa-with-java",
    title: "Best DSA with Java Course | NexxTechs",
    description: "Learn Data Structures & Algorithms with Java at NexxTechs. Prepare for technical interviews with coding practice & projects.",
  },
  // Blog posts
  {
    path: "/blog/what-is-artificial-intelligence",
    title: "What is Artificial Intelligence? A 2026 Guide | NexxTechs",
    description: "Learn what Artificial Intelligence is, how it works, its various types, applications, and career opportunities. Read this beginner-friendly guide by NexxTechs.",
  },
  {
    path: "/blog/what-is-cyber-security",
    title: "What is Cyber Security? Complete 2026 Guide | NexxTechs",
    description: "Understand core cyber security fundamentals, major threats, career paths, and essential skills. Read this expert guide by NexxTechs IT training institute.",
  },
  {
    path: "/blog/what-is-data-science",
    title: "What is Data Science? The Ultimate 2026 Guide | NexxTechs",
    description: "Learn what Data Science is, key skills required, latest career opportunities, and how to get started today. Read this comprehensive guide by NexxTechs experts.",
  },
  {
    path: "/blog/how-to-become-an-ethical-hacker",
    title: "How to Become an Ethical Hacker in 2026 | Step-by-Step",
    description: "A complete roadmap to becoming an ethical hacker. Learn about the required skills, certifications like CEH, essential tools, and career opportunities in India.",
  },
  {
    path: "/blog/top-10-cyber-security-tools",
    title: "Top 10 Cyber Security Tools Every Professional Must Know",
    description: "Discover the top 10 essential cyber security tools including Kali Linux, Metasploit, Burp Suite, and Wireshark. Get expert recommendations by NexxTechs now.",
  },
  {
    path: "/blog/cyber-security-career-in-india",
    title: "Cyber Security Career in India – Scope & Salary in 2026",
    description: "Explore lucrative cyber security career opportunities in India. Learn about salary packages, top job roles, required skills, and a complete career roadmap.",
  },
];

async function prerenderRoutes() {
  // Fetch dynamic blogs from API and append to ROUTES
  try {
    const dbBlogs = await fetchJson("https://nexxtech-oi8e.vercel.app/api/content/blogs");
    if (Array.isArray(dbBlogs)) {
      dbBlogs.forEach(blog => {
        const path = `/blog/${blog.id}`;
        if (!ROUTES.some(r => r.path === path)) {
          ROUTES.push({
            path: path,
            title: `${blog.title} | NexxTechs Blog`,
            description: blog.excerpt ? blog.excerpt.substring(0, 160) : `Read ${blog.title} on NexxTechs Blog – expert guides, career tips & IT training insights.`
          });
        }
      });
      console.log(`Loaded ${dbBlogs.length} dynamic blogs from database.`);
    }
  } catch (e) {
    console.log("⚠️ Could not load dynamic blogs, using static list:", e.message);
  }

  // Fetch dynamic courses from API and append to ROUTES
  try {
    const dbCourses = await fetchJson("https://nexxtech-oi8e.vercel.app/api/content/courses");
    if (Array.isArray(dbCourses)) {
      dbCourses.forEach(course => {
        const path = `/course/${course.slug}`;
        if (!ROUTES.some(r => r.path === path)) {
          ROUTES.push({
            path: path,
            title: `${course.title} Course in Delhi | NexxTechs Vikaspuri`,
            description: `Learn ${course.title} at NexxTechs Vikaspuri Delhi. Course with 100% placement assistance, real-world projects & industry certification.`
          });
        }
      });
      console.log(`Loaded ${dbCourses.length} dynamic courses from database.`);
    }
  } catch (e) {
    console.log("⚠️ Could not load dynamic courses, using static list:", e.message);
  }

  const indexHtmlPath = path.join(BUILD_DIR, "index.html");

  if (!fs.existsSync(indexHtmlPath)) {
    console.error("❌ build/index.html not found. Run 'craco build' first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, "utf-8");
  
  // Save clean fallback HTML for non-pre-rendered dynamic routes
  const fallbackHtmlPath = path.join(BUILD_DIR, "index_fallback.html");
  fs.writeFileSync(fallbackHtmlPath, baseHtml, "utf-8");
  console.log("✅ Saved clean fallback HTML to index_fallback.html");

  let created = 0;

  for (const route of ROUTES) {
    let html = baseHtml;

    const normalizedPath = route.path === "/" ? "/" : `${route.path}/`;

    const seoTags = `
      <title data-rh="true">${route.title}</title>
      <meta data-rh="true" name="description" content="${route.description}" />
      <link data-rh="true" rel="canonical" href="${BASE_URL}${normalizedPath}" />
      <meta data-rh="true" property="og:url" content="${BASE_URL}${normalizedPath}" />
      <meta data-rh="true" property="og:title" content="${route.title}" />
      <meta data-rh="true" property="og:description" content="${route.description}" />
      <meta data-rh="true" property="og:image" content="https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/o9ol4rh4_white.png" />
      <meta data-rh="true" name="twitter:title" content="${route.title}" />
      <meta data-rh="true" name="twitter:description" content="${route.description}" />
      <meta data-rh="true" name="twitter:image" content="https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/o9ol4rh4_white.png" />
    `;

    // Inject SEO tags right before </head>
    html = html.replace('</head>', `${seoTags}\n</head>`);


    // Inject per-page noscript content so Google sees real text without JS
    const pageName = route.path.split("/").filter(Boolean).pop() || "";
    const readableTitle = route.title.split("|")[0].trim();
    const noscriptBlock = `
    <noscript>
      <div style="max-width:1200px;margin:0 auto;padding:80px 24px;">
        <nav aria-label="Breadcrumb" style="margin-bottom:16px;font-size:14px;">
          <a href="/" style="color:#84CC16;">Home</a> &raquo; <span>${readableTitle}</span>
        </nav>
        <h1 style="font-size:2rem;margin-bottom:16px;">${readableTitle}</h1>
        <p style="font-size:1rem;line-height:1.6;color:#666;">${route.description}</p>
        <p style="margin-top:24px;"><a href="/" style="color:#84CC16;">Go to NexxTechs Homepage</a></p>
      </div>
    </noscript>`;

    // Inject noscript content right after <div id="root">
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>${noscriptBlock}`
    );

    // Inject BreadcrumbList JSON-LD schema
    const breadcrumbParts = route.path.split("/").filter(Boolean);
    const breadcrumbItems = [
      { position: 1, name: "Home", item: BASE_URL + "/" }
    ];
    let pathAccumulator = "";
    breadcrumbParts.forEach((part, i) => {
      pathAccumulator += "/" + part;
      breadcrumbItems.push({
        position: i + 2,
        name: part.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        item: BASE_URL + pathAccumulator + "/"
      });
    });

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map(b => ({
        "@type": "ListItem",
        "position": b.position,
        "name": b.name,
        "item": b.item
      }))
    };

    // Inject breadcrumb schema before closing </head>
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n</head>`
    );

    // Create directory structure: /courses -> build/courses/index.html
    const routeDir = path.join(BUILD_DIR, route.path);
    fs.mkdirSync(routeDir, { recursive: true });

    const outputPath = path.join(routeDir, "index.html");

    fs.writeFileSync(outputPath, html, "utf-8");
    created++;
  }

  console.log(`✅ Pre-rendered ${created} routes with unique SEO meta tags.`);
}

prerenderRoutes().catch(console.error);
