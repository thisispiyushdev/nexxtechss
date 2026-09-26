const fs = require('fs');
const path = require('path');

const faqsData = {
  "ai-consulting": [
    { question: "How does AI consulting help my enterprise start with AI safely?", answer: "Our AI consulting service evaluates your existing data, security standards, and business processes to identify high-ROI use cases. We create a practical roadmap that minimizes operational risk while delivering measurable automation outcomes." },
    { question: "What is the typical timeline for an AI strategy & discovery engagement?", answer: "A typical AI discovery and roadmap phase takes 2 to 4 weeks, depending on organization size, complexity of workflows, data availability, and stakeholder requirements." },
    { question: "Do you build custom AI solutions or only recommend third-party tools?", answer: "We provide both strategy and hands-on custom AI development—including proprietary models, RAG pipelines, fine-tuned LLMs, and custom APIs integrated with your enterprise stack." },
    { question: "How do you handle data privacy and security during AI consulting?", answer: "Security is built into our designs. We ensure data stays within your enterprise boundaries, enforcing strict access controls, data encryption, and compliance with privacy regulations." },
    { question: "What ROI can we expect from AI automation initiatives?", answer: "Clients typically report 40% to 70% reduction in manual document processing time, faster customer query response, and significant cost savings in repetitive operational workflows." }
  ],
  "rag-development": [
    { question: "What is Retrieval-Augmented Generation (RAG) and why is it better than standard LLMs?", answer: "RAG connects LLMs directly to your enterprise knowledge base, vector databases, and documents so generated responses are grounded in real, private business data rather than generic web knowledge." },
    { question: "Which vector databases do you support for enterprise RAG systems?", answer: "We work with Pinecone, Qdrant, Milvus, pgvector (PostgreSQL), Weaviate, and Chroma DB depending on your latency and hosting requirements." },
    { question: "Can RAG connect to our internal databases and document repositories?", answer: "Yes, we build pipelines to ingest PDFs, Word documents, Notion, Confluence, SQL databases, and internal APIs into real-time embedding pipelines." },
    { question: "How do you prevent hallucinations in RAG applications?", answer: "By enforcing strict semantic retrieval thresholds, source-attribution citation enforcement, and fallback human escalation paths whenever retrieval confidence is low." },
    { question: "Can we enforce role-based access control (RBAC) on document search?", answer: "Yes, users only retrieve search results from documents and vector embeddings they are explicitly authorized to view in your enterprise permissions system." }
  ],
  "ai-agents": [
    { question: "What are autonomous AI agents and how do they differ from chatbots?", answer: "AI agents are goal-driven software programs that execute multi-step business workflows, use external tools, query APIs, and solve complex operational tasks autonomously without constant human prompts." },
    { question: "What frameworks do you use for AI agent development?", answer: "We build with LangChain, LangGraph, AutoGen, CrewAI, and custom Python agent frameworks tailored for enterprise scale." },
    { question: "Can AI agents execute actions in external software and CRMs?", answer: "Yes, agents can interact with CRMs, ERPs, email servers, databases, payment gateways, and third-party SaaS APIs." },
    { question: "How do human-in-the-loop approvals work in AI agent workflows?", answer: "Critical decisions (e.g. financial transactions, customer outbound emails, contract approvals) require explicit human confirmation before the agent proceeds." },
    { question: "How do you monitor agent performance and prevent unexpected actions?", answer: "We implement continuous telemetry, guardrails, rate limits, and audit logs to track every agent decision and API call in real time." }
  ],
  "web-development": [
    { question: "What technology stack do you use for custom web development?", answer: "Modern stack including React, Next.js, Vue, Node.js, Python/FastAPI, PostgreSQL, TailwindCSS, and cloud hosting platforms like AWS and Vercel." },
    { question: "Are all websites built by Nexxtechs SEO-friendly and mobile-responsive?", answer: "Yes, all web applications are built with semantic HTML5, fast SSR/static prerendering, meta tags, schema markup, and full mobile responsiveness." },
    { question: "Can you convert our legacy enterprise web application to modern React/Next.js?", answer: "Yes, we re-architect legacy web systems into modular, cloud-native micro-frontends and scalable APIs without disrupting live operations." },
    { question: "Do you provide backend API development and database integration?", answer: "Yes, we design secure RESTful and GraphQL APIs, microservices, webhooks, and scalable relational/NoSQL databases." },
    { question: "How do you handle website performance and Core Web Vitals optimization?", answer: "We optimize Core Web Vitals, image loading, code splitting, caching strategies, and CDN delivery for sub-second page load speeds." }
  ],
  "mobile-app-development": [
    { question: "Do you build cross-platform mobile apps for both iOS and Android?", answer: "Yes, we develop cross-platform mobile apps for iOS and Android using React Native and Flutter for maximum code reuse, fast performance, and native feel." },
    { question: "How long does custom mobile app development take?", answer: "A typical MVP mobile application takes 6 to 12 weeks from wireframing and UI/UX design to App Store and Google Play submission." },
    { question: "Can you integrate real-time notifications and payment gateways?", answer: "Yes, we integrate Push Notifications (FCM/OneSignal), Razorpay, Stripe, Apple Pay, Google Pay, and real-time WebSockets." },
    { question: "Do you assist with App Store and Google Play Store publishing?", answer: "Yes, we handle app store developer guidelines compliance, provisioning profiles, asset creation, and submission approval support." },
    { question: "How do you ensure mobile app security and offline data synchronization?", answer: "We build local encrypted storage, offline data caching, biometrics (Touch/Face ID), and secure JWT/OAuth token handling." }
  ],
  "saas-development": [
    { question: "What key features do you include in multi-tenant SaaS platforms?", answer: "Multi-tenant database architecture, user authentication, role-based access control (RBAC), tier-based subscription management, admin portal, usage analytics, and developer APIs." },
    { question: "Which payment gateways do you integrate for SaaS subscriptions?", answer: "Stripe, Razorpay, Lemon Squeezy, and PayPal with recurring billing, webhooks, invoice generation, and tax handling." },
    { question: "How is user data isolated in multi-tenant SaaS architecture?", answer: "We implement schema-level or row-level tenant security (RLS) ensuring strict data isolation across enterprise customers." },
    { question: "Can you build admin dashboards and user analytics for our SaaS?", answer: "Yes, real-time analytics dashboards tracking MRR, active users, usage limits, churn rate, and system telemetry." },
    { question: "What cloud infrastructure do you recommend for scaling SaaS applications?", answer: "AWS, GCP, or Vercel using auto-scaling serverless containers, managed PostgreSQL/MongoDB, and global CDN caching." }
  ],
  "cloud-consulting": [
    { question: "Which cloud platforms do you support for cloud consulting?", answer: "AWS, Google Cloud Platform (GCP), Microsoft Azure, DigitalOcean, and hybrid cloud infrastructure environments." },
    { question: "How do you help reduce cloud hosting costs (FinOps)?", answer: "We analyze cloud billing, eliminate idle resources, optimize reserved instances/savings plans, auto-scale compute, and implement caching." },
    { question: "Can you assist with migrating legacy on-premise servers to cloud infrastructure?", answer: "Yes, we provide zero-downtime cloud migration strategies including lift-and-shift, re-platforming, and containerization." },
    { question: "How do you ensure high availability and disaster recovery in cloud setups?", answer: "Multi-region deployments, automated database backups, failover DNS routing, and 99.99% uptime target configurations." },
    { question: "Do you provide ongoing cloud infrastructure management and monitoring?", answer: "Yes, real-time monitoring via CloudWatch, Datadog, Prometheus, Grafana, and automated incident response scripts." }
  ],
  "devops-automation": [
    { question: "What is included in your DevOps & CI/CD pipeline automation services?", answer: "Automated build/test/deploy pipelines (GitHub Actions, GitLab CI, Jenkins), Infrastructure as Code (Terraform), and container setup." },
    { question: "Do you support containerization with Docker and Kubernetes orchestration?", answer: "Yes, we containerize microservices with Docker and deploy scalable Kubernetes (EKS, GKE, AKS) clusters." },
    { question: "What Infrastructure as Code (IaC) tools do you use?", answer: "Terraform, Pulumi, CloudFormation, and Ansible for reproducible, version-controlled cloud environments." },
    { question: "How does DevOps automation speed up software release cycles?", answer: "Developers can push code and trigger automated testing, vulnerability scanning, and production deployment in minutes instead of days." },
    { question: "How do you handle secrets management in CI/CD pipelines?", answer: "HashiCorp Vault, AWS Secrets Manager, and encrypted environment variable pipelines with zero hardcoded credentials." }
  ],
  "vulnerability-assessment": [
    { question: "What is the difference between vulnerability assessment and penetration testing?", answer: "Vulnerability assessment scans systems for security flaws; pentesting actively simulates authorized cyber-attacks to exploit vulnerabilities and verify business impact." },
    { question: "What digital assets can you assess for security vulnerabilities?", answer: "Web applications, APIs, mobile apps, network firewalls, cloud infrastructure (AWS/Azure), and database configurations." },
    { question: "Will security testing cause any downtime or disruption to our live systems?", answer: "No, we conduct non-intrusive automated and manual testing with controlled rate limits, with optional off-peak scheduling." },
    { question: "How frequently should an enterprise conduct vulnerability security assessments?", answer: "Quarter-yearly for active systems, or after every major software release, infrastructure change, or compliance mandate." },
    { question: "What deliverables will we receive after a vulnerability assessment?", answer: "Executive summary, detailed technical findings prioritized by OWASP/CVSS severity, proof-of-concept steps, and remediation guidance." }
  ],
  "social-media-marketing": [
    { question: "Which social media channels do you manage for business growth?", answer: "LinkedIn, Instagram, Facebook, Twitter (X), YouTube, and specialized B2B channels tailored to your target industry." },
    { question: "Do you create custom visual content, graphics, and video reels?", answer: "Yes, our design team produces brand-aligned graphics, carousel sliders, short-form video reels, and promotional copy." },
    { question: "How do you track lead conversions and marketing ROI?", answer: "UTM tracking, Google Analytics 4, pixel tracking, lead form attribution, and monthly performance reports." },
    { question: "Is social media marketing effective for B2B tech companies?", answer: "Yes, targeted LinkedIn content, founder thought leadership, and case study promotion are powerful drivers of B2B enterprise leads." },
    { question: "What is the recommended minimum duration for effective marketing?", answer: "A 3-month consistent campaign is recommended to build brand authority, engage target audiences, and generate qualified leads." }
  ],
  "performance-marketing": [
    { question: "What ad platforms do you manage for performance marketing?", answer: "Google Ads (Search, Display, Shopping), Meta Ads (Facebook & Instagram), LinkedIn Ads, and remarketing networks." },
    { question: "How do you optimize Cost Per Lead (CPL) and Return on Ad Spend (ROAS)?", answer: "Continuous A/B testing of ad copy, landing pages, audience segmentation, negative keywords, and conversion bid strategies." },
    { question: "Do you design custom landing pages for ad campaigns?", answer: "Yes, conversion-focused landing pages designed specifically for high ad relevance scores and maximum conversion rates." },
    { question: "What is the minimum budget required for performance ads?", answer: "Budget depends on target region and industry competitiveness, but we recommend starting with a structured testing budget." },
    { question: "How do you prevent wasted ad spend on unqualified clicks?", answer: "Click fraud detection software, IP exclusions, audience filter refinements, and active daily bid monitoring." }
  ],
  "ui-ux-design": [
    { question: "What is your UI/UX design process for new digital products?", answer: "User research, wireframing, interactive prototyping in Figma, visual UI styling, design system creation, and usability testing." },
    { question: "Do you deliver clickable Figma prototypes for developer handoff?", answer: "Yes, complete pixel-perfect Figma prototypes with component libraries, design tokens, responsive breakpoints, and developer handoff specs." },
    { question: "Can you redesign our existing web or mobile app to improve conversions?", answer: "Yes, we audit existing user drop-offs, simplify navigation, modernize visual aesthetics, and improve conversion paths." },
    { question: "Do you create complete design systems for enterprise teams?", answer: "Yes, reusable UI component kits, color tokens, typography scales, icon sets, and accessibility standards." },
    { question: "How do you validate design usability with target users?", answer: "Interactive user testing, heatmaps, prototype walkthroughs with stakeholders, and usability feedback sessions." }
  ]
};

const filePath = path.join(__dirname, 'src', 'data', 'servicesData.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

for (const [key, faqs] of Object.entries(faqsData)) {
  const targetStr = `ctaText:`;
  // Replace per service block
  const serviceRegex = new RegExp(`("${key}":\\s*{[\\s\\S]*?)(ctaText:[^\\n]+)`, 'g');
  fileContent = fileContent.replace(serviceRegex, (match, p1, p2) => {
    if (p1.includes('faqs:')) return match; // Already updated
    return `${p1}faqs: ${JSON.stringify(faqs, null, 6)},\n    ${p2}`;
  });
}

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log('Successfully added FAQs to all services in servicesData.js');
