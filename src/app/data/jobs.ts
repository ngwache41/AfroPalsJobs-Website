export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  tags: string[];
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120K - $180K",
    postedDate: "2 days ago",
    tags: ["React", "TypeScript", "Remote"],
    description:
      "We're looking for an experienced Frontend Developer to join our growing team. You'll be working on cutting-edge web applications using React and TypeScript.",
    requirements: [
      "5+ years of frontend development experience",
      "Expert knowledge of React and TypeScript",
      "Experience with modern build tools and CI/CD",
      "Strong understanding of web performance optimization",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Build and maintain high-quality web applications",
      "Collaborate with designers and backend developers",
      "Write clean, maintainable code",
      "Mentor junior developers",
      "Participate in code reviews",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Unlimited PTO",
      "Remote work options",
    ],
  },
  {
    id: "2",
    title: "Product Manager",
    company: "InnovateLabs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$140K - $200K",
    postedDate: "5 days ago",
    tags: ["Product", "Strategy", "B2B"],
    description:
      "Join our team as a Product Manager and help shape the future of our enterprise SaaS platform. You'll work closely with engineering, design, and sales teams.",
    requirements: [
      "3+ years of product management experience",
      "Experience with B2B SaaS products",
      "Strong analytical and problem-solving skills",
      "Excellent stakeholder management",
      "Technical background preferred",
    ],
    responsibilities: [
      "Define product roadmap and strategy",
      "Gather and prioritize product requirements",
      "Work closely with engineering teams",
      "Analyze user feedback and market trends",
      "Launch new features and products",
    ],
    benefits: [
      "Competitive compensation package",
      "Comprehensive health benefits",
      "Professional development budget",
      "Hybrid work environment",
      "Stock options",
    ],
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90K - $130K",
    postedDate: "1 week ago",
    tags: ["Figma", "User Research", "Mobile"],
    description:
      "We're seeking a talented UX/UI Designer to create beautiful and intuitive user experiences for our mobile and web applications.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma and design systems",
      "Experience with user research and testing",
      "Portfolio demonstrating design skills",
      "Understanding of front-end development",
    ],
    responsibilities: [
      "Design user interfaces for web and mobile",
      "Conduct user research and testing",
      "Create and maintain design systems",
      "Collaborate with product and engineering teams",
      "Present design concepts to stakeholders",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Flexible working hours",
      "Creative work environment",
      "Annual conference budget",
    ],
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "DataDriven AI",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$130K - $190K",
    postedDate: "3 days ago",
    tags: ["Python", "Machine Learning", "AI"],
    description:
      "Join our AI team to build cutting-edge machine learning models and data pipelines. You'll work on challenging problems across various domains.",
    requirements: [
      "MS or PhD in Computer Science, Statistics, or related field",
      "5+ years of data science experience",
      "Expert in Python and ML frameworks",
      "Experience with large-scale data processing",
      "Strong statistical analysis skills",
    ],
    responsibilities: [
      "Develop and deploy ML models",
      "Analyze large datasets",
      "Collaborate with engineering teams",
      "Present findings to stakeholders",
      "Mentor junior data scientists",
    ],
    benefits: [
      "Competitive compensation",
      "Comprehensive benefits package",
      "Research time allocation",
      "Conference attendance",
      "Remote-friendly",
    ],
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$110K - $160K",
    postedDate: "4 days ago",
    tags: ["AWS", "Kubernetes", "CI/CD"],
    description:
      "We need a skilled DevOps Engineer to help scale our cloud infrastructure and improve our deployment processes.",
    requirements: [
      "4+ years of DevOps experience",
      "Expert knowledge of AWS or GCP",
      "Experience with Kubernetes and Docker",
      "Strong scripting skills (Python, Bash)",
      "Infrastructure as Code experience",
    ],
    responsibilities: [
      "Manage cloud infrastructure",
      "Implement CI/CD pipelines",
      "Monitor system performance",
      "Ensure security best practices",
      "Troubleshoot production issues",
    ],
    benefits: [
      "Competitive salary",
      "Full benefits package",
      "Professional development",
      "Work-life balance",
      "Latest tech tools",
    ],
  },
  {
    id: "6",
    title: "Marketing Manager",
    company: "GrowthHackers",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$100K - $150K",
    postedDate: "1 week ago",
    tags: ["Digital Marketing", "SEO", "Content"],
    description:
      "Lead our marketing efforts and help us grow our brand. You'll be responsible for developing and executing marketing strategies.",
    requirements: [
      "5+ years of marketing experience",
      "Proven track record in digital marketing",
      "SEO and content marketing expertise",
      "Experience with marketing automation tools",
      "Strong analytical skills",
    ],
    responsibilities: [
      "Develop marketing strategies",
      "Manage marketing campaigns",
      "Lead content creation",
      "Analyze campaign performance",
      "Manage marketing budget",
    ],
    benefits: [
      "Competitive salary",
      "Health benefits",
      "Marketing conference budget",
      "Flexible schedule",
      "Creative freedom",
    ],
  },
];
