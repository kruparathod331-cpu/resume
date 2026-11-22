import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Laptop, 
  Monitor, 
  BookOpen, 
  FileText, 
  Coffee, 
  Music, 
  Sparkles, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface Workspace3DProps {
  onOpenProjects: () => void;
  onOpenGitHub: () => void;
  onOpenSkills: () => void;
  onOpenAbout: () => void;
}

export const Workspace3D: React.FC<Workspace3DProps> = ({
  onOpenProjects,
  onOpenGitHub,
  onOpenSkills,
  onOpenAbout
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeStation, setActiveStation] = useState<string | null>('monitor');
  const [coffeeClicks, setCoffeeClicks] = useState<number>(0);
  const { isAmbientPlaying, toggleAmbient, playBlip } = useAudio();

  // Three.js interactive 3D Holographic Cyber Orb & Workstation Environment
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Geometry 1: Holographic Icosahedron Mesh
    const geometry = new THREE.IcosahedronGeometry(2.2, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const sphere = new THREE.Mesh(geometry, wireframeMat);
    scene.add(sphere);

    // Geometry 2: Floating Core Particle Sphere
    const innerGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // Orbiting particle rings
    const ringGeo = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Floating particles
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xa855f7,
      transparent: true,
      opacity: 0.7,
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      sphere.rotation.x = elapsedTime * 0.15;
      sphere.rotation.y = elapsedTime * 0.2;

      innerSphere.rotation.x = -elapsedTime * 0.25;
      innerSphere.rotation.z = elapsedTime * 0.3;

      ring.rotation.z = elapsedTime * 0.1;
      particleMesh.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleStationClick = (stationId: string) => {
    playBlip(750);
    setActiveStation(stationId);
  };

  const handleCoffeeClick = () => {
    playBlip(950);
    setCoffeeClicks(prev => prev + 1);
  };

  const quotes = [
    "“First, solve the problem. Then, write the code.” – John Johnson",
    "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
    "“Simplicity is prerequisite for reliability.” – Edsger W. Dijkstra",
    "“Make it work, make it right, make it fast.” – Kent Beck",
    "“Stay curious. Build fearlessly. Learn endlessly. Innovate constantly.” – Krupa Rathod"
  ];

  return (
    <section id="workspace" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-300 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>INTERACTIVE 3D ENVIRONMENT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Virtual Developer <span className="text-gradient">Workspace</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          An interactive digital workstation representing my engineering lab. Click any station or hardware object to inspect the active modules.
        </p>
      </div>

      {/* Main Workspace Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Holographic Canvas & Floating Workspace Badges (7 cols) */}
        <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-3xl border border-purple-500/30 bg-[#070a1a] shadow-2xl overflow-hidden flex items-center justify-center">
          {/* Cyber Grid background */}
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

          {/* Three.js Canvas Container */}
          <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Interactive Floating Hotspots */}
          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={() => handleStationClick('monitor')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md border transition-all ${
                activeStation === 'monitor'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/40'
                  : 'bg-black/60 text-slate-300 border-white/10 hover:border-purple-400'
              }`}
            >
              <Monitor className="h-3.5 w-3.5 text-cyan-300" />
              <span>Main Display (Projects)</span>
            </button>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => handleStationClick('laptop')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md border transition-all ${
                activeStation === 'laptop'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/40'
                  : 'bg-black/60 text-slate-300 border-white/10 hover:border-purple-400'
              }`}
            >
              <Laptop className="h-3.5 w-3.5 text-purple-300" />
              <span>Terminal / GitHub</span>
            </button>
          </div>

          <div className="absolute bottom-4 left-4 z-20">
            <button
              onClick={() => handleStationClick('bookshelf')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md border transition-all ${
                activeStation === 'bookshelf'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/40'
                  : 'bg-black/60 text-slate-300 border-white/10 hover:border-purple-400'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-300" />
              <span>Knowledge Base</span>
            </button>
          </div>

          <div className="absolute bottom-4 right-4 z-20 flex gap-2">
            <button
              onClick={handleCoffeeClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md bg-black/60 text-slate-300 border border-white/10 hover:text-amber-300 transition-colors"
              title="Grab a coffee"
            >
              <Coffee className="h-3.5 w-3.5 text-amber-400" />
              <span>Coffee ({coffeeClicks})</span>
            </button>

            <button
              onClick={toggleAmbient}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md border transition-colors ${
                isAmbientPlaying
                  ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300'
                  : 'bg-black/60 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Lofi Sci-Fi Audio Synthesizer"
            >
              <Music className="h-3.5 w-3.5 text-cyan-400" />
              <span>{isAmbientPlaying ? 'Audio ON' : 'Audio OFF'}</span>
            </button>
          </div>

          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 pointer-events-none text-center">
            <span className="text-[10px] font-mono text-purple-300/80 bg-black/50 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              Interactive 3D Quantum Core • Three.js WebGL
            </span>
          </div>
        </div>

        {/* Right: Station Inspector Panel (5 cols) */}
        <div className="lg:col-span-5">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-purple-300 tracking-wider">
                Station Active Inspector
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                Connected
              </span>
            </div>

            {/* Station 1: Monitor */}
            {activeStation === 'monitor' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Production Workstation</h3>
                    <p className="text-xs text-slate-400">ShopSmart AI, FitCheck & GRANTLY</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dual-monitor setup configured with modern Vite + React workflows, FastAPI microservice testing, and spaCy NLP tokenizers.
                </p>

                <div className="space-y-2 text-xs font-mono text-slate-400">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between">
                    <span>Active Workspace:</span>
                    <span className="text-purple-300">portfolio / fullstack-lab</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between">
                    <span>Target Deployment:</span>
                    <span className="text-cyan-300">Vercel Production Edge</span>
                  </div>
                </div>

                <button
                  onClick={onOpenProjects}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <span>Explore Project Lab</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Station 2: Laptop */}
            {activeStation === 'laptop' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                    <Laptop className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Git & Version Control</h3>
                    <p className="text-xs text-slate-400">github.com/kruparathod331-cpu</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Continuous development machine maintaining clean feature branches, automated linting, and public code repositories.
                </p>

                <div className="space-y-2 text-xs font-mono text-slate-400">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between">
                    <span>Shell:</span>
                    <span className="text-cyan-300">zsh + Starship prompt</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between">
                    <span>Public Repos:</span>
                    <span className="text-emerald-400">SHOPSMART, FITCHECK, GRANTLY...</span>
                  </div>
                </div>

                <button
                  onClick={onOpenGitHub}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-4 py-3 text-xs font-bold text-white shadow-lg transition-all cursor-pointer"
                >
                  <span>Inspect GitHub Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Station 3: Bookshelf */}
            {activeStation === 'bookshelf' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Learning Knowledge Base</h3>
                    <p className="text-xs text-slate-400">GEC Gandhinagar & Research Papers</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Continuous study encompassing Deep Learning, NLP architectures, System Design, and Object-Oriented Software Principles.
                </p>

                <div className="space-y-2 text-xs font-mono text-slate-400">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between">
                    <span>Reading Now:</span>
                    <span className="text-amber-300">Designing Data-Intensive Apps</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between">
                    <span>Focus:</span>
                    <span className="text-purple-300">Transformers & Agentic Systems</span>
                  </div>
                </div>

                <button
                  onClick={onOpenSkills}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-500 px-4 py-3 text-xs font-bold text-white shadow-lg transition-all cursor-pointer"
                >
                  <span>View All Skills & Stack</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Coffee Easter Egg Quote */}
            {coffeeClicks > 0 && (
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-xs font-mono text-amber-300 animate-fade-in">
                <p className="font-semibold mb-1">☕ Developer Fuel Active ({coffeeClicks} cups brewed):</p>
                <p className="text-slate-300 italic">{quotes[coffeeClicks % quotes.length]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
