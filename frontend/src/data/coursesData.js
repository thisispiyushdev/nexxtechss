// Brochure URLs
const BROCHURES = {
  "graphic-design": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/5dqm9aj0_Nexxtechs%20Graphic%20Design.pdf",
  "data-science": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/ahqd4k9j_Data%20Science.pdf",
  "cyber-security": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/80vqjbz6_Cyber%20Security.pdf%20%282%29.pdf",
  "data-analytics": "https://drive.google.com/file/d/1bLTYVi2td1EoEl22zkUqoulxHTX4VJJl/view",
  "digital-marketing": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/qybkbw7c_Nexxtechs%20Digital%20Marketing.pdf",
  "devops": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/33kmjfsa_Devops%20brochure.pdf",
  "cloud-computing": "https://drive.google.com/file/d/1Fb_ThEN7VtcRgiDsUDb1-t5QLeYiNrwI/view",
  "web-development": "https://drive.google.com/file/d/19r5PpBv2JuU80k3neQu0H15cs1l1h_iW/view",
  "ui-ux-design": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/5dqm9aj0_Nexxtechs%20Graphic%20Design.pdf",
};

const COURSES_DATA = [
  {
    slug: "data-analytics",
    isPopular: true,
    title: "Data Analytics",
    image: "/course-images/da.jpeg",
    tagline: "Turn raw data into actionable business insights",
    duration: "4 Months",
    level: "Beginner to Advanced",
    batchTimings: ["Mon-Fri: 10 AM - 12 PM", "Evening: 7 PM - 9 PM"],
    overview: "Master the complete data analytics pipeline. Learn Advanced Excel, SQL, Python, Power BI, and Tableau. Work on large, real-world datasets to identify trends and build interactive dashboards that drive corporate decisions.",
    highlights: ["Advanced SQL & Python", "Power BI & Tableau", "Business Intelligence", "Real-world Case Studies"],
    trendingTools: ["Power BI Copilot", "ChatGPT Data Analyst", "Jupyter Notebooks", "Tableau AI", "Snowflake"],
    modules: [
      { name: "Module 1: Advanced Excel for Data Analysis", topics: ["Advanced Formulas (VLOOKUP, INDEX/MATCH, XLOOKUP)", "Pivot Tables & Pivot Charts", "Power Query for Data Cleaning", "What-If Analysis & Goal Seek", "Macros & VBA Basics", "Building Excel Dashboards"] },
      { name: "Module 2: SQL Mastery & Database Querying", topics: ["RDBMS Concepts & ER Diagrams", "Advanced Joins, Unions & Set Operations", "Aggregate Functions & Grouping", "Window Functions (RANK, DENSE_RANK, LEAD, LAG)", "Subqueries & Common Table Expressions (CTEs)", "Query Optimization & Indexing basics"] },
      { name: "Module 3: Python for Data Analysis", topics: ["Python Basics & Data Structures", "NumPy for Numerical Computing", "Pandas for Data Manipulation & Wrangling", "Handling Missing Data & Outliers", "Exploratory Data Analysis (EDA) Techniques", "Automating Data Pipelines"] },
      { name: "Module 4: Data Visualization & Storytelling", topics: ["Visual Perception & Color Theory in Data", "Matplotlib & Seaborn in Python", "Choosing the Right Chart Types", "Data Storytelling Frameworks", "Avoiding Misleading Statistics", "Interactive Visualizations with Plotly"] },
      { name: "Module 5: Business Intelligence with Power BI", topics: ["Connecting Data Sources & Data Transformation", "Data Modeling & DAX Formulas", "Creating Interactive Reports & Dashboards", "Row-Level Security (RLS)", "Publishing & Sharing Workspaces", "Power BI Service Management"] },
      { name: "Module 6: Advanced BI with Tableau & Projects", topics: ["Tableau Interface & Data Connections", "Calculated Fields & Parameters", "Tableau Dashboards & Stories", "LOD Expressions", "Retail & Finance Case Studies", "Capstone Analytics Project Presentation"] },
    ],
    aboutContent: `Nexxtechs Institute offers one of the best Data Analyst courses in Delhi designed for students, freshers, and working professionals who want to build a successful career in data analytics. The course covers Excel, SQL, Power BI, Tableau, Python, Data Visualization, and Business Analytics with practical training and live projects.

If you are searching for the best data analyst institute in Delhi, best data analyst institute in Janakpuri, best data analyst institute in Vikaspuri, data analyst course in Delhi, Power BI training in Janakpuri, or data analytics classes near me, Nexxtechs Institute provides industry-focused training with placement assistance and certification support.`
  },
  {
    slug: "data-science",
    isPopular: true,
    title: "Data Science & GenAI",
    image: "/course-images/ds.jpeg",
    tagline: "Master AI, ML, Deep Learning & Generative AI",
    duration: "6 Months",
    level: "Intermediate to Advanced",
    batchTimings: ["Mon-Fri: 10 AM - 12 PM", "Sat-Sun: 10 AM - 1 PM", "Evening: 7 PM - 9 PM"],
    overview: "A rigorous, industry-aligned Data Science program. Covers Probability, Machine Learning, Deep Learning (PyTorch/TensorFlow), Natural Language Processing, and cutting-edge Generative AI & LLMs. Build deployable AI systems.",
    highlights: ["Machine Learning & DL", "LLMs & Prompt Engineering", "MLOps & Deployment", "Kaggle Competitions"],
    trendingTools: ["HuggingFace", "PyTorch", "LangChain", "OpenAI APIs", "Google Vertex AI", "Pinecone Vector DB"],
    modules: [
      { name: "Module 1: Python, Math & EDA", topics: ["Advanced Python & OOP for Data", "Linear Algebra & Calculus Basics", "Descriptive & Inferential Statistics", "Probability Distributions & Hypothesis Testing", "Pandas, NumPy, and Advanced EDA", "Feature Engineering & Selection"] },
      { name: "Module 2: Supervised Machine Learning", topics: ["Linear & Logistic Regression", "Decision Trees & Random Forests", "Support Vector Machines (SVM)", "Gradient Boosting (XGBoost, LightGBM)", "Hyperparameter Tuning (GridSearch, Optuna)", "Imbalanced Data Handling (SMOTE)"] },
      { name: "Module 3: Unsupervised ML & Recommendation Systems", topics: ["K-Means & Hierarchical Clustering", "Dimensionality Reduction (PCA, t-SNE)", "Association Rules (Apriori)", "Collaborative & Content-Based Filtering", "Matrix Factorization", "Building Recommender Engines"] },
      { name: "Module 4: Deep Learning & Computer Vision", topics: ["Artificial Neural Networks (ANNs)", "Backpropagation & Optimization Algorithms", "PyTorch & TensorFlow/Keras Frameworks", "Convolutional Neural Networks (CNNs)", "Image Classification & Object Detection (YOLO)", "Transfer Learning (ResNet, VGG)"] },
      { name: "Module 5: NLP & Sequence Models", topics: ["Text Preprocessing (Tokenization, Stemming, TF-IDF)", "Word Embeddings (Word2Vec, GloVe)", "Recurrent Neural Networks (RNNs) & LSTMs", "Attention Mechanisms", "Sentiment Analysis & Named Entity Recognition (NER)", "Machine Translation Basics"] },
      { name: "Module 6: Generative AI & LLMs (Trending)", topics: ["Transformer Architecture Deep Dive", "HuggingFace Ecosystem", "Fine-Tuning LLMs (LoRA, QLoRA)", "Prompt Engineering & RAG (Retrieval-Augmented Generation)", "LangChain & LlamaIndex Frameworks", "Building AI Agents"] },
      { name: "Module 7: MLOps & Production", topics: ["Model Serialization (Pickle, ONNX)", "Building APIs with FastAPI/Flask", "Containerization with Docker", "MLflow for Experiment Tracking", "CI/CD for Machine Learning", "Deploying Models to AWS/GCP (SageMaker)"] },
    ],
    aboutContent: `Nexxtechs Institute offers one of the best Data Science courses in Delhi designed for students, freshers, working professionals, and aspiring data analysts who want to build a successful career in the technology industry. Our industry-focused Data Science training covers important concepts like Python Programming, Data Analysis, Machine Learning, Artificial Intelligence, Data Visualization, SQL, and Predictive Analytics with practical training and live projects.

If you are searching for the best data science institute in Delhi, best data science institute in Janakpuri, best data science institute in Vikaspuri, data science course in Delhi, Python course in Janakpuri, machine learning training in Vikaspuri, or data science classes near me, Nexxtechs Institute provides complete professional training with expert guidance and placement assistance.

Our advanced Data Science course helps students develop practical skills in data analysis, business intelligence, machine learning models, and AI-based solutions that are highly demanded across industries. With live projects, industry-oriented curriculum, certifications, flexible batch timings, and career support, Nexxtechs Institute helps students become job-ready data science professionals.`
  },
  {
    slug: "cloud-computing",
    isPopular: true,
    title: "Cloud Computing",
    image: "/course-images/ccp.jpeg",
    tagline: "Architect scalable systems on AWS, Azure & GCP",
    duration: "5 Months",
    level: "Intermediate",
    batchTimings: ["Mon-Fri: 10 AM - 12 PM", "Evening: 7 PM - 9 PM"],
    overview: "Master modern cloud architecture. This course covers everything from virtualization basics to advanced cloud-native design across AWS, Azure, and Google Cloud Platform. Prepare for top industry certifications while doing hands-on labs.",
    highlights: ["AWS Solutions Architect Prep", "Multi-Cloud Strategies", "Infrastructure as Code", "Serverless Architectures"],
    trendingTools: ["AWS Bedrock", "Azure OpenAI", "Terraform", "Serverless Framework", "AWS Lambda"],
    modules: [
      { name: "Module 1: Cloud & Networking Fundamentals", topics: ["Virtualization vs Containerization", "IaaS, PaaS, SaaS Models", "OSI Model, IP Subnetting & CIDR", "DNS, Load Balancing & Firewalls", "Cloud Security Principles", "Cost Management Basics"] },
      { name: "Module 2: AWS Core Services", topics: ["IAM (Identity & Access Management)", "VPC (Virtual Private Cloud) Design", "Compute: EC2, Auto Scaling, Elastic Beanstalk", "Storage: S3, EBS, EFS", "Databases: RDS, DynamoDB, Redshift", "AWS CLI & SDKs"] },
      { name: "Module 3: Advanced AWS & Serverless", topics: ["Serverless Architecture with AWS Lambda", "API Gateway & Step Functions", "Message Queues: SQS, SNS, EventBridge", "CloudFront & Route 53", "CloudFormation & AWS CDK", "AWS Well-Architected Framework"] },
      { name: "Module 4: Microsoft Azure Fundamentals", topics: ["Azure Active Directory (Entra ID)", "Azure Virtual Machines & App Services", "Azure VNet & ExpressRoute", "Azure SQL & Cosmos DB", "Azure Functions & Logic Apps", "Azure Resource Manager (ARM)"] },
      { name: "Module 5: Google Cloud Platform (GCP)", topics: ["GCP Resource Hierarchy & IAM", "Compute Engine & Cloud Run", "VPC Networks & Cloud Load Balancing", "Cloud Storage & BigQuery", "Google Kubernetes Engine (GKE) basics", "Pub/Sub Messaging"] },
      { name: "Module 6: Cloud Security & Migration", topics: ["Zero Trust Architecture", "Encryption at Rest & in Transit (KMS)", "DDoS Protection & WAF", "Cloud Migration Strategies (Rehost, Replatform)", "Disaster Recovery & High Availability", "Compliance (HIPAA, GDPR) in Cloud"] },
    ],
    aboutContent: `Nexxtechs Institute offers advanced Cloud Computing training in Delhi designed to help students learn cloud technologies like AWS, Microsoft Azure, Google Cloud, cloud infrastructure, virtualization, and cloud deployment.

If you are searching for the best cloud computing institute in Delhi, best cloud computing institute in Janakpuri, best cloud computing institute in Vikaspuri, AWS training institute in Delhi, cloud computing classes near me, or Azure course in Janakpuri, Nexxtechs Institute provides practical training with live projects and certification guidance.`
  },
  {
    slug: "cyber-security",
    isPopular: true,
    title: "Cyber Security & Ethical Hacking",
    image: "/course-images/cyber.jpeg",
    tagline: "Defend networks and exploit vulnerabilities",
    duration: "5 Months",
    level: "Intermediate to Advanced",
    batchTimings: ["Weekdays (Mon-Fri): 10:00 AM - 7:00 PM", "Weekends (Sat-Sun): 10:00 AM - 7:00 PM"],
    overview: "Become a cybersecurity expert. Learn ethical hacking, penetration testing, network defense, cryptography, and digital forensics. Get hands-on with Kali Linux, Metasploit, and Burp Suite. Prepared for CEH and CompTIA certifications.",
    highlights: ["Offensive & Defensive Security", "Hands-on Kali Linux Labs", "Web App Pen Testing", "Blue Team Operations"],
    trendingTools: ["WormGPT (Awareness)", "AI Threat Hunting", "Burp Suite BCheck", "Kali Linux Purple", "CrowdStrike Falcon"],
    modules: [
      { name: "Module 1: Networking & Security Basics", topics: ["TCP/IP, OSI Model & Wireshark", "Routing & Switching Fundamentals", "Cryptography: Symmetric, Asymmetric, Hashes", "PKI & Digital Certificates", "Threat Modeling & Risk Assessment", "Security Frameworks (NIST, ISO 27001)"] },
      { name: "Module 2: Reconnaissance & Scanning", topics: ["OSINT (Open Source Intelligence)", "Footprinting & DNS Enumeration", "Network Scanning (Nmap, Masscan)", "Vulnerability Scanning (Nessus, OpenVAS)", "Banner Grabbing & Service Identification", "Social Engineering Techniques"] },
      { name: "Module 3: System Hacking & Exploitation", topics: ["Kali Linux Mastery", "Metasploit Framework Deep Dive", "Privilege Escalation (Windows & Linux)", "Password Cracking (Hashcat, John the Ripper)", "Malware: Trojans, Viruses, Ransomware", "Pivoting & Maintaining Access"] },
      { name: "Module 4: Web Application Penetration Testing", topics: ["OWASP Top 10 Vulnerabilities", "SQL Injection (SQLi) & XSS", "Cross-Site Request Forgery (CSRF)", "Burp Suite Professional usage", "API Security & Testing", "Authentication & Session Management Flaws"] },
      { name: "Module 5: Wireless & Mobile Security", topics: ["WPA2/WPA3 Cracking (Aircrack-ng)", "Rogue Access Points & Evil Twin attacks", "Bluetooth Security", "Android/iOS Architecture", "Mobile App Reverse Engineering", "Mobile App Vulnerability Analysis"] },
      { name: "Module 6: Blue Team Operations & Incident Response", topics: ["Firewalls, IDS/IPS Configuration", "SIEM Tools (Splunk, ELK Stack)", "Log Analysis & Threat Hunting", "Digital Forensics Basics", "Incident Response Playbooks", "Malware Analysis Fundamentals"] },
    ],
    aboutContent: `Nexxtechs Institute provides one of the best Cyber Security courses in Delhi for students and professionals who want to learn ethical hacking, network security, cyber defense, and penetration testing. The course includes practical training on real-world cyber security tools and techniques.

If you are looking for the best cyber security institute in Delhi, best cyber security institute in Janakpuri, best cyber security institute in Vikaspuri, ethical hacking course in Delhi, cyber security training near me, or penetration testing course in Janakpuri, Nexxtechs Institute offers complete practical training with expert guidance and placement support.`
  },
  {
    slug: "devops",
    isTrending: true,
    title: "DevOps Engineering",
    image: "/course-images/Devops.jpeg",
    tagline: "Automate, deploy, and scale with CI/CD & Kubernetes",
    duration: "4 Months",
    level: "Intermediate",
    batchTimings: ["Mon-Fri: 10 AM - 12 PM", "Evening: 7 PM - 9 PM"],
    overview: "Bridge the gap between development and operations. Master the complete DevOps lifecycle using industry-standard tools like Docker, Kubernetes, Jenkins, Terraform, and Prometheus. Build robust, automated infrastructure.",
    highlights: ["Kubernetes Administration", "Infrastructure as Code", "CI/CD Pipelines", "Site Reliability Engineering"],
    trendingTools: ["GitHub Copilot CLI", "Kubernetes", "ArgoCD (GitOps)", "Terraform", "Prometheus AI"],
    modules: [
      { name: "Module 1: System Admin & Scripting", topics: ["Advanced Linux Administration", "Bash Scripting & Automation", "Python for DevOps", "User & Permissions Management", "Networking commands & Troubleshooting", "SSH & Security Hardening"] },
      { name: "Module 2: Version Control & GitOps", topics: ["Git internals & Branching Strategies (GitFlow)", "GitHub Actions & GitLab CI", "Code Reviews & Pull Request Workflows", "GitOps Principles", "ArgoCD & Flux Fundamentals", "Managing Secrets (HashiCorp Vault)"] },
      { name: "Module 3: Containerization with Docker", topics: ["Docker Architecture & Daemon", "Writing optimized Dockerfiles", "Docker Compose for multi-container apps", "Docker Volumes & Networking", "Image Security & Scanning", "Building minimal images (Alpine, Distroless)"] },
      { name: "Module 4: Container Orchestration (Kubernetes)", topics: ["K8s Architecture (Control Plane, Nodes)", "Pods, ReplicaSets, Deployments", "Services, Ingress & Networking", "Persistent Volumes (PV) & PVCs", "ConfigMaps & Secrets", "Helm Charts for Package Management"] },
      { name: "Module 5: Continuous Integration / Continuous Deployment (CI/CD)", topics: ["Jenkins Pipelines (Declarative & Scripted)", "Automated Testing Integration", "SonarQube for Code Quality", "Blue-Green & Canary Deployments", "Artifact Repositories (Nexus, Artifactory)", "Spinnaker basics"] },
      { name: "Module 6: Infrastructure as Code (IaC) & Cloud", topics: ["Terraform State & Modules", "Provisioning AWS/Azure with Terraform", "Ansible Playbooks & Roles", "Configuration Management", "Immutable Infrastructure", "Packer for Image Baking"] },
      { name: "Module 7: Monitoring, Logging & SRE", topics: ["Prometheus & Metrics Collection", "Grafana Dashboards & Alerting", "ELK Stack (Elasticsearch, Logstash, Kibana)", "Distributed Tracing (Jaeger, OpenTelemetry)", "Site Reliability Engineering (SLIs, SLOs, SLAs)", "Incident Management"] },
    ],
    aboutContent: `Nexxtechs Institute offers advanced DevOps training in Delhi designed for students and IT professionals who want to learn modern software development and deployment practices. The course covers Linux, Git, GitHub, Docker, Kubernetes, Jenkins, AWS, CI/CD Pipelines, and Infrastructure Automation with practical projects.

If you are searching for the best DevOps institute in Delhi, best DevOps institute in Janakpuri, best DevOps institute in Vikaspuri, DevOps course in Delhi, Docker and Kubernetes training near me, or AWS DevOps training in Janakpuri, Nexxtechs Institute provides hands-on practical training with expert guidance and career support.`
  },
  {
    slug: "dsa",
    isTrending: true,
    title: "DSA (C++/Python)",
    image: "/course-images/dsa.jpeg",
    tagline: "Crack FAANG-level coding interviews with confidence",
    duration: "3 Months",
    level: "Intermediate",
    batchTimings: ["Mon-Fri: 10 AM - 12 PM", "Sat-Sun: 10 AM - 1 PM"],
    overview: "Master Data Structures and Algorithms focusing on problem-solving patterns. Solve 300+ carefully curated problems from LeetCode, Codeforces, and HackerRank. Includes mock interviews and competitive programming strategies.",
    highlights: ["300+ LeetCode Problems", "Algorithmic Patterns", "System Design Basics", "Mock Interviews"],
    trendingTools: ["LeetCode AI Companion", "Cursor IDE", "Big O visualizers", "Codeforces", "GitHub Actions"],
    modules: [
      { name: "Module 1: Complexity & Math Fundamentals", topics: ["Time & Space Complexity (Big O Notation)", "Master Theorem & Recurrence Relations", "Number Theory & Modular Arithmetic", "Bit Manipulation Techniques", "Combinatorics Basics", "Pointers & Memory Management (C++)"] },
      { name: "Module 2: Arrays, Strings & Search", topics: ["Array Manipulation & Two Pointers Pattern", "Sliding Window Pattern (Fixed & Variable)", "Prefix Sums & Hashing", "String Matching Algorithms (KMP, Rabin-Karp)", "Binary Search on Answers", "Sorting Algorithms Deep Dive"] },
      { name: "Module 3: Linked Lists, Stacks & Queues", topics: ["Singly, Doubly & Circular Linked Lists", "Floyd's Cycle Detection", "Stack Implementation & Monotonic Stacks", "Queue & Deque applications", "LRU / LFU Cache Implementation", "Expression Evaluation"] },
      { name: "Module 4: Recursion, Trees & Heaps", topics: ["Recursion Tree & Backtracking", "Binary Trees & Traversal Techniques", "Binary Search Trees (BST) & Operations", "Priority Queues & Heapsort", "Segment Trees & Fenwick Trees (BIT)", "Trie Data Structure"] },
      { name: "Module 5: Graph Theory", topics: ["Graph Representation (Matrix/List)", "BFS & DFS Applications", "Shortest Path (Dijkstra, Bellman-Ford)", "Minimum Spanning Tree (Prim, Kruskal)", "Topological Sorting", "Strongly Connected Components (Kosaraju)"] },
      { name: "Module 6: Advanced Dynamic Programming", topics: ["Memoization vs Tabulation", "1D DP & State Transitions", "2D DP & Grid Problems", "Knapsack Pattern & Variations", "Longest Common Subsequence Pattern", "DP on Trees & Graph DP"] },
    ],
    aboutContent: `Nexxtechs Institute offers one of the best DSA courses in Delhi designed for students, programmers, and aspiring software developers who want to improve their coding and problem-solving skills. The course covers Arrays, Linked Lists, Trees, Graphs, Stacks, Queues, Recursion, Sorting Algorithms, Searching Techniques, and Competitive Programming concepts with practical coding sessions.

If you are searching for the best DSA institute in Delhi, best DSA institute in Janakpuri, best DSA institute in Vikaspuri, DSA course in Delhi, coding classes near me, or data structures training in Janakpuri, Nexxtechs Institute provides industry-focused training with expert mentorship and interview preparation support.`
  },
  {
    slug: "python-full-stack",
    isTrending: true,
    title: "Python Full Stack Development",
    image: "/course-images/python.jpeg",
    tagline: "Build powerful, AI-ready apps with Python & Django",
    duration: "6 Months",
    level: "Beginner to Advanced",
    batchTimings: ["Mon-Fri: 10 AM - 12 PM", "Sat-Sun: 10 AM - 1 PM"],
    overview: "Learn modern web development using Python. Master Django, FastAPI, PostgreSQL, and React. Learn how to integrate AI models and APIs into your web applications, making you a highly relevant developer.",
    highlights: ["Django & FastAPI", "AI Integration", "React Frontend", "Celery & Redis"],
    trendingTools: ["LangChain Integration", "FastAPI", "OpenAI APIs", "Cursor IDE", "Docker"],
    modules: [
      { name: "Module 1: Advanced Python & Architecture", topics: ["Python 3.10+ Features", "Decorators, Generators & Iterators", "Advanced OOP & Dunder Methods", "Context Managers", "Type Hinting & Pydantic", "Pytest & Test-Driven Development (TDD)", "Web Scraping (BeautifulSoup, Selenium)"] },
      { name: "Module 2: Django Web Framework", topics: ["Django MTV Architecture", "Models, Migrations & Django ORM", "Views (FBV & CBV) and URLs", "Templates & Form Handling", "Django Admin Customization", "User Authentication & Permissions"] },
      { name: "Module 3: REST APIs with Django REST Framework (DRF)", topics: ["Serializers & ViewSets", "Authentication (Token, JWT)", "Pagination, Filtering & Search", "Throttling & API Security", "Nested Serializers & Relationships", "Documenting APIs with Swagger"] },
      { name: "Module 4: High-Performance APIs with FastAPI", topics: ["Asynchronous Python (asyncio)", "FastAPI Routing & Dependency Injection", "Pydantic Models & Data Validation", "WebSockets in FastAPI", "Background Tasks", "SQLAlchemy ORM integration"] },
      { name: "Module 5: Background Jobs & Databases", topics: ["PostgreSQL Advanced Features", "Redis Setup & Caching", "Celery for Asynchronous Task Queues", "Handling File Uploads (AWS S3)", "Integrating OpenAI APIs / LLMs into Apps", "Dockerizing Python Apps"] },
      { name: "Module 6: React Frontend & Deployment", topics: ["React & Component Architecture", "Consuming REST & GraphQL APIs", "State Management & React Query", "TailwindCSS styling", "Deploying Django/FastAPI on AWS EC2", "CI/CD Setup with GitHub Actions"] },
    ],
    aboutContent: `Nexxtechs Institute offers one of the best Python Full Stack Development courses in Delhi for students and aspiring developers who want to build professional web application development skills. The course covers Python, Django, HTML, CSS, JavaScript, React, APIs, SQL, Bootstrap, and full-stack web development with live projects and practical training.

If you are searching for the best Python full stack institute in Delhi, best Python full stack institute in Janakpuri, best Python full stack institute in Vikaspuri, Python full stack course in Delhi, Django training near me, or full stack Python developer course in Janakpuri, Nexxtechs Institute provides industry-oriented training with placement assistance and real-time project experience.`
  },
  {
    slug: "web-development",
    isTrending: true,
    title: "Web Development",
    image: "/course-images/web.jpeg",
    tagline: "Build modern, responsive web applications from scratch with trending tech",
    duration: "6 Months",
    level: "Beginner to Advanced",
    batchTimings: ["Weekdays (Mon-Fri): 10:00 AM - 7:00 PM", "Weekends (Sat-Sun): 10:00 AM - 7:00 PM"],
    overview: "Master the art of modern web development. This comprehensive program covers everything from foundational HTML/CSS to advanced React 19, Next.js 15, Node.js, and cloud deployments. Build scalable real-world projects and become a highly sought-after full-stack developer.",
    highlights: ["20+ Live Projects", "Next.js & React 19", "TailwindCSS & TypeScript", "100% Placement Assistance"],
    trendingTools: ["GitHub Copilot", "Cursor IDE", "Vercel AI SDK", "Next.js 15", "TailwindCSS"],
    modules: [
      { name: "Module 1: Web Fundamentals & Modern UI", topics: ["Semantic HTML5 & Accessibility (a11y)", "Advanced CSS3, Flexbox & CSS Grid", "Responsive Design & Mobile-First Approach", "TailwindCSS: Utility-first styling", "CSS Animations, Keyframes & Transitions", "Figma to Code conversion", "SEO Best Practices for Markup"] },
      { name: "Module 2: Deep Dive into JavaScript & TypeScript", topics: ["JavaScript Engine (V8), Execution Context & Hoisting", "ES6+ Features (Arrow functions, Destructuring, Spread)", "Asynchronous JS: Promises, Async/Await, Event Loop", "DOM Manipulation & Browser APIs", "Object-Oriented Programming (OOP) in JS", "TypeScript Fundamentals: Types, Interfaces & Generics", "Modern Tooling: Vite, Webpack, & Babel"] },
      { name: "Module 3: Advanced React.js Ecosystem", topics: ["React 19 Core: Virtual DOM, JSX, Components", "Hooks Deep Dive (useState, useEffect, useMemo, custom hooks)", "State Management: Redux Toolkit (RTK) & Zustand", "React Router DOM & Navigation Patterns", "React Query (TanStack) for Data Fetching & Caching", "UI Libraries: Shadcn UI, Radix UI & Material UI", "Performance Optimization & Code Splitting"] },
      { name: "Module 4: Full-Stack with Next.js", topics: ["Next.js 15 App Router & Server Components", "Server-Side Rendering (SSR) & Static Site Generation (SSG)", "API Routes & Server Actions", "SEO Optimization & Metadata", "Authentication with NextAuth.js & Clerk", "Edge Computing & Middleware"] },
      { name: "Module 5: Backend Engineering with Node & Express", topics: ["Node.js Architecture & Non-blocking I/O", "Express.js RESTful API Design", "GraphQL Basics & Apollo Server", "Authentication: JWT, OAuth & Session Management", "Security: CORS, Rate Limiting, Helmet & Bcrypt", "File Uploads, Multer & AWS S3 Integration", "WebSockets & Socket.io for Real-time Apps"] },
      { name: "Module 6: Modern Databases & ORMs", topics: ["MongoDB & Mongoose (NoSQL)", "PostgreSQL Fundamentals (Relational)", "Prisma ORM & Drizzle ORM", "Database Indexing & Performance Tuning", "Redis Caching Strategies", "Firebase & Supabase for BaaS"] },
      { name: "Module 7: DevOps, Testing & Deployment", topics: ["Git, GitHub Actions & CI/CD Pipelines", "Docker Basics & Containerization", "Testing: Jesst, React Testing Library, Cypress (E2E)", "Deployment platforms: Vercel, Netlify, Render", "Nginx & Linux Server Basics", "Monitoring & Logging (Sentry, Datadog)"] },
    ],
    aboutContent: `Nexxtechs Institute offers one of the best Full Stack Development courses in Delhi designed for students and aspiring developers who want to build professional web development skills. The course covers HTML, CSS, JavaScript, React, Node.js, MongoDB, Express.js, APIs, and responsive website development with live projects.

If you are searching for the best full stack institute in Delhi, best full stack institute in Janakpuri, best full stack institute in Vikaspuri, full stack developer course in Delhi, web development training near me, or MERN stack course in Janakpuri, Nexxtechs Institute provides practical training, expert mentorship, and placement support to help students become industry-ready developers.`
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    image: "/course-images/uiuxx.jpeg",
    tagline: "Create stunning user experiences that convert",
    duration: "4 Months",
    level: "Beginner to Advanced",
    batchTimings: ["Weekdays (Mon-Fri): 10:00 AM - 7:00 PM", "Weekends (Sat-Sun): 10:00 AM - 7:00 PM"],
    overview: "Master the complete design lifecycle. From user research and wireframing to high-fidelity prototyping and design systems. Learn industry-standard tools like Figma and Framer to build portfolios that stand out.",
    highlights: ["Figma & Framer Mastery", "Design Systems", "Real Client Projects", "Interaction Design"],
    trendingTools: ["Figma AI", "Framer", "Midjourney for UI Assets", "Galileo AI", "Spline 3D"],
    modules: [
      { name: "Module 1: Design Fundamentals & Psychology", topics: ["Color Theory, Psychology & Palettes", "Typography Scales & Font Pairing", "Layout Principles, Grids & Spacing Systems", "Visual Hierarchy & Gestalt Principles", "Accessibility (WCAG) & Inclusive Design", "Heuristic Evaluation"] },
      { name: "Module 2: UX Research & Discovery", topics: ["User Interviews & Empathy Mapping", "Creating User Personas & Scenarios", "User Journey Mapping & Experience Maps", "Information Architecture & Card Sorting", "Competitor Analysis & UX Audits", "Defining Problem Statements"] },
      { name: "Module 3: Wireframing & Information Design", topics: ["Low-Fidelity & High-Fidelity Wireframes", "User Flows & Task Flows", "Paper Prototyping & Sketching", "Balsamiq & Whimsical", "Navigational Structures"] },
      { name: "Module 4: UI Design Mastery with Figma", topics: ["Figma Interface, Shortcuts & Plugins", "Components, Variants & Auto Layout", "Building Scalable Design Systems & Tokens", "Variables, Modes & Prototyping in Figma", "Responsive & Adaptive Design Strategies", "Developer Handoff (Zeplin, Figma Dev Mode)"] },
      { name: "Module 5: Advanced Interaction & Motion Design", topics: ["Micro-interactions & Meaningful Motion", "Advanced Prototyping (Smart Animate)", "Framer for High-Fidelity Interactive Prototypes", "Lottie Animations & After Effects Basics", "State Changes & Feedback Loops"] },
      { name: "Module 6: Testing, Analytics & Portfolio", topics: ["Usability Testing & A/B Testing", "Heatmaps & User Tracking (Hotjar/Clarity)", "Iterative Design & Feedback Implementation", "Creating Case Studies for Portfolios", "Behance/Dribbble Profile Optimization", "Freelancing & Client Pitching"] },
    ],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    image: "/course-images/graphicc.jpeg",
    tagline: "Master visual communication & branding",
    duration: "3 Months",
    level: "Beginner",
    batchTimings: ["Weekdays (Mon-Fri): 10:00 AM - 7:00 PM", "Weekends (Sat-Sun): 10:00 AM - 7:00 PM"],
    overview: "Become a professional graphic designer with hands-on training in the Adobe Creative Cloud. Create logos, posters, social media content, print materials, and develop complete brand identities.",
    highlights: ["Adobe Creative Cloud", "Brand Identity Systems", "Print & Digital Formats", "GenAI Design Tools"],
    trendingTools: ["Midjourney v6", "Adobe Firefly", "Canva Magic Studio", "ChatGPT for Prompts", "DALL-E 3"],
    modules: [
      { name: "Module 1: Design Theory & Fundamentals", topics: ["Elements & Principles of Design", "Color Theory & Harmonies", "Typography Rules & Pairing", "Composition & Grid Systems", "Understanding Image Formats (Raster vs Vector)", "Design Thinking Process"] },
      { name: "Module 2: Image Editing & Manipulation (Photoshop)", topics: ["Photoshop Workspace, Layers & Masks", "Advanced Retouching & Color Correction", "Non-Destructive Editing & Smart Objects", "Compositing, Blending Modes & Filters", "Creating Mockups & Web Graphics", "Actions & Batch Processing"] },
      { name: "Module 3: Vector Graphics & Illustration (Illustrator)", topics: ["Pen Tool Mastery & Pathfinders", "Creating Scalable Logos & Icons", "Typography Manipulation in Illustrator", "Perspective Drawing & Isometric Design", "Pattern Creation & Brushes", "Infographic Design"] },
      { name: "Module 4: Layout & Print Design (InDesign)", topics: ["Master Pages & Paragraph Styles", "Magazine & Brochure Layouts", "Print Pre-press, Bleeds & Margins", "E-book & Interactive PDF Creation", "Packaging Design Fundamentals"] },
      { name: "Module 5: Branding & Identity Systems", topics: ["Brand Strategy & Target Audience", "Logo Design Process (Sketch to Digital)", "Creating Comprehensive Brand Guidelines", "Designing Stationery & Merchandise", "Presenting Designs to Clients"] },
      { name: "Module 6: Modern Tools & Freelancing", topics: ["Canva Mastery for Quick Turnarounds", "Integrating Generative AI (Midjourney, Firefly)", "Social Media Grid & Carousel Design", "Building a Strong Behance Portfolio", "Pricing Strategies & Client Contracts"] },
    ],
    aboutContent: `Nexxtechs Institute provides one of the best Graphic Designing courses in Delhi for students and creative professionals who want to learn professional design skills. The course covers Adobe Photoshop, Illustrator, CorelDRAW, Canva, UI Design, Branding, and Social Media Design with hands-on practical training.

If you are searching for the best graphic designing institute in Delhi, best graphic designing institute in Janakpuri, best graphic designing institute in Vikaspuri, graphic design course in Delhi, Photoshop training near me, or UI/UX design course in Janakpuri, Nexxtechs Institute offers industry-oriented training with portfolio development and placement assistance.`
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    image: "/course-images/dmm.jpeg",
    tagline: "Drive exponential growth with data-driven strategies",
    duration: "3 Months",
    level: "Beginner to Advanced",
    batchTimings: ["Mon-Fri: 11 AM - 1 PM", "Sat-Sun: 10 AM - 1 PM"],
    overview: "A comprehensive program on modern digital marketing. Learn SEO, SEM, Social Media, Email Automation, and Advanced Analytics. Execute live campaigns with real budgets and become a full-stack growth hacker.",
    highlights: ["Performance Marketing", "Google Ads & Meta Ads", "Marketing Automation", "AI in Marketing"],
    trendingTools: ["Jasper AI", "ChatGPT Plus", "Midjourney for Ads", "Google Performance Max", "Klaviyo AI"],
    modules: [
      { name: "Module 1: Marketing Fundamentals & Strategy", topics: ["Inbound vs Outbound Marketing", "Customer Avatars & Buyer Personas", "The Marketing Funnel (AARRR Framework)", "Competitor Analysis & USP Definition", "Brand Positioning", "Introduction to AI Tools (ChatGPT, Jasper)"] },
      { name: "Module 2: Search Engine Optimization (SEO)", topics: ["Keyword Research Tools (Ahrefs, SEMrush)", "On-Page SEO & Content Optimization", "Technical SEO (Core Web Vitals, Schema)", "Off-Page SEO & Link Building Strategies", "Local SEO & Google My Business", "SEO Auditing & Reporting"] },
      { name: "Module 3: Social Media Marketing (Organic)", topics: ["Platform Algorithms (Instagram, LinkedIn, X, TikTok)", "Content Calendars & Scheduling Tools (Buffer, Hootsuite)", "Viral Hooks & Short-form Video Strategy", "Community Building & Engagement", "Influencer Marketing & Outreach"] },
      { name: "Module 4: Performance Marketing (Paid Ads)", topics: ["Meta Ads Business Manager Setup", "Facebook/Instagram Targeting & Retargeting", "Google Ads (Search, Display, Performance Max)", "LinkedIn B2B Advertising", "A/B Testing Ad Creatives & Copy", "ROAS, CPA, and Budget Optimization"] },
      { name: "Module 5: Content, Email & Automation", topics: ["Copywriting Frameworks (AIDA, PAS)", "Blogging & Content Distribution", "Email Marketing Platforms (Mailchimp, Klaviyo)", "Drip Campaigns & Lead Nurturing sequences", "Marketing Automation & Zapier Integration", "Landing Page Optimization (Unbounce, Leadpages)"] },
      { name: "Module 6: Web Analytics & Reporting", topics: ["Google Analytics 4 (GA4) Deep Dive", "Google Tag Manager (GTM) Event Tracking", "UTM Parameters & Campaign Attribution", "Data Visualization with Looker Studio", "Creating Client ROI Reports", "Conversion Rate Optimization (CRO)"] },
    ],
    aboutContent: `Nexxtechs Institute is recognized as one of the best digital marketing institutes in Delhi offering professional and practical digital marketing training for students, freshers, business owners, freelancers, and working professionals. Our industry-oriented course is designed to help students master SEO, Google Ads, Social Media Marketing, Content Marketing, Email Marketing, and Web Analytics with live projects and real-time practical exposure.

If you are searching for the best digital marketing institute in Delhi, best digital marketing institute in Janakpuri, best digital marketing institute in Vikaspuri, digital marketing course in Delhi, SEO training institute in Janakpuri, Google Ads course in Vikaspuri, or digital marketing classes near me, Nexxtechs Institute provides the perfect learning environment with expert trainers and placement assistance.

Our advanced digital marketing course focuses on practical learning, website ranking strategies, lead generation, social media advertising, and performance marketing techniques that help students become industry-ready professionals. With affordable fees, flexible batch timings, certifications, and career support, Nexxtechs Institute helps students build successful careers in the digital marketing industry.`
  },
  {
    slug: "java-full-stack",
    title: "Java Full Stack Development",
    image: "/course-images/java-fullstack.jpeg",
    tagline: "Enterprise-grade full stack development with Java & React",
    duration: "6 Months",
    level: "Beginner to Advanced",
    batchTimings: ["Mon-Fri: 10 AM - 12 PM", "Evening: 7 PM - 9 PM"],
    overview: "Become an Enterprise Java Developer. Master Core Java, Spring Boot 3, Hibernate, Microservices architecture, and a modern React frontend. Build highly scalable applications used by Fortune 500 companies.",
    highlights: ["Spring Boot 3 & Microservices", "React 19 Frontend", "Kafka & Redis", "Cloud Deployment"],
    trendingTools: ["IntelliJ AI Assistant", "Spring Boot 3.2", "Kafka", "Docker", "React 19"],
    modules: [
      { name: "Module 1: Core Java & OOP Mastery", topics: ["Java 17+ Features (Records, Pattern Matching)", "Advanced Object-Oriented Programming", "Java Collections Framework Deep Dive", "Generics & Reflection API", "Exception Handling Best Practices", "File I/O & NIO", "Java 8 Streams & Functional Interfaces"] },
      { name: "Module 2: Advanced Java & Concurrency", topics: ["Multithreading & Concurrency API", "Thread Pools & Executors", "Locks, Synchronization & Atomic Variables", "JDBC & Database Connectivity", "Design Patterns (Singleton, Factory, Builder, Observer)", "JUnit 5 & Mockito for Unit Testing"] },
      { name: "Module 3: Hibernate & JPA", topics: ["ORM Concepts & Entity Mapping", "HQL & Criteria API", "Associations (OneToMany, ManyToMany)", "Caching in Hibernate (L1 & L2)", "Transaction Management", "Performance Tuning & N+1 Problem"] },
      { name: "Module 4: Spring Framework & Spring Boot 3", topics: ["Spring Core (IoC & Dependency Injection)", "Spring Boot Auto-configuration", "Creating RESTful Web Services", "Spring Data JPA integration", "Spring Security, OAuth2 & JWT", "AOP (Aspect-Oriented Programming)"] },
      { name: "Module 5: Microservices & Event-Driven Architecture", topics: ["Microservices Design Patterns", "Service Discovery (Eureka) & API Gateway", "Resilience4j & Circuit Breaker", "Apache Kafka for Event-Driven Systems", "Distributed Tracing (Sleuth/Zipkin)", "Redis for Caching & Session Management"] },
      { name: "Module 6: React Frontend & Full Stack Integration", topics: ["React Fundamentals & Hooks", "State Management (Redux/Context)", "Axios Interceptors & API Integration", "Form Handling & Validation", "Securing Frontend Apps", "Full Stack Project Deployment (AWS/Docker)"] },
    ],
  },
  {
    slug: "sap-masterclass",
    title: "SAP Masterclass",
    image: "/course-images/sapp.jpeg",
    tagline: "Master SAP FICO, MM & S/4HANA",
    duration: "5 Months",
    level: "Beginner to Advanced",
    batchTimings: ["Mon-Fri: 10 AM - 12 PM", "Evening: 7 PM - 9 PM"],
    overview: "Become an SAP Consultant. Master key modules like SAP FICO (Financial Accounting and Controlling), SAP MM (Material Management), and the modern SAP S/4HANA suite. Gain practical experience for enterprise roles.",
    highlights: ["SAP FICO & MM", "SAP S/4HANA Migration", "Live Enterprise Scenarios", "100% Placement Support"],
    trendingTools: ["SAP S/4HANA", "SAP Fiori", "SAP Analytics Cloud", "ABAP Basics", "Joule (SAP AI)"],
    modules: [
      { name: "Module 1: SAP Overview & Navigation", topics: ["Introduction to ERP Systems", "SAP GUI & Navigation", "Understanding SAP Architecture (R/3 & S/4HANA)", "Enterprise Structure configuration", "Master Data vs Transaction Data", "User Management & Authorizations"] },
      { name: "Module 2: SAP FICO (Financial Accounting)", topics: ["General Ledger (GL) Accounting", "Accounts Payable (AP) & Accounts Receivable (AR)", "Asset Accounting (AA)", "Bank Ledger & Cash Management", "Financial Reporting & Month-end Closing", "Integration with MM & SD"] },
      { name: "Module 3: SAP Controlling (CO)", topics: ["Cost Element Accounting (CEA)", "Cost Center Accounting (CCA)", "Internal Orders", "Profit Center Accounting (PCA)", "Product Costing Basics", "Profitability Analysis (CO-PA)"] },
      { name: "Module 4: SAP MM (Materials Management)", topics: ["Material Master & Vendor Master Records", "Procure-to-Pay (P2P) Cycle", "Purchase Requisitions & Purchase Orders", "Inventory Management & Goods Receipt", "Invoice Verification (MIRO)", "Valuation & Account Determination"] },
      { name: "Module 5: SAP S/4HANA & Modern Interfaces", topics: ["Evolution from ECC to S/4HANA", "Universal Journal (ACDOCA)", "Business Partner (BP) Concept", "New Asset Accounting in S/4HANA", "SAP Fiori Apps & Launchpad Configuration", "Embedded Analytics"] },
      { name: "Module 6: Implementation & Interview Prep", topics: ["ASAP & SAP Activate Methodologies", "Transport Management System (TMS)", "LSMW & LTMC for Data Migration", "Real-world Project Scenarios", "Resume Building for SAP Roles", "Mock Interviews & Certification Prep"] },
    ],
    aboutContent: `Nexxtechs Institute provides one of the best SAP courses in Delhi for students and working professionals who want to build careers in enterprise software and business management systems. The course includes SAP FICO, SAP MM, SAP SD, SAP HANA, and SAP ERP modules with practical training and real-world business scenarios.

If you are searching for the best SAP institute in Delhi, best SAP institute in Janakpuri, best SAP institute in Vikaspuri, SAP training institute in Delhi, SAP certification course near me, or SAP classes in Janakpuri, Nexxtechs Institute offers professional SAP training with placement assistance and certification guidance.`
  },
  {
    slug: "mern-stack",
    title: "MERN Stack Masterclass",
    image: "/course-images/mern-stack.jpeg",
    tagline: "Build scalable full-stack applications with JavaScript",
    duration: "4 Months",
    level: "Beginner to Advanced",
    batchTimings: ["Mon-Fri: 10 AM - 12 PM", "Sat-Sun: 10 AM - 1 PM", "Evening: 7 PM - 9 PM"],
    overview: "Master MongoDB, Express.js, React, and Node.js. Learn how to build highly scalable, real-time web applications. Covers state management, secure authentication, and cloud deployments.",
    highlights: ["React & Redux Toolkit", "Node & Express", "Real-time Apps", "JWT Authentication"],
    trendingTools: ["Cursor IDE", "Vercel", "MongoDB Atlas Vector Search", "TailwindCSS", "Zustand"],
    modules: [
      { name: "Module 1: JavaScript Deep Dive", topics: ["ES6+ and Modern Syntax", "Closures, Callbacks & Promises", "Event Loop & Async Programming", "Array & Object Methods", "DOM Manipulation & Events", "Functional Programming Basics"] },
      { name: "Module 2: React.js & Frontend State", topics: ["React Components, Props & State", "Hooks (useState, useEffect, useContext)", "React Router DOM", "Redux Toolkit & Zustand", "TailwindCSS Integration", "Form Handling with React Hook Form & Zod"] },
      { name: "Module 3: Node.js & Express.js Backend", topics: ["Node Core Modules (fs, path, http)", "Express.js Routing & Middleware", "RESTful API Development", "Error Handling & Logging", "CORS & Security Best Practices", "Email Sending (Nodemailer)"] },
      { name: "Module 4: MongoDB & Mongoose", topics: ["NoSQL Concepts & JSON Documents", "MongoDB CRUD Operations", "Mongoose Schemas & Models", "Data Validation & Middleware", "Aggregations & Indexing", "Relationships & Populating"] },
      { name: "Module 5: Authentication & Security", topics: ["Passwords Hashing (Bcrypt)", "JSON Web Tokens (JWT)", "Cookies vs LocalStorage", "Role-Based Access Control (RBAC)", "OAuth Integration (Google/GitHub Login)", "Preventing XSS & CSRF Attacks"] },
      { name: "Module 6: Real-time Features & Deployment", topics: ["WebSockets & Socket.io implementation", "Building a Real-time Chat App", "Payment Gateway Integration (Stripe/Razorpay)", "Deploying Frontend to Vercel", "Deploying Backend to Render/Heroku", "MongoDB Atlas Cloud Setup"] },
    ],
  },
  {
    slug: "dsa-with-java",
    title: "DSA with Java",
    image: "/course-images/dsa-java.jpeg",
    tagline: "Crack technical interviews with Java Data Structures",
    duration: "3 Months",
    level: "Intermediate",
    batchTimings: ["Mon-Fri: 10 AM - 12 PM", "Sat-Sun: 10 AM - 1 PM"],
    overview: "Master Data Structures and Algorithms specifically using Java's robust Collections Framework. Solve top interview problems, learn space/time complexity optimization, and ace FAANG interviews.",
    highlights: ["Java Collections Framework", "Algorithmic Patterns", "System Design", "Placement Prep"],
    trendingTools: ["IntelliJ IDEA", "LeetCode AI", "Codeforces", "VisuAlgo", "GitHub Actions"],
    modules: [
      { name: "Module 1: Java Core & Complexity", topics: ["Java Memory Management (Heap/Stack)", "Garbage Collection Basics", "Big O Notation (Time & Space Complexity)", "Recursion & Backtracking in Java", "Math & Bit Manipulation", "Arrays & StringBuilder operations"] },
      { name: "Module 2: Java Collections Framework (JCF)", topics: ["List, Set & Queue Interfaces", "ArrayList vs LinkedList internals", "HashSet, TreeSet & HashMap", "PriorityQueue & Deque", "Custom Comparators & Comparable", "Iterators & Streams"] },
      { name: "Module 3: Sorting, Searching & Linear Structures", topics: ["Binary Search & its variants", "Merge Sort & Quick Sort", "Two Pointers & Sliding Window Patterns", "Stack & Queue Implementation", "Monotonic Stacks", "Prefix Sum Arrays"] },
      { name: "Module 4: Non-Linear Data Structures", topics: ["Binary Tree Traversals (In/Pre/Post)", "Binary Search Tree (BST) Properties", "Graph Representations in Java", "BFS & DFS Algorithms", "Topological Sort", "Disjoint Set Union (DSU)"] },
      { name: "Module 5: Advanced Algorithms & DP", topics: ["Dynamic Programming concepts", "Knapsack, LCS, LIS problems", "Greedy Algorithms", "Trie Data Structure", "Shortest Path (Dijkstra)", "Rolling Hash (Rabin Karp)"] },
      { name: "Module 6: Interview Strategy & System Design Basics", topics: ["How to approach unknown problems", "Writing clean, production-ready code", "Communicating trade-offs", "High-level System Design concepts", "Load Balancing & Caching", "Database Scaling Basics"] },
    ],
  },
];

// Add brochure URLs to course data
COURSES_DATA.forEach((course) => {
  course.brochureUrl = BROCHURES[course.slug] || null;
});

export default COURSES_DATA;
export { BROCHURES };
