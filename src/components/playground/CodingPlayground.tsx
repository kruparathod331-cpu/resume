import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Code, Sparkles, Terminal, Copy, Check } from 'lucide-react';

interface CodeSnippet {
  id: string;
  name: string;
  description: string;
  html: string;
  css: string;
  js: string;
}

export const CodingPlayground: React.FC = () => {
  const snippets: CodeSnippet[] = [
    {
      id: 'ats-matcher',
      name: 'ATS Keyword Matcher (FitCheck Demo)',
      description: 'Interactive simulation of FitCheck\'s explainable NLP matching logic in JavaScript.',
      html: `<div class="card">
  <h2>FitCheck ATS Simulation</h2>
  <p class="subtitle">Enter target skills and candidate resume text:</p>
  <input id="skillsInput" value="Python, FastAPI, spaCy, React, SQL" placeholder="Target skills..." />
  <textarea id="resumeInput" rows="4">Passionate CS student at GEC Gandhinagar experienced with Python, FastAPI backend APIs, React.js frontend, and SQL databases.</textarea>
  <button onclick="calculateMatch()">Analyze ATS Match</button>
  <div id="output"></div>
</div>`,
      css: `body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #080c1d;
  color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 16px;
  box-sizing: border-box;
}
.card {
  background: rgba(16, 23, 50, 0.85);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 16px;
  padding: 24px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
h2 { margin: 0 0 6px 0; color: #a855f7; font-size: 20px; }
.subtitle { margin: 0 0 16px 0; color: #94a3b8; font-size: 13px; }
input, textarea {
  width: 100%;
  box-sizing: border-box;
  background: #040714;
  border: 1px solid rgba(255,255,255,0.15);
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 12px;
  outline: none;
}
button {
  background: linear-gradient(135deg, #a855f7, #3b82f6);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
}
button:hover { opacity: 0.95; }
#output { margin-top: 16px; font-size: 13px; line-height: 1.5; }
.badge { display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 11px; margin: 2px; }
.matched { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }
.missing { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
.score { font-size: 18px; font-weight: bold; color: #38bdf8; margin-bottom: 8px; }`,
      js: `function calculateMatch() {
  const skills = document.getElementById('skillsInput').value.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const text = document.getElementById('resumeInput').value.toLowerCase();
  
  let matched = [];
  let missing = [];
  
  skills.forEach(skill => {
    if (text.includes(skill)) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });
  
  const score = Math.round((matched.length / skills.length) * 100);
  
  const out = document.getElementById('output');
  out.innerHTML = '<div class="score">ATS Match Score: ' + score + '%</div>' +
    '<div><strong>Matched Skills:</strong> ' + (matched.map(s => '<span class="badge matched">' + s + '</span>').join('') || 'None') + '</div>' +
    '<div style="margin-top:6px;"><strong>Missing Skills:</strong> ' + (missing.map(s => '<span class="badge missing">' + s + '</span>').join('') || 'None') + '</div>';
}
calculateMatch();`
    },
    {
      id: 'matrix-rain',
      name: 'Cyberpunk Matrix Rain Canvas',
      description: 'Procedural falling green code stream running entirely on HTML5 Canvas.',
      html: `<canvas id="matrixCanvas"></canvas>`,
      css: `body {
  margin: 0;
  overflow: hidden;
  background: #000;
}
canvas {
  display: block;
}`,
      js: `const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '0123456789ABCDEFKRUPA01';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff66';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 35);`
    }
  ];

  const [activeSnippet, setActiveSnippet] = useState<CodeSnippet>(snippets[0]);
  const [htmlCode, setHtmlCode] = useState(snippets[0].html);
  const [cssCode, setCssCode] = useState(snippets[0].css);
  const [jsCode, setJsCode] = useState(snippets[0].js);
  const [activeEditorTab, setActiveEditorTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  // Update editor state when preset snippet changes
  const selectSnippet = (snippet: CodeSnippet) => {
    setActiveSnippet(snippet);
    setHtmlCode(snippet.html);
    setCssCode(snippet.css);
    setJsCode(snippet.js);
  };

  const resetCode = () => {
    setHtmlCode(activeSnippet.html);
    setCssCode(activeSnippet.css);
    setJsCode(activeSnippet.js);
  };

  const copyCode = () => {
    const currentCode = activeEditorTab === 'html' ? htmlCode : activeEditorTab === 'css' ? cssCode : jsCode;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compile combined HTML document for sandboxed iframe
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>
          try {
            ${jsCode}
          } catch (err) {
            console.error(err);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <section id="playground" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-300 mb-3">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
          <span>INTERACTIVE SANDBOX</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Coding <span className="text-gradient">Playground</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Test interactive algorithms, inspect live code, and execute client-side demonstrations in a secure sandboxed environment.
        </p>
      </div>

      {/* Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {snippets.map((snip) => (
            <button
              key={snip.id}
              onClick={() => selectSnippet(snip)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeSnippet.id === snip.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {snip.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors"
            title="Copy current editor tab code"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
          <button
            onClick={resetCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors"
            title="Reset to default snippet"
          >
            <RotateCcw className="h-3.5 w-3.5 text-purple-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Split-Screen Code Editor + Live Sandboxed Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[560px]">
        {/* Left: Code Editor (6 cols) */}
        <div className="lg:col-span-6 flex flex-col rounded-3xl border border-purple-500/30 bg-[#0a0d1f] shadow-2xl overflow-hidden">
          {/* Editor Header Tabs */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-black/40">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveEditorTab('html')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  activeEditorTab === 'html'
                    ? 'bg-purple-500/30 text-purple-200 border border-purple-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveEditorTab('css')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  activeEditorTab === 'css'
                    ? 'bg-blue-500/30 text-blue-200 border border-blue-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CSS
              </button>
              <button
                onClick={() => setActiveEditorTab('js')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  activeEditorTab === 'js'
                    ? 'bg-amber-500/30 text-amber-200 border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                JavaScript
              </button>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Live Evaluation</span>
          </div>

          {/* Text Area */}
          <div className="flex-1 p-4 bg-[#080b18]">
            {activeEditorTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-full bg-transparent font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            )}
            {activeEditorTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="w-full h-full bg-transparent font-mono text-xs text-blue-200 focus:outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            )}
            {activeEditorTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                className="w-full h-full bg-transparent font-mono text-xs text-amber-200 focus:outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            )}
          </div>
        </div>

        {/* Right: Live Sandboxed Iframe (6 cols) */}
        <div className="lg:col-span-6 flex flex-col rounded-3xl border border-purple-500/30 bg-[#070a18] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-black/40">
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Sandboxed Browser Output
            </span>
            <span className="text-[11px] font-mono text-slate-500">sandbox="allow-scripts"</span>
          </div>

          <div className="flex-1 bg-black">
            <iframe
              title="Coding Playground Output"
              srcDoc={srcDoc}
              sandbox="allow-scripts"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
