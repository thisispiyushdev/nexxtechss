import express from "express";

const router = express.Router();

const BRANCHES = {
  noida: {
    city: "Noida",
    name: "Noida Center",
    phone: "+91 7987059430",
    phoneRaw: "917987059430",
    address: "B-136 Upper, Ground floor, B Block, Sector 2, Noida, UP - 201301",
    whatsappUrl: "https://wa.me/917987059430?text=Hi%20Nexxi,%20I%20want%20to%20know%20more%20about%20courses%20at%20NexxTechs%20Noida.",
  },
  delhi: {
    city: "Delhi",
    name: "Delhi Center",
    phone: "+91 9217179762",
    phoneRaw: "919217179762",
    address: "B-54 Krishna Park, Vikaspuri, New Delhi - 110018 (Near Janakpuri West)",
    whatsappUrl: "https://wa.me/919217179762?text=Hi%20Nexxi,%20I%20want%20to%20know%20more%20about%20courses%20at%20NexxTechs%20Delhi.",
  },
};

// Clean and sanitize messages array
function cleanMessages(raw) {
  if (!Array.isArray(raw)) return [];
  let msgs = raw
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, 1000) }))
    .filter((m) => m.content.length > 0)
    .slice(-10);

  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  return msgs;
}

// Robust, case-insensitive, fuzzy intent and course matcher
export function generateKnowledgeReply(userMessage, isNoida = false) {
  let branch = isNoida ? BRANCHES.noida : BRANCHES.delhi;
  let otherBranch = isNoida ? BRANCHES.delhi : BRANCHES.noida;
  const rawQ = (userMessage || "").trim();
  const q = rawQ.toLowerCase();

  // Normalize: remove extra spaces and common filler punctuation
  const norm = q.replace(/[^\w\s\+\#\/]/g, " ").replace(/\s+/g, " ").trim();

  // If user explicitly asks about Delhi or Noida in the message, route to that specific branch
  if (/\b(delhi|vikaspuri|janakpuri|west\s*delhi)\b/i.test(norm)) {
    branch = BRANCHES.delhi;
    otherBranch = BRANCHES.noida;
  } else if (/\b(noida|sec\s*2|sector\s*2)\b/i.test(norm)) {
    branch = BRANCHES.noida;
    otherBranch = BRANCHES.delhi;
  }

  // 1. GREETINGS
  if (
    /^(hi|hello|hey|namaste|hola|good\s*morning|good\s*afternoon|good\s*evening|kaise\s*ho)$/i.test(norm) ||
    /^(hi|hello|hey|namaste)\b/i.test(norm)
  ) {
    return `Namaste! 👋 Main Nexxi hu, NexxTechs ${branch.city} ki AI counselor.\nMain aapko hamare sabhi job-oriented tech courses, free demo classes, batch timings aur 100% placement assistance ke baare me poori jankari de sakti hu.\n\nAap kis course me interested hain? Aap neeche diye kisi bhi course par click kar sakte hain ya apna sawal likh sakte hain:`;
  }

  // 2. ALL COURSES / COURSES KE NAAM / COURSE LIST INTENT
  // Matches "courseses ke naam", "course list", "courses btao", "all courses", "kya kya courses hai", "courses name", etc.
  if (
    /\b(all\s*courses?|courses?\s*list|list\s*of\s*courses?|courses?\s*(ke\s*)?naam|courses?\s*names?|courses?\s*name|course\s*name|kya\s*(kya\s*)?courses?|programs?\s*list|available\s*courses?|konsa\s*course|kon\s*se\s*courses?|courses?\s*btao|course\s*btao|all\s*programs?|sabhi\s*courses?)\b/i.test(norm) ||
    /^(courses?|courseses|all\s*course|course\s*details)$/i.test(norm) ||
    (norm.includes("course") && (norm.includes("naam") || norm.includes("name") || norm.includes("list") || norm.includes("btao") || norm.includes("options") || norm.includes("kya") || norm.includes("available")))
  ) {
    return `NexxTechs ${branch.city} par ye sabhi Job-Oriented Tech Courses available hain (100% Placement Assistance ke saath):\n\n` +
      `1. 📊 **Data Analytics** (4 Months) — Advanced Excel, SQL, Python, Power BI, Tableau\n` +
      `2. 🤖 **Data Science & GenAI** (6 Months) — Python, Statistics, ML, Deep Learning, NLP, Generative AI\n` +
      `3. ☁️ **Cloud Computing Architect** (5 Months) — AWS, Microsoft Azure, Google Cloud, Terraform\n` +
      `4. ⚙️ **DevOps & Cloud Engineering** (4 Months) — Linux, Docker, Kubernetes, Jenkins, CI/CD, Terraform\n` +
      `5. 💻 **Full Stack Web Development** (4-6 Months) — React 19, Next.js 15, Node.js, Express, MongoDB\n` +
      `6. 🐍 **Python Full Stack** (6 Months) — Core Python, Django, FastAPI, PostgreSQL, AWS\n` +
      `7. ☕ **Java Full Stack** (6 Months) — Core Java 17+, Spring Boot 3, Microservices, React\n` +
      `8. 🛡️ **Cyber Security & Ethical Hacking** (5 Months) — CEH, Kali Linux, Penetration Testing, SIEM\n` +
      `9. 🎨 **UI/UX Design** (4 Months) — Figma, Framer, Design Systems, Usability Testing\n` +
      `10. 📈 **Digital Marketing** (3 Months) — SEO, Google Ads, Meta Ads, Performance Marketing, GA4\n` +
      `11. 🖌️ **Graphic Design** (3 Months) — Photoshop, Illustrator, InDesign, Canva Pro, Brand Kits\n` +
      `12. 💼 **SAP Enterprise Masterclass** (5 Months) — SAP FICO, SAP MM, S/4HANA, Fiori Apps\n` +
      `13. 🧩 **DSA & Coding** (3 Months) — C++/Java/Python, Algorithms, 300+ LeetCode problems\n` +
      `14. 🧠 **GenAI & Autonomous Agents** (4 Months) — LangChain, RAG Pipelines, Multi-Agent Systems\n\n` +
      `Aap kis course ki poori details (syllabus & batch timings) dekhna chahte hain? Bas us course ka naam likhein ya suggestion par click karein!\n\n` +
      `Free Demo Class book karne ke liye hamare ${branch.city} counselor se connect karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 3. DEVOPS & CLOUD ENGINEERING
  // Flexible match: devops, dev ops, docker, kubernetes, k8s, jenkins, cicd, terraform, ansible
  if (/\b(devops|dev\s*ops|docker|kubernetes|k8s|jenkins|ci\s*\/?\s*cd|cicd|terraform|ansible|helm|sre)\b/i.test(norm)) {
    return `⚙️ **DevOps & Cloud Engineering Master Program** (Duration: 4 Months)\n\n` +
      `• **Comprehensive Syllabus**:\n` +
      `  - Linux System Administration & Shell Scripting (Bash)\n` +
      `  - Git, GitHub & GitOps (GitHub Actions, ArgoCD)\n` +
      `  - Docker Containerization (Images, Containers, Multi-stage builds, Docker Compose)\n` +
      `  - Kubernetes Orchestration (Pods, Deployments, Services, Ingress, Helm Charts)\n` +
      `  - Jenkins CI/CD Pipelines (Automated build, test, and production deployment)\n` +
      `  - Infrastructure as Code (IaC) with Terraform & Ansible configuration management\n` +
      `  - Production Monitoring & Observability with Prometheus & Grafana\n` +
      `  - SRE (Site Reliability Engineering) practices & AWS production setups\n\n` +
      `• **Flexible Batch Timings**:\n` +
      `  - Morning: 10:00 AM - 12:00 PM (Monday to Friday)\n` +
      `  - Evening: 7:00 PM - 9:00 PM (Working professionals special)\n` +
      `  - Weekend: 10:00 AM - 1:00 PM (Saturday & Sunday)\n\n` +
      `• **Placement Guarantee**: 100% Placement assistance with live multi-tier CI/CD projects on AWS sandbox labs.\n\n` +
      `Free Demo Class aur detailed syllabus PDF ke liye connect karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 4. DATA ANALYTICS
  // Flexible match: data analytics, data analytic, data analyst, analytics, power bi, tableau, excel
  if (
    /\b(data\s*analytics?|data\s*analyst|analytics?|power\s*bi|powerbi|tableau|advanced\s*excel|business\s*analytics?)\b/i.test(norm) ||
    /^(da|data\s*analysis)$/i.test(norm)
  ) {
    return `📊 **Data Analytics Training Program** (Duration: 4 Months)\n\n` +
      `• **Comprehensive Syllabus**:\n` +
      `  - Advanced Excel: VLOOKUP, XLOOKUP, Nested IFs, Pivot Tables, Power Query, Macros\n` +
      `  - SQL for Data Analysis: Joins, Subqueries, Window Functions, CTEs, Aggregations\n` +
      `  - Python for Data Analysis: NumPy arrays, Pandas DataFrames, Data Cleaning & EDA\n` +
      `  - Data Visualization: Matplotlib, Seaborn interactive charts\n` +
      `  - Power BI: Data Modeling, Star Schema, DAX Formulas, Interactive Executive Dashboards\n` +
      `  - Tableau Desktop: Visual Analytics, Storytelling with Data, KPI Metrics\n` +
      `  - Real-world Business Intelligence Case Studies (E-commerce, Banking, Healthcare)\n\n` +
      `• **Batch Timings**:\n` +
      `  - Morning: 10:00 AM - 12:00 PM (Mon-Fri)\n` +
      `  - Evening: 7:00 PM - 9:00 PM (Mon-Fri)\n` +
      `  - Weekend: 10:00 AM - 1:00 PM (Sat-Sun)\n\n` +
      `• **Placement**: 100% Placement support with resume building and mock corporate interviews.\n\n` +
      `Free Demo Class book karne ke liye abhi sampark karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 5. SAP ENTERPRISE MASTERCLASS (FICO / MM / S4HANA)
  // Flexible match: sap, fico, sap fico, sap mm, s4hana, s/4hana, sap erp, abap
  if (/\b(sap|fico|sap\s*fico|sap\s*mm|s\/?4\s*hana|s4hana|sap\s*erp|abap)\b/i.test(norm)) {
    return `💼 **SAP Enterprise Masterclass (FICO / MM / S/4HANA)** (Duration: 5 Months)\n\n` +
      `• **Core Modules & Practical Curriculum**:\n` +
      `  - ERP Overview, Architecture & SAP GUI / Fiori Navigation\n` +
      `  - SAP FICO: General Ledger (GL), Accounts Payable (AP), Accounts Receivable (AR), Asset Accounting (AA), Bank Accounting, Cost Center & Profit Center Accounting (CO)\n` +
      `  - SAP MM: Procure-to-Pay (P2P Cycle), Material Master, Vendor Master, Purchase Requisitions & Orders (PO), Goods Receipt, Invoice Verification, Inventory Management\n` +
      `  - SAP S/4HANA Finance & Logistics Migration, Real-time Reporting & Analytics\n` +
      `  - Live SAP Server Access: 24/7 GUI server practice with real enterprise scenarios\n\n` +
      `• **Batch Timings**:\n` +
      `  - Morning: 10:00 AM - 12:00 PM (Mon-Fri)\n` +
      `  - Evening: 7:00 PM - 9:00 PM (Mon-Fri)\n` +
      `  - Weekend: 10:00 AM - 1:00 PM (Sat-Sun)\n\n` +
      `• **Placement**: 100% Placement assistance with top MNC SAP consulting partners.\n\n` +
      `Free Demo Class aur SAP syllabus PDF ke liye connect karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 6. GENERATIVE AI & AUTONOMOUS AGENTS
  if (/\b(genai|gen\s*ai|generative\s*ai|llm|large\s*language\s*models?|langchain|rag\s*pipeline|autonomous\s*agents?)\b/i.test(norm)) {
    return `🧠 **Generative AI & Autonomous Agents Masterclass** (Duration: 4 Months)\n\n` +
      `• **Syllabus & Topics**:\n` +
      `  - Transformer Architecture & Advanced Prompt Engineering\n` +
      `  - OpenAI, Anthropic Claude & Google Gemini API integrations\n` +
      `  - Vector Databases (ChromaDB, Pinecone, FAISS) & Embeddings\n` +
      `  - Advanced Retrieval Augmented Generation (RAG) Pipelines\n` +
      `  - LangChain & LlamaIndex Frameworks\n` +
      `  - Multi-Agent Orchestration (CrewAI, AutoGen, ReAct Framework)\n` +
      `  - Model Fine-Tuning (LoRA, QLoRA, PEFT) on custom datasets\n` +
      `  - AI Application Deployment with FastAPI, Docker & AWS\n\n` +
      `• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Sat-Sun (10:00 AM - 1:00 PM)\n\n` +
      `Demo class ke liye contact karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 7. DATA SCIENCE & GENAI / MACHINE LEARNING
  if (/\b(data\s*science|data\s*scientist|datascience|machine\s*learning|\bml\b|deep\s*learning|\bdl\b|artificial\s*intelligence|\bnlp\b|scikit|ai\s*course|ai\s*master)\b/i.test(norm)) {
    return `🤖 **Data Science & GenAI Master Program** (Duration: 6 Months)\n\n` +
      `• **Comprehensive Syllabus**:\n` +
      `  - Python for Data Science (NumPy, Pandas, Matplotlib, Seaborn)\n` +
      `  - Probability, Applied Statistics & Exploratory Data Analysis (EDA)\n` +
      `  - Machine Learning: Regression, Classification, Random Forest, XGBoost, Clustering\n` +
      `  - Deep Learning: PyTorch, TensorFlow, Keras, CNNs (Computer Vision), RNNs/LSTMs\n` +
      `  - Natural Language Processing (NLP), NLTK, Spacy, Transformers & HuggingFace\n` +
      `  - Generative AI & LLMs: Prompt Engineering, LangChain, RAG Pipelines\n` +
      `  - MLOps & Production: FastAPI, Docker, and AWS model deployment\n\n` +
      `• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Sat-Sun (10:00 AM - 1:00 PM) | Evening (7:00 PM - 9:00 PM)\n` +
      `• **Placement**: 100% Placement assistance, live Kaggle competitions, portfolio building.\n\n` +
      `Free Demo Class book karne ke liye connect karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 8. CLOUD COMPUTING (AWS / AZURE / GCP)
  if (/\b(cloud|cloud\s*computing|aws|azure|gcp|google\s*cloud|amazon\s*web\s*services)\b/i.test(norm)) {
    return `☁️ **Cloud Computing Architect Program** (Duration: 5 Months)\n\n` +
      `• **Comprehensive Syllabus**:\n` +
      `  - Cloud Networking & Virtualization (VPC, Subnets, Gateways, Route Tables, Security Groups)\n` +
      `  - AWS Core Services: EC2, S3, RDS, DynamoDB, IAM, CloudFront, Route 53\n` +
      `  - AWS Serverless: Lambda Functions, API Gateway, SQS, SNS, EventBridge\n` +
      `  - Microsoft Azure: Virtual Machines, Azure Entra ID, Azure SQL, Blob Storage\n` +
      `  - Google Cloud Platform: GCP Compute Engine, BigQuery, IAM Policies\n` +
      `  - Multi-Cloud Automation with Terraform Infrastructure as Code (IaC)\n` +
      `  - AWS Certified Solutions Architect Associate exam preparation\n\n` +
      `• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Evening (7:00 PM - 9:00 PM)\n\n` +
      `Free Demo Class ke liye sampark karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 9. PYTHON FULL STACK
  if (/\b(python|django|fastapi|flask)\b/i.test(norm)) {
    return `🐍 **Python Full Stack Development** (Duration: 6 Months)\n\n` +
      `• **Syllabus & Topics**:\n` +
      `  - Core & Advanced Python 3.10+, OOPs, Decorators, Generators, Concurrency\n` +
      `  - Django Web Framework: Models, MTV Architecture, ORM, Admin Panel\n` +
      `  - Django REST Framework (DRF): RESTful APIs, JWT Authentication, Permissions\n` +
      `  - High-performance FastAPI: Asynchronous endpoints, Pydantic data validation\n` +
      `  - PostgreSQL, Redis Caching, Celery Background Tasks\n` +
      `  - React 19 Frontend Integration, TailwindCSS, State Management\n` +
      `  - Docker Containerization, CI/CD, AWS EC2 & RDS Deployment\n\n` +
      `• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Sat-Sun (10:00 AM - 1:00 PM)\n\n` +
      `Free Demo Class ke liye contact karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 10. JAVA FULL STACK
  if (/\b(java|spring\s*boot|springboot|hibernate|microservices|core\s*java)\b/i.test(norm)) {
    return `☕ **Java Full Stack Development** (Duration: 6 Months)\n\n` +
      `• **Syllabus & Topics**:\n` +
      `  - Core Java 17+: OOPs, Collections Framework, Multithreading, Streams & Lambdas\n` +
      `  - Hibernate ORM, JPA (Java Persistence API), JDBC, MySQL & PostgreSQL\n` +
      `  - Spring Boot 3: Dependency Injection, Spring MVC, REST APIs, Spring Security & JWT\n` +
      `  - Microservices Architecture: Eureka Service Discovery, API Gateway, Circuit Breaker\n` +
      `  - Apache Kafka Message Broker, Redis Distributed Caching\n` +
      `  - React 19 Frontend with TypeScript\n` +
      `  - Docker, Kubernetes & AWS Cloud Deployment\n\n` +
      `• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Evening (7:00 PM - 9:00 PM)\n\n` +
      `Free Demo Class ke liye call/WhatsApp karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 11. FULL STACK WEB DEVELOPMENT (MERN / NEXT.JS)
  if (/\b(full\s*stack|fullstack|mern|mern\s*stack|react|reactjs|next\s*js|nextjs|web\s*development|web\s*dev|frontend|backend|nodejs|node\s*js|expressjs)\b/i.test(norm)) {
    return `💻 **Full Stack Web Development (MERN / Next.js 15)** (Duration: 4 to 6 Months)\n\n` +
      `• **Comprehensive Syllabus**:\n` +
      `  - Modern HTML5, CSS3, TailwindCSS, Responsive Mobile-First Design\n` +
      `  - Modern JavaScript (ES6+), TypeScript Fundamentals\n` +
      `  - React 19: Hooks, Component Lifecycle, State Management, Custom Hooks\n` +
      `  - Next.js 15: App Router, Server Components, Server Actions, SEO, SSR & SSG\n` +
      `  - Node.js & Express.js: REST APIs, Middleware, WebSockets for Real-time Apps\n` +
      `  - Databases: MongoDB & Mongoose, PostgreSQL & Prisma ORM\n` +
      `  - Authentication: JWT, NextAuth, OAuth\n` +
      `  - 20+ Live Projects: Full SaaS Platforms, E-commerce, Real-time Chat, Portfolio\n\n` +
      `• **Batches**: Mon-Fri (10:00 AM - 12:00 PM) | Evening (7:00 PM - 9:00 PM) | Sat-Sun (10:00 AM - 1:00 PM)\n` +
      `• **Placement**: 100% Placement Assistance with live portfolio hosting.\n\n` +
      `Free Demo Class ke liye contact karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 12. CYBER SECURITY & ETHICAL HACKING
  if (/\b(cyber\s*security|cybersecurity|cyber|ethical\s*hacking|hacking|hacker|ceh|pentest|penetration\s*testing|kali\s*linux|soc|siem|metasploit)\b/i.test(norm)) {
    return `🛡️ **Cyber Security & Ethical Hacking Program** (Duration: 5 Months)\n\n` +
      `• **Comprehensive Syllabus**:\n` +
      `  - Computer Networking Fundamentals, Protocols (TCP/IP, OSI), Wireshark Packet Analysis\n` +
      `  - Kali Linux Mastery & Command-line Tools\n` +
      `  - Reconnaissance & Footprinting: OSINT, Nmap, Nessus Vulnerability Scanning\n` +
      `  - System Hacking: Metasploit Framework, Password Cracking, Privilege Escalation\n` +
      `  - Web Application Penetration Testing: OWASP Top 10, Burp Suite Professional, SQL Injection, XSS\n` +
      `  - Network Security, Wireless Hacking, Firewalls & IDS/IPS\n` +
      `  - Blue Team Defense & SIEM Operations with Splunk & ELK\n` +
      `  - Aligned with Certified Ethical Hacker (CEH) & CompTIA Security+ credentials\n\n` +
      `• **Batches**: Mon-Fri & Weekend slots (10:00 AM - 7:00 PM)\n\n` +
      `Free Demo Class book karne ke liye connect karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 13. UI/UX DESIGN
  if (/\b(ui\s*\/?\s*ux|uiux|\bui\b|\bux\b|figma|framer|user\s*interface|user\s*experience|wireframing)\b/i.test(norm)) {
    return `🎨 **UI/UX Design Mastery** (Duration: 4 Months)\n\n` +
      `• **Syllabus & Topics**:\n` +
      `  - Design Thinking, User Psychology, Color Theory & Modern Typography\n` +
      `  - User Research, Information Architecture, User Personas & Journey Maps\n` +
      `  - Wireframing & Rapid Lo-Fi Prototyping (Whimsical, Balsamiq)\n` +
      `  - Figma Mastery: Auto Layout, Components, Variants, Design Tokens, Design Systems\n` +
      `  - Framer Interactive Prototyping, Micro-interactions & Motion Design\n` +
      `  - Usability Testing, Heuristic Evaluation & Developer Handoff\n` +
      `  - Complete Portfolio Creation on Behance & Dribbble\n\n` +
      `• **Batches**: Flexible Weekdays & Weekends\n\n` +
      `Free Demo Class ke liye contact karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 14. GRAPHIC DESIGN
  if (/\b(graphic\s*design(ing)?|graphics?|photoshop|illustrator|canva|indesign)\b/i.test(norm)) {
    return `🖌️ **Graphic Design Program** (Duration: 3 Months)\n\n` +
      `• **Topics Covered**:\n` +
      `  - Design Principles, Visual Composition, Branding Identity Systems\n` +
      `  - Adobe Photoshop: Advanced Photo Manipulation, Retouching, Poster & Banner Mockups\n` +
      `  - Adobe Illustrator: Vector Illustration, Brand Logos, Iconography, Vector Art\n` +
      `  - Adobe InDesign: Multi-page Print Layouts, Brochures, Magazine Design\n` +
      `  - Canva Pro & AI Design Tools (Midjourney, Adobe Firefly)\n` +
      `  - Live Client Creatives & Portfolio Building\n\n` +
      `• **Batches**: Weekday & Weekend batches available.\n\n` +
      `Free Demo ke liye contact karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 15. DSA & CODING (C++ / JAVA / PYTHON)
  if (/\b(dsa|data\s*structures?|algorithms?|leetcode|competitive\s*programming|coding\s*interview|c\+\+)\b/i.test(norm)) {
    return `🧩 **DSA & Coding Mastery (C++ / Java / Python)** (Duration: 3 Months)\n\n` +
      `• **Topics & Roadmap**:\n` +
      `  - Big-O Time & Space Complexity Analysis\n` +
      `  - Arrays, Strings, Two Pointers, Sliding Window Technique\n` +
      `  - Linked Lists, Stacks, Queues, Monotonic Queues\n` +
      `  - Binary Trees, Binary Search Trees (BST), Heaps & Priority Queues\n` +
      `  - Graph Theory: BFS, DFS, Dijkstra, Topological Sort, Disjoint Set Union (DSU)\n` +
      `  - Dynamic Programming (1D, 2D, Knapsack, Longest Common Subsequence)\n` +
      `  - 300+ Curated LeetCode problems & Mock FAANG Technical Coding Rounds\n\n` +
      `Free Demo Class ke liye connect karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 16. DIGITAL MARKETING
  if (/\b(digital\s*marketing|marketing|seo|google\s*ads|meta\s*ads|facebook\s*ads|social\s*media\s*marketing|smm|sem|ppc)\b/i.test(norm)) {
    return `📈 **Digital Marketing Masterclass** (Duration: 3 Months)\n\n` +
      `• **Comprehensive Syllabus**:\n` +
      `  - Search Engine Optimization (SEO): On-Page, Off-Page, Technical SEO, Local Google Maps SEO\n` +
      `  - Google Ads: Search, Display, Video, Shopping, Performance Max Campaigns\n` +
      `  - Meta Ads: Facebook & Instagram Ads Manager, Audience Targeting, Retargeting\n` +
      `  - Social Media Marketing (SMM): Content Strategy, LinkedIn & YouTube Growth\n` +
      `  - Web Analytics: Google Analytics 4 (GA4), Google Tag Manager (GTM), Conversion Tracking\n` +
      `  - Email Marketing Automation & Lead Funnels\n` +
      `  - AI for Marketers & Live Campaigns with Real Client Ad Budgets\n\n` +
      `• **Batches**: Mon-Fri (11:00 AM - 1:00 PM) | Sat-Sun (10:00 AM - 1:00 PM)\n\n` +
      `Free Demo Class ke liye sampark karein:\n` +
      `📞 Call: ${branch.phone}\n` +
      `💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n` +
      `📍 Center: ${branch.address}`;
  }

  // 17. FEES & INSTALLMENTS / EMI
  if (/\b(fee|fees|cost|price|paisa|kitna|installment|emi|discount|scholarship)\b/i.test(norm)) {
    return `NexxTechs me course fees student ke selected module, batch format aur scholarship test discount par depend karti hai. Hum **0% Interest EMI** aur **easy monthly installments** provide karte hain taaki padhai bilkul affordable rahe.\n\nExact fee structure, scholarship discounts aur syllabus PDF ke liye hamare ${branch.city} counselor se direct baat karein:\n📞 Call: ${branch.phone}\n💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n📍 Center: ${branch.address}`;
  }

  // 18. DEMO CLASS / TRIAL
  if (/\b(demo|trial|sample\s*class|free\s*class)\b/i.test(norm)) {
    return `Haan! NexxTechs par har course ke liye **100% Free Demo Class** available hai. Aap hamare ${branch.city} center par offline visit kar sakte hain ya Live Online interactive demo attend kar sakte hain.\n\nApna free demo slot confirm karne ke liye abhi call ya WhatsApp karein:\n📞 Call: ${branch.phone}\n💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n📍 Center: ${branch.address}`;
  }

  // 19. PLACEMENTS / JOBS / SALARY
  if (/\b(placement|job|package|salary|hiring|company|career)\b/i.test(norm)) {
    return `NexxTechs ka **95% Placement Track Record** hai aur 5000+ students top tech MNCs me place ho chuke hain! Hum provide karte hain:\n• 100% Placement Assistance Guarantee\n• Dedicated Placement Cell & 150+ Hiring Partners\n• Resume & LinkedIn Profile Optimization\n• 1-on-1 Mock Technical & HR Interviews\n\nRecent placement records aur hiring partners ki details ke liye counselor se connect karein:\n📞 Call: ${branch.phone}\n💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n📍 Center: ${branch.address}`;
  }

  // 20. BRANCH / ADDRESS / LOCATION
  if (/\b(address|location|center|branch|kahan|kaha|office|where)\b/i.test(norm)) {
    return `📍 **NexxTechs ${branch.name}**:\n${branch.address}\n📞 Call: ${branch.phone}\n💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n\n(Hamari doosri branch: **NexxTechs ${otherBranch.name}** — ${otherBranch.address} | Call: ${otherBranch.phone})\nOnline Live Interactive Classes bhi available hain!`;
  }

  // 21. BATCH TIMINGS
  if (/\b(batch|timing|timings|time|duration|morning|evening|weekend)\b/i.test(norm)) {
    return `NexxTechs me flexible batch timings available hain:\n• **Morning Batches**: 10:00 AM - 12:00 PM (Monday to Friday)\n• **Evening Batches**: 7:00 PM - 9:00 PM (Working professionals ke liye best)\n• **Weekend Batches**: 10:00 AM - 1:00 PM (Saturday & Sunday)\n\nAgla naya batch kab shuru ho raha hai janne ke liye ${branch.city} counselor se connect karein:\n📞 Call: ${branch.phone}\n💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n📍 Center: ${branch.address}`;
  }

  // 22. CERTIFICATE / CERTIFICATION
  if (/\b(certificate|certification|degree|diploma)\b/i.test(norm)) {
    return `Haan! Course successfully complete karne par aapko industry-recognized **NexxTechs Course Completion Certificate** aur **Live Capstone Project Experience Letter** milta hai. Saath hi global certification exams (AWS Certified, CEH, CompTIA, etc.) ki complete preparation karayi jaati hai.`;
  }

  // 23. ONLINE VS OFFLINE
  if (/\b(online|offline|hybrid|mode)\b/i.test(norm)) {
    return `NexxTechs par dono training modes available hain:\n• **Offline Classroom**: Hamare ${branch.name} par modern lab facilities aur mentor ke saath face-to-face training.\n• **Live Interactive Online**: Ghar baithe live sessions with class recordings & dedicated doubt support.\n\nFree demo class book karne ke liye contact karein:\n📞 Call: ${branch.phone}\n💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n📍 Center: ${branch.address}`;
  }

  // 24. DIRECT COUNSELOR CONTACT
  if (/\b(contact|phone|number|counselor|counsellor|consultant|call|whatsapp|baat)\b/i.test(norm)) {
    return `Aap hamare **${branch.name} Counselor** se direct baat kar sakte hain:\n📞 Call: ${branch.phone}\n💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n📍 Address: ${branch.address}`;
  }

  // 25. FALTU / EXTRA / UNRELATED QUESTION FALLBACK (User Rule: Direct to respective branch counselor)
  return `Yeh jankari mere paas uplabdh nahi hai. Main sirf NexxTechs ke IT courses, admissions aur career training ke sawaalo ke jawab de sakti hu.\n\nKisi bhi anya jankari ya personal career counseling ke liye aap hamare **${branch.name} Counselor** se direct baat kar sakte hain:\n📞 Call: ${branch.phone}\n💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})\n📍 Address: ${branch.address}`;
}

// POST /api/chat
router.post("/", async (req, res) => {
  try {
    const messages = cleanMessages(req.body?.messages);
    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return res.status(400).json({ error: "Message missing ya galat format me hai." });
    }

    const latestUserText = messages[messages.length - 1].content;
    const bodyBranch = String(req.body?.branch || "").toLowerCase();
    let isNoida = false;

    if (bodyBranch === "noida" || req.body?.isNoida === true) {
      isNoida = true;
    } else if (bodyBranch === "delhi" || req.body?.isNoida === false) {
      isNoida = false;
    } else {
      const referer = String(req.headers.referer || "").toLowerCase();
      isNoida = referer.includes("noida");
    }

    const reply = generateKnowledgeReply(latestUserText, isNoida);
    return res.json({ reply });
  } catch (err) {
    console.error("Chat router error:", err);
    const bodyBranch = String(req.body?.branch || "").toLowerCase();
    const isNoida = bodyBranch === "noida" || req.body?.isNoida === true;
    const branch = isNoida ? BRANCHES.noida : BRANCHES.delhi;
    return res.json({
      reply: `NexxTechs ke courses aur free demo class ke liye hamare counselor se direct connect karein:\n📞 Call: ${branch.phone}\n💬 WhatsApp: [💬 Chat on WhatsApp](${branch.whatsappUrl})`,
    });
  }
});

// GET /api/chat/detect-location
router.get("/detect-location", (req, res) => {
  const city = String(req.headers["cf-ipcity"] || req.headers["x-vercel-ip-city"] || "").toLowerCase();
  const region = String(req.headers["cf-region"] || req.headers["x-vercel-ip-country-region"] || "").toLowerCase();
  
  let branch = "delhi";
  if (city.includes("noida") || city.includes("ghaziabad") || region.includes("uttar pradesh")) {
    branch = "noida";
  }
  return res.json({ branch, city, region });
});

// GET /api/chat/health
router.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "Nexxi AI Chatbot Service (Pure Website Data Engine)",
    status: "active",
  });
});

export default router;
