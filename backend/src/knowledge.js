// ============================================================
//  NexxTechs AI Chatbot - "Nexxi" Knowledge Base
//  Real course data, batches, durations, and institute details.
//  Note: Exact fees are customized per student / scholarship track,
//  so the bot does NOT invent fees; it directs users to call/WhatsApp.
// ============================================================

export const INSTITUTE = {
  name: "NexxTechs",
  botName: "Nexxi",
  tagline: "Premier IT Training Institute in Delhi & Noida",
  delhiAddress: "B-54 Krishna Park, Vikaspuri, New Delhi - 110018 (Near Janakpuri West)",
  noidaAddress: "B-136 Upper, Ground floor, B Block, Sector 2, Noida, UP - 201301",
  phone: "+91 9217179762",
  noidaPhone: "+91 7987059430",
  whatsapp: "+91 9217179762",
  email: "info@nexxtechs.com",
  website: "https://www.nexxtechs.com/",
  studentsTrained: "5000+",
  placementRate: "95% Placement Track Record (100% Placement Assistance)",
};

// Course catalog filled with real durations, batch timings, topics & counseling guidance
export const COURSES = [
  {
    name: "Data Analytics",
    duration: "4 Months",
    fees: "Not displayed on website (varies with scholarship & installment plan). Visitor must call/WhatsApp +91 9217179762 for fee structure & special discounts.",
    batches: "Mon-Fri: 10:00 AM - 12:00 PM | Evening: 7:00 PM - 9:00 PM",
    topics: "Advanced Excel (VLOOKUP, XLOOKUP, Pivot, Macros), SQL (Joins, Window Functions, CTEs), Python (NumPy, Pandas, EDA), Power BI & DAX, Tableau Dashboards, Business Intelligence",
    highlights: "Practical hands-on training, real-world case studies, Power BI & Tableau dashboards."
  },
  {
    name: "Data Science & GenAI",
    duration: "6 Months",
    fees: "Shared on call/WhatsApp (+91 9217179762) based on current admission offers and installment eligibility.",
    batches: "Mon-Fri: 10:00 AM - 12:00 PM | Sat-Sun: 10:00 AM - 1:00 PM | Evening: 7:00 PM - 9:00 PM",
    topics: "Python for Data Science, Statistics, Machine Learning (Scikit-Learn, XGBoost), Deep Learning (PyTorch, TensorFlow, CNNs, RNNs), NLP, Generative AI & LLMs (Transformers, LangChain, RAG), MLOps & Deployment (FastAPI, Docker, AWS)",
    highlights: "Kaggle competitions, live AI agent projects, complete AI/ML pipeline."
  },
  {
    name: "Cloud Computing",
    duration: "5 Months",
    fees: "Custom quote on call/WhatsApp (+91 9217179762). Flexible 0% EMI and installment options available.",
    batches: "Mon-Fri: 10:00 AM - 12:00 PM | Evening: 7:00 PM - 9:00 PM",
    topics: "Networking & Virtualization Fundamentals, AWS Core (EC2, S3, VPC, RDS, IAM), AWS Serverless (Lambda, API Gateway), Microsoft Azure (Entra ID, VMs, Azure SQL), Google Cloud Platform (GCP Compute, BigQuery), Cloud Security & Terraform IaC",
    highlights: "AWS Solutions Architect exam prep, Multi-cloud architecture, live cloud sandbox labs."
  },
  {
    name: "DevOps Engineering",
    duration: "4 Months",
    fees: "Shared directly by counselor via call/WhatsApp (+91 9217179762).",
    batches: "Mon-Fri: 10:00 AM - 12:00 PM | Evening: 7:00 PM - 9:00 PM",
    topics: "Linux Administration & Bash Scripting, Version Control & GitOps (GitHub Actions, ArgoCD), Docker Containerization, Kubernetes Orchestration (Pods, Deployments, Helm), Jenkins CI/CD Pipelines, Terraform Infrastructure as Code, Prometheus & Grafana Monitoring, SRE Practices",
    highlights: "End-to-end automated deployment pipelines, real production server configurations."
  },
  {
    name: "Full Stack Web Development (MERN / Next.js / TypeScript)",
    duration: "4 to 6 Months (MERN: 4 Months | Advanced Full Stack Next.js: 6 Months)",
    fees: "Direct consultation on call/WhatsApp (+91 9217179762). Installments & EMI available.",
    batches: "Mon-Fri: 10:00 AM - 12:00 PM | Evening: 7:00 PM - 9:00 PM | Sat-Sun: 10:00 AM - 1:00 PM",
    topics: "HTML5, CSS3, TailwindCSS, Modern JavaScript ES6+, TypeScript, React 19, Next.js 15, Node.js, Express.js, MongoDB & Mongoose, PostgreSQL & Prisma, RESTful APIs, WebSockets, Docker, Vercel & Render Deployment",
    highlights: "20+ live portfolio projects, full stack SaaS apps, real-time chat & e-commerce."
  },
  {
    name: "Python Full Stack Development",
    duration: "6 Months",
    fees: "Contact counselor on call/WhatsApp (+91 9217179762) for brochure & fee details.",
    batches: "Mon-Fri: 10:00 AM - 12:00 PM | Sat-Sun: 10:00 AM - 1:00 PM",
    topics: "Core & Advanced Python 3.10+, Django Web Framework (MTV, ORM), Django REST Framework (DRF), High-performance FastAPI, PostgreSQL, Redis Caching, Celery Async Tasks, React Frontend, Docker & AWS Deployment",
    highlights: "AI API integration, scalable backend architecture, full stack web apps."
  },
  {
    name: "Java Full Stack Development",
    duration: "6 Months",
    fees: "Contact counselor on call/WhatsApp (+91 9217179762) for course fee & discounts.",
    batches: "Mon-Fri: 10:00 AM - 12:00 PM | Evening: 7:00 PM - 9:00 PM",
    topics: "Core Java 17+, Concurrency & Multithreading, Hibernate & JPA, Spring Boot 3, RESTful APIs, Microservices (Eureka, API Gateway, Circuit Breaker), Apache Kafka, Redis, React 19 Frontend, MySQL, Docker & AWS",
    highlights: "Enterprise-grade microservices applications, Fortune 500 company interview patterns."
  },
  {
    name: "Cyber Security & Ethical Hacking",
    duration: "5 Months",
    fees: "Contact counselor on call/WhatsApp (+91 9217179762) for certification fees & discounts.",
    batches: "Weekdays (Mon-Fri): 10:00 AM - 7:00 PM | Weekends (Sat-Sun): 10:00 AM - 7:00 PM",
    topics: "Networking & Protocols (TCP/IP, Wireshark), Kali Linux, OSINT & Reconnaissance (Nmap, Nessus), System Hacking & Exploitation (Metasploit, Privilege Escalation), Web App Penetration Testing (OWASP Top 10, Burp Suite Pro), Wireless Security, Blue Team & SIEM (Splunk, ELK)",
    highlights: "Prepares for CEH & CompTIA Security+, hands-on attack & defense cyber labs."
  },
  {
    name: "Digital Marketing",
    duration: "3 Months",
    fees: "Contact counselor on call/WhatsApp (+91 9217179762) for fee schedule.",
    batches: "Mon-Fri: 11:00 AM - 1:00 PM | Sat-Sun: 10:00 AM - 1:00 PM",
    topics: "Search Engine Optimization (On-Page, Off-Page, Technical SEO, Local SEO), Google Ads (Search, Display, Performance Max), Meta Ads (Facebook & Instagram Ads Manager), Social Media Marketing, Email Automation (Mailchimp, Klaviyo), Web Analytics (GA4, GTM), AI for Marketing",
    highlights: "Live ad campaign handling with real budgets, client lead generation case studies."
  },
  {
    name: "UI/UX Design",
    duration: "4 Months",
    fees: "Contact counselor on call/WhatsApp (+91 9217179762) for fee details.",
    batches: "Weekdays (Mon-Fri): 10:00 AM - 7:00 PM | Weekends (Sat-Sun): 10:00 AM - 7:00 PM",
    topics: "Design Thinking & Psychology (Color Theory, Typography, Visual Hierarchy), UX Research & Personas, Wireframing (Whimsical, Balsamiq), UI Design Mastery in Figma (Auto Layout, Components, Design Systems), Framer Prototyping & Motion Design, Usability Testing & Behance/Dribbble Portfolio",
    highlights: "Complete client case studies, live UI portfolio development, Figma Dev Mode."
  },
  {
    name: "Graphic Design",
    duration: "3 Months",
    fees: "Contact counselor on call/WhatsApp (+91 9217179762).",
    batches: "Weekdays (Mon-Fri): 10:00 AM - 7:00 PM | Weekends (Sat-Sun): 10:00 AM - 7:00 PM",
    topics: "Design Theory & Composition, Adobe Photoshop (Image Editing, Retouching, Mockups), Adobe Illustrator (Vector Art, Logos, Iconography), Adobe InDesign (Print & Magazine Layouts), Canva Pro, Generative AI Tools (Midjourney, Adobe Firefly)",
    highlights: "Brand identity kits, social media creatives, print and digital media portfolio."
  },
  {
    name: "SAP Masterclass (FICO / MM / S/4HANA)",
    duration: "5 Months",
    fees: "Contact counselor on call/WhatsApp (+91 9217179762) for SAP module packages.",
    batches: "Mon-Fri: 10:00 AM - 12:00 PM | Evening: 7:00 PM - 9:00 PM",
    topics: "ERP Systems & SAP Architecture, SAP FICO (General Ledger, AP/AR, Asset Accounting, Cost Center, CO-PA), SAP MM (Procure-to-Pay, Material & Vendor Master, Purchase Orders, Inventory), SAP S/4HANA & Fiori Apps, Live Enterprise Scenarios & Implementation",
    highlights: "Real SAP server access, configuration practicals, consultant interview prep."
  },
  {
    name: "DSA (Data Structures & Algorithms - C++ / Java / Python)",
    duration: "3 Months",
    fees: "Contact counselor on call/WhatsApp (+91 9217179762).",
    batches: "Mon-Fri: 10:00 AM - 12:00 PM | Sat-Sun: 10:00 AM - 1:00 PM",
    topics: "Time & Space Complexity (Big O), Arrays, Strings, Two Pointers, Sliding Window, Linked Lists, Stacks, Queues, Binary Trees & BSTs, Heaps & Priority Queues, Graph Theory (BFS, DFS, Dijkstra), Dynamic Programming, 300+ LeetCode problems",
    highlights: "FAANG-level interview problem patterns, mock coding rounds."
  },
  {
    name: "Generative AI & Autonomous Agents",
    duration: "4 Months",
    fees: "Contact counselor on call/WhatsApp (+91 9217179762).",
    batches: "Mon-Fri: 10:00 AM - 12:00 PM | Sat-Sun: 10:00 AM - 1:00 PM",
    topics: "Transformers Architecture, Advanced Prompt Engineering, OpenAI/Gemini/Claude APIs, Embeddings & Vector DBs (ChromaDB, Pinecone, FAISS), RAG Pipeline Implementation, LangChain & LlamaIndex, Autonomous Multi-Agent Systems, Fine-Tuning (LoRA, QLoRA), FastAPI & Docker MLOps",
    highlights: "Build 7+ production AI apps (PDF Chatbots, AI Agents, SaaS Copilots)."
  }
];

// Institute FAQs
export const FAQS = [
  {
    q: "Kya demo class milti hai?",
    a: "Haan! NexxTechs bilkul Free Demo Class provide karta hai. Aap call ya WhatsApp (+91 9217179762) karke apna free demo slot confirm kar sakte hain."
  },
  {
    q: "Placement support kaisa hai?",
    a: "NexxTechs ka 95% placement track record hai aur 5000+ students train ho chuke hain. Yahan 100% placement assistance milta hai jisme resume building, mock technical interviews, LinkedIn profile optimization, aur direct corporate hiring partners me placement drive shamil hain."
  },
  {
    q: "EMI ya installment option hai?",
    a: "Haan, bilkul! Sabhi courses ke liye easy monthly installments aur 0% interest EMI options available hain, taaki fees student par bojh na bane. Counselor call pe poori details provide karte hain."
  },
  {
    q: "Online ya offline classes available hain?",
    a: "Dono options available hain! Offline classroom training hamare Vikaspuri (Delhi) aur Sector 2 (Noida) training centers par hoti hai with high-end lab infrastructure. Aur jo students center nahi aa sakte unke liye Live Interactive Online classes with class recordings available hain."
  },
  {
    q: "Institute ka address aur contact kya hai?",
    a: "Delhi Branch: B-54 Krishna Park, Vikaspuri, New Delhi - 110018 (Near Janakpuri West). Phone: +91 9217179762.\nNoida Branch: B-136 Upper, Ground floor, B Block, Sector 2, Noida, UP 201301. Phone: +91 7987059430.\nEmail: info@nexxtechs.com | Website: https://www.nexxtechs.com/"
  },
  {
    q: "Kya course complete hone ke baad certificate milta hai?",
    a: "Haan, successfully course complete karne par industry-recognized NexxTechs Course Completion Certificate aur live capstone project experience certificate diya jata hai."
  }
];

const courseText = COURSES.map(
  (c) => `• Course: ${c.name}\n  Duration: ${c.duration}\n  Batches: ${c.batches}\n  Fees: ${c.fees}\n  Topics: ${c.topics}\n  Highlights: ${c.highlights}`
).join("\n\n");

const faqText = FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");

export const SYSTEM_PROMPT = `You are Nexxi, the friendly, empathetic, and expert AI counselor and website assistant for NexxTechs (${INSTITUTE.tagline}).
NexxTechs is a leading IT training institute with training centers in Vikaspuri (Delhi) and Sector 2 (Noida), offering career-oriented training with 100% placement assistance.

YOUR IDENTITY:
- Your name is Nexxi.
- If a user greets you or asks who you are, introduce yourself as "Nexxi, NexxTechs ki AI counselor" (or in English: "Nexxi, the AI counselor from NexxTechs").

LANGUAGE & TONE:
- Reply in the same language the visitor writes in: English, Hindi (Devanagari), or Hinglish (Hindi written in Roman script). Hinglish is the most natural for Indian students/visitors.
- Keep your tone warm, encouraging, conversational, and highly professional.
- Keep responses concise: 2 to 4 sentences or a clean bullet list. Never write giant walls of text. Plain text only (clean bullet points with "- " or numbers).

FEES & PRICING RULES (CRITICAL):
- Never invent numeric fees (e.g., do NOT say Rs 25,000 or Rs 40,000).
- The website does NOT publish fee amounts because fees depend on current scholarship test discounts, customized project modules, and installment options.
- When asked about fees, explain that fees are customized based on current scholarship discounts and batch formats, and invite them to call/WhatsApp ${INSTITUTE.phone} or share their phone number so the counselor can send the exact fee structure and syllabus PDF.
- Mention that 0% EMI and easy installment options are available.

COURSE, DURATION & BATCHES:
- Use ONLY the real durations, batch timings, and topics from the verified data below.
- Highlight that flexible morning, evening (great for job goers), and weekend batches exist.
- Both Offline (Vikaspuri Delhi & Sector 2 Noida) and Live Online batches are available.

ADMISSIONS & DEMO CLASS:
- Free demo classes are available for all courses.
- When a visitor is interested, ask for their preferred course and suggest booking a free demo class by calling/messaging ${INSTITUTE.phone} or sharing their mobile number.
- You cannot directly book database records yourself, so always give them the contact number: ${INSTITUTE.phone} (WhatsApp/Call).

CAREER GUIDANCE:
- If a visitor doesn't know which course to choose, ask about their background (college student, non-tech graduate, working professional) and career goal, then recommend 1-2 best courses from our list.

VERIFIED INSTITUTE DATA:
Institute: ${INSTITUTE.name}
Delhi Center: ${INSTITUTE.delhiAddress}
Noida Center: ${INSTITUTE.noidaAddress}
Phone/WhatsApp: ${INSTITUTE.phone} (Delhi/General) | ${INSTITUTE.noidaPhone} (Noida)
Email: ${INSTITUTE.email}
Website: ${INSTITUTE.website}
Students Trained: ${INSTITUTE.studentsTrained}
Placement: ${INSTITUTE.placementRate}

VERIFIED COURSES:
${courseText}

FREQUENTLY ASKED QUESTIONS:
${faqText}
`;
