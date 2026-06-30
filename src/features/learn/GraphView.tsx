"use client";

import React, { useMemo, useState, useEffect } from "react";
import { GitNode, useGitStore } from "./GitEngine";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export const GraphView = () => {
  const { nodes, HEAD, branches, isInitialized } = useGitStore();
  const [newNodeId, setNewNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<GitNode | null>(null);

  // Track new commits for pulse animation
  useEffect(() => {
    if (nodes.length > 0) {
      const latestNode = nodes[nodes.length - 1];
      setNewNodeId(latestNode.id);
      const timer = setTimeout(() => setNewNodeId(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [nodes.length]);

  // Memoize positions calculation
  const positions = useMemo(() => {
    const pos: Record<string, { x: number; y: number; color: string }> = {};

    nodes.forEach((node, i) => {
      let y = 0;
      let color = "#3b82f6"; // blue-500

      if (node.parentIds.length > 0) {
        const pid = node.parentIds[0];
        const pPos = pos[pid];
        if (pPos) {
          y = pPos.y;
        }
      }

      // Merge commits: use average Y of parents
      if (node.parentIds.length > 1) {
        color = "#a855f7"; // purple for merge
      }

      pos[node.id] = { x: 60 + i * 90, y: 0, color };
    });
    return pos;
  }, [nodes, branches]);

  // Empty state
  if (!isInitialized) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[var(--bg-secondary)] text-[var(--text-primary)]">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center mb-4 shadow-sm">
          <span className="material-symbols-outlined text-2xl text-[var(--text-secondary)]">commit</span>
        </div>
        <p className="text-[var(--text-primary)] text-sm font-medium tracking-tight">No repository yet</p>
        <p className="text-[var(--text-secondary)] text-xs mt-1">Run <code className="font-bold text-[var(--text-primary)]">git init</code> to start</p>
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[var(--bg-secondary)] text-[var(--text-primary)]">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-primary)] border border-green-500/50 flex items-center justify-center mb-4 shadow-sm">
          <span className="material-symbols-outlined text-2xl text-green-600">check</span>
        </div>
        <p className="text-[var(--text-primary)] text-sm font-medium tracking-tight">Repository initialized!</p>
        <p className="text-[var(--text-secondary)] text-xs mt-1">Make your first commit to see the graph</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[var(--bg-secondary)] overflow-x-auto overflow-y-hidden">
      <div className="absolute inset-0 flex items-center p-10 min-w-max">
        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node) =>
            node.parentIds.map((pid) => {
              const start = positions[pid];
              const end = positions[node.id];
              if (!start || !end) return null;
              const isNewEdge = node.id === newNodeId;
              return (
                <motion.line
                  key={`${pid}-${node.id}`}
                  x1={start.x}
                  y1="50%"
                  x2={end.x}
                  y2="50%"
                  stroke={isNewEdge ? "var(--text-primary)" : "var(--border-color)"}
                  strokeWidth={isNewEdge ? 3 : 2}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              );
            })
          )}
        </svg>

        <AnimatePresence>
          {nodes.map((node) => {
            const pos = positions[node.id];
            const isHead = HEAD === node.id;
            const isNew = newNodeId === node.id;
            const branchLabel = Object.entries(branches).find(([_, id]) => id === node.id)?.[0];
            const isMerge = node.parentIds.length > 1;

            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                }}
                className="absolute transform -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                style={{ left: pos.x, top: "50%" }}
                onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
              >
                {/* Pulse ring for new commits */}
                {isNew && (
                  <motion.div
                    className="absolute w-10 h-10 rounded-full border-2 border-[var(--text-primary)]"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                )}

                {/* Node Circle */}
                <div
                  className={clsx(
                    "w-8 h-8 rounded-full border flex items-center justify-center z-10 transition-all duration-200 hover:scale-110",
                    isHead && "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-md",
                    !isHead && isMerge && "border-[var(--border-color)] bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
                    !isHead && !isMerge && "border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]",
                    "hover:border-[var(--text-primary)]"
                  )}
                >
                  <span className="text-[9px] font-mono font-bold tracking-tight">{node.id.substring(0, 4)}</span>
                </div>

                {/* Branch Label */}
                {branchLabel && (
                  <motion.div
                    layoutId={`branch-${branchLabel}`}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={clsx(
                      "absolute -top-9 text-[10px] px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap font-semibold tracking-wide uppercase z-30",
                      "bg-[var(--text-primary)] text-[var(--bg-primary)] border border-transparent"
                    )}
                  >
                    {branchLabel}
                    {isHead && <span className="ml-1 text-[8px] opacity-70 font-mono">← HEAD</span>}
                  </motion.div>
                )}

                {/* HEAD-only Label (no branch) */}
                {isHead && !branchLabel && (
                  <motion.div 
                    layoutId="head-pointer"
                    className="absolute -top-9 text-[10px] px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap font-semibold tracking-wide uppercase z-30 bg-[var(--text-primary)] text-[var(--bg-primary)] border border-[var(--text-primary)]"
                  >
                    HEAD
                  </motion.div>
                )}

                {/* Node Label (Hash or Message snippet) */}
                <div className="absolute -bottom-6 text-[9px] whitespace-nowrap text-[var(--text-secondary)] font-medium bg-[var(--bg-primary)] px-1 rounded-sm">
                  {node.message.length > 15 ? node.message.substring(0, 15) + '...' : node.message}
                </div>

                {/* Hover Tooltip */}
                <div className="absolute top-10 w-40 text-center text-xs text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border-color)] px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-20">
                  <div className="font-mono text-[10px] text-[var(--text-secondary)] mb-1">{node.id}</div>
                  <div className="font-medium">{node.message}</div>
                  {isMerge && <div className="text-purple-600 dark:text-purple-400 text-[10px] mt-1 font-semibold uppercase tracking-widest">Merge commit</div>}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
