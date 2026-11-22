# 🚀 Krupa Rathod — Interactive AI-Powered Developer Portfolio

> **"Code. Create. Innovate."**  
> An immersive, futuristic personal portfolio and digital identity for **Krupa Rathod** — Computer Science Student at Government Engineering College, Gandhinagar (GEC Gandhinagar) and Aspiring AI/ML Engineer & Full-Stack Developer.

---

## 🌟 Key Features & Signatures

1. **Cinematic Welcome Experience**
   - Welcoming screen with animated glowing portrait, intro video trigger, audio mute toggle, and skip controls.
2. **Interactive Theme Studio (8 Preset Themes + Custom Visual Engine)**
   - Includes *Midnight Purple (Default)*, *Cyberpunk Neon*, *Electric Blue*, *Premium Minimal*, *Minimal Editorial*, *Creative Pastel*, *Aurora Gradient*, and *Matrix Inspired*.
   - Live color pickers, border radius slider, glow intensity slider, custom cursor toggle, reduced motion preference, and localStorage persistence.
3. **KrupaBot — Grounded AI Companion**
   - 3D-styled animated robot character with glowing eyes and idle floating physics.
   - Grounded strictly in Krupa's verified education, technical skills, production applications, and hackathon awards.
   - Text-to-Speech (TTS) voice generation & Speech-to-Text (STT) voice input.
4. **Project Lab (Deep Case Studies)**
   - Comprehensive modals covering **ShopSmart AI**, **FitCheck** (spaCy NLP & FastAPI), **GRANTLY**, and **CareCircle**.
   - Problem statements, architecture breakdowns, challenges, lessons learned, live Vercel links, and GitHub repositories.
5. **Verified Credentials & Achievements**
   - High-resolution certificates rendered from original credentials (Breakpoint Hackathon 2026, Eureka Idea-Presentation at GEC, The Outpost Frontend Hackathon, Claude Code 101, Google Student Ambassador Build Night, and Forage AI in Action).
   - Fullscreen lightbox viewer and verification links.
6. **UNIX Developer Terminal**
   - Authentic terminal prompt (`krupa@portfolio:~$`) with autocomplete (`Tab`), history (`↑↓`), and commands: `help`, `about`, `skills`, `projects`, `certificates`, `github`, `journey`, `resume`, `theme`, `matrix`, `clear`, `exit`.
7. **Virtual 3D Developer Workspace (Three.js WebGL)**
   - Interactive 3D holographic quantum core with clickable developer stations (Monitor, Laptop, Bookshelf, Coffee mug easter egg, and Web Audio lofi synthesizer).
8. **Coding Playground**
   - Sandboxed live code runner demonstrating client-side algorithm evaluation (ATS Keyword Matcher demo, Matrix rain animation).
9. **Tech Discoveries Radar**
   - Curated research magazine spotlighting AI agents, FastAPI architecture, and multimodal reasoning with bookmarks.
10. **Interactive Resume & Digital Business Card (QR)**
    - ATS-formatted printable curriculum vitae and digital QR card with instant `.vcf` contact file generation.
11. **Spotlight Command Palette (`Ctrl + K` / `Cmd + K`)**
    - Instant keyboard-driven navigation across all sections, projects, and actions.

---

## 📁 Project Architecture

```
portfolio/
├── public/
│   ├── assets/
│   │   ├── profile.jpg                # Krupa's profile photograph
│   │   └── certificates/              # High-res rendered certificates
│   │       ├── cert_breakpoint_2026.png
│   │       ├── cert_eureka_gec.png
│   │       ├── cert_the_outpost_hackathon.png
│   │       ├── cert_claude_code_101.png
│   │       ├── cert_google_ambassador_gemini.png
│   │       └── cert_forage_ai_in_action.png
│   └── favicon.svg                    # Custom KR monogram glowing favicon
├── src/
│   ├── components/
│   │   ├── about/                     # AboutSection, JourneyTimeline
│   │   ├── assistant/                 # AIAssistantWidget (KrupaBot)
│   │   ├── certificates/              # CertificatesSection, CertificateLightbox
│   │   ├── common/                    # Navbar, Footer, ScrollProgress, CustomCursor,
│   │   │                              # CommandPalette, DigitalBusinessCard, ResumeModal, Icons
│   │   ├── contact/                   # ContactSection, FeedbackWidget
│   │   ├── discoveries/               # TechDiscoveriesSection
│   │   ├── github/                    # GitHubDashboard
│   │   ├── hero/                      # HeroSection
│   │   ├── now/                       # CurrentlyBuildingSection
│   │   ├── playground/                # CodingPlayground
│   │   ├── projects/                  # ProjectsSection, ProjectDetailModal
│   │   ├── terminal/                  # DeveloperTerminal
│   │   ├── theme/                     # ThemeStudioModal
│   │   ├── welcome/                   # WelcomeScreen, VideoIntroModal
│   │   └── workspace/                 # Workspace3D (Three.js WebGL)
│   ├── context/
│   │   ├── AudioContext.tsx           # Procedural Web Audio synthesizer
│   │   └── ThemeContext.tsx           # Dynamic theme engine & CSS variables
│   ├── data/
│   │   └── portfolioData.ts           # Centralized configuration file (Single Source of Truth)
│   ├── types/
│   │   └── index.ts                   # Strict TypeScript domain interfaces
│   ├── App.tsx                        # Main application container
│   ├── index.css                      # Tailwind v4 theme variables & cyber styling
│   └── main.tsx                       # React 19 entrypoint
├── .env.example                       # Environment configuration guide
├── package.json
├── tailwind.config.js / @tailwindcss/vite
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Installation & Local Development

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** or **pnpm** or **yarn**

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 4. Build for Production
```bash
npm run build
```
This performs full TypeScript checking and outputs optimized production assets into `dist/`.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🌐 1-Click Deployment to Vercel

1. Push your repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Krupa Rathod portfolio"
   git branch -M main
   git remote add origin https://github.com/kruparathod331-cpu/portfolio.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New Project** and select your `portfolio` repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**. Vercel will build and assign an instant production URL with SSL.

---

## ⚙️ Customization Guide

### 1. Replacing Profile Photo
- Replace `public/assets/profile.jpg` with your new image.
- If the filename or path changes, update `profilePhoto` in `src/data/portfolioData.ts`.

### 2. Adding Projects
Open `src/data/portfolioData.ts` and append a new object to `projectsData`:
```ts
{
  id: "my-new-project",
  title: "Project Title",
  shortDescription: "One-line summary",
  detailedExplanation: "In-depth overview",
  category: "AI / Machine Learning", // or "Full Stack", "Web Development", "EdTech & Automation"
  status: "Live on Vercel",
  technologies: ["Python", "React", "PostgreSQL"],
  role: "Lead Developer",
  keyFeatures: ["Feature 1", "Feature 2"],
  githubUrl: "https://github.com/kruparathod331-cpu/repo",
  liveDemoUrl: "https://your-app.vercel.app/",
  thumbnail: "https://images.unsplash.com/...",
  screenshots: [],
  problemStatement: "What user problem does it solve?",
  solutionArchitecture: "How is it built?",
  challenges: ["Challenge faced"],
  whatILearned: ["Key takeaway"]
}
```

### 3. Adding Certificates
1. Place the certificate image in `public/assets/certificates/new_cert.png`.
2. In `src/data/portfolioData.ts`, add to `certificatesData`:
```ts
{
  id: "cert-unique-id",
  title: "Certificate Name",
  issuer: "Issuing Organization",
  date: "Month Year",
  credentialId: "CREDENTIAL-ID-HERE",
  verificationUrl: "https://verify-url.com",
  imageUrl: "/assets/certificates/new_cert.png",
  category: "Hackathons", // or "AI & ML", "Competitions & Innovation"
  description: "Short description of the event or course.",
  highlights: ["Tag 1", "Tag 2"]
}
```

### 4. Updating Social Links & Contact
In `src/data/portfolioData.ts`:
```ts
export const profileData: ProfileInfo = {
  fullName: "Krupa Rathod",
  email: "kr.rathod331@gmail.com",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/krupa-rathod-4a1172423...",
    github: "https://github.com/kruparathod331-cpu",
    other: "..."
  },
  // ...
};
```

### 5. Changing the Intro Video
In `src/data/portfolioData.ts`, change `videoIntroUrl`:
```ts
videoIntroUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
```

### 6. Configuring AI Assistant (KrupaBot)
- By default, KrupaBot operates using a **built-in grounded knowledge engine** that answers questions accurately using your portfolio data with 0 API keys needed and 0 hallucinations.
- To connect a live LLM streaming provider (Google Gemini or OpenAI), configure `VITE_GEMINI_API_KEY` in `.env.local`.

---

## 📋 Pre-Deployment Testing Checklist

- [x] **Responsive Test**: Tested across mobile (375px), tablet (768px), laptop (1024px), and ultra-wide (1920px).
- [x] **Navigation Links**: All navbar pills and footer links smoothly scroll to respective sections.
- [x] **Theme Studio**: All 8 preset themes switch instantaneously and custom color sliders update CSS variables.
- [x] **Terminal Commands**: `help`, `skills`, `projects`, `certificates`, `about`, `matrix`, and `clear` function accurately.
- [x] **AI Assistant**: KrupaBot answers questions with markdown formatting and clickable links.
- [x] **Coding Playground**: Live code editor compiles JavaScript/HTML securely into a sandboxed iframe.
- [x] **Digital Business Card**: Generates QR code and exports standard `.vcf` contact file.
- [x] **Real Data Verification**: Zero fabricated companies, metrics, or credentials. All 6 genuine certificates and 4 live Vercel projects are integrated.
- [x] **Production Build**: Zero TypeScript errors (`tsc -b && vite build` passed).
