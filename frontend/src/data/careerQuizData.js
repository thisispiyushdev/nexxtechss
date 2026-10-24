// Career Guidance Quiz & Explorer Data
export const DOMAINS = [
  {
    id: "data",
    name: "Data Science & AI",
    iconName: "Brain",
    tagline: "High Growth & Lucrative",
    courses: [
      { name: "Generative AI", type: "Professional Certification", slug: "gen-ai" },
      { name: "Data Science & GenAI", type: "Job Bootcamp", slug: "data-science" },
      { name: "Data Analytics", type: "Professional Certification", slug: "data-analytics" },
      { name: "Machine Learning Specialist", type: "Professional Certification", slug: "data-science" },
    ],
  },
  {
    id: "software",
    name: "Software Development",
    iconName: "Code2",
    tagline: "Highest Job Openings",
    courses: [
      { name: "Java Full Stack", type: "Job Bootcamp", slug: "java-full-stack" },
      { name: "MERN Stack Masterclass", type: "Professional Certification", slug: "mern-stack" },
      { name: "Python Full Stack", type: "Job Bootcamp", slug: "python-full-stack" },
      { name: "Web Development", type: "Full Stack Certification", slug: "web-development" },
      { name: "DSA with Java", type: "Technical Certification", slug: "dsa-with-java" },
      { name: "DSA Foundation", type: "Career Kickstarter", slug: "dsa" },
    ],
  },
  {
    id: "cyber",
    name: "Cyber Security",
    iconName: "ShieldCheck",
    tagline: "Critical Global Defense",
    courses: [
      { name: "Cyber Security Professional", type: "Professional Certification", slug: "cyber-security" },
      { name: "Ethical Hacking Masterclass", type: "Job Bootcamp", slug: "cyber-security" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    iconName: "Cloud",
    tagline: "High Salary & Cloud Scale",
    courses: [
      { name: "Cloud Computing Expert", type: "Professional Certification", slug: "cloud-computing" },
      { name: "DevOps Engineering", type: "Job Bootcamp", slug: "devops" },
      { name: "Azure/AWS Specialist", type: "Cloud Certification", slug: "cloud-computing" },
    ],
  },
  {
    id: "design",
    name: "Design & Creative",
    iconName: "Palette",
    tagline: "Creative & User-Centric",
    courses: [
      { name: "UI/UX Design", type: "Professional Certification", slug: "ui-ux-design" },
      { name: "Graphic Design", type: "Professional Certification", slug: "graphic-design" },
    ],
  },
  {
    id: "business",
    name: "Business & Marketing",
    iconName: "TrendingUp",
    tagline: "Strategic & Market Impact",
    courses: [
      { name: "Digital Marketing Expert", type: "Professional Certification", slug: "digital-marketing" },
      { name: "SAP Masterclass", type: "Enterprise Certification", slug: "sap-masterclass" },
    ],
  },
];

export const STATUSES = [
  { id: "student", name: "School / College student", sub: "Currently pursuing degree", iconName: "GraduationCap" },
  { id: "graduate", name: "Recent graduate", sub: "Seeking first career breakthrough", iconName: "Award" },
  { id: "working", name: "Working professional", sub: "Looking to switch or upgrade", iconName: "Briefcase" },
  { id: "break", name: "On a career break", sub: "Restarting career journey", iconName: "RotateCcw" },
];

export const GOALS = [
  { id: "job", name: "Get my first tech job", sub: "100% placement-backed program", iconName: "Rocket" },
  { id: "switch", name: "Switch to high-paying tech", sub: "From non-tech or stagnant role", iconName: "Shuffle" },
  { id: "upskill", name: "Upskill in current role", sub: "Aiming for promotion or hike", iconName: "Zap" },
  { id: "freelance", name: "Freelance / build agency", sub: "Master high-ticket client skills", iconName: "Globe" },
];

export const STEPS = ["domain", "course", "status", "goal", "lead", "result"];

export const TITLES = {
  domain: ["Which tech domain interests you most?", "Select the industry you'd like to build your future in"],
  course: ["Which program or specialization excites you?", "Choose the specific course you'd like to master"],
  status: ["What describes your current background?", "Helps us calibrate your learning curve & pacing"],
  goal: ["What is your primary career target?", "We'll align the roadmap with your end milestone"],
  lead: ["Where should we send your custom career roadmap?", "Our senior tech counselor will provide free 1-on-1 guidance & syllabus"],
};

export const getDomain = (id) => DOMAINS.find((d) => d.id === id);
