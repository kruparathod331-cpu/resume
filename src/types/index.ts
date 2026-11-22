export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label?: string;
}

export interface ProfileInfo {
  fullName: string;
  professionalTitle: string;
  tagline: string;
  location: string;
  profilePhoto: string;
  personalIntroduction: string;
  email: string;
  socialLinks: {
    linkedin: string;
    github: string;
    other?: string;
  };
  currentStatus: string;
  education: string;
  careerInterests: string[];
  languages: string[];
  resumeUrl: string;
  videoIntroUrl?: string;
}

export interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'ai_ml' | 'tools' | 'cloud' | 'core';
  icon: string;
  description: string;
  docUrl?: string;
  featured?: boolean;
}

export interface ProjectTimelineStep {
  phase: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  detailedExplanation: string;
  category: 'Web Development' | 'AI / Machine Learning' | 'Full Stack' | 'EdTech & Automation';
  status: 'Live on Vercel' | 'In Progress' | 'Prototype' | 'Completed';
  technologies: string[];
  role: string;
  keyFeatures: string[];
  githubUrl: string;
  liveDemoUrl: string;
  thumbnail: string;
  screenshots: string[];
  problemStatement: string;
  solutionArchitecture: string;
  challenges: string[];
  whatILearned: string[];
  timeline?: ProjectTimelineStep[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  imageUrl: string;
  category: 'Hackathons' | 'AI & ML' | 'Frontend' | 'Competitions & Innovation';
  description: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  badge?: string;
}

export interface JourneyMilestone {
  id: string;
  date: string;
  title: string;
  category: 'Education' | 'Innovation & Clubs' | 'Hackathons' | 'AI & Full Stack';
  description: string;
  currentlyExploring?: boolean;
  externalLink?: string;
  tags?: string[];
}

export interface TechDiscovery {
  id: string;
  title: string;
  category: 'AI & LLMs' | 'Machine Learning' | 'Web Tech' | 'Open Source' | 'Developer Tools';
  description: string;
  publishedDate: string;
  sourceName: string;
  sourceUrl: string;
  youtubeId?: string;
  tags: string[];
  featured?: boolean;
}

export interface CurrentlyBuildingItem {
  type: 'learning' | 'building' | 'exploring' | 'improving' | 'reading';
  title: string;
  subtitle: string;
  tag: string;
  progressPercent?: number;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  textColor: string;
  glowIntensity: number;
}

export interface CustomThemeSettings {
  primary: string;
  secondary: string;
  accent: string;
  bgPrimary: string;
  bgSecondary: string;
  textColor: string;
  cardRadius: number;
  glowIntensity: number;
  cursorEffect: boolean;
  reducedMotion: boolean;
}
