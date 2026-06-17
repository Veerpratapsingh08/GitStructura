"use client";

import React from 'react';
import { Terminal } from '@/features/learn/Terminal';
import { GraphView } from '@/features/learn/GraphView';
import { TutorialSidebar } from '@/features/learn/TutorialSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';

export default function LearnPage() {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col h-screen overflow-hidden relative text-white font-display ${
      theme === 'terminal' ? 'bg-[#000000]' : 'bg-[#101622]'
    }`}>
      {/* Background styling for consistency */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-0 mix-blend-screen pointer-events-none"></div>

      <header className={`flex items-center justify-between border-b px-6 py-3 z-50 shrink-0 ${
        theme === 'terminal' ? 'bg-[#000000] border-white/20' : 'border-white/5 bg-[#111318]/90 backdrop-blur-md'
      }`}>
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="GitHub Visualizer" width={32} height={32} className="rounded-lg shadow-[0_0_15px_rgba(37,106,244,0.3)]" unoptimized />
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight">CodeCity <span className="text-primary font-normal">Learn</span></h2>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link 
            href="/" 
            className={`flex items-center gap-2 rounded-full h-10 px-4 py-2 text-sm font-medium transition-all ${
              theme === 'terminal' 
                ? 'bg-black text-white border border-white hover:bg-white hover:text-black' 
                : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Home
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden z-10">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex h-full"
        >
          <TutorialSidebar />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex-1 flex"
        >
          <Terminal />
        </motion.div>

        <motion.aside 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`glassmorphism-card border-l flex flex-col shrink-0 hidden lg:flex ${
            theme === 'terminal' ? 'w-[360px] bg-black border-white/20' : 'w-[360px] border-white/5'
          }`}
        >
            <div className={`p-4 border-b flex justify-between items-center ${
              theme === 'terminal' ? 'border-white/20' : 'border-white/5'
            }`}>
                <h3 className="font-bold text-white flex items-center gap-2">
                    <span className={`material-symbols-outlined ${theme === 'terminal' ? 'text-white' : 'text-primary'}`}>account_tree</span>
                    Commit Graph
                </h3>
                <div className="flex gap-1">
                    <button className={`p-1 rounded transition-colors ${
                      theme === 'terminal' ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'hover:bg-white/10 text-slate-400 hover:text-white'
                    }`} title="Zoom Out">
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <button className={`p-1 rounded transition-colors ${
                      theme === 'terminal' ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'hover:bg-white/10 text-slate-400 hover:text-white'
                    }`} title="Zoom In">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto relative bg-[radial-gradient(#282e39_1px,transparent_1px)] [background-size:20px_20px] opacity-80">
               <GraphView />
            </div>

            <div className={`p-3 border-t text-[10px] text-slate-400 flex justify-center gap-4 backdrop-blur-md ${
              theme === 'terminal' ? 'bg-black border-white/20' : 'bg-black/20 border-white/5'
            }`}>
                <div className="flex items-center gap-1.5"><div className={`size-2 rounded-full shadow-[0_0_8px_rgba(37,106,244,0.6)] ${theme === 'terminal' ? 'bg-white shadow-none' : 'bg-primary'}`}></div> Current HEAD</div>
                <div className="flex items-center gap-1.5"><div className={`size-2 rounded-full ${theme === 'terminal' ? 'bg-slate-300' : 'bg-blue-400'}`}></div> Committed</div>
                <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-slate-500"></div> Ancestor</div>
            </div>
        </motion.aside>

      </div>
    </div>
  );
}
