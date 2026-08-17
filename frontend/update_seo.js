const fs = require('fs');
const path = require('path');

const seoUpdates = {
  'HomePage.jsx': {
    title: 'Top Institute for IT Training Courses in Delhi – Nexxtechs',
    description: 'Nexxtechs is the No.1 Training Company in Delhi with top-notch IT training programs and industry experts. Providing Placement, Certification and affordable fees.'
  },
  'CoursesPage.jsx': {
    title: 'Explore Top IT & Tech Courses in Delhi | NexxTechs',
    description: 'Browse 50+ industry-focused IT training courses at NexxTechs Vikaspuri. Master Web Dev, Data Science, Cyber Security & AI with live projects. Enroll today!'
  },
  'PlacementPage.jsx': {
    title: 'Placement Success – 95% Placement Rate | NexxTechs',
    description: 'Discover NexxTechs placement success stories. Over 5000+ students placed at top MNCs with a 95% placement rate. Check our reviews and top salary packages.'
  },
  'BlogPage.jsx': {
    title: 'Tech Blog: AI, Cyber Security & Data Science Guide',
    description: 'Read expert guides on Artificial Intelligence, Cyber Security, Data Science, and DevOps. Get top IT career insights from NexxTechs industry mentors today.'
  },
  'RoadmapPage.jsx': {
    title: 'Career Roadmaps for IT & Tech Careers | NexxTechs',
    description: 'Follow our step-by-step career roadmaps for Data Science, DevOps, Full Stack, and Cyber Security. Plan your tech career successfully with NexxTechs Delhi.'
  },
  'CyberHooks.jsx': {
    title: 'CyberHooks Partnership – Cyber Security & AI Training',
    description: 'Explore NexxTechs strategic partnership with CyberHooks for advanced Cyber Security, Ethical Hacking, and AI courses. Get industry-certified in Delhi now.'
  },
  'CareerGuidancePage.jsx': {
    title: 'Free IT Career Guidance & Counseling | NexxTechs',
    description: 'Get free IT career counseling from NexxTechs experts. Receive personalized guidance to choose the right tech course and accelerate your career in New Delhi.'
  },
  'ContactPage.jsx': {
    title: 'Contact Us – NexxTechs IT Training Vikaspuri Delhi',
    description: 'Contact NexxTechs for course inquiries, free counseling, and enrollment. Visit us at B-54 Krishna Park, Vikaspuri, New Delhi 110018 or call +91 9217179762.'
  },
  'PrivacyPolicy.jsx': {
    title: 'Privacy Policy | Nexxtechs IT Training Institute',
    description: 'Read the NexxTechs privacy policy to understand how we collect, use, and protect your personal data and information while you browse our training website.'
  },
  'NoidaInstitutePage.jsx': {
    title: 'Top Institute for IT Training Courses in Noida – Nexxtechs',
    description: 'Nexxtechs is the No.1 Training Company in Noida with top-notch IT training programs and industry experts. Providing Placement, Certification and affordable fees.'
  }
};

const pagesDir = path.join(__dirname, 'src', 'pages');
const appDir = path.join(__dirname, 'src');

// 1. Update React Pages
for (const [filename, seo] of Object.entries(seoUpdates)) {
  let filePath = path.join(pagesDir, filename);
  if (filename === 'HomePage.jsx') {
      filePath = path.join(appDir, 'App.js');
  }
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace title
    content = content.replace(/title=\".*?\"/, `title="${seo.title}"`);
    // Replace description
    content = content.replace(/description=\".*?\"/, `description="${seo.description}"`);
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filename} at ${filePath}`);
  } else {
    console.log(`Not found: ${filename}`);
  }
}

// 2. Update prerender-meta.js NOIDA overrides
const prerenderPath = path.join(__dirname, 'prerender-meta.js');
if (fs.existsSync(prerenderPath)) {
  let content = fs.readFileSync(prerenderPath, 'utf-8');
  
  // We want to add code right after `ROUTES` is defined but before `async function prerenderRoutes()`
  if (!content.includes('// Duplicate all /course/ routes for Noida')) {
    const injectionStr = `
// Duplicate all /course/ routes for Noida
const noidaRoutes = [];
for (const route of ROUTES) {
  if (route.path.startsWith("/course/")) {
    noidaRoutes.push({
      path: route.path + "-noida",
      title: route.title.replace(/Delhi|Vikaspuri/g, "Noida"),
      description: route.description.replace(/Delhi|Vikaspuri/g, "Noida"),
    });
  }
}
ROUTES.push(...noidaRoutes);

// Add Noida Institute Page
ROUTES.push({
  path: "/nexxtechs-noida",
  title: "Top Institute for IT Training Courses in Noida – Nexxtechs",
  description: "Nexxtechs is the No.1 Training Company in Noida with top-notch IT training programs and industry experts. Providing Placement, Certification and affordable fees.",
});
`;
    content = content.replace('async function prerenderRoutes() {', injectionStr + '\nasync function prerenderRoutes() {');
    
    // Also, inside prerenderRoutes, fix the dbCourses push to use Noida if needed
    content = content.replace(
      'title: `${course.title} Course in Delhi | NexxTechs Vikaspuri`,',
      'title: path.includes("-noida") ? `${course.title} Course in Noida | NexxTechs Noida` : `${course.title} Course in Delhi | NexxTechs Vikaspuri`,'
    );
    content = content.replace(
      'description: `Learn ${course.title} at NexxTechs Vikaspuri Delhi. Course with 100% placement assistance, real-world projects & industry certification.`',
      'description: path.includes("-noida") ? `Learn ${course.title} at NexxTechs Noida. Course with 100% placement assistance, real-world projects & industry certification.` : `Learn ${course.title} at NexxTechs Vikaspuri Delhi. Course with 100% placement assistance, real-world projects & industry certification.`'
    );
    
    fs.writeFileSync(prerenderPath, content, 'utf-8');
    console.log('Updated prerender-meta.js with NOIDA dynamically generated routes.');
  } else {
    console.log('prerender-meta.js ALREADY contains NOIDA route generation logic.');
  }
}
