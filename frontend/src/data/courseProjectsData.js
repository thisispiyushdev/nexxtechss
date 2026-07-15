const COURSE_PROJECTS = {
  "data-analytics": [
    { title: "E-Commerce Sales Dashboard", desc: "Interactive Power BI dashboard analyzing regional sales, profit margins, and customer demographics.", image: "/assets/projects/amazon.webp" },
    { title: "Financial Risk Analysis", desc: "Excel and SQL-based model to evaluate loan default probabilities using historical banking data.", image: "/assets/projects/chat.webp" },
    { title: "Healthcare Wait-Time Optimizer", desc: "Tableau visualization identifying bottlenecks in hospital emergency rooms using patient flow data.", image: "/assets/projects/cypto.webp" },
    { title: "Marketing Campaign ROI Tracker", desc: "Python-driven analysis of multi-channel marketing spend versus customer acquisition cost.", image: "/assets/projects/ngo.webp" }
  ],
  "data-science": [
    { title: "Credit Risk Prediction Model", desc: "GenAI-driven credit risk analysis to predict defaults and improve lending decisions.", image: "/assets/projects/amazon.webp" },
    { title: "US Healthcare Demographics", desc: "Analyze US hospital demographics and admissions to understand costs and outcomes.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs AI Assistant", desc: "Custom LLM-based chatbot trained on NexxTechs curriculum to assist students 24/7.", image: "/assets/projects/cypto.webp" },
    { title: "Real-time Fraud Detection", desc: "Streaming data pipeline using Kafka and PyTorch to flag fraudulent transactions instantly.", image: "/assets/projects/ngo.webp" }
  ],
  "web-development": [
    { title: "Next.js E-Commerce Platform", desc: "Full-stack storefront with Stripe payments, cart management, and admin dashboard.", image: "/assets/projects/amazon.webp" },
    { title: "Real-time Collaborative Whiteboard", desc: "WebSockets-based drawing app using React and Node.js for team brainstorming.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Learning Portal", desc: "A custom LMS platform for streaming video content and tracking student progress.", image: "/assets/projects/cypto.webp" },
    { title: "AI-Powered Resume Builder", desc: "React app integrating OpenAI to generate professional ATS-friendly resumes instantly.", image: "/assets/projects/ngo.webp" }
  ],
  "python-full-stack": [
    { title: "Django Social Network", desc: "A feature-rich social platform with real-time chat, friend requests, and feed algorithms.", image: "/assets/projects/amazon.webp" },
    { title: "FastAPI Crypto Tracker", desc: "High-performance REST API tracking cryptocurrency prices using WebSockets and Redis.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Job Board", desc: "A tailored job portal connecting NexxTechs alumni with MAANG recruiters.", image: "/assets/projects/cypto.webp" },
    { title: "Automated Data Scraper", desc: "Python Selenium/BeautifulSoup tool to aggregate real estate listings and send email alerts.", image: "/assets/projects/ngo.webp" }
  ],
  "cyber-security": [
    { title: "Automated Vulnerability Scanner", desc: "Custom Python script to scan web apps for OWASP Top 10 vulnerabilities.", image: "/assets/projects/amazon.webp" },
    { title: "Enterprise Ransomware Decryptor", desc: "Reverse engineering a custom ransomware strain and building a decryption tool in C.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Network Defense Setup", desc: "Deploying and configuring an enterprise-grade pfSense firewall and Snort IDS.", image: "/assets/projects/cypto.webp" },
    { title: "Secure Authentication System", desc: "Implementing a Zero-Trust MFA architecture for a cloud-based application.", image: "/assets/projects/ngo.webp" }
  ],
  "cloud-computing": [
    { title: "Serverless Image Processing Pipeline", desc: "AWS Lambda, S3, and Rekognition setup to automatically tag and resize uploaded images.", image: "/assets/projects/amazon.webp" },
    { title: "Multi-Region High Availability App", desc: "Deploying a global application across AWS and Azure using Route53 and Traffic Manager.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Cloud Migration", desc: "Simulated migration of an on-premise monolithic database to AWS Aurora.", image: "/assets/projects/cypto.webp" },
    { title: "Infrastructure as Code with Terraform", desc: "Automated provisioning of a secure VPC, EC2 instances, and RDS databases.", image: "/assets/projects/ngo.webp" }
  ],
  "devops": [
    { title: "End-to-End CI/CD Pipeline", desc: "Jenkins and GitHub Actions setup for automated testing, Dockerization, and deployment.", image: "/assets/projects/amazon.webp" },
    { title: "Kubernetes Microservices Rollout", desc: "Deploying a complex microservices application on an EKS cluster with Helm charts.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Uptime Monitor", desc: "Prometheus and Grafana dashboard tracking vital metrics of the institute's servers.", image: "/assets/projects/cypto.webp" },
    { title: "GitOps with ArgoCD", desc: "Declarative continuous deployment for a cloud-native application using GitOps principles.", image: "/assets/projects/ngo.webp" }
  ],
  "dsa": [
    { title: "Algorithmic Trading Bot Core", desc: "High-performance matching engine using custom heap and priority queue implementations.", image: "/assets/projects/amazon.webp" },
    { title: "GPS Route Optimizer", desc: "Applying Dijkstra's and A* search algorithms to find the fastest route on a map grid.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Curriculum Scheduler", desc: "Graph-based topological sorting to automatically schedule prerequisite course modules.", image: "/assets/projects/cypto.webp" },
    { title: "File Compression Utility", desc: "Implementing Huffman Coding trees to compress text files efficiently.", image: "/assets/projects/ngo.webp" }
  ],
  "ui-ux-design": [
    { title: "Fintech App Redesign", desc: "Complete UX overhaul of a banking app, focusing on accessibility and task completion rate.", image: "/assets/projects/amazon.webp" },
    { title: "E-Commerce Design System", desc: "A comprehensive Figma component library and style guide for a global retail brand.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Student Dashboard", desc: "High-fidelity prototype for a student portal, featuring intuitive course tracking.", image: "/assets/projects/cypto.webp" },
    { title: "Travel App Micro-Interactions", desc: "Advanced Framer animations and transitions to create a delightful booking experience.", image: "/assets/projects/ngo.webp" }
  ],
  "graphic-design": [
    { title: "Global Brand Identity", desc: "Logo, typography, and visual language creation for a sustainable energy startup.", image: "/assets/projects/amazon.webp" },
    { title: "Magazine Layout & Typography", desc: "Editorial design for a 20-page tech and culture publication using Adobe InDesign.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Ad Campaign", desc: "High-impact social media creatives and billboards designed for the institute's enrollment drive.", image: "/assets/projects/cypto.webp" },
    { title: "Product Packaging Design", desc: "3D packaging mockups and label designs for a premium artisanal coffee brand.", image: "/assets/projects/ngo.webp" }
  ],
  "digital-marketing": [
    { title: "Google Ads Scaling Strategy", desc: "Managing a $10k ad budget to maximize ROAS for a local B2B service provider.", image: "/assets/projects/amazon.webp" },
    { title: "SEO Content Architecture", desc: "Technical SEO audit and content cluster strategy that increased organic traffic by 300%.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Growth Funnel", desc: "Designing an automated email nurturing sequence to convert demo attendees to enrollments.", image: "/assets/projects/cypto.webp" },
    { title: "Viral Social Media Campaign", desc: "Creating a short-form video strategy that garnered 1M+ views across TikTok and Reels.", image: "/assets/projects/ngo.webp" }
  ],
  "java-full-stack": [
    { title: "Spring Boot E-Commerce Microservices", desc: "Scalable backend architecture using Spring Cloud, Eureka, and API Gateways.", image: "/assets/projects/amazon.webp" },
    { title: "Real-time Stock Portfolio Manager", desc: "Kafka-driven event streaming application with a React frontend to track stock prices.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Admin ERP", desc: "Internal management system for tracking student attendance, fees, and batch schedules.", image: "/assets/projects/cypto.webp" },
    { title: "Banking API Security Implementation", desc: "Securing financial REST APIs using Spring Security, OAuth2, and JWT tokens.", image: "/assets/projects/ngo.webp" }
  ],
  "sap-masterclass": [
    { title: "S/4HANA Finance Migration", desc: "Simulated migration of legacy financial data to the new Universal Journal in SAP.", image: "/assets/projects/amazon.webp" },
    { title: "Procure-to-Pay Cycle Automation", desc: "Configuring SAP MM for automated purchase requisition to invoice verification workflows.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Vendor Management", desc: "Setting up vendor master data and pricing procedures for the institute's procurement.", image: "/assets/projects/cypto.webp" },
    { title: "Custom Fiori Dashboard", desc: "Designing role-based analytical Fiori apps for real-time inventory tracking.", image: "/assets/projects/ngo.webp" }
  ],
  "mern-stack": [
    { title: "Full-Stack Task Management App", desc: "A Trello clone built with React, Node, and MongoDB featuring drag-and-drop boards.", image: "/assets/projects/amazon.webp" },
    { title: "Real-Time Chat Application", desc: "Socket.io powered messaging app with private rooms, typing indicators, and file sharing.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Course Catalog API", desc: "Building the robust Express.js backend that powers the NexxTechs course discovery platform.", image: "/assets/projects/cypto.webp" },
    { title: "E-Commerce Checkout Flow", desc: "Integrating Stripe payment gateways and managing secure sessions in a MERN app.", image: "/assets/projects/ngo.webp" }
  ],
  "dsa-with-java": [
    { title: "Memory-Efficient Hash Map", desc: "Custom implementation of a collision-resistant hash map using Java generics and chaining.", image: "/assets/projects/amazon.webp" },
    { title: "Social Network Friend Recommender", desc: "Using graph traversal (BFS/DFS) to suggest connections based on mutual friends.", image: "/assets/projects/chat.webp" },
    { title: "NexxTechs Seat Allocation Engine", desc: "Priority queue based algorithm to allocate batch seats to students based on waiting lists.", image: "/assets/projects/cypto.webp" },
    { title: "Regex Pattern Matcher Engine", desc: "Building a finite state machine using Dynamic Programming for string matching.", image: "/assets/projects/ngo.webp" }
  ]
};

// Default fallback projects for unknown courses
const DEFAULT_PROJECTS = [
  { title: "Real-world Capstone Project", desc: "End-to-end implementation of concepts learned in the course.", image: "/assets/projects/amazon.webp" },
  { title: "Industry Case Study", desc: "Analyzing and solving a real business problem using appropriate tools.", image: "/assets/projects/chat.webp" },
  { title: "NexxTechs Internal Tool", desc: "A project built to directly assist the institute's operations.", image: "/assets/projects/cypto.webp" },
  { title: "Portfolio Deliverable", desc: "A high-quality asset designed specifically for showcase to recruiters.", image: "/assets/projects/ngo.webp" }
];

export const getProjectsForCourse = (slug) => {
  return COURSE_PROJECTS[slug] || DEFAULT_PROJECTS;
};
