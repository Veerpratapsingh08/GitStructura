import React from 'react';

export default function Loader({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-[4px] h-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2 h-full bg-[var(--text-primary)] rounded-full animate-loader-bar"
            style={{
              animationDelay: `${i * 0.15}s`,
              transformOrigin: 'center'
            }}
          />
        ))}
      </div>
      {text && <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">{text}</p>}
    </div>
  );
}
