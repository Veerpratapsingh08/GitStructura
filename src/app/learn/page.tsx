"use client";

import React from 'react';
import { Terminal } from '@/features/learn/Terminal';
import { GraphView } from '@/features/learn/GraphView';
import { TutorialSidebar } from '@/features/learn/TutorialSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LearnPage() {
  return (
    <div className="flex flex-col h-screen bg-[#101622] text-white font-display overflow-hidden relative">
      {/* Background styling for consistency */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-0 mix-blend-screen pointer-events-none"></div>

      <header className="flex items-center justify-between border-b border-white/5 bg-[#111318]/90 backdrop-blur-md px-6 py-3 z-50 shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="GitHub Visualizer" width={32} height={32} className="rounded-lg shadow-[0_0_15px_rgba(37,106,244,0.3)]" unoptimized />
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight">CodeCity <span className="text-primary font-normal">Learn</span></h2>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5 text-sm font-medium">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Home
        </Link>
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
          className="w-[360px] glassmorphism-card border-l border-white/5 flex flex-col shrink-0 hidden lg:flex"
        >
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">account_tree</span>
                    Commit Graph
                </h3>
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors" title="Zoom Out">
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors" title="Zoom In">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto relative bg-[radial-gradient(#282e39_1px,transparent_1px)] [background-size:20px_20px] opacity-80">
               <GraphView />
            </div>

            <div className="p-3 bg-black/20 border-t border-white/5 text-[10px] text-slate-400 flex justify-center gap-4 backdrop-blur-md">
                <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(37,106,244,0.6)]"></div> Current HEAD</div>
                <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-blue-400"></div> Committed</div>
                <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-slate-500"></div> Ancestor</div>
            </div>
        </motion.aside>

      </div>
    </div>
  );
}
