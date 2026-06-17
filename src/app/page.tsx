"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen font-display bg-[#0a0f1a] overflow-hidden relative">
      {/* Dynamic Backgrounds based on Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {theme === 'terminal' ? (
          <ParticleBackground />
        ) : (
          <>
            {/* Dynamic Background Orbs */}
        <motion.div 
          animate={{ 
            x: ["0%", "20%", "-10%", "0%"],
            y: ["0%", "15%", "-20%", "0%"],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            x: ["0%", "-20%", "10%", "0%"],
            y: ["0%", "-15%", "20%", "0%"],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/10 blur-[150px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            x: ["0%", "10%", "-20%", "0%"],
            y: ["0%", "-20%", "10%", "0%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[100px] mix-blend-screen"
        />

        {/* Cosmic Shooting Stars */}
        <motion.div
          animate={{
            x: ["-10vw", "110vw"],
            y: ["-10vh", "110vh"],
            opacity: [0, 1, 0, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
          className="absolute top-[10%] left-[10%] w-64 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent rotate-45 drop-shadow-[0_0_10px_rgba(147,197,253,0.8)]"
        />
        <div className="absolute top-1/2 right-[-20%] w-[1px] h-[30%] bg-gradient-to-b from-transparent via-blue-400 to-transparent rotate-45" />
        <motion.div
          animate={{
            x: ["-10vw", "110vw"],
            y: ["30vh", "150vh"],
            opacity: [0, 1, 0, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
          className="absolute top-[-20%] left-[40%] w-96 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent rotate-45 blur-[1px] drop-shadow-[0_0_15px_rgba(216,180,254,0.8)]"
        />
        </>
        )}
      </div>
      {/* Animated cosmic stardust */}
      <motion.div 
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 z-0 mix-blend-screen pointer-events-none"
      ></motion.div>

      <header className="flex items-center justify-between border-b border-white/5 px-6 py-4 md:px-10 lg:px-40 glassmorphism sticky top-0 z-50">
        <div className="flex items-center gap-3 text-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Image src="/logo.png" alt="GitHub Visualizer" width={36} height={36} className="rounded-lg shadow-[0_0_15px_rgba(37,106,244,0.5)]" unoptimized />
          </motion.div>
          <h2 className="text-white text-xl font-bold leading-tight">CodeCity</h2>
        </div>
        <div className="flex flex-1 justify-end gap-4 items-center">
          <ThemeToggle />
          <Link 
            href="/learn" 
            className={`flex cursor-pointer items-center justify-center rounded-full h-10 gap-2 text-sm font-bold px-5 transition-all mr-2 ${
              theme === 'terminal' 
                ? 'bg-black text-white border border-white hover:bg-white hover:text-black hover:scale-105' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_15px_rgba(37,106,244,0.5)] hover:scale-105 animate-pulse hover:animate-none'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            Learn Git
          </Link>
          <a 
            href="https://github.com/Veerpratapsingh08/Github-Visualizer" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`hidden md:flex cursor-pointer items-center justify-center rounded-full h-10 gap-2 text-sm font-bold px-5 transition-all ${
              theme === 'terminal' 
                ? 'bg-black text-white border border-white hover:bg-white hover:text-black' 
                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 shadow-lg backdrop-blur-md'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span className="hidden sm:inline">Star on GitHub</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center relative w-full z-10 px-4 md:px-10 lg:px-40 pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[1200px] flex flex-col items-center text-center relative"
        >
            <h1 className="text-white text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-2xl">
                Visualize Your Codebase <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-primary to-purple-500 animate-gradient">
                    In Three Dimensions
                </span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-10 font-sans">
                Immerse yourself in a 3D metropolis generated from your GitHub repositories. Explore architecture, visualize complexity, and navigate code in a futuristic environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 z-10 w-full max-w-xl justify-center items-center">
                <div className="relative group">
                    <div className={`absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md transition duration-500 ${theme === 'terminal' ? 'hidden' : 'opacity-40 group-hover:opacity-70'}`}></div>
                    <Link 
                        href="/visualize" 
                        className={`relative flex cursor-pointer items-center justify-center rounded-full h-14 gap-3 text-lg font-bold px-10 transition-all ${
                          theme === 'terminal' 
                            ? 'bg-black text-white border border-white hover:bg-white hover:text-black' 
                            : 'bg-[#111318] hover:bg-transparent text-white border border-white/10 group-hover:border-transparent'
                        }`}
                    >
                        Launch Visualizer <span className="material-symbols-outlined text-[20px] transition-colors">rocket_launch</span>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col mb-16 z-10 w-full max-w-xl justify-center items-center">
                <p className="text-slate-300 mb-4 text-center font-medium">Want to learn Git commands interactively?</p>
                <Link 
                    href="/learn" 
                    className={`flex cursor-pointer items-center justify-center rounded-full h-14 gap-3 text-lg font-bold px-8 w-full sm:w-auto transition-all ${
                      theme === 'terminal' 
                        ? 'bg-black text-white border border-white hover:bg-white hover:text-black hover:scale-105' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(37,106,244,0.6)] hover:scale-105'
                    }`}
                >
                    <span className="material-symbols-outlined text-[24px]">school</span>
                    Enter the Git Sandbox
                </Link>
            </div>

            <div className="flex flex-col items-center mb-24">
                <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold mb-4">Or try trending repositories</p>
                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        { name: "Next.js", repo: "vercel/next.js", icon: "bolt" },
                        { name: "React", repo: "facebook/react", icon: "token" },
                        { name: "VS Code", repo: "microsoft/vscode", icon: "code" },
                        { name: "Tailwind", repo: "tailwindlabs/tailwindcss", icon: "water_drop" }
                    ].map((item, i) => (
                        <motion.button
                            key={item.repo}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            onClick={() => router.push(`/visualize?repo=${encodeURIComponent(item.repo)}`)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full glassmorphism hover:bg-white/10 transition-colors border border-white/10 hover:border-primary/50 group"
                        >
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-sm transition-colors">{item.icon}</span>
                            <span className="text-slate-300 group-hover:text-white font-medium text-sm transition-colors">{item.name}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1000px] relative group perspective-[1000px] mb-32"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative w-full aspect-[21/9] bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
                 <div className="absolute inset-0 bg-[radial-gradient(#282e39_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent z-0"></div>
                 
                 <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                 </div>

                 <div className="z-10 text-center p-10 glassmorphism-card rounded-2xl flex flex-col items-center animate-float">
                    <div className="relative mb-6">
                        <Image src="/logo.png" alt="GitHub Visualizer" width={100} height={100} className="shadow-[0_0_30px_rgba(37,106,244,0.4)] rounded-2xl" unoptimized />
                        <div className="absolute inset-0 blur-2xl bg-primary/40 rounded-full animate-pulse -z-10"></div>
                    </div>
                    <p className="text-blue-200 font-mono text-sm tracking-widest uppercase font-bold">City_Initialized</p>
                 </div>
            </div>
        </motion.div>

        <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
            {[
                { icon: "location_city", title: "3D Architecture", desc: "Experience your repository as a sprawling digital metropolis. Directories are districts, files are skyscrapers." },
                { icon: "auto_awesome", title: "Interactive Exploration", desc: "Orbit, zoom, and dive into your code. Hover over buildings to see file sizes, types, and paths instantly." },
                { icon: "palette", title: "Language Detection", desc: "Instantly identify file types with dynamic color-coding. TypeScript, JavaScript, CSS, Python, and more." }
            ].map((f, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                    className="flex flex-col gap-4 p-8 rounded-2xl glassmorphism hover:bg-white/5 hover:-translate-y-2 transition-all group"
                >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-white transition-colors shadow-[0_0_15px_rgba(37,106,244,0.15)] group-hover:shadow-[0_0_20px_rgba(37,106,244,0.4)]">
                        <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                    </div>
                    <h3 className="text-white text-2xl font-bold font-display tracking-tight">{f.title}</h3>
                    <p className="text-slate-400 text-base leading-relaxed font-sans">{f.desc}</p>
                </motion.div>
            ))}
        </div>

      </main>

      <footer className="py-8 text-center border-t border-white/5 bg-background/80 backdrop-blur-md relative z-10 flex flex-col items-center gap-3">
        <p className="text-slate-400 text-sm font-medium">
          Made by <a href="https://veerpratapsingh.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-blue-400 animate-pulse hover:animate-none inline-block transition-colors underline decoration-primary/30 hover:decoration-blue-400/50 underline-offset-4">Veer Pratap Singh</a>.
        </p>
        <Link href="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
      </footer>
    </div>
  );
}
