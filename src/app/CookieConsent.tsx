"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the consent
    const consent = localStorage.getItem('gitstructura-cookie-consent');
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gitstructura-cookie-consent', 'true');
    window.dispatchEvent(new Event('cookie-consent-granted'));
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('gitstructura-cookie-consent', 'declined');
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
            GitStructura uses Microsoft Clarity analytics to understand how you use our application and improve your experience. We do not sell your data, and your Personal Access Tokens (PAT) remain strictly local. By clicking Accept, you consent to our use of analytics cookies. Read our <Link href="/privacy" className="text-primary hover:underline underline-offset-2">Privacy Policy</Link> for more details.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button 
            onClick={handleDecline}
            className="font-bold py-2.5 px-6 rounded-full transition-colors text-slate-400 hover:text-white hover:bg-white/5"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="font-bold py-2.5 px-6 rounded-full transition-colors shadow-lg bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-80"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
