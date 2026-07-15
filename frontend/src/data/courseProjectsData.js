const COURSE_PROJECTS = {
  "data-analytics": [
    { title: "E-Commerce Sales Dashboard", desc: "Interactive Power BI dashboard analyzing regional sales, profit margins, and customer demographics.", image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Financial Risk Analysis", desc: "Excel and SQL-based model to evaluate loan default probabilities using historical banking data.", image: "https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Healthcare Wait-Time Optimizer", desc: "Tableau visualization identifying bottlenecks in hospital emergency rooms using patient flow data.", image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Marketing Campaign ROI Tracker", desc: "Python-driven analysis of multi-channel marketing spend versus customer acquisition cost.", image: "/course-images/marketing-roi.png" }
  ],
  "data-science": [
    { title: "Credit Risk Prediction Model", desc: "GenAI-driven credit risk analysis to predict defaults and improve lending decisions.", image: "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "US Healthcare Demographics", desc: "Analyze US hospital demographics and admissions to understand costs and outcomes.", image: "https://images.pexels.com/photos/2383010/pexels-photo-2383010.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs AI Assistant", desc: "Custom LLM-based chatbot trained on NexxTechs curriculum to assist students 24/7.", image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Real-time Fraud Detection", desc: "Streaming data pipeline using Kafka and PyTorch to flag fraudulent transactions instantly.", image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "web-development": [
    { title: "Next.js E-Commerce Platform", desc: "Full-stack storefront with Stripe payments, cart management, and admin dashboard.", image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Real-time Collaborative Whiteboard", desc: "WebSockets-based drawing app using React and Node.js for team brainstorming.", image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Learning Portal", desc: "A custom LMS platform for streaming video content and tracking student progress.", image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "AI-Powered Resume Builder", desc: "React app integrating OpenAI to generate professional ATS-friendly resumes instantly.", image: "https://images.pexels.com/photos/5989933/pexels-photo-5989933.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "python-full-stack": [
    { title: "Django Social Network", desc: "A feature-rich social platform with real-time chat, friend requests, and feed algorithms.", image: "https://images.pexels.com/photos/6146978/pexels-photo-6146978.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "FastAPI Crypto Tracker", desc: "High-performance REST API tracking cryptocurrency prices using WebSockets and Redis.", image: "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Job Board", desc: "A tailored job portal connecting NexxTechs alumni with MAANG recruiters.", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Automated Data Scraper", desc: "Python Selenium/BeautifulSoup tool to aggregate real estate listings and send email alerts.", image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "cyber-security": [
    { title: "Automated Vulnerability Scanner", desc: "Custom Python script to scan web apps for OWASP Top 10 vulnerabilities.", image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Enterprise Ransomware Decryptor", desc: "Reverse engineering a custom ransomware strain and building a decryption tool in C.", image: "https://images.pexels.com/photos/5405452/pexels-photo-5405452.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Network Defense Setup", desc: "Deploying and configuring an enterprise-grade pfSense firewall and Snort IDS.", image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Secure Authentication System", desc: "Implementing a Zero-Trust MFA architecture for a cloud-based application.", image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "cloud-computing": [
    { title: "Serverless Image Processing Pipeline", desc: "AWS Lambda, S3, and Rekognition setup to automatically tag and resize uploaded images.", image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Multi-Region High Availability App", desc: "Deploying a global application across AWS and Azure using Route53 and Traffic Manager.", image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Cloud Migration", desc: "Simulated migration of an on-premise monolithic database to AWS Aurora.", image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Infrastructure as Code with Terraform", desc: "Automated provisioning of a secure VPC, EC2 instances, and RDS databases.", image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "devops": [
    { title: "End-to-End CI/CD Pipeline", desc: "Jenkins and GitHub Actions setup for automated testing, Dockerization, and deployment.", image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Kubernetes Microservices Rollout", desc: "Deploying a complex microservices application on an EKS cluster with Helm charts.", image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Uptime Monitor", desc: "Prometheus and Grafana dashboard tracking vital metrics of the institute's servers.", image: "https://images.pexels.com/photos/3183191/pexels-photo-3183191.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "GitOps with ArgoCD", desc: "Declarative continuous deployment for a cloud-native application using GitOps principles.", image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "dsa": [
    { title: "Algorithmic Trading Bot Core", desc: "High-performance matching engine using custom heap and priority queue implementations.", image: "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "GPS Route Optimizer", desc: "Applying Dijkstra's and A* search algorithms to find the fastest route on a map grid.", image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Curriculum Scheduler", desc: "Graph-based topological sorting to automatically schedule prerequisite course modules.", image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "File Compression Utility", desc: "Implementing Huffman Coding trees to compress text files efficiently.", image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "ui-ux-design": [
    { title: "Fintech App Redesign", desc: "Complete UX overhaul of a banking app, focusing on accessibility and task completion rate.", image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "E-Commerce Design System", desc: "A comprehensive Figma component library and style guide for a global retail brand.", image: "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Student Dashboard", desc: "High-fidelity prototype for a student portal, featuring intuitive course tracking.", image: "https://images.pexels.com/photos/5053737/pexels-photo-5053737.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Travel App Micro-Interactions", desc: "Advanced Framer animations and transitions to create a delightful booking experience.", image: "https://images.pexels.com/photos/5053846/pexels-photo-5053846.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "graphic-design": [
    { title: "Global Brand Identity", desc: "Logo, typography, and visual language creation for a sustainable energy startup.", image: "https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Magazine Layout & Typography", desc: "Editorial design for a 20-page tech and culture publication using Adobe InDesign.", image: "https://images.pexels.com/photos/1111368/pexels-photo-1111368.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Ad Campaign", desc: "High-impact social media creatives and billboards designed for the institute's enrollment drive.", image: "https://images.pexels.com/photos/251225/pexels-photo-251225.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Product Packaging Design", desc: "3D packaging mockups and label designs for a premium artisanal coffee brand.", image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "digital-marketing": [
    { title: "Google Ads Scaling Strategy", desc: "Managing a $10k ad budget to maximize ROAS for a local B2B service provider.", image: "https://images.pexels.com/photos/265086/pexels-photo-265086.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "SEO Content Architecture", desc: "Technical SEO audit and content cluster strategy that increased organic traffic by 300%.", image: "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Growth Funnel", desc: "Designing an automated email nurturing sequence to convert demo attendees to enrollments.", image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Viral Social Media Campaign", desc: "Creating a short-form video strategy that garnered 1M+ views across TikTok and Reels.", image: "https://images.pexels.com/photos/5053846/pexels-photo-5053846.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "java-full-stack": [
    { title: "Spring Boot E-Commerce Microservices", desc: "Scalable backend architecture using Spring Cloud, Eureka, and API Gateways.", image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Real-time Stock Portfolio Manager", desc: "Kafka-driven event streaming application with a React frontend to track stock prices.", image: "https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Admin ERP", desc: "Internal management system for tracking student attendance, fees, and batch schedules.", image: "https://images.pexels.com/photos/3183191/pexels-photo-3183191.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Banking API Security Implementation", desc: "Securing financial REST APIs using Spring Security, OAuth2, and JWT tokens.", image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "sap-masterclass": [
    { title: "S/4HANA Finance Migration", desc: "Simulated migration of legacy financial data to the new Universal Journal in SAP.", image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Procure-to-Pay Cycle Automation", desc: "Configuring SAP MM for automated purchase requisition to invoice verification workflows.", image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Vendor Management", desc: "Setting up vendor master data and pricing procedures for the institute's procurement.", image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Custom Fiori Dashboard", desc: "Designing role-based analytical Fiori apps for real-time inventory tracking.", image: "https://images.pexels.com/photos/5053846/pexels-photo-5053846.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "mern-stack": [
    { title: "Full-Stack Task Management App", desc: "A Trello clone built with React, Node, and MongoDB featuring drag-and-drop boards.", image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Real-Time Chat Application", desc: "Socket.io powered messaging app with private rooms, typing indicators, and file sharing.", image: "https://images.pexels.com/photos/6146978/pexels-photo-6146978.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Course Catalog API", desc: "Building the robust Express.js backend that powers the NexxTechs course discovery platform.", image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "E-Commerce Checkout Flow", desc: "Integrating Stripe payment gateways and managing secure sessions in a MERN app.", image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  "dsa-with-java": [
    { title: "Memory-Efficient Hash Map", desc: "Custom implementation of a collision-resistant hash map using Java generics and chaining.", image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Social Network Friend Recommender", desc: "Using graph traversal (BFS/DFS) to suggest connections based on mutual friends.", image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "NexxTechs Seat Allocation Engine", desc: "Priority queue based algorithm to allocate batch seats to students based on waiting lists.", image: "https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Regex Pattern Matcher Engine", desc: "Building a finite state machine using Dynamic Programming for string matching.", image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ]
};

// Default fallback projects for unknown courses
const DEFAULT_PROJECTS = [
  { title: "Real-world Capstone Project", desc: "End-to-end implementation of concepts learned in the course.", image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Industry Case Study", desc: "Analyzing and solving a real business problem using appropriate tools.", image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "NexxTechs Internal Tool", desc: "A project built to directly assist the institute's operations.", image: "/assets/internal-tool.png" },
  { title: "Portfolio Deliverable", desc: "A high-quality asset designed specifically for showcase to recruiters.", image: "https://images.pexels.com/photos/5053846/pexels-photo-5053846.jpeg?auto=compress&cs=tinysrgb&w=800" }
];

export const getProjectsForCourse = (slug) => {
  return COURSE_PROJECTS[slug] || DEFAULT_PROJECTS;
};
