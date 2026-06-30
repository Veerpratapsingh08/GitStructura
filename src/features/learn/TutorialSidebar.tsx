"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useGitStore, SCENARIOS } from "./GitEngine";

type Command = {
  command: string;
  description: string;
};

type Topic = {
  title: string;
  commands: Command[];
};

type Module = {
  name: string;
  icon: string;
  topics: Topic[];
};

const gitCourse: Module[] = [
  {
    name: "Getting Started",
    icon: "rocket_launch",
    topics: [
      {
        title: "Git Introduction",
        commands: [
          { command: "git --version", description: "Check Git version" },
          { command: "git config --global user.name \"Your Name\"", description: "Set your username" },
          { command: "git config --global user.email \"you@example.com\"", description: "Set your email" },
        ],
      },
      {
        title: "Initialize Repository",
        commands: [
          { command: "git init", description: "Initialize a new Git repository" },
          { command: "git status", description: "Check repository status" },
        ],
      },
    ],
  },
  {
    name: "Basic Commands",
    icon: "terminal",
    topics: [
      {
        title: "Staging Files",
        commands: [
          { command: "git add <file>", description: "Stage a specific file" },
          { command: "git add .", description: "Stage all changes" },
          { command: "git add -A", description: "Stage all (including deletions)" },
        ],
      },
      {
        title: "Committing",
        commands: [
          { command: "git commit -m \"message\"", description: "Commit with message" },
          { command: "git commit -am \"message\"", description: "Add and commit in one step" },
          { command: "git log", description: "View commit history" },
          { command: "git log --oneline", description: "Compact commit history" },
        ],
      },
      {
        title: "Viewing Changes",
        commands: [
          { command: "git diff", description: "Show unstaged changes" },
          { command: "git diff --staged", description: "Show staged changes" },
          { command: "git show <commit>", description: "Show commit details" },
        ],
      },
    ],
  },
  {
    name: "Branching",
    icon: "account_tree",
    topics: [
      {
        title: "Branch Basics",
        commands: [
          { command: "git branch", description: "List all branches" },
          { command: "git branch <name>", description: "Create new branch" },
          { command: "git branch -d <name>", description: "Delete branch" },
          { command: "git branch -m <new>", description: "Rename current branch" },
        ],
      },
      {
        title: "Switching Branches",
        commands: [
          { command: "git checkout <branch>", description: "Switch to branch" },
          { command: "git checkout -b <name>", description: "Create and switch" },
          { command: "git switch <branch>", description: "Switch (newer syntax)" },
          { command: "git switch -c <name>", description: "Create and switch (newer)" },
        ],
      },
      {
        title: "Merging",
        commands: [
          { command: "git merge <branch>", description: "Merge branch into current" },
          { command: "git merge --no-ff <branch>", description: "Merge with commit" },
          { command: "git merge --abort", description: "Abort merge" },
        ],
      },
    ],
  },
  {
    name: "Remote Repositories",
    icon: "cloud_sync",
    topics: [
      {
        title: "Remote Setup",
        commands: [
          { command: "git remote add origin <url>", description: "Add remote repository" },
          { command: "git remote -v", description: "List remotes" },
          { command: "git remote remove <name>", description: "Remove remote" },
        ],
      },
      {
        title: "Push & Pull",
        commands: [
          { command: "git push origin <branch>", description: "Push to remote" },
          { command: "git push -u origin <branch>", description: "Push and set upstream" },
          { command: "git pull", description: "Fetch and merge" },
          { command: "git fetch", description: "Fetch without merge" },
        ],
      },
      {
        title: "Cloning",
        commands: [
          { command: "git clone <url>", description: "Clone repository" },
          { command: "git clone <url> <dir>", description: "Clone to directory" },
        ],
      },
    ],
  },
  {
    name: "Undoing Changes",
    icon: "undo",
    topics: [
      {
        title: "Unstaging & Reverting",
        commands: [
          { command: "git restore <file>", description: "Discard changes" },
          { command: "git restore --staged <file>", description: "Unstage file" },
          { command: "git reset HEAD~1", description: "Undo last commit (keep changes)" },
          { command: "git reset --hard HEAD~1", description: "Undo and discard changes" },
        ],
      },
      {
        title: "Revert & Amend",
        commands: [
          { command: "git revert <commit>", description: "Revert a commit" },
          { command: "git commit --amend", description: "Modify last commit" },
          { command: "git commit --amend -m \"new\"", description: "Change commit message" },
        ],
      },
    ],
  },
  {
    name: "Advanced",
    icon: "bolt",
    topics: [
      {
        title: "Stashing",
        commands: [
          { command: "git stash", description: "Stash changes" },
          { command: "git stash pop", description: "Apply and remove stash" },
          { command: "git stash list", description: "List stashes" },
          { command: "git stash drop", description: "Delete stash" },
        ],
      },
      {
        title: "Rebasing",
        commands: [
          { command: "git rebase <branch>", description: "Rebase onto branch" },
          { command: "git rebase -i HEAD~3", description: "Interactive rebase" },
          { command: "git rebase --abort", description: "Abort rebase" },
        ],
      },
      {
        title: "Tags",
        commands: [
          { command: "git tag <name>", description: "Create tag" },
          { command: "git tag -a <name> -m \"msg\"", description: "Annotated tag" },
          { command: "git push --tags", description: "Push all tags" },
        ],
      },
    ],
  },
];

export const TutorialSidebar = () => {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'reference'>('scenarios');
  const [openModule, setOpenModule] = useState<number>(0);
  const [openTopic, setOpenTopic] = useState<string | null>("Git Introduction");
  
  const git = useGitStore();

  const handleCommandClick = (cmd: string) => {
    git.setTerminalInput(cmd);
  };

  return (
    <aside className="w-80 flex flex-col border-r shrink-0 h-full overflow-hidden bg-[var(--bg-secondary)] border-[var(--border-color)]">
      {/* Header Tabs */}
      <div className="flex border-b border-[var(--border-color)]">
        <button 
          onClick={() => setActiveTab('scenarios')}
          className={clsx(
            "flex-1 py-3 text-sm font-semibold border-b-2 transition-colors",
            activeTab === 'scenarios' 
              ? "border-[var(--text-primary)] text-[var(--text-primary)]" 
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          Scenarios
        </button>
        <button 
          onClick={() => setActiveTab('reference')}
          className={clsx(
            "flex-1 py-3 text-sm font-semibold border-b-2 transition-colors",
            activeTab === 'reference' 
              ? "border-[var(--text-primary)] text-[var(--text-primary)]" 
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          Reference
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'scenarios' ? (
          <div className="p-4 space-y-4">
            {SCENARIOS.map((scenario) => {
              const isCompleted = git.completedScenarios.includes(scenario.id);
              const isActive = git.currentScenarioId === scenario.id;
              
              return (
                <div 
                  key={scenario.id} 
                  className={clsx(
                    "border rounded-xl p-4 transition-all",
                    isActive 
                      ? "border-[var(--text-primary)] bg-[var(--bg-primary)] shadow-sm"
                      : "border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--hover-bg)]",
                    isCompleted && !isActive && "opacity-70"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={clsx("font-semibold text-sm", isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]")}>
                      {scenario.title}
                    </h3>
                    {isCompleted && <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">{scenario.description}</p>
                  
                  {isActive ? (
                    <div className="rounded-lg p-3 border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                      <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Suggested Commands</p>
                      <div className="space-y-2">
                        {scenario.hints.map((hint, i) => (
                          <div key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                            <span className="mt-0.5 text-[var(--text-primary)]">•</span>
                            <span>{hint}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => git.setScenario(scenario.id)}
                      className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] uppercase tracking-widest transition-colors"
                    >
                      {isCompleted ? "Replay Scenario" : "Start Scenario"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {/* Existing Reference List */}
            {gitCourse.map((module, moduleIdx) => (
              <div key={module.name} className="border-b border-[var(--border-color)]">
                <button
                  onClick={() => setOpenModule(openModule === moduleIdx ? -1 : moduleIdx)}
                  className={clsx(
                    "w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-[var(--hover-bg)]",
                    openModule === moduleIdx && "bg-[var(--hover-bg)]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={clsx(
                      "material-symbols-outlined text-[18px]",
                      openModule === moduleIdx ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                    )}>{module.icon}</span>
                    <span className={clsx(
                      "font-semibold text-sm tracking-tight",
                      openModule === moduleIdx ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                    )}>{module.name}</span>
                  </div>
                  <ChevronDown size={16} className={clsx("text-[var(--text-secondary)] transition-transform", openModule === moduleIdx && "rotate-180 text-[var(--text-primary)]")} />
                </button>
                {openModule === moduleIdx && (
                  <div className="bg-[var(--bg-primary)] pb-2">
                    {module.topics.map((topic) => (
                      <div key={topic.title}>
                        <button
                          onClick={() => setOpenTopic(openTopic === topic.title ? null : topic.title)}
                          className={clsx(
                            "w-full flex items-center justify-between pl-11 pr-4 py-2 text-left hover:bg-[var(--hover-bg)] transition-colors",
                            openTopic === topic.title && "bg-[var(--hover-bg)]"
                          )}
                        >
                          <span className={clsx("text-sm font-medium", openTopic === topic.title ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]")}>{topic.title}</span>
                          <span className="text-[10px] text-[var(--text-primary)] bg-[var(--bg-secondary)] border border-[var(--border-color)] px-1.5 py-0.5 rounded-md font-mono">{topic.commands.length}</span>
                        </button>
                        {openTopic === topic.title && (
                          <div className="pl-11 pr-4 pb-3 pt-1 space-y-2">
                            {topic.commands.map((cmd, idx) => (
                              <div 
                                key={idx}
                                onClick={() => handleCommandClick(cmd.command)}
                                className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md p-2.5 hover:border-[var(--text-primary)] transition-colors cursor-pointer group shadow-sm"
                              >
                                <code className="text-xs font-mono text-[var(--text-primary)] block mb-1">{cmd.command}</code>
                                <span className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{cmd.description}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <p className="text-[10px] text-[var(--text-secondary)] text-center tracking-widest uppercase font-semibold">
          {activeTab === 'scenarios' ? "Complete the goal to advance!" : "Click any command to try it"}
        </p>
      </div>
    </aside>
  );
};
