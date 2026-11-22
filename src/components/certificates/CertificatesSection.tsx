import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Maximize2,
  Trophy
} from 'lucide-react';
import { certificatesData, achievementsData } from '../../data/portfolioData';
import { CertificateItem } from '../../types';
import { CertificateLightbox } from './CertificateLightbox';

export const CertificatesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxCert, setLightboxCert] = useState<CertificateItem | null>(null);

  const categories = ['All', 'Hackathons', 'AI & ML', 'Competitions & Innovation'];

  const filteredCerts = certificatesData.filter(cert => 
    selectedCategory === 'All' || cert.category === selectedCategory
  );

  return (
    <section id="certificates" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/4 left-10 h-96 w-96 rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-300 mb-3">
          <Award className="h-3.5 w-3.5 text-cyan-400" />
          <span>VERIFIED CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Certificates & <span className="text-gradient">Achievements</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Recognitions from national hackathons, Google Student Ambassador challenges, Claude Academy, and GEC Gandhinagar E-Cell.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40'
                : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/10 hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Certificates Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className="glass-panel rounded-3xl overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Preview Image with Hover Lightbox trigger */}
              <div 
                className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 cursor-pointer"
                onClick={() => setLightboxCert(cert)}
              >
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1024] via-transparent to-transparent opacity-60" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md shadow-lg">
                    <Maximize2 className="h-3.5 w-3.5" /> View Certificate
                  </span>
                </div>

                {/* Category Pill */}
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                  {cert.category}
                </span>
              </div>

              {/* Certificate Info */}
              <div className="p-5">
                <h3 
                  onClick={() => setLightboxCert(cert)}
                  className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors cursor-pointer mb-1 line-clamp-2"
                >
                  {cert.title}
                </h3>

                <p className="text-xs text-purple-300 font-medium mb-2">
                  {cert.issuer}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {cert.description}
                </p>

                {cert.credentialId && (
                  <p className="text-[11px] font-mono text-slate-500 truncate mb-1">
                    Credential: <span className="text-slate-400">{cert.credentialId}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                <Calendar className="h-3 w-3 text-purple-400" />
                {cert.date}
              </span>

              <div className="flex gap-2">
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition-colors"
                    title="Verify online"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <button
                  onClick={() => setLightboxCert(cert)}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Genuine Achievements & Recognitions Sub-Section */}
      <div className="pt-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/30 text-xs font-mono text-amber-300 mb-2">
            <Trophy className="h-3.5 w-3.5" />
            <span>HONORS & COMPETITIONS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Key Achievements
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Trophy className="h-4 w-4" />
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-purple-300 font-mono mb-2">
                {item.organization} • {item.year}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <CertificateLightbox
        certificate={lightboxCert}
        onClose={() => setLightboxCert(null)}
      />
    </section>
  );
};
