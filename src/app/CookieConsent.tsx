"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the consent
    const consent = localStorage.getItem('codecity-cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('codecity-cookie-consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto animate-in slide-in-from-bottom-10 fade-in-0 duration-500">
        <div className="flex-1 text-sm text-slate-300">
          <p className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-lg">cookie</span>
            <strong className="text-white text-base">We respect your privacy</strong>
          </p>
          <p>
            CodeCity uses local storage strictly to save your settings locally on your device. We do not use tracking cookies, analytics, or sell your data. Your Personal Access Tokens (PAT) never leave your browser. Read our <Link href="/privacy" className="text-primary hover:underline underline-offset-2">Privacy Policy</Link> for more details.
          </p>
        </div>
        <div className="flex shrink-0">
          <button 
            onClick={handleAccept}
            className="bg-primary hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-full transition-colors shadow-lg hover:shadow-primary/30"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
