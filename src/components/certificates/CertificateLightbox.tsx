import React from 'react';
import { X, ExternalLink, Award, Calendar, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { CertificateItem } from '../../types';

interface CertificateLightboxProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateLightbox: React.FC<CertificateLightboxProps> = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-purple-500/30 bg-[#0c1024] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 px-6 py-4 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">{certificate.title}</h3>
              <p className="text-xs text-slate-400">{certificate.issuer} • {certificate.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {certificate.verificationUrl && (
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 text-purple-200 border border-purple-500/30 text-xs font-semibold hover:bg-purple-600/50 transition-colors"
              >
                <span>Verify Credential</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Certificate High-Res Image View */}
        <div className="relative flex-1 overflow-auto bg-black/60 p-4 sm:p-6 flex items-center justify-center">
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="max-h-[60vh] w-auto rounded-xl shadow-2xl border border-white/10 object-contain"
          />
        </div>

        {/* Certificate Metadata Details */}
        <div className="p-6 bg-slate-900/90 border-t border-purple-500/20 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400 font-semibold">Verified Credential</span>
              {certificate.credentialId && (
                <span className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  ID: {certificate.credentialId}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <Calendar className="h-3.5 w-3.5 text-purple-400" />
              <span>{certificate.date}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            {certificate.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {certificate.highlights.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-purple-300 bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-500/20"
              >
                <CheckCircle2 className="h-3 w-3 text-cyan-400" />
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
