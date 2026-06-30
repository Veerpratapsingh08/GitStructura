"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      
      {/* Super Subtle Background Detail */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at center, var(--border-color) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

      <header className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-4 md:px-10 lg:px-40 sticky top-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="GitHub Visualizer" width={32} height={32} className="rounded-lg grayscale" unoptimized />
          <h2 className="text-xl font-bold leading-tight tracking-tight">CodeCity</h2>
        </div>
        <div className="flex flex-1 justify-end gap-4 items-center">
          <ThemeToggle />
          <Link 
            href="/learn" 
            className="flex cursor-pointer items-center justify-center rounded-md h-9 gap-2 text-sm font-medium px-4 transition-colors hover:bg-[var(--hover-bg)] text-[var(--text-secondary)] mr-2"
          >
            Learn Git
          </Link>
          <a 
            href="https://github.com/Veerpratapsingh08/Github-Visualizer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex cursor-pointer items-center justify-center rounded-md h-9 gap-2 text-[12px] font-medium px-4 transition-all bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-80"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span className="hidden sm:inline">Star on GitHub</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full z-10 px-6 md:px-10 lg:px-40 pt-24 pb-32">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 flex flex-col items-start text-left"
            >
                <div className="mb-6 inline-flex items-center px-3 py-1 text-xs font-medium tracking-widest uppercase border border-[var(--border-color)] rounded-full text-[var(--text-secondary)] bg-[var(--bg-secondary)]">
                   v1.0 is now live
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tighter mb-6">
                    See your code <br />
                    <span className="text-[var(--text-secondary)]">in a new light.</span>
                </h1>

                <p className="text-[var(--text-secondary)] text-lg font-normal leading-relaxed mb-10 max-w-lg">
                    Transform your GitHub repositories into interactive 3D visualizations. Understand architecture, spot bottlenecks, and explore codebases instantly in your browser.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link 
                        href="/visualize" 
                        className="flex items-center justify-center rounded-md h-12 gap-2 text-sm font-semibold px-8 transition-transform bg-[var(--text-primary)] text-[var(--bg-primary)] hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                    >
                        Launch Visualizer
                    </Link>
                    <Link 
                        href="/learn" 
                        className="flex items-center justify-center rounded-md h-12 gap-2 text-sm font-medium px-8 transition-all bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--hover-bg)]"
                    >
                        Try the Git Sandbox
                    </Link>
                </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-full lg:w-1/2 relative group"
            >
                <div className="relative rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm">
                     <Image src="/images/terminal.png" alt="Interactive Git Learning" width={1200} height={800} className="w-full h-auto object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" priority />
                </div>
            </motion.div>
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col items-start mb-16 pt-16 border-t border-[var(--border-color)]">
            <h3 className="text-2xl font-semibold mb-12 tracking-tight">Features designed for clarity.</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                {[
                    { image: "/images/hero.png", title: "Architecture Mapping", desc: "Instantly see the structure of any repository. Folders become districts, files become structures, mapped precisely to your codebase hierarchy." },
                    { image: "/images/treemap.png", title: "Language Detection", desc: "Visually distinguish code density and file types. Color-coded blocks and height variations make it easy to spot massive files or bloated modules." },
                ].map((f, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-6 group"
                    >
                        <div className="w-full rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] relative aspect-[16/9]">
                            <Image src={f.image} alt={f.title} fill className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700 ease-out" />
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold tracking-tight mb-2 text-[var(--text-primary)]">{f.title}</h4>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </main>

      <footer className="py-12 text-center border-t border-[var(--border-color)] bg-[var(--bg-primary)] relative z-10 flex flex-col items-center gap-4">
        <p className="text-[var(--text-secondary)] text-sm">
          Crafted by <a href="https://veerpratapsingh.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] hover:opacity-70 transition-opacity font-medium">Veer Pratap Singh</a>.
        </p>
        <Link href="/privacy" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Privacy Policy</Link>
      </footer>
    </div>
  );
}
