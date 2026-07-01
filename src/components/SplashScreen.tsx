"use client";

import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Set the flag
    sessionStorage.setItem('codecity-splash', 'true');
    
    // Animate out after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 1500);

    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--bg-primary)] transition-opacity duration-500 ease-in-out ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <Loader />
    </div>
  );
}
