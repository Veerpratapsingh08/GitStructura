"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { CityScene } from "@/features/visualizer/CityScene";
import { RepoFile, fetchRepoTree, parseRepoUrl } from "@/features/visualizer/Fetcher";
import ThemeToggle from '@/components/ThemeToggle';
import Loader from '@/components/Loader';
import Link from "next/link";
import Image from "next/image";

export default function VisualizeClient() {
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RepoFile[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showExploreHint, setShowExploreHint] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('gitstructura-recent-searches') || '[]');
      if (Array.isArray(saved)) setRecentSearches(saved);
    } catch {
      console.error('Failed to parse recent searches');
    }
  }, []);

  const dismissHint = useCallback(() => {
    if (showExploreHint) setShowExploreHint(false);
  }, [showExploreHint]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const repoParam = params.get('repo');
    if (repoParam) {
      setUrl(repoParam);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.key.toLowerCase()) {
        case 'f':
          setFocusMode(prev => !prev);
          break;
        case 'r':
          console.log('Reset view');
          break;
        case '?':
          alert('Shortcuts:\\nF - Toggle Focus Mode\\nR - Reset Camera\\n? - Show this help');
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (data && showExploreHint) {
      const timer = setTimeout(() => setShowExploreHint(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [data, showExploreHint]);

  const stats = useMemo(() => {
    if (!data) return null;
    const totalFiles = data.length;
    const totalLOC = data.reduce((acc, f) => acc + ((f.size || 0) > 0 ? Math.ceil((f.size || 0) / 30) : 0), 0);
    
    const STATS_STYLES: Record<string, { bg: string, text: string, border: string, dot: string, label: string }> = {
        ts: { bg: 'bg-blue-500/10', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-500/20', dot: 'bg-blue-500', label: 'TypeScript' },
        tsx: { bg: 'bg-blue-500/10', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-500/20', dot: 'bg-blue-500', label: 'TypeScript' },
        js: { bg: 'bg-yellow-500/10', text: 'text-yellow-700 dark:text-yellow-300', border: 'border-yellow-500/20', dot: 'bg-yellow-500', label: 'JavaScript' },
        jsx: { bg: 'bg-yellow-500/10', text: 'text-yellow-700 dark:text-yellow-300', border: 'border-yellow-500/20', dot: 'bg-yellow-500', label: 'JavaScript' },
        css: { bg: 'bg-pink-500/10', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-500/20', dot: 'bg-pink-500', label: 'CSS' },
        html: { bg: 'bg-orange-500/10', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-500/20', dot: 'bg-orange-500', label: 'HTML' },
        vue: { bg: 'bg-green-500/10', text: 'text-green-700 dark:text-green-300', border: 'border-green-500/20', dot: 'bg-green-500', label: 'Vue' },
        json: { bg: 'bg-gray-500/10', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-500/20', dot: 'bg-gray-500', label: 'JSON' },
        md: { bg: 'bg-purple-500/10', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-500/20', dot: 'bg-purple-500', label: 'Markdown' },
    };

    const labelCounts: Record<string, number> = {};
    const labelStyles: Record<string, typeof STATS_STYLES[string]> = {};

    data.forEach(f => {
         const ext = f.path.split('.').pop()?.toLowerCase() || 'other';
         const style = STATS_STYLES[ext];
         
         const label = style ? style.label : ext.toUpperCase();
         const finalStyle = style || { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20', dot: 'bg-slate-500', label };

         labelCounts[label] = (labelCounts[label] || 0) + 1;
         if (!labelStyles[label]) labelStyles[label] = finalStyle;
    });

    const languages = Object.entries(labelCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([label, count]) => {
            return {
                ...labelStyles[label],
                count,
                percentage: Math.round((count / totalFiles) * 100),
            };
        });
        
    return { totalFiles, totalLOC, languages };
  }, [data]);

  const handleVisualize = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    setError(null);
    setData(null);

    const parsed = parseRepoUrl(url);
    if (!parsed) {
      setError("Invalid GitHub URL. Please use format: owner/repo");
      setLoading(false);
      return;
    }

    try {
      const files = await fetchRepoTree(parsed.owner, parsed.repo, token);
      setData(files);
      
      // Update recent searches
      const repoName = `${parsed.owner}/${parsed.repo}`;
      const saved = JSON.parse(localStorage.getItem('gitstructura-recent-searches') || '[]');
      const updated = [repoName, ...saved.filter((r: string) => r !== repoName)].slice(0, 5);
      localStorage.setItem('gitstructura-recent-searches', JSON.stringify(updated));
      setRecentSearches(updated);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch repository");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch if url was set via query params
  useEffect(() => {
     if (url && !data && !loading && !error) {
         handleVisualize();
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const renderSearchInputs = () => (
    <div className="flex gap-3 min-w-40 h-10 w-full max-w-[800px] justify-center flex-1 z-50">
      <div className="flex w-full max-w-[500px] items-stretch rounded-md h-full transition-all border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm focus-within:ring-1 focus-within:ring-[var(--text-primary)]">
        <div className="text-[var(--text-secondary)] flex items-center justify-center pl-3">
          <span className="material-symbols-outlined text-[18px]">search</span>
        </div>
        <input 
          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-[var(--text-primary)] focus:outline-none border-none h-full placeholder:text-[var(--text-secondary)] px-3 text-sm" 
          placeholder="Enter GitHub URL..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleVisualize()}
        />
        {error ? (
          <div className="text-red-500 text-xs flex items-center pr-3 whitespace-nowrap font-medium">Error</div>
        ) : (
          <div className="text-[var(--text-secondary)] text-xs flex items-center pr-3 font-mono hidden sm:flex tracking-widest uppercase">Enter</div>
        )}
      </div>

      <div className="relative group/tooltip flex w-48 shrink-0 items-stretch rounded-md h-full transition-all border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm focus-within:ring-1 focus-within:ring-[var(--text-primary)]">
        <div className="text-[var(--text-secondary)] flex items-center justify-center pl-3">
          <span className="material-symbols-outlined text-[16px]">key</span>
        </div>
        <input 
          type="password"
          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-[var(--text-primary)] focus:outline-none border-none h-full placeholder:text-[var(--text-secondary)] px-2 text-sm" 
          placeholder="GitHub PAT" 
          value={token}
          onChange={(e) => setToken(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleVisualize()}
        />
        
        {/* Tooltip */}
        <div className="absolute top-full mt-2 right-0 md:left-0 md:right-auto w-64 bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] p-3 rounded-md shadow-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-[100]">
          <p className="font-semibold mb-1">Personal Access Token</p>
          <p className="text-[var(--text-secondary)]">Used to access private repositories and increase API rate limits. Your token is only used locally.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden text-[var(--text-primary)] bg-[var(--bg-primary)] font-sans transition-colors duration-300">
      <header className="flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-3 z-50 shrink-0">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <Image src="/logo.png" alt="GitStructura" width={32} height={32} className="rounded-lg grayscale" unoptimized />
            <h2 className="text-[var(--text-primary)] text-xl font-bold leading-tight tracking-tight hidden md:block">GitStructura</h2>
          </Link>
        </div>
        
        {data ? renderSearchInputs() : <div className="flex-1"></div>}

        <div className="flex-1 flex justify-end items-center gap-4">
            <ThemeToggle />
            <Link href="/" className="flex items-center gap-2 rounded-md h-9 px-4 py-2 text-sm font-medium transition-all bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--hover-bg)] shadow-sm">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span className="hidden sm:inline">Back</span>
            </Link>
        </div>
      </header>
      
      <div className="flex flex-1 relative overflow-hidden bg-[var(--bg-primary)]">
            <div className="absolute inset-0 z-0">
                 {data ? (
                     <CityScene files={data} />
                 ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden bg-[var(--bg-primary)]">
                          
                          {/* Super Subtle Grid Background */}
                          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                               style={{ backgroundImage: `radial-gradient(circle at center, var(--border-color) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

                          <div className="relative z-10 flex flex-col items-center">
                              <div className="p-4 rounded-xl mb-6 w-fit bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm">
                                   <Image src="/logo.png" alt="GitStructura" width={64} height={64} className="grayscale mix-blend-luminosity" />
                              </div>
                              <h1 className="text-4xl font-bold mb-3 tracking-tight">Build your code city.</h1>
                              <p className="max-w-md text-lg mb-8 text-[var(--text-secondary)]">Paste a GitHub URL to transform any repository into an interactive 3D metropolis.</p>
                              
                              <div className="w-full max-w-[800px] mb-8">
                                  {renderSearchInputs()}
                                  <p className="text-sm text-[var(--text-secondary)] mt-6 max-w-lg mx-auto leading-relaxed">
                                      * A GitHub Personal Access Token (PAT) is optional for public repos, but <span className="inline-block px-1.5 py-0.5 mx-1 rounded-sm font-medium bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs uppercase tracking-widest">Required for Private</span>.
                                  </p>
                              </div>

                              <div className="flex flex-col items-center gap-3">
                                  <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest font-semibold">Try these examples</span>
                                  <div className="flex flex-wrap justify-center gap-3">
                                      {[
                                          { name: 'React', repo: 'facebook/react' },
                                          { name: 'Next.js', repo: 'vercel/next.js' },
                                          { name: 'Zustand', repo: 'pmndrs/zustand' },
                                      ].map(({ name, repo }) => (
                                          <button 
                                              key={repo}
                                              onClick={() => { setUrl(repo); }}
                                              className="px-4 py-2 rounded-md text-sm transition-all group bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] shadow-sm flex items-center gap-2"
                                          >
                                              <span className="font-medium">{name}</span>
                                              <span className="text-xs font-mono opacity-60 group-hover:opacity-100 transition-opacity">{repo}</span>
                                          </button>
                                      ))}
                                  </div>
                              </div>

                              {recentSearches.length > 0 && (
                                  <div className="flex flex-col items-center gap-3 mt-8 pt-8 border-t border-[var(--border-color)] w-full max-w-md">
                                      <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[14px]">history</span>
                                        Recent Searches
                                      </span>
                                      <div className="flex flex-wrap justify-center gap-2">
                                          {recentSearches.map((repo) => (
                                              <button 
                                                  key={repo}
                                                  onClick={() => { setUrl(repo); }}
                                                  className="px-3 py-1.5 rounded-md text-xs font-mono transition-all bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] shadow-sm"
                                              >
                                                  {repo}
                                              </button>
                                          ))}
                                      </div>
                                  </div>
                              )}
                          </div>
                          
                          {loading && (
                               <div className="mt-12 flex items-center gap-3 text-[var(--text-primary)] bg-[var(--bg-secondary)] px-6 py-4 rounded-full border border-[var(--border-color)] shadow-sm relative z-10">
                                   <div className="scale-75"><Loader /></div>
                                   <span className="font-mono text-xs uppercase tracking-widest">Fetching data...</span>
                               </div>
                          )}
                          {error && (
                               <div className="mt-12 text-red-600 bg-red-50 px-6 py-2.5 rounded-md border border-red-200 relative z-10 font-medium text-sm shadow-sm dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400">
                                   {error}
                               </div>
                          )}
                     </div>
                 )}
                 {loading && data && (
                     <div className="absolute inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-sm z-50 flex items-center justify-center">
                         <div className="flex flex-col items-center bg-[var(--bg-secondary)] p-6 rounded-lg border border-[var(--border-color)] shadow-lg">
                             <Loader />
                             <p className="mt-4 text-[var(--text-primary)] font-mono text-sm tracking-widest uppercase">Updating...</p>
                         </div>
                     </div>
                 )}
            </div>

            {data && stats && !focusMode && (
                <div className={`absolute left-6 top-6 z-40 flex flex-col gap-3 pointer-events-none transition-all duration-300 ease-out ${sidebarOpen ? 'w-72' : 'w-10'}`}>
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="size-10 bg-[var(--bg-primary)] rounded-md border border-[var(--border-color)] pointer-events-auto flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] transition-all shadow-sm group"
                        title={sidebarOpen ? 'Collapse HUD' : 'Expand HUD'}
                    >
                        <span className="material-symbols-outlined text-[18px] transition-transform">{sidebarOpen ? 'close' : 'analytics'}</span>
                    </button>
                    
                    {sidebarOpen && (
                        <>
                            <div className="bg-[var(--bg-primary)] rounded-lg p-5 shadow-sm border border-[var(--border-color)] pointer-events-auto animate-in slide-in-from-left-8 fade-in-0 duration-300">
                                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[var(--border-color)]">
                                    <div className="size-2 bg-[var(--text-primary)] rounded-full"></div>
                                    <span className="text-[10px] font-bold tracking-widest text-[var(--text-primary)] uppercase">Repository</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[var(--bg-secondary)] rounded-md p-3 border border-[var(--border-color)]">
                                        <p className="text-[var(--text-secondary)] text-[9px] font-bold uppercase tracking-widest mb-1">Files</p>
                                        <p className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight">{stats.totalFiles.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-[var(--bg-secondary)] rounded-md p-3 border border-[var(--border-color)]">
                                        <p className="text-[var(--text-secondary)] text-[9px] font-bold uppercase tracking-widest mb-1">Est. LOC</p>
                                        <p className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight">{stats.totalLOC.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-[var(--bg-primary)] rounded-lg p-5 shadow-sm border border-[var(--border-color)] pointer-events-auto animate-in slide-in-from-left-8 fade-in-0 duration-300 delay-75">
                                <p className="text-[10px] font-bold tracking-widest text-[var(--text-primary)] uppercase mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px]">code_blocks</span>
                                    Language Dist.
                                </p>
                                
                                <div className="w-full h-1.5 rounded-full overflow-hidden flex mb-5 bg-[var(--border-color)]">
                                    {stats.languages.map((lang) => (
                                        <div 
                                            key={lang.label} 
                                            style={{ width: `${lang.percentage}%` }} 
                                            className={`${lang.dot} h-full transition-all duration-1000 ease-out`}
                                            title={`${lang.label}: ${lang.percentage}%`}
                                        ></div>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-2">
                                    {stats.languages.map((lang) => (
                                        <div key={lang.label} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-2">
                                                <span className={`size-2 rounded-full ${lang.dot}`}></span>
                                                <p className="text-[var(--text-secondary)] text-[11px] font-medium group-hover:text-[var(--text-primary)] transition-colors">{lang.label}</p>
                                            </div>
                                            <span className="text-[var(--text-secondary)] text-[11px] font-mono group-hover:text-[var(--text-primary)] transition-colors">{lang.percentage}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {data && showExploreHint && !focusMode && (
                <div 
                    className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-in fade-in-0 zoom-in-95 duration-500"
                    onClick={dismissHint}
                >
                    <div className="bg-[var(--bg-primary)] px-4 py-2 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] text-xs flex items-center gap-2 shadow-sm font-medium tracking-wide">
                        <span className="material-symbols-outlined text-[16px]">pan_tool</span>
                        <span>Drag to orbit · Hover for details</span>
                    </div>
                </div>
            )}

            {data && (data as RepoFile[] & { isCapped?: boolean }).isCapped && !focusMode && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                    <div className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/30 px-4 py-2 rounded-md text-xs font-medium flex items-center gap-2 shadow-sm animate-in slide-in-from-top-4 fade-in-0 duration-500">
                        <span className="material-symbols-outlined text-[16px]">warning</span>
                        Massive repository detected. Showing largest 5,000 files.
                    </div>
                </div>
            )}

            {data && !focusMode && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 hidden md:block pointer-events-none">
                    <div className="bg-[var(--bg-primary)] text-[var(--text-secondary)] text-[10px] px-4 py-2 rounded-md border border-[var(--border-color)] font-mono flex items-center gap-3 shadow-sm uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]"></span>Live</span>
                        <span className="opacity-30">|</span>
                        <span>Objects: {stats?.totalFiles.toLocaleString()} {(data as RepoFile[] & { isCapped?: boolean }).isCapped && <span className="text-yellow-600 dark:text-yellow-500 font-bold ml-1">(CAPPED)</span>}</span>
                        <span className="opacity-30">|</span>
                        <span>Press ? for shortcuts</span>
                    </div>
                </div>
            )}

            {focusMode && (
                <button 
                    onClick={() => setFocusMode(false)}
                    className="absolute top-4 right-4 z-50 bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs px-4 py-2 rounded-md border border-[var(--border-color)] font-mono flex items-center gap-2 shadow-sm hover:bg-[var(--hover-bg)] transition-colors pointer-events-auto uppercase tracking-widest font-semibold"
                >
                    <span className="material-symbols-outlined text-[16px]">fullscreen_exit</span>
                    Exit Focus
                </button>
            )}
      </div>
    </div>
  );
}
