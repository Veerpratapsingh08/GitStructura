"use client";

import React from 'react';
import { Terminal } from '@/features/learn/Terminal';
import { GraphView } from '@/features/learn/GraphView';
import { TutorialSidebar } from '@/features/learn/TutorialSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

export default function LearnPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden relative text-[var(--text-primary)] bg-[var(--bg-primary)] font-sans transition-colors duration-300">
      <header className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-3 z-50 shrink-0 bg-[var(--bg-primary)]">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="GitHub Visualizer" width={32} height={32} className="rounded-lg grayscale" unoptimized />
          <h2 className="text-xl font-bold leading-tight tracking-tight">CodeCity <span className="text-[var(--text-secondary)] font-normal">Learn</span></h2>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link 
            href="/" 
            className="flex items-center gap-2 rounded-md h-9 px-4 py-2 text-sm font-medium transition-all bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--hover-bg)]"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Home
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden z-10">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex h-full border-r border-[var(--border-color)]"
        >
          <TutorialSidebar />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex-1 flex"
        >
          <Terminal />
        </motion.div>

        <motion.aside 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="border-l border-[var(--border-color)] flex flex-col shrink-0 hidden lg:flex w-80 bg-[var(--bg-secondary)]"
        >
            <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center">
                <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 text-sm tracking-tight">
                    <span className="material-symbols-outlined text-[var(--text-primary)] text-sm">account_tree</span>
                    Commit Graph
                </h3>
                <div className="flex gap-1">
                    <button className="p-1 rounded transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]" title="Zoom Out">
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <button className="p-1 rounded transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]" title="Zoom In">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto relative bg-[var(--bg-secondary)]" style={{ backgroundImage: `radial-gradient(circle at center, var(--border-color) 1px, transparent 1px)`, backgroundSize: '16px 16px' }}>
               <GraphView />
            </div>

            <div className="p-3 border-t border-[var(--border-color)] text-[10px] text-[var(--text-secondary)] flex justify-center gap-4 bg-[var(--bg-secondary)] font-mono tracking-wide uppercase">
                <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-[var(--text-primary)]"></div> HEAD</div>
                <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-[var(--border-color)] border border-[var(--text-secondary)]"></div> Commits</div>
            </div>
        </motion.aside>

      </div>
    </div>
  );
}
