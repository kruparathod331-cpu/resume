import React from 'react';
import { X, Download, ExternalLink, Mail, MapPin, Award, BookOpen, Code2 } from 'lucide-react';
import { profileData, skillsData, projectsData, certificatesData } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Resume Preview"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-purple-500/30 bg-[#0c1024] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-purple-500/20 px-6 py-4 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold font-mono">
              KR
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Curriculum Vitae</h3>
              <p className="text-xs text-slate-400">ATS-Optimized Interactive Preview • Krupa Rathod</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintOrDownload}
              className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-purple-500 transition-colors shadow-sm"
              title="Print / Save as PDF"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content (Clean, elegant ATS-friendly presentation) */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200 text-sm leading-relaxed bg-[#0a0d1f]">
          {/* Header */}
          <div className="border-b border-white/10 pb-6 text-center sm:text-left sm:flex sm:justify-between sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">{profileData.fullName}</h1>
              <p className="text-base text-purple-400 font-medium mt-1">{profileData.professionalTitle}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-cyan-400" /> {profileData.location}</span>
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5 text-cyan-400" /> {profileData.email}</span>
                <a href={profileData.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">LinkedIn Profile</a>
                <a href={profileData.socialLinks.github} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">GitHub: @kruparathod331-cpu</a>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Open to Opportunities
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4" /> Professional Summary
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Computer Science undergraduate at Government Engineering College, Gandhinagar with an active builder mindset. Passionate about Artificial Intelligence, Natural Language Processing, and high-performance Full-Stack Web Development. Proven track record of developing innovative AI-powered applications (FitCheck ATS matcher, ShopSmart AI, GRANTLY), competing in national hackathons (The Outpost, Breakpoint, Google Ambassador Build Night), and pitching startup ideas at E-Cell Eureka.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-2">
              <Award className="h-4 w-4" /> Education
            </h2>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white text-sm">Bachelor of Technology (B.Tech) in Computer Science & Engineering</h3>
                  <p className="text-xs text-purple-300">Government Engineering College, Gandhinagar (GEC Gandhinagar)</p>
                </div>
                <span className="text-xs font-mono text-slate-400">2024 – Present</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Core Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Software Engineering.
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-2">
              <Code2 className="h-4 w-4" /> Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-purple-300">Languages:</span> C, C++, Java, Python, JavaScript
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-purple-300">Frontend:</span> React.js, Tailwind CSS, HTML5, CSS3, Bootstrap
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-purple-300">Backend:</span> Python, FastAPI, Flask, Node.js, Express.js, REST APIs
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-purple-300">Databases:</span> PostgreSQL, MongoDB, MySQL, Firebase, SQLite
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-purple-300">AI / ML & NLP:</span> spaCy, Scikit-learn, TensorFlow, PyTorch, Pandas, NumPy, Matplotlib
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="font-semibold text-purple-300">Tools & Cloud:</span> Git, GitHub, VS Code, Postman, Docker, Figma, Vercel, Render
              </div>
            </div>
          </div>

          {/* Key Featured Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-3">
              <Code2 className="h-4 w-4" /> Featured Projects
            </h2>
            <div className="space-y-4">
              {projectsData.map((project) => (
                <div key={project.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h3 className="font-semibold text-white text-sm">{project.title}</h3>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                        Live Demo <ExternalLink className="h-3 w-3" />
                      </a>
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline flex items-center gap-1">
                        GitHub <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-purple-300 mb-2 font-mono">
                    Technologies: {project.technologies.join(', ')}
                  </p>
                  <p className="text-xs text-slate-300 mb-2">{project.shortDescription}</p>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                    {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-2">
              <Award className="h-4 w-4" /> Certifications & Hackathons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certificatesData.map((cert) => (
                <div key={cert.id} className="p-2.5 rounded-lg border border-white/5 bg-white/[0.01]">
                  <p className="font-semibold text-white">{cert.title}</p>
                  <p className="text-purple-300 text-[11px]">{cert.issuer} • {cert.date}</p>
                  {cert.credentialId && (
                    <p className="text-slate-400 text-[10px] font-mono mt-0.5">ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-purple-500/20 px-6 py-3.5 bg-slate-900/80 text-xs text-slate-400">
          <span>Centralized source: <code className="text-purple-300 font-mono">src/data/portfolioData.ts</code></span>
          <div className="flex gap-3">
            <a
              href={`mailto:${profileData.email}?subject=Opportunity%20Discussion`}
              className="px-4 py-1.5 rounded-lg bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 font-medium hover:bg-cyan-600/50 transition-colors"
            >
              Contact Krupa
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
