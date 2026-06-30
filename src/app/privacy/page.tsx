"use client";

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import { Shield, Key, Database, LineChart, Github, Clock } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function PrivacyPolicy() {
  const sections = [
    { id: 'introduction', icon: Shield, title: 'Introduction' },
    { id: 'tokens', icon: Key, title: 'Personal Access Tokens' },
    { id: 'storage', icon: Database, title: 'Local Storage & Cookies' },
    { id: 'analytics', icon: LineChart, title: 'Analytics & Tracking' },
    { id: 'opensource', icon: Github, title: 'Open Source Transparency' },
  ];

  const [consentStatus, setConsentStatus] = useState<string | null>(null);

  useEffect(() => {
    setConsentStatus(localStorage.getItem('codecity-cookie-consent') || 'unknown');
  }, []);

  const handleRevoke = () => {
    localStorage.setItem('codecity-cookie-consent', 'declined');
    setConsentStatus('declined');
    window.location.reload(); // Reload to remove tracking script
  };

  const handleGrant = () => {
    localStorage.setItem('codecity-cookie-consent', 'true');
    setConsentStatus('true');
    window.dispatchEvent(new Event('cookie-consent-granted'));
    window.location.reload();
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-primary)] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <Image src="/logo.png" alt="GitHub Visualizer" width={32} height={32} className="rounded-lg grayscale opacity-80 group-hover:opacity-100 transition-opacity" unoptimized />
            <h2 className="text-[var(--text-primary)] text-xl font-bold leading-tight tracking-tight">CodeCity</h2>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/" className="flex items-center gap-2 rounded-md h-9 px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--hover-bg)] hover:border-[var(--text-primary)]">
              <span>Back to App</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 relative">
          <div className="sticky top-32">
            <h1 className="text-3xl font-bold mb-8 tracking-tighter">Privacy<br/>Policy</h1>
            <nav className="space-y-1">
              {sections.map((sec, idx) => (
                <a 
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => scrollToSection(e, sec.id)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <span className="text-[10px] font-mono opacity-50 w-4">0{idx + 1}</span>
                  <sec.icon className="w-4 h-4 opacity-70" />
                  <span>{sec.title}</span>
                </a>
              ))}
            </nav>
            <div className="mt-12 pt-6 border-t border-[var(--border-color)] flex items-center gap-2 text-[10px] text-[var(--text-secondary)] tracking-widest uppercase font-mono font-semibold">
              <Clock className="w-3 h-3" />
              <span>Updated June 2026</span>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-3xl space-y-20 pt-2 pb-24 text-[var(--text-secondary)] text-base leading-relaxed">
          
          <section id="introduction" className="scroll-mt-32">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight flex items-center gap-3">
              <Shield className="w-6 h-6" /> Introduction
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-[var(--text-secondary)]">
              <p className="text-lg leading-relaxed text-[var(--text-primary)] mb-6 font-medium">
                At CodeCity, we believe in transparency and absolute respect for your privacy. We build developer tools, not data harvesting networks.
              </p>
              <p>
                This policy outlines exactly how we handle your data when you use our application. We strictly limit data collection to essential analytics designed solely to improve your architectural visualization experience. There are no hidden third-party trackers, no ad networks, and absolutely no reselling of your information.
              </p>
            </div>
          </section>

          <section id="tokens" className="scroll-mt-32">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight flex items-center gap-3">
              <Key className="w-6 h-6" /> Personal Access Tokens
            </h2>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 mb-6 shadow-sm">
              <h3 className="text-sm font-bold tracking-widest uppercase text-[var(--text-primary)] mb-2">Zero-Server Architecture</h3>
              <p className="text-sm">
                If you choose to provide a GitHub Personal Access Token (PAT) to visualize private repositories or bypass API rate limits, that token is <strong className="font-bold text-[var(--text-primary)]">never transmitted to any server controlled by us</strong>.
              </p>
            </div>
            <p>
              Your PAT is stored exclusively in your browser's local memory (specifically <code>localStorage</code>) and is only ever sent directly from your local machine to the official GitHub API endpoints (<code>api.github.com</code>). If you clear your browser data, your token is permanently gone.
            </p>
          </section>

          <section id="storage" className="scroll-mt-32">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight flex items-center gap-3">
              <Database className="w-6 h-6" /> Local Storage & Cookies
            </h2>
            <p className="mb-4">
              We leverage modern browser APIs to save your preferences locally. This prevents you from having to re-configure the app every time you visit. Data stored locally includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 marker:text-[var(--text-primary)]">
              <li><strong>UI Preferences:</strong> Your selected theme (Light/Dark) and visualizer settings.</li>
              <li><strong>Consent State:</strong> Whether you have accepted or dismissed the cookie consent banner.</li>
              <li><strong>Recent Searches:</strong> A brief history of repositories you have recently visualized, for convenience.</li>
            </ul>
            <p>
              None of this local data is synced to the cloud. It exists only on the device you are currently using.
            </p>
          </section>

          <section id="analytics" className="scroll-mt-32">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight flex items-center gap-3">
              <LineChart className="w-6 h-6" /> Analytics & Tracking
            </h2>
            <p className="mb-4">
              To understand how developers use CodeCity and to fix UX issues, we use Microsoft Clarity. This is strictly opt-in via our cookie consent banner.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="border border-[var(--border-color)] rounded-lg p-5">
                <h4 className="text-[var(--text-primary)] font-semibold mb-2">What we track</h4>
                <p className="text-sm">General usage patterns, page views, and high-level interaction metrics to help us optimize the layout.</p>
              </div>
              <div className="border border-[var(--border-color)] rounded-lg p-5">
                <h4 className="text-[var(--text-primary)] font-semibold mb-2">What we NEVER track</h4>
                <p className="text-sm">Source code, private repository names, file contents, or personal GitHub credentials.</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-[var(--text-primary)] font-semibold mb-1">Manage Your Analytics Consent</h4>
                <p className="text-sm">Current Status: <strong className="text-[var(--text-primary)] font-semibold tracking-wide uppercase text-xs ml-1">{consentStatus === 'true' ? 'Opted In' : consentStatus === 'declined' ? 'Opted Out' : 'Unknown'}</strong></p>
              </div>
              <div className="shrink-0">
                {consentStatus === 'true' ? (
                  <button onClick={handleRevoke} className="bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 px-4 py-2 rounded-md font-semibold text-sm transition-colors">
                    Revoke Consent
                  </button>
                ) : (
                  <button onClick={handleGrant} className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 py-2 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity">
                    Opt In to Analytics
                  </button>
                )}
              </div>
            </div>
          </section>

          <section id="opensource" className="scroll-mt-32">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight flex items-center gap-3">
              <Github className="w-6 h-6" /> Open Source Transparency
            </h2>
            <p>
              CodeCity is fully open source. We believe that security and privacy should be verifiable, not just promised. If you have any concerns about how data is handled, you are encouraged to inspect our repository, review the network requests in your browser dev tools, or run the application locally on your own machine.
            </p>
            <div className="mt-8">
              <a href="https://github.com/Veerpratapsingh08/github-visualizer" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm">
                <Github className="w-4 h-4" />
                View Source on GitHub
              </a>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
