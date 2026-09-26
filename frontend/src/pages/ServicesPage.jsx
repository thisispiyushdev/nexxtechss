import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  CheckCircle2, ArrowRight, Cpu, Code, Cloud, Globe, Shield, Smartphone, 
  PenTool, BarChart, Users, Zap, TrendingUp, Headset, Phone, Mail, MapPin, Send, Wrench, Sparkles, ChevronDown, HelpCircle
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "/servicepage/h1.webp",
  "/servicepage/h2.webp",
  "/servicepage/h3.webp",
  "/servicepage/h4.webp"
];

const serviceCategories = [
  {
    id: "ai-automation",
    label: "AI & Automation",
    icon: <Cpu className="w-4 h-4 mr-2" />,
    services: [
      {
        id: "ai-consulting",
        title: "AI Consulting",
        description: "Develop a robust AI strategy, roadmap, and conduct ROI analysis tailored to your enterprise goals.",
        features: ["Enterprise AI Strategy", "Readiness Assessment", "ROI Modeling"],
        icon: <Cpu className="w-6 h-6 text-[#84CC16]" />
      },
      {
        id: "rag-development",
        title: "RAG Development",
        description: "Custom RAG pipelines using GPT-4, LangChain, and Pinecone for enterprise search and intelligence.",
        features: ["Vector Database Setup", "Custom Embeddings", "Contextual Generation"],
        icon: <Code className="w-6 h-6 text-[#84CC16]" />
      },
      {
        id: "ai-agents",
        title: "AI Agents",
        description: "Deploy autonomous agentic workflows to automate complex multi-step business processes.",
        features: ["Autonomous Workflows", "Tool Integration", "Multi-Agent Systems"],
        icon: <Globe className="w-6 h-6 text-[#84CC16]" />
      }
    ]
  },
  {
    id: "development",
    label: "Development",
    icon: <Code className="w-4 h-4 mr-2" />,
    services: [
      {
        id: "web-development",
        title: "Web Development",
        description: "Build premium, pixel-perfect, lightning-fast responsive websites utilizing modern JavaScript frameworks.",
        features: ["React & Next.js Stacks", "GSAP & Motion Animations", "Search Engine Optimized (SEO)"],
        icon: <Code className="w-6 h-6 text-[#84CC16]" />
      },
      {
        id: "mobile-app-development",
        title: "Mobile Apps",
        description: "High-performance native and cross-platform mobile applications for iOS and Android.",
        features: ["React Native & Flutter", "Native Performance", "Offline Capabilities"],
        icon: <Smartphone className="w-6 h-6 text-[#84CC16]" />
      },
      {
        id: "saas-development",
        title: "SaaS Development",
        description: "End-to-end multi-tenant platform development, including subscriptions and user management.",
        features: ["Multi-Tenant Architecture", "Stripe/Payment Integration", "Scalable Backend"],
        icon: <Cloud className="w-6 h-6 text-[#84CC16]" />
      }
    ]
  },
  {
    id: "cloud-it",
    label: "Cloud & IT",
    icon: <Cloud className="w-4 h-4 mr-2" />,
    services: [
      {
        id: "cloud-services",
        title: "Cloud Services",
        description: "Scalable cloud architecture, migration, and management on AWS, GCP, or Azure.",
        features: ["AWS/GCP/Azure Architecture", "Cloud Migration", "Cost Optimization"],
        icon: <Cloud className="w-6 h-6 text-[#84CC16]" />
      },
      {
        id: "devops-cicd",
        title: "DevOps & CI/CD",
        description: "Streamline your software delivery with automated pipelines, Docker, and Kubernetes.",
        features: ["Automated Deployments", "Containerization", "Infrastructure as Code"],
        icon: <Shield className="w-6 h-6 text-[#84CC16]" />
      },
      {
        id: "vulnerability-assessment",
        title: "Vulnerability Assessment",
        description: "Identify, analyze, and mitigate security vulnerabilities in your corporate network before threat actors exploit them.",
        features: ["Enterprise Network Security", "Automated Scanning", "Manual Exploit Verification"],
        icon: <Shield className="w-6 h-6 text-[#84CC16]" />
      }
    ]
  },
  {
    id: "marketing-design",
    label: "Marketing & Design",
    icon: <Globe className="w-4 h-4 mr-2" />,
    services: [
      {
        id: "social-media-marketing",
        title: "Social Media Marketing",
        description: "Scale your brand's digital presence, foster active community engagement, and design viral campaigns.",
        features: ["Platform Brand Strategy", "Automated Content Schedulers", "Visual Asset Designing"],
        icon: <Globe className="w-6 h-6 text-[#84CC16]" />
      },
      {
        id: "performance-marketing",
        title: "Performance Marketing",
        description: "Drive high-converting leads, master paid advertising funnels, and optimize programmatic ad spend.",
        features: ["ROAS-focused Ad Campaigns", "High-Converting Landings", "A/B Conversion Testing"],
        icon: <BarChart className="w-6 h-6 text-[#84CC16]" />
      },
      {
        id: "ui-ux-design",
        title: "UI/UX Design",
        description: "Create intuitive, engaging, and beautiful user interfaces that convert visitors into loyal customers.",
        features: ["User Research & Wireframing", "High-Fidelity Prototyping", "Interactive Micro-animations"],
        icon: <PenTool className="w-6 h-6 text-[#84CC16]" />
      }
    ]
  }
];

const SERVICE_OPTIONS = [
  "AI Consulting",
  "RAG Development",
  "AI Agents",
  "Web Development",
  "Mobile Apps",
  "SaaS Development",
  "Cloud Services",
  "DevOps & CI/CD",
  "Vulnerability Assessment",
  "Social Media Marketing",
  "Performance Marketing",
  "UI/UX Design",
  "Custom Enterprise Solution"
];

const techCategories = [
  {
    id: "frontend",
    label: "Frontend & UI",
    tools: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "SASS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
      { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" }
    ]
  },
  {
    id: "backend",
    label: "Backend & DB",
    tools: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Spring", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" }
    ]
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    tools: [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
      { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
      { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "GitLab", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
      { name: "Nginx", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
      { name: "Ansible", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
      { name: "Grafana", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" }
    ]
  },
  {
    id: "ai-data",
    label: "AI & Data Science",
    tools: [
      { name: "OpenAI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg" },
      { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "Scikit-learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
      { name: "Jupyter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
      { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      { name: "Keras", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg" },
      { name: "Apache Spark", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" },
      { name: "R Lang", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
      { name: "LangChain", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
    ]
  }
];

const processSteps = [
  { step: "01", title: "Discovery & Strategy", desc: "We analyze your requirements and formulate a robust strategy." },
  { step: "02", title: "Design & Architecture", desc: "Creating intuitive UI/UX and scalable technical architecture." },
  { step: "03", title: "Development", desc: "Agile development with continuous integration and updates." },
  { step: "04", title: "Deployment & Support", desc: "Seamless launch and ongoing 24/7 technical support." }
];

const whyChooseUs = [
  { title: "Expert Team", desc: "Our team consists of industry veterans with over a decade of experience.", icon: <Users className="w-8 h-8 text-[#84CC16]" /> },
  { title: "Agile Delivery", desc: "Fast, iterative, and transparent development cycles.", icon: <Zap className="w-8 h-8 text-[#84CC16]" /> },
  { title: "Scalable Solutions", desc: "We build products designed to handle millions of users effortlessly.", icon: <TrendingUp className="w-8 h-8 text-[#84CC16]" /> },
  { title: "24/7 Support", desc: "Dedicated maintenance and support to keep your business running.", icon: <Headset className="w-8 h-8 text-[#84CC16]" /> }
];

const partnerCompanies = [
  { name: "Microsoft", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
];

const serviceFaqs = [
  {
    q: "1. What technology services does Nexxtechs provide in Delhi NCR and India?",
    a: "Nexxtechs provides end-to-end technology and digital engineering services including AI consulting, AI automation, RAG development, AI agents, web development, mobile app development, SaaS development, cloud services, DevOps & CI/CD, vulnerability assessment, social media marketing, performance marketing, and UI/UX design for startups, SMEs, and enterprises across Delhi NCR and India."
  },
  {
    q: "2. Is Nexxtechs a software development company in Delhi NCR?",
    a: "Yes. Nexxtechs provides custom software and web development services in Delhi NCR, including modern frontend applications, backend systems, APIs, business dashboards, SaaS platforms, integrations, and scalable digital products designed around specific business requirements."
  },
  {
    q: "3. Does Nexxtechs provide AI consulting and AI automation services in India?",
    a: "Yes. Nexxtechs helps businesses identify practical AI opportunities and implement solutions such as AI assistants, workflow automation, RAG applications, AI agents, intelligent search, and AI-powered business processes. The focus is on connecting AI implementation with measurable business requirements."
  },
  {
    q: "4. What is RAG development and how can it help my business?",
    a: "RAG, or Retrieval-Augmented Generation, connects AI models with your organization's trusted information sources. Nexxtechs can build RAG applications that work with documents, knowledge bases, databases, and internal information to create AI-powered search and knowledge assistants."
  },
  {
    q: "5. Does Nexxtechs offer cloud and DevOps services?",
    a: "Yes. Nexxtechs provides cloud architecture, cloud migration, infrastructure optimization, Docker, CI/CD automation, Kubernetes, infrastructure as code, deployment automation, monitoring, and DevOps consulting. Solutions can be designed for AWS, Azure, Google Cloud, and other infrastructure environments according to project requirements."
  },
  {
    q: "6. Can Nexxtechs develop custom SaaS applications?",
    a: "Yes. Nexxtechs develops custom SaaS platforms with features such as multi-tenant architecture, user authentication, role-based access, subscription management, payment integration, APIs, dashboards, scalable backend systems, and cloud deployment."
  },
  {
    q: "7. Does Nexxtechs provide mobile app development services in Delhi NCR?",
    a: "Yes. Nexxtechs develops mobile applications for businesses using suitable technologies such as React Native and Flutter, along with secure backend APIs, authentication, notifications, integrations, performance optimization, and deployment support for modern mobile products."
  },
  {
    q: "8. How can Nexxtechs help improve my website's SEO and performance?",
    a: "Nexxtechs can build websites with an SEO-friendly technical foundation including semantic HTML, optimized page structure, metadata, canonical URLs, internal linking, structured data, responsive design, image optimization, clean URLs, performance optimization, and Core Web Vitals considerations. Content and technical SEO can be aligned with the target market, including Delhi NCR and India."
  },
  {
    q: "9. Does Nexxtechs provide cybersecurity and vulnerability assessment services?",
    a: "Yes. Nexxtechs provides scoped vulnerability assessment and security testing for relevant web applications, APIs, networks, and cloud environments. Assessments can combine automated scanning with appropriate manual validation, followed by prioritized findings and remediation guidance. Security testing should always be performed with explicit authorization."
  },
  {
    q: "10. Why choose Nexxtechs for technology solutions in Delhi NCR and India?",
    a: "Nexxtechs brings multiple capabilities under one technology partner—from AI and software development to cloud, DevOps, cybersecurity, marketing, and UI/UX design. This allows businesses to plan, build, deploy, and improve digital products through connected technical and business workflows rather than managing every capability separately."
  }
];

const ServicesPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Bottom Service Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: SERVICE_OPTIONS[0],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEnquiryChange = (e) => {
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    const phoneNum = "917987059430";
    const text = `Hello Nexxtechs Team,%0A%0AI have a *Service Enquiry* from Services Page:%0A%0A*Name:* ${enquiryForm.name}%0A*Phone:* ${enquiryForm.phone}%0A*Email:* ${enquiryForm.email}%0A*Service Interested:* ${enquiryForm.service}%0A*Requirements:* ${enquiryForm.message || 'N/A'}`;
    
    window.open(`https://wa.me/${phoneNum}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const handleQuickInquiryClick = (serviceTitle) => {
    setEnquiryForm(prev => ({ ...prev, service: serviceTitle }));
    const enquiryEl = document.getElementById("bottom-service-enquiry");
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <SEOHead 
        title="Enterprise IT & AI Development Services | Nexxtechs Noida" 
        description="Explore our wide range of enterprise services including AI & Automation, Web Development, Cloud IT, Mobile Apps, SaaS, and Performance Marketing."
        keywords="AI consulting services, enterprise AI consulting, RAG development services, AI agent development, web development company, React Next.js development, mobile app development, SaaS development company, cloud consulting services, AWS Azure GCP consulting, DevOps CI CD services, vulnerability assessment, social media marketing agency, performance marketing agency, UI UX design services, IT services company Delhi NCR, IT company Noida"
        canonical="/services"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-36 overflow-hidden bg-black min-h-[70vh] flex items-center justify-center">
        {/* Background Images Slider */}
        <div className="absolute inset-0 z-0 bg-black">
          <AnimatePresence>
            <motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Services Hero Background"
            />
          </AnimatePresence>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/65 dark:bg-black/75"></div>
          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-[#070C17] to-transparent"></div>
        </div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 mx-auto px-4 text-center mt-10 mb-8"
        >
          <span className="px-4 py-1.5 rounded-full bg-[#84CC16]/20 text-[#84CC16] text-xs font-mono font-bold uppercase tracking-wider border border-[#84CC16]/40 inline-block mb-6 shadow-sm">
            NEXXTECHS ENTERPRISE SERVICES
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg leading-tight max-w-5xl mx-auto">
            Innovative <span className="text-[#84CC16]">Technology Solutions</span> for the Modern Enterprise
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto mb-10 drop-shadow-md font-medium leading-relaxed">
            AI consulting, software development, SaaS, cloud, DevOps, cybersecurity, and digital solutions—engineered for startups, SMEs, and enterprises across Delhi NCR and India.
          </p>

          {/* HERO BUTTONS: ENQUIRY & CONNECT TO EXPERT */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("openPopupEnquiry", { detail: { type: "service" } }))}
              className="px-8 py-4 bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold text-sm tracking-wide rounded-xl inline-flex items-center transition-all shadow-xl shadow-[#84CC16]/25 group cursor-pointer"
            >
              <Send className="w-4 h-4 mr-2" />
              Service Enquiry
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/917987059430?text=Hi%20Nexxtechs,%20I%20want%20to%20connect%20with%20a%20solution%20expert."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm tracking-wide rounded-xl inline-flex items-center transition-all backdrop-blur-md"
            >
              <Phone className="w-4 h-4 mr-2 text-[#84CC16]" />
              Connect to Expert
            </a>
          </div>
        </motion.div>

        {/* Indicator Lines */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 w-full max-w-xs md:max-w-md px-6">
          {heroImages.map((_, idx) => (
            <div 
              key={idx} 
              className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden relative cursor-pointer" 
              onClick={() => setCurrentImageIndex(idx)}
            >
              {currentImageIndex === idx && (
                <motion.div
                  key={`progress-${idx}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute top-0 left-0 h-full bg-[#84CC16]"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SEO-SUPPORTING SECTION BELOW HERO */}
      <section className="py-10 bg-white dark:bg-[#070C17]">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-3">
          <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Trusted Technology & Digital Engineering Services in <span className="text-[#84CC16]">Delhi NCR & Across India</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-slate-300 font-medium leading-relaxed">
            We help businesses turn ideas into scalable digital products through AI and automation, custom software development, cloud architecture, DevOps, cybersecurity, SaaS engineering, performance marketing, and UI/UX design.
          </p>
        </div>
      </section>

      {/* Services Tabs & Cards Section */}
      <section className="py-20 bg-white dark:bg-[#070C17]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono text-[#84CC16] font-bold uppercase tracking-widest">OUR CORE SERVICES</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Explore Our Expertise</h2>
            <div className="h-1.5 w-20 bg-[#84CC16] mx-auto rounded-full"></div>
          </div>

          <Tabs defaultValue="ai-automation" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-100 dark:bg-[#0B1120] p-1.5 rounded-2xl mb-12 h-auto gap-2 border border-gray-200 dark:border-slate-800">
              {serviceCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-[#84CC16] data-[state=active]:text-black font-bold text-gray-700 dark:text-slate-300 py-3 rounded-xl flex items-center justify-center transition-all text-sm shadow-sm"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden text-xs">{category.label.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, idx) => (
                    <motion.div 
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <Card className="relative bg-white dark:bg-[#0B1120] border-2 border-gray-200 dark:border-slate-800/90 shadow-lg hover:shadow-xl hover:border-[#84CC16] transition-all duration-300 group rounded-2xl overflow-hidden flex flex-col h-full">
                        
                        {/* Top Right Corner Glow Decorative Accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#84CC16]/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                        <CardHeader className="pb-4 z-10">
                          <div className="w-12 h-12 rounded-xl bg-[#84CC16]/15 flex items-center justify-center mb-4 border border-[#84CC16]/30 group-hover:scale-110 group-hover:bg-[#84CC16] transition-all duration-300 [&_svg]:text-[#84CC16] group-hover:[&_svg]:text-black">
                            {service.icon}
                          </div>
                          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</CardTitle>
                          <CardDescription className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed font-normal">
                            {service.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-grow flex flex-col justify-end z-10 pt-2">
                          <ul className="space-y-3 mb-8">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-slate-300 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-[#84CC16] mr-2.5 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* CARD FOOTER BUTTONS - GREEN VIEW DETAILS BUTTON */}
                          <div className="mt-auto flex flex-col gap-2.5 pt-4 border-t border-gray-100 dark:border-slate-800/80">
                            {/* GREEN VIEW DETAILS BUTTON */}
                            <Link 
                              to={`/services/${service.id}`}
                              className="w-full py-3 px-4 rounded-xl bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold text-sm transition-all duration-300 flex items-center justify-center shadow-md shadow-[#84CC16]/20 group/btn"
                            >
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>

                            {/* QUICK INQUIRY LINK */}
                            <button 
                              onClick={() => handleQuickInquiryClick(service.title)}
                              className="w-full py-2.5 px-4 rounded-xl bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-slate-300 text-xs font-bold hover:text-[#84CC16] hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 flex items-center justify-center"
                            >
                              Quick Inquiry <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                            </button>
                          </div>
                        </CardContent>

                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-white dark:bg-[#070C17]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono text-[#84CC16] font-bold uppercase tracking-widest">HOW WE WORK</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Our Delivery Methodology</h2>
            <div className="h-1.5 w-20 bg-[#84CC16] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm hover:border-[#84CC16] transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#84CC16]/10 rounded-bl-2xl pointer-events-none" />
                <div className="text-4xl font-black text-gray-300 dark:text-white/10 mb-3 font-mono">{item.step}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technology Section */}
      <section className="py-20 bg-white dark:bg-[#070C17]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono text-[#84CC16] font-bold uppercase tracking-widest">ENTERPRISE TECH STACK</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Tools & Technology We Use</h2>
            <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto text-sm font-medium">We leverage the latest and most powerful enterprise-grade technologies to deliver scalable, secure, and performant solutions.</p>
          </div>
          
          <Tabs defaultValue="frontend" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-100 dark:bg-[#0B1120] p-1.5 rounded-2xl mb-12 h-auto gap-2 border border-gray-200 dark:border-slate-800">
              {techCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-[#84CC16] data-[state=active]:text-black font-bold text-gray-700 dark:text-slate-300 py-3 rounded-xl flex items-center justify-center transition-all text-sm shadow-sm"
                >
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden text-xs">{category.label.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {techCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="animate-in fade-in duration-500">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {category.tools.map((tech, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group hover:border-[#84CC16] transition-all shadow-sm"
                    >
                      <div className="w-12 h-12 flex items-center justify-center p-1.5 bg-gray-50 dark:bg-slate-900 rounded-xl group-hover:bg-[#84CC16]/10 transition-colors">
                        <img src={tech.logo} alt={tech.name} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-xs font-bold text-gray-800 dark:text-slate-200 truncate w-full font-mono">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Partner Companies Section */}
      <section className="py-12 bg-white dark:bg-[#070C17] overflow-hidden">
        <div className="w-full text-center">
          <p className="text-xs font-mono font-bold text-[#84CC16] uppercase tracking-widest mb-8">Trusted Technology Integrations</p>
          
          <div className="relative flex overflow-x-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#070C17] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#070C17] to-transparent z-10"></div>
            
            <motion.div
              className="flex items-center gap-12 md:gap-24 px-6 md:px-12 w-max"
              animate={{ x: [0, "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {[...partnerCompanies, ...partnerCompanies, ...partnerCompanies].map((company, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group/logo shrink-0 w-32 md:w-40 opacity-75 hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <div className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center grayscale group-hover/logo:grayscale-0 group-hover/logo:scale-110 transition-all duration-300">
                    <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 group-hover/logo:text-gray-900 dark:group-hover/logo:text-white transition-colors duration-300">
                    {company.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* JOIN OUR INDUSTRY TRAINING PROGRAM SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0B1120] via-slate-950 to-[#070C17] text-white relative overflow-hidden border-y border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="px-3.5 py-1.5 rounded-full bg-[#84CC16]/20 text-[#84CC16] text-xs font-mono font-bold uppercase tracking-wider border border-[#84CC16]/40 inline-block shadow-sm">
                  NEXXTECHS ACADEMY & CAREER ACCELERATOR
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Looking to Elevate Your Team or Career? <span className="text-[#84CC16] block mt-1.5">Join Our Industry IT Training Program</span>
                </h2>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl font-medium">
                  Empower your team or master top-tier tech skills in Cloud Computing, DevOps, Full Stack Development, Data Science, AI & Cyber Security with 100% placement assistance & live industry projects.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center hover:border-[#84CC16]/50 transition-colors">
                    <span className="text-2xl md:text-3xl font-black text-[#84CC16]">5000+</span>
                    <p className="text-xs text-gray-300 font-bold uppercase tracking-wider mt-1">Students Trained</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center hover:border-[#84CC16]/50 transition-colors">
                    <span className="text-2xl md:text-3xl font-black text-[#84CC16]">95%</span>
                    <p className="text-xs text-gray-300 font-bold uppercase tracking-wider mt-1">Placement Rate</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center hover:border-[#84CC16]/50 transition-colors">
                    <span className="text-2xl md:text-3xl font-black text-[#84CC16]">2 Campuses</span>
                    <p className="text-xs text-gray-300 font-bold uppercase tracking-wider mt-1">Delhi & Noida</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center hover:border-[#84CC16]/50 transition-colors">
                    <span className="text-2xl md:text-3xl font-black text-[#84CC16]">100%</span>
                    <p className="text-xs text-gray-300 font-bold uppercase tracking-wider mt-1">Live Projects</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center space-y-4">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-8 py-4 bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold text-sm tracking-wider uppercase rounded-xl inline-flex items-center justify-center transition-all shadow-xl shadow-[#84CC16]/25 group"
                >
                  Explore Training Programs
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs tracking-wider uppercase rounded-xl inline-flex items-center justify-center transition-all"
                >
                  Book Free Demo Session
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* EMBEDDED DEDICATED SERVICE ENQUIRY SECTION AT THE BOTTOM OF SERVICES PAGE */}
      <section className="py-20 bg-white dark:bg-[#070C17]" id="bottom-service-enquiry">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="text-center mb-14 space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-[#84CC16]/10 text-[#84CC16] text-xs font-mono font-bold uppercase tracking-wider border border-[#84CC16]/30">
              DIRECT SOLUTIONS DESK
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Start Your <span className="text-[#84CC16]">Service Project</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
              Ready to automate workflows or build a custom software product? Submit your inquiry below and our lead technical architects in Noida will reach out within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: DEDICATED SERVICE ENQUIRY FORM */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white dark:bg-[#0B1120] border-2 border-gray-200 dark:border-slate-800 p-6 md:p-10 rounded-2xl shadow-xl relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-[#84CC16]/20 to-transparent rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/80 pb-4 mb-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Submit Project Requirements
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-medium mt-1">
                    Fast technical evaluation & scope estimation
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#84CC16]/15 text-[#84CC16] text-xs font-mono font-bold uppercase rounded-full border border-[#84CC16]/30">
                  NOIDA DESK
                </span>
              </div>

              {submitted ? (
                <div className="bg-[#84CC16]/10 border border-[#84CC16] p-8 rounded-2xl text-center space-y-4 relative z-10">
                  <CheckCircle2 className="w-14 h-14 text-[#84CC16] mx-auto animate-bounce" />
                  <h4 className="font-bold text-gray-900 dark:text-white text-xl">Enquiry Received!</h4>
                  <p className="text-sm text-gray-600 dark:text-slate-300 max-w-md mx-auto">
                    We have redirected your inquiry directly to our lead technical team on WhatsApp (+91 7987059430).
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#84CC16] underline font-bold pt-2 block mx-auto hover:text-[#65A30D]"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-5 relative z-10">
                  
                  {/* FULL NAME */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={enquiryForm.name}
                      onChange={handleEnquiryChange}
                      placeholder="Enter your full name"
                      className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                    />
                  </div>

                  {/* PHONE & EMAIL GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">
                        PHONE / WHATSAPP NUMBER *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={enquiryForm.phone}
                        onChange={handleEnquiryChange}
                        placeholder="+91 7987059430"
                        className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={enquiryForm.email}
                        onChange={handleEnquiryChange}
                        placeholder="john@company.com"
                        className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* SERVICE INTERESTED (12 SERVICES DROPDOWN - NO INSTITUTE BRANCH) */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">
                      SERVICE INTERESTED *
                    </label>
                    <select
                      name="service"
                      value={enquiryForm.service}
                      onChange={handleEnquiryChange}
                      className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all cursor-pointer"
                    >
                      {SERVICE_OPTIONS.map((srv, idx) => (
                        <option key={idx} value={srv} className="bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white py-2">
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PROJECT SCOPE / REQUIREMENTS */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">
                      PROJECT REQUIREMENTS / SCOPE
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={enquiryForm.message}
                      onChange={handleEnquiryChange}
                      placeholder="Briefly describe your goals, technology preferences, timeline..."
                      className="w-full bg-gray-50 dark:bg-[#070C17] border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold py-4 rounded-xl text-sm tracking-wider uppercase inline-flex items-center justify-center transition-all shadow-lg shadow-[#84CC16]/20"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Service Enquiry
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT COLUMN: NOIDA ONLY CONTACT DETAILS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Contact Solutions Desk
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed font-medium">
                  Have urgent queries about our enterprise solutions? Connect directly with our lead architects at our Noida tech office.
                </p>
              </div>

              {/* PHONE CARD (NOIDA NUMBER ONLY) */}
              <div className="bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-slate-800 p-6 rounded-2xl flex items-start space-x-4 shadow-sm hover:border-[#84CC16] transition-colors group">
                <div className="p-3 bg-[#84CC16]/10 text-[#84CC16] rounded-xl border border-[#84CC16]/20 group-hover:bg-[#84CC16] group-hover:text-black transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Call With Solutions Desk
                  </h4>
                  <a href="tel:+917987059430" className="text-base font-bold text-[#84CC16] hover:underline block mt-0.5 font-mono">
                    +91 7987059430
                  </a>
                  <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">Available Mon - Sat (9 AM - 7 PM IST)</span>
                </div>
              </div>

              {/* EMAIL CARD */}
              <div className="bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-slate-800 p-6 rounded-2xl flex items-start space-x-4 shadow-sm hover:border-[#84CC16] transition-colors group">
                <div className="p-3 bg-[#84CC16]/10 text-[#84CC16] rounded-xl border border-[#84CC16]/20 group-hover:bg-[#84CC16] group-hover:text-black transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Email Us
                  </h4>
                  <a href="mailto:info@nexxtechs.com" className="text-base font-bold text-[#84CC16] hover:underline block mt-0.5 font-mono">
                    info@nexxtechs.com
                  </a>
                  <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">For RFPs, proposal docs & partner inquiries</span>
                </div>
              </div>

              {/* NOIDA OFFICE ADDRESS CARD (ONLY NOIDA ADDRESS) */}
              <div className="bg-gradient-to-br from-white via-gray-50 to-[#84CC16]/5 dark:from-[#0B1120] dark:via-[#0B1120] dark:to-[#84CC16]/10 border-2 border-gray-200 dark:border-slate-800 p-6 rounded-2xl flex items-start space-x-4 shadow-md border-l-4 border-l-[#84CC16]">
                <div className="p-3 bg-[#84CC16]/10 text-[#84CC16] rounded-xl border border-[#84CC16]/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center">
                    Visit Our Noida Office
                    <span className="ml-2 px-2 py-0.5 bg-[#84CC16]/20 text-[#84CC16] text-[10px] font-mono font-bold rounded">
                      NOIDA SECTOR 2
                    </span>
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-slate-300 font-medium leading-relaxed pt-1">
                    B-136 Upper, Ground floor, Sector 2, Noida, Uttar Pradesh 201301
                  </p>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* STRETCHED WIDE FREQUENTLY ASKED QUESTIONS SECTION (BELOW ENQUIRY FORM) */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#070C17]">
        <div className="w-full max-w-[1440px] mx-auto px-2 md:px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-[#84CC16]/10 text-[#84CC16] text-xs font-mono font-bold uppercase tracking-wider border border-[#84CC16]/30">
              COMMON QUERIES & ANSWERS
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Frequently Asked <span className="text-[#84CC16]">Questions</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto font-medium">
              Everything you need to know about our enterprise IT services, AI automation, software engineering, and digital growth solutions in Delhi NCR & India.
            </p>
          </div>

          {/* STRETCHED WIDE ACCORDION LIST WITH MINIMAL SIDE GAPS */}
          <div className="w-full space-y-3.5 max-w-[1380px] mx-auto">
            {serviceFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`w-full rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white dark:bg-[#070C17] border-[#84CC16] shadow-lg shadow-[#84CC16]/5 border-l-4 border-l-[#84CC16]"
                      : "bg-white dark:bg-[#070C17] border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 dark:text-white text-base md:text-lg cursor-pointer select-none"
                  >
                    <span className="flex-1 leading-snug">{faq.q}</span>
                    <div className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                      isOpen ? "bg-[#84CC16] text-black rotate-180" : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400"
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-4 pb-5 md:px-6 md:pb-6 text-gray-600 dark:text-slate-300 text-sm md:text-base leading-relaxed border-t border-gray-100 dark:border-slate-800/80 pt-3.5 font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServicesPage;
