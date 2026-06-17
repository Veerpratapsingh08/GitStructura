"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';

export default function PrivacyPolicy() {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen font-display py-12 px-6 ${theme === 'terminal' ? 'bg-black text-white' : 'bg-[#101622] text-white'}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <Image src="/logo.png" alt="GitHub Visualizer" width={40} height={40} className="rounded-xl group-hover:ring-2 ring-primary/50 transition-all" unoptimized />
            <h2 className="text-white text-2xl font-bold leading-tight tracking-tight">CodeCity</h2>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/" className={`flex items-center gap-2 rounded-full h-10 px-4 py-2 text-sm font-medium transition-all ${
              theme === 'terminal' 
                ? 'bg-black text-white border border-white hover:bg-white hover:text-black' 
                : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
            }`}>
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        <h1 className={`text-4xl font-bold mb-8 ${theme === 'terminal' ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'}`}>Privacy Policy</h1>
        
        <div className="space-y-8 text-slate-300 font-sans leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
            <p>At CodeCity, we believe in complete transparency and respect for your privacy. This policy outlines how we handle your data when you use our application. The short version is: <strong>we collect absolutely nothing.</strong></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Personal Access Tokens (PAT)</h2>
            <p>If you choose to provide a GitHub Personal Access Token to visualize private repositories or bypass API rate limits, that token is <strong>never</strong> transmitted to any server controlled by us. It is stored exclusively in your browser's local memory and is only sent directly to the official GitHub API (`api.github.com`).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Local Storage & Cookies</h2>
            <p>We do not use tracking cookies or third-party analytics. We only use your browser's local storage to save your settings (such as hiding the consent banner or remembering your UI preferences) so you don't have to configure them every time you visit.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Analytics and Tracking</h2>
            <p>We do not track your usage, clicks, or the repositories you visualize. What you build and explore in CodeCity stays securely on your device.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Open Source</h2>
            <p>CodeCity is fully transparent. If you have any concerns about how data is handled, you are free to inspect the open-source repository to verify these claims.</p>
          </section>

          <div className="pt-8 mt-8 border-t border-white/10 text-sm text-slate-500">
            Last updated: June 2026
          </div>
        </div>
      </div>
    </div>
  );
}
