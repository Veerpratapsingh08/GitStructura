"use client";

import React, { useRef, useEffect } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // High density of crisp stars for deep space look
    const particleCount = 150;
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Use discrete sizes (1, 2, or 3 pixels) for sharp square stars
      const sizeOptions = [1, 1, 1, 1, 2, 2, 3];
      const size = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: size,
        // Extremely slow drift
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        // High opacity for contrast, no blur
        opacity: Math.random() > 0.5 ? 1 : 0.4 + Math.random() * 0.5
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const render = () => {
      // Pure black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move gently
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw crisp square particle
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
