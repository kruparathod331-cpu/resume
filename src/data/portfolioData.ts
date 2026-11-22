import { 
  ProfileInfo, 
  SkillItem, 
  ProjectItem, 
  CertificateItem, 
  AchievementItem, 
  JourneyMilestone, 
  TechDiscovery, 
  CurrentlyBuildingItem,
  ThemePreset
} from '../types';

export const profileData: ProfileInfo = {
  fullName: "Krupa Rathod",
  professionalTitle: "Aspiring AI/ML Engineer | Full-Stack Developer",
  tagline: "Code. Create. Innovate.",
  location: "Gujarat, India",
  profilePhoto: "/assets/profile.jpg",
  personalIntroduction: `Hey, I'm a curious mind with a builder's mindset! 👋

I'm a Computer Science student at Government Engineering College, Gandhinagar (GEC Gandhinagar), passionate about exploring the intersection of Artificial Intelligence, Machine Learning, and Full-Stack Development.

I'm more than just a learner — I'm a builder, problem-solver, and aspiring innovator. From developing creative projects and exploring startup ideas to participating in hackathons, tech events, and college clubs, I love turning ideas into real-world experiences.

I believe in learning by doing, experimenting beyond the classroom, collaborating with like-minded people, and constantly challenging myself to build something meaningful.

Whether it's developing intelligent applications, exploring emerging technologies, brainstorming startup ideas, or participating in communities that inspire innovation, I'm always excited about what's next.

My mindset? Stay curious. Build fearlessly. Learn endlessly. Innovate constantly. 🚀`,
  email: "kr.rathod331@gmail.com",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/krupa-rathod-4a1172423?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/kruparathod331-cpu",
    other: "https://github.com/kruparathod331-cpu"
  },
  currentStatus: "Computer Science Student | Aspiring AI Engineer & Full-Stack Developer | Open to Opportunities",
  education: "B.Tech in Computer Science & Engineering | Government Engineering College, Gandhinagar",
  careerInterests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full-Stack Development",
    "Software Engineering",
    "Generative AI & LLMs",
    "Entrepreneurship & Startups"
  ],
  languages: ["English", "Hindi", "Gujarati"],
  resumeUrl: "#resume-modal", // Interactive viewer & download trigger
  videoIntroUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Customizable placeholder with rich video player modal
};

export const skillsData: SkillItem[] = [
  // Programming Languages
  { name: "Python", category: "languages", icon: "Code2", description: "Primary language for AI/ML, NLP pipelines with spaCy, and FastAPI backends.", docUrl: "https://www.python.org", featured: true },
  { name: "JavaScript", category: "languages", icon: "FileCode", description: "Modern ES6+, async architectures, DOM manipulation, full-stack workflows.", docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", featured: true },
  { name: "C++", category: "languages", icon: "Cpu", description: "Object-oriented programming, data structures, and algorithmic problem solving.", docUrl: "https://isocpp.org" },
  { name: "Java", category: "languages", icon: "Coffee", description: "Object-oriented system fundamentals, enterprise logic, data structures.", docUrl: "https://www.java.com" },
  { name: "C", category: "languages", icon: "Binary", description: "Low-level memory management, pointers, and foundational computer science.", docUrl: "https://en.cppreference.com/w/c" },

  // Frontend Technologies
  { name: "React.js", category: "frontend", icon: "Atom", description: "Component-driven single page applications, hooks, state management, and modern UI.", docUrl: "https://react.dev", featured: true },
  { name: "Tailwind CSS", category: "frontend", icon: "Palette", description: "Utility-first CSS, custom design systems, responsive layouts, glassmorphism.", docUrl: "https://tailwindcss.com", featured: true },
  { name: "HTML5", category: "frontend", icon: "Layout", description: "Semantic markup, accessibility (a11y), clean document structure.", docUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS3", category: "frontend", icon: "Sparkles", description: "Modern responsive grids, flexbox, CSS variables, and keyframe animations.", docUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "Bootstrap", category: "frontend", icon: "Grid", description: "Rapid prototyping, responsive utility grids, and UI elements.", docUrl: "https://getbootstrap.com" },

  // Backend Technologies
  { name: "FastAPI", category: "backend", icon: "Zap", description: "High-performance Python asynchronous APIs, Pydantic data schemas, automated Swagger docs.", docUrl: "https://fastapi.tiangolo.com", featured: true },
  { name: "Flask", category: "backend", icon: "Flame", description: "Micro-framework for rapid ML model endpoints and web services.", docUrl: "https://flask.palletsprojects.com" },
  { name: "Node.js", category: "backend", icon: "Server", description: "JavaScript runtime for building scalable server-side tools and services.", docUrl: "https://nodejs.org" },
  { name: "Express.js", category: "backend", icon: "Layers", description: "Minimalist web framework for Node.js RESTful routing.", docUrl: "https://expressjs.com" },
  { name: "REST APIs", category: "backend", icon: "Network", description: "Designing secure, structured, decoupled HTTP services.", docUrl: "https://restfulapi.net" },

  // Databases
  { name: "PostgreSQL", category: "databases", icon: "Database", description: "Advanced relational database with relational schemas and indexing.", docUrl: "https://www.postgresql.org", featured: true },
  { name: "MongoDB", category: "databases", icon: "FolderArchive", description: "NoSQL document store for flexible data architectures.", docUrl: "https://www.mongodb.com" },
  { name: "MySQL", category: "databases", icon: "HardDrive", description: "Structured relational tables, foreign key constraints, relational queries.", docUrl: "https://www.mysql.com" },
  { name: "Firebase", category: "databases", icon: "Flame", description: "Realtime database, authentication, and serverless backends.", docUrl: "https://firebase.google.com" },
  { name: "SQLite", category: "databases", icon: "FileSpreadsheet", description: "Lightweight embedded database for fast local storage.", docUrl: "https://www.sqlite.org" },

  // AI / ML Tools & Technologies
  { name: "Scikit-learn", category: "ai_ml", icon: "TrendingUp", description: "Predictive data modeling, classification, regression, and model evaluation.", docUrl: "https://scikit-learn.org", featured: true },
  { name: "spaCy", category: "ai_ml", icon: "Bot", description: "Industrial-strength Natural Language Processing, entity recognition & tokenization (used in FitCheck).", docUrl: "https://spacy.io", featured: true },
  { name: "TensorFlow", category: "ai_ml", icon: "Brain", description: "Deep learning neural network architectures and computation graphs.", docUrl: "https://www.tensorflow.org" },
  { name: "PyTorch", category: "ai_ml", icon: "Flame", description: "Dynamic tensor computation, deep learning models, and neural nets.", docUrl: "https://pytorch.org" },
  { name: "Pandas", category: "ai_ml", icon: "Table", description: "Data manipulation, feature engineering, and tabular dataset transformations.", docUrl: "https://pandas.pydata.org" },
  { name: "NumPy", category: "ai_ml", icon: "Binary", description: "High-performance multidimensional arrays and mathematical operations.", docUrl: "https://numpy.org" },
  { name: "Matplotlib", category: "ai_ml", icon: "LineChart", description: "Data visualization, statistical plotting, and metric evaluation charts.", docUrl: "https://matplotlib.org" },
  { name: "Google Colab", category: "ai_ml", icon: "Cloud", description: "Cloud GPU environment for ML experiments and data analysis.", docUrl: "https://colab.research.google.com" },

  // Development Tools
  { name: "Git & GitHub", category: "tools", icon: "GitBranch", description: "Version control, branching strategies, collaborative PR workflows.", docUrl: "https://github.com", featured: true },
  { name: "VS Code", category: "tools", icon: "Terminal", description: "Primary IDE configured with Python, React, and debugging toolchains.", docUrl: "https://code.visualstudio.com" },
  { name: "Postman", category: "tools", icon: "Send", description: "API testing, endpoint benchmarking, payload inspection.", docUrl: "https://www.postman.com" },
  { name: "Docker", category: "tools", icon: "Box", description: "Containerization fundamentals for consistent developer environments.", docUrl: "https://www.docker.com" },
  { name: "Figma", category: "tools", icon: "PenTool", description: "UI/UX wireframing, component mockups, and modern web prototyping.", docUrl: "https://www.figma.com" },

  // Cloud & Deployment
  { name: "Vercel", category: "cloud", icon: "Globe", description: "Continuous deployment for modern frontend and full-stack projects.", docUrl: "https://vercel.com", featured: true },
  { name: "Render", category: "cloud", icon: "CloudRain", description: "Hosting for backend microservices, FastAPI instances, and databases.", docUrl: "https://render.com" },
  { name: "Netlify", category: "cloud", icon: "Radio", description: "Static site hosting, serverless functions, and CDN deployment.", docUrl: "https://www.netlify.com" },
  { name: "GitHub Pages", category: "cloud", icon: "BookOpen", description: "Automated static publishing and documentation hosting.", docUrl: "https://pages.github.com" },

  // Core Engineering & Other Skills
  { name: "Data Structures & Algorithms", category: "core", icon: "Boxes", description: "Arrays, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming.", docUrl: "https://leetcode.com", featured: true },
  { name: "Object-Oriented Programming", category: "core", icon: "Component", description: "Encapsulation, inheritance, polymorphism, clean architectural design.", docUrl: "https://en.wikipedia.org/wiki/Object-oriented_programming" },
  { name: "UI/UX Design", category: "core", icon: "Eye", description: "User-centered design principles, visual hierarchy, micro-interactions.", docUrl: "https://lawsofux.com" },
  { name: "Problem Solving & Debugging", category: "core", icon: "ShieldCheck", description: "Systematic root-cause analysis, stack trace inspection, code optimization.", docUrl: "https://en.wikipedia.org/wiki/Debugging" }
];

export const projectsData: ProjectItem[] = [
  {
    id: "shopsmart-ai",
    title: "ShopSmart AI – Next-Gen Gen Z AI E-Commerce Platform",
    shortDescription: "A modern, AI-inspired e-commerce platform designed to make online shopping smarter, more engaging, and personalized through an attractive Gen Z-focused shopping experience.",
    detailedExplanation: `ShopSmart AI is an e-commerce website concept that combines modern shopping experiences with AI-driven innovation and contemporary UI/UX design. It focuses on creating an engaging and user-friendly shopping environment with a visually appealing interface, intuitive navigation, and a modern digital shopping experience.

The project explores how AI and modern web technologies can improve the way users discover and interact with products online, featuring curated collections, aesthetic product showcases, and interactive shopping interactions tailored to digital natives.`,
    category: "AI / Machine Learning",
    status: "Live on Vercel",
    technologies: ["React.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Vercel"],
    role: "Project Lead — Conceptualized, designed, and developed the project. Worked on the user interface, visual identity, website structure, responsive design, and implementation of the shopping experience.",
    keyFeatures: [
      "Modern Gen Z-inspired vibrant e-commerce interface",
      "Visually engaging product discovery experience",
      "Contemporary UI/UX design with glassmorphism & fluid animations",
      "Responsive website layout optimized for mobile and desktop screens",
      "AI-inspired product recommendation & shopping experience",
      "Intuitive cart navigation and interactive components",
      "Modern visual styling and shopping-focused interactive design"
    ],
    githubUrl: "https://github.com/kruparathod331-cpu/SHOPSMART",
    liveDemoUrl: "https://frontend-eight-livid-19.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
    ],
    problemStatement: "Traditional e-commerce platforms often feel cluttered, generic, and uninspiring for the younger generation of consumers. Product discovery is frequently transactional rather than inspiring or personalized.",
    solutionArchitecture: "Engineered a high-speed, aesthetically bold web storefront utilizing modular React component design, Tailwind CSS utility styling, and predictive AI curation concepts that elevate product browsing into an interactive digital discovery journey.",
    challenges: [
      "Crafting an aesthetic that appeals to Gen Z aesthetics while maintaining clean readability and fast load times.",
      "Structuring flexible product catalog components and shopping state interactions.",
      "Ensuring responsive layout transitions between mobile touch gestures and desktop cursors."
    ],
    whatILearned: [
      "Building and structuring a modern e-commerce website architecture.",
      "Creating engaging and user-friendly interfaces with strong brand personality.",
      "Understanding advanced responsive web design patterns.",
      "Working with frontend development workflows and state handling.",
      "Deploying and managing continuous deployments using Vercel.",
      "Exploring the possibilities of integrating AI into personalized e-commerce.",
      "Turning a creative concept into a fully functional live web project."
    ],
    timeline: [
      { phase: "Ideation & Design", description: "Audience research, moodboards, and UI component wireframing." },
      { phase: "Frontend Architecture", description: "React modular component development and Tailwind CSS integration." },
      { phase: "E-Commerce Interactions", description: "Cart logic, filtering, product showcase carousels, and responsive tests." },
      { phase: "Vercel Deployment", description: "Continuous deployment pipeline setup and production performance tuning." }
    ]
  },
  {
    id: "fitcheck",
    title: "FitCheck – ATS-Optimized Resume Builder & Job Matcher",
    shortDescription: "An intelligent resume-building and job-matching platform that helps candidates create ATS-friendly resumes, analyze compatibility with job descriptions, and identify missing skills through transparent recommendations.",
    detailedExplanation: `FitCheck is a career-focused web application designed to simplify the resume-building and job application process.

The platform allows users to create professional resumes using structured editing tools or upload existing PDF resumes for automatic text extraction. It provides job description matching through Natural Language Processing (NLP), helping users understand how closely their skills and qualifications align with target roles.

Rather than relying on misleading keyword tricks or fabricated scores, FitCheck follows a Truth-in-Hiring approach, providing transparent matching insights, identifying missing qualifications, and suggesting genuine improvements.`,
    category: "Full Stack",
    status: "Live on Vercel",
    technologies: ["Python", "FastAPI", "spaCy (NLP)", "pdfplumber", "ReportLab", "Bcrypt", "Vercel"],
    role: "Full-Stack Developer & Creator — Project Conceptualization, UI/UX Development, Full-Stack Architecture, Backend Integration, NLP Implementation, Resume Processing, and Deployment.",
    keyFeatures: [
      "ATS-friendly resume builder with real-time preview",
      "PDF resume upload and automatic structured text extraction using pdfplumber",
      "Five professional ATS-optimized resume templates",
      "Live resume section editing and drag/reorder workflows",
      "Job description matching and compatibility scoring",
      "NLP-based skill and keyword extraction using spaCy",
      "Identification of missing critical skills and job requirements",
      "Personalized resume improvement recommendations",
      "Professional PDF generation on-the-fly using ReportLab",
      "Secure password handling and authentication using Bcrypt",
      "Interactive demo account for instant recruiter testing",
      "Truth-in-Hiring philosophy with transparent matching insights"
    ],
    githubUrl: "https://github.com/kruparathod331-cpu/FITCHECK",
    liveDemoUrl: "https://fitcheck-czjy.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
    ],
    problemStatement: "Job seekers often face rejection by Automated Applicant Tracking Systems (ATS) because of improper document formatting, unrecognized layout hierarchies, or missing keyword alignment that doesn't reflect their true potential.",
    solutionArchitecture: "Built a Python FastAPI backend integrated with spaCy NLP pipeline to extract text, tokenize skills, calculate similarity matrices against job specifications, and dynamically compile standard PDF outputs via ReportLab, paired with an interactive frontend client.",
    challenges: [
      "Parsing diverse and unstructured text layouts from various user-submitted PDF files accurately with pdfplumber.",
      "Implementing an accurate, explainable similarity scoring algorithm rather than a black-box percentage.",
      "Generating cleanly formatted vector PDFs using ReportLab while maintaining precise template margins."
    ],
    whatILearned: [
      "Developing a complete full-stack web application from database to UI.",
      "Building and integrating decoupled frontend and FastAPI backend microservices.",
      "Working with Natural Language Processing using spaCy and token matchers.",
      "Extracting structured information from complex PDF documents.",
      "Generating professional PDF documents programmatically using ReportLab.",
      "Implementing real-world resume-to-job-description matching logic.",
      "Handling authentication security and Bcrypt password hashing best practices.",
      "Designing practical solutions to solve real-world career challenges."
    ],
    timeline: [
      { phase: "NLP Prototyping", description: "Trained spaCy token matchers on job descriptions and technical skill taxonomies." },
      { phase: "Backend Development", description: "Built FastAPI REST endpoints for PDF parsing, scoring, and ReportLab generation." },
      { phase: "Frontend & Templates", description: "Created 5 ATS-compliant templates with live dynamic field editor." },
      { phase: "Testing & Deployment", description: "End-to-end integration testing, secure credential isolation, and Vercel deployment." }
    ]
  },
  {
    id: "grantly",
    title: "GRANTLY – AI-Powered Scholarship Discovery & Student Funding Platform",
    shortDescription: "A student-focused funding discovery platform designed to simplify finding scholarships, exploring financial opportunities, organizing applications, and managing academic documents through one personalized dashboard.",
    detailedExplanation: `GRANTLY is an EdTech platform built around a simple idea: every student's potential deserves access to opportunities.

Finding scholarships can be overwhelming due to scattered information, complicated eligibility requirements, missed deadlines, and disorganized applications.

GRANTLY aims to bring these processes together in one place through a personalized student dashboard. It provides a centralized experience for discovering scholarship opportunities, viewing potential profile matches, saving interesting opportunities, tracking applications, and organizing important documents with a dedicated AI companion concept.`,
    category: "EdTech & Automation",
    status: "Live on Vercel",
    technologies: ["React.js", "Vite", "Tailwind CSS", "JavaScript", "TypeScript", "Vercel", "Git & GitHub"],
    role: "Founder & Creator — Product Conceptualization, UI/UX Design, Frontend Architecture, Feature Planning, Dashboard Engineering, User Experience Design, and Deployment.",
    keyFeatures: [
      "Personalized student dashboard with funding overview",
      "Intelligent scholarship discovery and multi-parameter filtering",
      "Personalized scholarship matching based on student profile criteria",
      "Saved scholarship opportunities and bookmarking manager",
      "Comprehensive application status tracking dashboard (Applied, Under Review, Accepted)",
      "Document vault for organizing certificates, transcripts, and financial documents safely",
      "Student profile settings and academic portfolio management",
      "Application readiness insights with actionable suggestions",
      "GRANTLY AI companion interface for guidance and query assistance",
      "Personalized student funding journey tracker",
      "Customizable theme studio for accessible student experiences"
    ],
    githubUrl: "https://github.com/kruparathod331-cpu/GRANTLY",
    liveDemoUrl: "https://grantly-6084.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop"
    ],
    problemStatement: "Millions of dollars in higher-education scholarships go unclaimed each year because students are unaware of their eligibility or get intimidated by fragmented, tedious application requirements across hundreds of portals.",
    solutionArchitecture: "Architected a unified single-window student application ecosystem with intuitive state management, custom document vaults, profile-matching heuristics, and an AI advisory assistant that breaks complex scholarship criteria into clear step-by-step checklists.",
    challenges: [
      "Synthesizing diverse eligibility rules into a clean, non-intimidating user interface.",
      "Designing a persistent document vault with clear file status indicators.",
      "Maintaining high responsiveness and quick search across extensive mock funding opportunities."
    ],
    whatILearned: [
      "Turning a pressing real-world student dilemma into a comprehensive digital product concept.",
      "Applying user-centered design principles to organize dense administrative information.",
      "Designing complex multi-view dashboards with clear visual hierarchy.",
      "Developing modern EdTech interfaces with reusable component architectures.",
      "Building accessible document storage and application tracking workflows.",
      "Thinking beyond code into product strategy, student empathy, and social impact."
    ],
    timeline: [
      { phase: "Product Discovery", description: "Surveyed student pain points regarding scholarship applications and portal friction." },
      { phase: "UI/UX & Wireframing", description: "Designed the dashboard, document vault, and GRANTLY AI companion in Figma." },
      { phase: "Component Engineering", description: "Built dynamic scholarship search filters, cards, and application pipeline trackers." },
      { phase: "Deployment", description: "Shipped the live application on Vercel with continuous integration." }
    ]
  },
  {
    id: "carecircle",
    title: "CareCircle – Digital Healthcare & Community Support Platform",
    shortDescription: "A modern web platform designed with an emphasis on intuitive visual design, seamless user interface, empathy-driven navigation, and accessible healthcare connections.",
    detailedExplanation: `CareCircle is a web-based digital platform developed with a focus on visual design, empathetic user experience, intuitive navigation, and accessible interfaces.

The project explores how modern web technologies can connect individuals, caregivers, and support networks through an approachable, reassuring digital atmosphere.`,
    category: "Web Development",
    status: "Live on Vercel",
    technologies: ["React.js", "Tailwind CSS", "JavaScript", "UI/UX Design", "Vercel"],
    role: "Project Developer — UI/UX Design, Website Development, Component Styling, and Deployment.",
    keyFeatures: [
      "Clean, reassuring healthcare UI aesthetic with soothing color palettes",
      "Intuitive navigation designed for accessibility across all age demographics",
      "Modular card layouts for community resources and caregiver contacts",
      "Mobile-first responsive architecture",
      "Optimized load times and fluid page transitions"
    ],
    githubUrl: "https://github.com/kruparathod331-cpu/CARE-CIRCLE-",
    liveDemoUrl: "https://care-circle-livid.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop"
    ],
    problemStatement: "Healthcare tools often suffer from cold, clinical, and difficult-to-navigate interfaces that induce stress rather than comfort for patients and families seeking care.",
    solutionArchitecture: "Constructed an empathy-first digital presence focusing on human-centric typography, high-contrast accessible layouts, and clear information hierarchy that prioritizes peace of mind.",
    challenges: [
      "Balancing emotional warmth and clinical professionalism in the visual language.",
      "Optimizing typography contrast ratios for accessibility standards (WCAG AAA)."
    ],
    whatILearned: [
      "Designing digital products with empathy for vulnerable user groups.",
      "Mastering accessible typography, contrast, and spacing fundamentals.",
      "Structuring clean frontend codebases with Vercel deployment workflows."
    ],
    timeline: [
      { phase: "Concept & Empathy Mapping", description: "Researched accessible color theories and patient user journeys." },
      { phase: "UI Implementation", description: "Created responsive components with accessible contrast ratios." },
      { phase: "Deployment", description: "Published on Vercel with zero performance bottlenecks." }
    ]
  }
];

export const certificatesData: CertificateItem[] = [
  {
    id: "cert-the-outpost",
    title: "THE OUTPOST – 6-Hour Frontend Development Hackathon",
    issuer: "Frontend Arena & Unstop",
    date: "November 11, 2026",
    credentialId: "FA-WGF4FLKW",
    verificationUrl: "https://unstop.com",
    imageUrl: "/assets/certificates/cert_the_outpost_hackathon.png",
    category: "Hackathons",
    description: "Successfully participated in THE OUTPOST, an intensive 6-hour frontend hackathon demonstrating creativity, rapid problem-solving, and clean UI engineering under tight time constraints.",
    highlights: ["6-Hour Rapid Prototyping", "Frontend Engineering", "Unstop Verified", "Creative Problem Solving"]
  },
  {
    id: "cert-claude-code-101",
    title: "Claude Code 101 – Course Completion Badge",
    issuer: "Claude Academy (Anthropic)",
    date: "November 6, 2026",
    credentialId: "979541c36a5d15d2dfed97d8974e52e7",
    verificationUrl: "https://academy.claude.com/verify/979541c36a5d15d2dfed97d8974e52e7",
    imageUrl: "/assets/certificates/cert_claude_code_101.png",
    category: "AI & ML",
    description: "Official credential awarded by Claude Academy validating practical proficiency in AI agentic coding, prompt engineering, and intelligent developer workflows.",
    highlights: ["Official Claude Academy Credential", "Agentic Coding", "Prompt Engineering", "LLM Integration"]
  },
  {
    id: "cert-breakpoint-2026",
    title: "Breakpoint Hackathon 2026 – Idea Submission",
    issuer: "invoqe & Unstop",
    date: "2026",
    credentialId: "Team GhostProtocol",
    verificationUrl: "https://unstop.com",
    imageUrl: "/assets/certificates/cert_breakpoint_2026.png",
    category: "Hackathons",
    description: "Participated as Team GhostProtocol representing Government Engineering College, Gandhinagar in the innovative idea submission round of Breakpoint Hackathon 2026.",
    highlights: ["Team GhostProtocol", "GEC Gandhinagar Representation", "Innovative Ideation", "Hackathon Finalist"]
  },
  {
    id: "cert-eureka-gec",
    title: "Eureka Idea-Presentation – Certificate of Achievement",
    issuer: "E-Cell, GEC Gandhinagar (SSIP, IIC, Ministry of Education)",
    date: "2026",
    credentialId: "SSIP-GEC-EUREKA",
    verificationUrl: "https://gecg28.ac.in",
    imageUrl: "/assets/certificates/cert_eureka_gec.png",
    category: "Competitions & Innovation",
    description: "Awarded Certificate of Achievement for actively presenting an innovative startup concept before the esteemed jury at Eureka, organized by E-Cell GEC Gandhinagar under SSIP and Institution's Innovation Council (Ministry of Education).",
    highlights: ["Ministry of Education IIC", "SSIP Funded E-Cell", "Startup Pitching", "Jury Recognition"]
  },
  {
    id: "cert-google-ambassador",
    title: "Fund My Crazy: Build Night Edition",
    issuer: "Google Student Ambassador Program 2026",
    date: "August 23, 2026",
    credentialId: "GSA-MT7HUUW9-4LIB (GID: 2588)",
    verificationUrl: "https://google.com",
    imageUrl: "/assets/certificates/cert_google_ambassador_gemini.png",
    category: "AI & ML",
    description: "Actively participated in the Google Student Ambassador Program Build Night Challenge, leveraging Google Gemini to reimagine an everyday piece of city life and bringing the idea to life visually with Nano Banana.",
    highlights: ["Google Student Ambassador", "Gemini AI Multimodal", "Nano Banana Visual Concept", "City Life Innovation"]
  },
  {
    id: "cert-forage-ai-in-action",
    title: "AI in Action Job Simulation",
    issuer: "Forage & Vista",
    date: "August 20, 2026",
    credentialId: "6a866a344b85aece3a09eb64",
    verificationUrl: "https://www.theforage.com",
    imageUrl: "/assets/certificates/cert_forage_ai_in_action.png",
    category: "AI & ML",
    description: "Completed comprehensive practical job simulation tasks in building fluency with Prompt & Contextual Engineering and applying AI prompt skills to automate professional corporate workflows.",
    highlights: ["Prompt & Contextual Engineering", "Workflow Automation", "Industry Job Simulation", "Forage Certified"]
  }
];

export const achievementsData: AchievementItem[] = [
  {
    id: "achieve-eureka",
    title: "Certificate of Achievement — Eureka Innovation Pitch",
    organization: "E-Cell GEC Gandhinagar & SSIP (Ministry of Education)",
    year: "2026",
    description: "Recognized for innovative idea presentation and startup concept defense before the expert jury panel at Government Engineering College Gandhinagar.",
    badge: "Startup Recognition"
  },
  {
    id: "achieve-outpost",
    title: "THE OUTPOST 6-Hour Hackathon Challenger",
    organization: "Frontend Arena & Unstop",
    year: "2026",
    description: "Successfully built and submitted a production frontend challenge within an intense 6-hour hackathon sprint.",
    badge: "Hackathon Competitor"
  },
  {
    id: "achieve-google-ambassador",
    title: "Google Student Ambassador Build Night Finalist",
    organization: "Google Student Ambassador Program",
    year: "2026",
    description: "Selected to design a civic reimagining challenge powered by Google's Gemini multimodal AI.",
    badge: "Google Ambassador"
  },
  {
    id: "achieve-ghostprotocol",
    title: "Team GhostProtocol Lead — Breakpoint Hackathon",
    organization: "invoqe & Unstop",
    year: "2026",
    description: "Represented GEC Gandhinagar in national ideation sprint focusing on breakthrough tech applications.",
    badge: "Team Representation"
  }
];

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "milestone-1",
    date: "2024 – Present",
    title: "Beginning My Engineering Journey",
    category: "Education",
    description: "Joined Government Engineering College, Gandhinagar (GEC Gandhinagar) pursuing B.Tech in Computer Science & Engineering. Deepened foundational mastery in C, C++, Java, Data Structures, Algorithms, and Object-Oriented Software Principles.",
    tags: ["GEC Gandhinagar", "Computer Science", "DSA", "C++", "Java"]
  },
  {
    id: "milestone-2",
    date: "2025",
    title: "Exploring, Building & Experimenting",
    category: "Innovation & Clubs",
    description: "Shifted from theory to hands-on creation. Developed modern full-stack web applications, mastered Python, FastAPI, and React. Built ShopSmart AI and FitCheck ATS matcher, experimenting with Natural Language Processing and real-world utility.",
    tags: ["Full-Stack", "FastAPI", "React", "Python", "spaCy NLP"]
  },
  {
    id: "milestone-3",
    date: "2026",
    title: "Beyond the Classroom – Hackathons & E-Cell",
    category: "Hackathons",
    description: "Actively immersed in innovation communities: pitched at Eureka (E-Cell GEC Gandhinagar / SSIP), participated in THE OUTPOST (6-Hour Frontend Hackathon), competed in Breakpoint Hackathon 2026 with Team GhostProtocol, and completed Google Ambassador Gemini Build Night.",
    tags: ["Hackathons", "E-Cell GEC", "Eureka", "Unstop", "Google Ambassador"]
  },
  {
    id: "milestone-4",
    date: "2026 – Present",
    title: "The Next Chapter – AI/ML & Full-Stack Innovation",
    category: "AI & Full Stack",
    description: "Pushing boundaries in Generative AI, agentic systems, Deep Learning with PyTorch/TensorFlow, and launching GRANTLY to empower student scholarship opportunities. Actively collaborating and open to high-impact software engineering & AI opportunities.",
    currentlyExploring: true,
    tags: ["Generative AI", "GRANTLY", "PyTorch", "Open Opportunities"]
  }
];

export const techDiscoveries: TechDiscovery[] = [
  {
    id: "disc-agentic-coding",
    title: "The Rise of Agentic AI Coding & Autonomous Developer Loops",
    category: "AI & LLMs",
    description: "How modern AI models are shifting from simple auto-completion to autonomous problem-solving agents that plan, read codebases, execute terminal commands, and debug tests in closed loops.",
    publishedDate: "Nov 2026",
    sourceName: "Claude & Gemini Dev Notes",
    sourceUrl: "https://anthropic.com",
    tags: ["Agentic AI", "Developer Tools", "LLM Workflows"],
    featured: true
  },
  {
    id: "disc-fastapi-spacy",
    title: "High-Throughput NLP in Production: FastAPI Meets spaCy",
    category: "Developer Tools",
    description: "Architectural insights from building FitCheck: running asynchronous NLP token matchers with zero blocking, memory profiling on Vercel/Render, and vectorizing skills.",
    publishedDate: "Oct 2026",
    sourceName: "FitCheck Engineering Lab",
    sourceUrl: "https://github.com/kruparathod331-cpu/FITCHECK",
    tags: ["Python", "FastAPI", "spaCy", "ATS"]
  },
  {
    id: "disc-tailwind-v4",
    title: "Tailwind CSS v4 & The Zero-Config CSS Engine",
    category: "Web Tech",
    description: "Exploring the lightning-fast Rust-based oxide engine, dynamic CSS custom properties, and building extensible Theme Studios directly with CSS variables.",
    publishedDate: "Sep 2026",
    sourceName: "Tailwind Labs",
    sourceUrl: "https://tailwindcss.com",
    tags: ["CSS", "Frontend", "Performance"]
  },
  {
    id: "disc-gemini-multimodal",
    title: "Multimodal Grounding with Gemini: From Images to Action",
    category: "AI & LLMs",
    description: "Highlights from the Google Student Ambassador Build Night: how multimodal reasoning allows everyday urban problems to be visually transformed into actionable software prototypes.",
    publishedDate: "Aug 2026",
    sourceName: "Google Student Ambassador Program",
    sourceUrl: "https://ai.google.dev",
    tags: ["Gemini", "Multimodal", "Innovation"],
    featured: true
  }
];

export const currentlyBuildingData: CurrentlyBuildingItem[] = [
  {
    type: "building",
    title: "GRANTLY EdTech Ecosystem",
    subtitle: "Refining the AI companion & document vault for universal scholarship accessibility.",
    tag: "EdTech & React",
    progressPercent: 85
  },
  {
    type: "learning",
    title: "Deep Learning & Transformer Architectures",
    subtitle: "Hands-on implementation of attention mechanisms, tokenizers, and PyTorch fine-tuning.",
    tag: "AI / ML",
    progressPercent: 75
  },
  {
    type: "exploring",
    title: "Agentic Tool Use & MCP (Model Context Protocol)",
    subtitle: "Building intelligent agents capable of interacting with databases, APIs, and real-time tools.",
    tag: "Generative AI",
    progressPercent: 70
  },
  {
    type: "improving",
    title: "FitCheck NLP Skill Matching Engine",
    subtitle: "Enhancing semantic similarity scoring and expanding ATS template styling options.",
    tag: "Python / spaCy",
    progressPercent: 90
  },
  {
    type: "reading",
    title: "Designing Data-Intensive Applications",
    subtitle: "Studying distributed data systems, reliability, scalability, and maintainability.",
    tag: "System Design",
    progressPercent: 60
  }
];

export const themePresets: ThemePreset[] = [
  {
    id: "midnight-purple",
    name: "Midnight Purple",
    description: "Futuristic dark cyber aesthetic with rich violet & electric blue accents (Default).",
    primary: "#a855f7",
    secondary: "#3b82f6",
    accent: "#06b6d4",
    bgPrimary: "#060813",
    bgSecondary: "#0c1024",
    bgCard: "rgba(16, 22, 47, 0.65)",
    textColor: "#f8fafc",
    glowIntensity: 0.4
  },
  {
    id: "cyberpunk-neon",
    name: "Cyberpunk Neon",
    description: "High-voltage neon pink, electric cyan, and cyber yellow contrast.",
    primary: "#f43f5e",
    secondary: "#06b6d4",
    accent: "#facc15",
    bgPrimary: "#050508",
    bgSecondary: "#0d0c18",
    bgCard: "rgba(18, 14, 33, 0.75)",
    textColor: "#ffffff",
    glowIntensity: 0.7
  },
  {
    id: "electric-blue",
    name: "Electric Blue",
    description: "Deep oceanic tech palette with brilliant azure & sky highlights.",
    primary: "#38bdf8",
    secondary: "#2563eb",
    accent: "#22d3ee",
    bgPrimary: "#030a16",
    bgSecondary: "#061326",
    bgCard: "rgba(7, 24, 51, 0.7)",
    textColor: "#f0f9ff",
    glowIntensity: 0.55
  },
  {
    id: "premium-minimal",
    name: "Premium Minimal",
    description: "Sleek monochrome obsidian with razor-sharp contrast and subtle chrome sheen.",
    primary: "#ffffff",
    secondary: "#a1a1aa",
    accent: "#e4e4e7",
    bgPrimary: "#09090b",
    bgSecondary: "#121215",
    bgCard: "rgba(24, 24, 27, 0.7)",
    textColor: "#fafafa",
    glowIntensity: 0.15
  },
  {
    id: "minimal-editorial",
    name: "Minimal Editorial",
    description: "Warm amber gold and midnight charcoal with bespoke publishing feel.",
    primary: "#f59e0b",
    secondary: "#d97706",
    accent: "#fbbf24",
    bgPrimary: "#0a0b0d",
    bgSecondary: "#14161a",
    bgCard: "rgba(23, 26, 32, 0.75)",
    textColor: "#fef3c7",
    glowIntensity: 0.3
  },
  {
    id: "creative-pastel",
    name: "Creative Pastel",
    description: "Dreamy lavender, soft rose quartz, and playful cosmic pastels.",
    primary: "#f472b6",
    secondary: "#a78bfa",
    accent: "#38bdf8",
    bgPrimary: "#0b0d1a",
    bgSecondary: "#15182e",
    bgCard: "rgba(27, 31, 58, 0.7)",
    textColor: "#fdf2f8",
    glowIntensity: 0.45
  },
  {
    id: "aurora-gradient",
    name: "Aurora Gradient",
    description: "Luminous boreal emerald, vivid mint, and arctic jade glows.",
    primary: "#2dd4bf",
    secondary: "#10b981",
    accent: "#6ee7b7",
    bgPrimary: "#020f12",
    bgSecondary: "#051d21",
    bgCard: "rgba(5, 33, 38, 0.7)",
    textColor: "#f0fdfa",
    glowIntensity: 0.5
  },
  {
    id: "matrix-inspired",
    name: "Matrix Inspired",
    description: "Iconic terminal phosphorus green with deep digital black matrix vibes.",
    primary: "#22c55e",
    secondary: "#16a34a",
    accent: "#86efac",
    bgPrimary: "#020b05",
    bgSecondary: "#04160a",
    bgCard: "rgba(4, 25, 11, 0.75)",
    textColor: "#dcfce7",
    glowIntensity: 0.65
  }
];
