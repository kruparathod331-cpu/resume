import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Download, Share2, Sparkles, Mail, MapPin } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { profileData } from '../../data/portfolioData';

interface DigitalBusinessCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalBusinessCard: React.FC<DigitalBusinessCardProps> = ({ isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const shareUrl = window.location.href;
      QRCode.toDataURL(shareUrl, {
        width: 240,
        margin: 2,
        color: {
          dark: '#060813',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation failed', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const downloadVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profileData.fullName}`,
      `TITLE:${profileData.professionalTitle}`,
      `EMAIL;TYPE=INTERNET,WORK:${profileData.email}`,
      `URL:${window.location.href}`,
      `X-SOCIALPROFILE;type=linkedin:${profileData.socialLinks.linkedin}`,
      `X-SOCIALPROFILE;type=github:${profileData.socialLinks.github}`,
      `NOTE:${profileData.tagline} - Computer Science Student at GEC Gandhinagar`,
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'krupa-rathod.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Digital Business Card"
    >
      <div 
        className="relative w-full max-w-md rounded-3xl border border-purple-500/30 bg-[#0d122b] p-6 shadow-2xl shadow-purple-900/40 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-36 w-36 rounded-full bg-purple-600/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-36 w-36 rounded-full bg-cyan-600/30 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Top Header Card */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-purple-400 shadow-md">
            <img 
              src={profileData.profilePhoto} 
              alt={profileData.fullName}
              className="h-full w-full object-cover" 
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-purple-400 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>DIGITAL CARD</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{profileData.fullName}</h3>
            <p className="text-xs text-purple-300 font-medium">{profileData.professionalTitle}</p>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 mb-5">
          <div className="overflow-hidden rounded-xl bg-white p-2 shadow-inner">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Portfolio QR Code" className="h-44 w-44 object-contain" />
            ) : (
              <div className="h-44 w-44 flex items-center justify-center text-xs text-slate-500 font-mono">
                Generating QR...
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-2 font-mono flex items-center gap-1">
            <Share2 className="h-3 w-3 text-cyan-400" /> Scan to view on mobile or share
          </p>
        </div>

        {/* Contact Snippets with Copy */}
        <div className="space-y-2 text-xs mb-6 font-mono">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center gap-2 text-slate-300 overflow-hidden">
              <Mail className="h-4 w-4 text-purple-400 shrink-0" />
              <span className="truncate">{profileData.email}</span>
            </div>
            <button
              onClick={() => copyToClipboard(profileData.email, 'email')}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            >
              {copiedField === 'email' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>{profileData.location}</span>
            </div>
            <span className="text-[11px] text-slate-500">GEC Gandhinagar</span>
          </div>
        </div>

        {/* Quick Links & vCard button */}
        <div className="flex gap-2">
          <button
            onClick={downloadVCard}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-xs font-bold text-white shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Save Contact (.vcf)</span>
          </button>
          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            title="LinkedIn"
          >
            <LinkedInIcon className="h-4 w-4 text-cyan-400" />
          </a>
          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            title="GitHub"
          >
            <GitHubIcon className="h-4 w-4 text-purple-400" />
          </a>
        </div>
      </div>
    </div>
  );
};
