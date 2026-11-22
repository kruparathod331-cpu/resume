import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  Check, 
  Copy, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../common/Icons';
import { profileData } from '../../data/portfolioData';
import { FeedbackWidget } from './FeedbackWidget';
import { useAudio } from '../../context/AudioContext';

export const ContactSection: React.FC = () => {
  const { playChime, playBlip } = useAudio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Spam protection
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    playBlip(800);
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot trap
    if (formData.honeypot) {
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    playBlip(900);

    // Provide reliable client-side mailto trigger + graceful feedback
    setTimeout(() => {
      setStatus('success');
      playChime();

      // Open mail client with pre-filled subject and message
      const subject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Hi Krupa,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;
    }, 700);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-300 mb-3">
          <Mail className="h-3.5 w-3.5 text-cyan-400" />
          <span>INITIATE TRANSMISSION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get in <span className="text-gradient">Touch</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Open to full-stack engineering roles, AI/ML opportunities, hackathon collaborations, and innovative project ideas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Left Column: Direct Coordinates & Social Connect (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Connect Directly
            </h3>

            {/* Email Box */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-purple-400" /> Primary Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <a
                href={`mailto:${profileData.email}`}
                className="text-base font-bold text-white hover:text-cyan-300 transition-colors font-mono block break-all"
              >
                {profileData.email}
              </a>
            </div>

            {/* Location & College info */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 text-xs font-mono">
              <div className="text-slate-400 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" /> Location & Campus
              </div>
              <p className="text-white font-medium text-sm pt-1">
                {profileData.location}
              </p>
              <p className="text-purple-300 text-xs">
                Government Engineering College, Gandhinagar
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Official Profiles
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-blue-950/20 hover:bg-blue-900/40 border border-blue-500/20 text-blue-200 text-xs font-semibold transition-all"
                >
                  <LinkedInIcon className="h-4 w-4 text-blue-400" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3 ml-auto opacity-70" />
                </a>

                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-purple-950/20 hover:bg-purple-900/40 border border-purple-500/20 text-purple-200 text-xs font-semibold transition-all"
                >
                  <GitHubIcon className="h-4 w-4 text-purple-400" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3 ml-auto opacity-70" />
                </a>
              </div>
            </div>
          </div>

          {/* Feedback Reaction Component */}
          <FeedbackWidget />
        </div>

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white tracking-tight mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam Honeypot - hidden */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Opportunity Discussion / Project Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your team, inquiry, or idea..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-colors resize-none leading-relaxed"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 font-mono">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>Please fill out all required fields before dispatching.</span>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Message queued! Your mail client has been opened to complete delivery directly to Krupa.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span>{status === 'loading' ? 'Preparing Transmission...' : 'Send Message to Krupa'}</span>
              </button>

              <p className="text-[11px] text-slate-500 text-center font-mono">
                Secure direct transmission • kr.rathod331@gmail.com
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
