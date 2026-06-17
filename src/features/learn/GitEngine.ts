import { create } from 'zustand';

// Types for our simulated Git Graph
export type GitNode = {
  id: string; // Commit hash (short)
  message: string;
  parentIds: string[]; // Support for multiple parents (merges)
  branch?: string; // If this node is a branch tip
};

export type Scenario = {
  id: string;
  title: string;
  description: string;
  goal: (state: GitState) => boolean;
  hints: string[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    title: "1. The Beginning",
    description: "Every great project starts with a single command. Initialize your new Git repository.",
    hints: ["Run 'git init' to create a new repository."],
    goal: (state) => state.isInitialized
  },
  {
    id: "s2",
    title: "2. Your First Commit",
    description: "Create a new file, stage it, and commit it to save your progress.",
    hints: [
      "Use 'touch index.js' to create a file.",
      "Use 'git add index.js' to stage it.",
      "Use 'git commit -m \"Initial commit\"' to commit it."
    ],
    goal: (state) => state.nodes.length >= 1
  },
  {
    id: "s3",
    title: "3. Branching Out",
    description: "Create a new branch called 'feature', switch to it, and make a commit.",
    hints: [
      "Use 'git branch feature' to create the branch.",
      "Use 'git checkout feature' to switch to it.",
      "Make a change (e.g. touch app.js) and commit it."
    ],
    goal: (state) => state.currentBranch === 'feature' && state.nodes.some(n => state.branches['feature'] === n.id && state.branches['main'] !== n.id)
  },
  {
    id: "s4",
    title: "4. Bringing It Together",
    description: "Switch back to 'main' and merge your 'feature' branch into it.",
    hints: [
      "Use 'git checkout main'.",
      "Use 'git merge feature'."
    ],
    goal: (state) => state.currentBranch === 'main' && state.nodes.some(n => n.message.includes("Merge branch 'feature'"))
  },
  {
    id: "s5",
    title: "5. Stash Your Work",
    description: "Sometimes you need to switch branches but aren't ready to commit. Use stash!",
    hints: [
      "Use 'touch wip.txt' to create some work.",
      "Use 'git stash' to save it temporarily."
    ],
    goal: (state) => state.stashes.length > 0
  },
  {
    id: "s6",
    title: "6. Time Travel",
    description: "You can checkout specific commits to look at old code. This puts you in a 'Detached HEAD' state.",
    hints: [
      "Use 'git log' to find a commit hash.",
      "Use 'git checkout <hash>' to travel back in time."
    ],
    goal: (state) => state.currentBranch === 'DETACHED'
  },
  {
    id: "s7",
    title: "7. Safely Undo",
    description: "You made a mistake and committed it. Safely undo it by creating a Revert commit.",
    hints: [
      "Use 'git revert HEAD' to undo your last commit."
    ],
    goal: (state) => {
       const lastNode = state.nodes[state.nodes.length - 1];
       return lastNode && lastNode.message.startsWith("Revert");
    }
  },
  {
    id: "s8",
    title: "8. Cherry Picking",
    description: "You want a specific commit from another branch without merging the whole branch.",
    hints: [
      "Use 'git cherry-pick <hash>' to copy a commit."
    ],
    goal: (state) => {
       const lastNode = state.nodes[state.nodes.length - 1];
       return lastNode && lastNode.message.includes("(cherry-picked)");
    }
  },
  {
    id: "s9",
    title: "9. Rebasing",
    description: "Rebase your branch onto 'main' for a clean, linear history.",
    hints: [
      "Use 'git rebase main'"
    ],
    goal: (state) => {
       const headNode = state.nodes.find(n => n.id === state.HEAD);
       return !!(headNode && headNode.message.includes("Rebased"));
    }
  },
  {
    id: "s10",
    title: "10. Merge Conflicts",
    description: "Oh no! A merge conflict occurred. Resolve it and commit.",
    hints: [
      "Use 'git merge conflict-branch' (simulates a conflict).",
      "Use 'git add conflicted.js'",
      "Use 'git commit -m \"Resolved conflict\"'"
    ],
    goal: (state) => !state.isMerging && state.completedScenarios.includes('s10_conflict_started') && state.nodes.some(n => n.message.includes("Resolved conflict"))
  },
  {
    id: "s11",
    title: "11. Tagging",
    description: "Mark a specific commit as a release using tags.",
    hints: [
      "Use 'git tag v1.0.0'"
    ],
    goal: (state) => !!state.tags['v1.0.0']
  },
  {
    id: "s12",
    title: "12. Remotes & Pulling",
    description: "Simulate grabbing updates from a remote repository.",
    hints: [
      "Use 'git fetch' to update origin/main.",
      "Use 'git pull origin main' to fetch and merge."
    ],
    goal: (state) => state.nodes.some(n => n.message.includes("Merge remote-tracking branch 'origin/main'"))
  },
  {
    id: "s13",
    title: "13. Amending Commits",
    description: "Fix your last commit's message or add forgotten files.",
    hints: [
      "Use 'git commit --amend -m \"fixed message\"'"
    ],
    goal: (state) => state.nodes.length > 0 && state.nodes[state.nodes.length - 1].message === "fixed message"
  },
  {
    id: "s14",
    title: "14. Pushing to Remotes",
    description: "Send your local commits to the remote repository.",
    hints: [
      "Use 'git push origin main'"
    ],
    goal: (state) => state.branches['origin/main'] === state.branches['main'] && state.branches['main'] !== ''
  },
  {
    id: "s15",
    title: "15. Soft Resets",
    description: "Undo a commit but keep the files staged.",
    hints: [
      "Use 'git reset --soft HEAD~1'"
    ],
    goal: (state) => state.staging.length > 0 && state.nodes.length > 0
  },
  {
    id: "s16",
    title: "16. Squashing Commits",
    description: "Squash the last 2 commits into 1 cleaner commit.",
    hints: [
      "Use 'git squash 2 -m \"squashed feature\"'"
    ],
    goal: (state) => state.nodes.length > 0 && state.nodes[state.nodes.length - 1].message === "squashed feature"
  },
  {
    id: "s17",
    title: "17. Unstaging Files",
    description: "Oops, you staged a file by mistake. Unstage it without losing changes.",
    hints: [
      "Use 'touch secret.txt' and 'git add secret.txt'.",
      "Use 'git restore --staged secret.txt' to unstage it."
    ],
    goal: (state) => !state.staging.includes('secret.txt') && state.workingDirectory.includes('secret.txt')
  },
  {
    id: "s18",
    title: "18. The Ultimate Safety Net",
    description: "You just lost a commit. Find its hash using the reflog, and checkout to it.",
    hints: [
      "Use 'git reflog' to see everywhere HEAD has been.",
      "Use 'git checkout <hash>' to recover your lost code."
    ],
    goal: (state) => state.currentBranch === 'DETACHED' && state.reflogHistory.length > 0
  }
];

export type GitState = {
  nodes: GitNode[];
  HEAD: string | null; // ID of the current commit
  branches: Record<string, string>; // branchName -> commitId
  currentBranch: string;
  staging: string[]; // List of files staged
  workingDirectory: string[]; // List of modified files (simulated)
  isInitialized: boolean; // Whether git init has been run
  currentScenarioId: string | null;
  completedScenarios: string[];
  terminalInput: string;
  stashes: string[][]; // Array of saved working directory states
  isMerging: boolean;
  conflictedFiles: string[];
  tags: Record<string, string>;
  reflogHistory: string[];
};

type GitActions = {
  init: () => void;
  add: (files: string[]) => void;
  commit: (message: string) => void;
  checkout: (branchOrId: string) => void;
  branch: (name: string) => void;
  merge: (sourceBranch: string) => void;
  touch: (file: string) => void;
  reset: () => void; // Hard reset to initial state
  setScenario: (id: string | null) => void;
  completeScenario: (id: string) => void;
  setTerminalInput: (input: string) => void;
  stash: () => void;
  stashPop: () => void;
  cherryPick: (commitId: string) => void;
  resetHard: (commitId: string) => void;
  revert: (commitId: string) => void;
  rebase: (targetBranch: string) => void;
  tag: (name: string) => void;
  fetch: () => void;
  pull: () => void;
  abortMerge: () => void;
  triggerConflictScenario: () => void;
  amend: (message: string) => void;
  push: () => void;
  resetSoft: (commitId: string) => void;
  squash: (count: number, message: string) => void;
  restore: (file: string) => void;
};

// Helper to generate random hash
const generateHash = () => Math.random().toString(16).substring(2, 9);

export const useGitStore = create<GitState & GitActions>((set, get) => ({
  nodes: [],
  HEAD: null,
  branches: {},
  currentBranch: 'main',
  staging: [],
  workingDirectory: [],
  isInitialized: false,

  currentScenarioId: null,
  completedScenarios: [],
  terminalInput: "",
  stashes: [],
  isMerging: false,
  conflictedFiles: [],
  tags: {},
  reflogHistory: [],

  init: () => {
    set({
      nodes: [],
      HEAD: null,
      branches: { main: '', 'origin/main': '' },
      currentBranch: 'main',
      staging: [],
      workingDirectory: ['README.md'],
      isInitialized: true,
      stashes: [],
      isMerging: false,
      conflictedFiles: [],
      tags: {},
      reflogHistory: [],
    });
  },

  touch: (file) => {
      set((state) => ({
          workingDirectory: [...state.workingDirectory, file]
      }));
  },

  add: (files) => {
    set((state) => {
        if (files.includes('.')) {
            return {
                staging: [...state.staging, ...state.workingDirectory],
                workingDirectory: []
            };
        }
        return {
             staging: [...state.staging, ...files],
             workingDirectory: state.workingDirectory.filter(f => !files.includes(f))
        };
    });
  },

  commit: (message) => {
    set((state) => {
      if (state.staging.length === 0 && state.nodes.length > 0) {
          return state; // Prevent empty commits unless it's initial? Actually git allow-empty exists but let's block for now
      }

      const newCommitId = generateHash();
      const newNode: GitNode = {
        id: newCommitId,
        message,
        parentIds: state.HEAD ? [state.HEAD] : [],
      };

      const newNodes = [...state.nodes, newNode];
      const newBranches = { ...state.branches, [state.currentBranch]: newCommitId };
      const newReflog = [`${newCommitId} HEAD@{0}: commit: ${message}`, ...state.reflogHistory];

      return {
        nodes: newNodes,
        HEAD: newCommitId,
        branches: newBranches,
        staging: [],
        workingDirectory: [],
        isMerging: false,
        conflictedFiles: [],
        reflogHistory: newReflog
      };
    });
  },

  branch: (name) => {
     set((state) => {
         if (!state.HEAD) return state;
         return {
             branches: { ...state.branches, [name]: state.HEAD } // Create ref
         };
     });
  },

  checkout: (target) => {
      set((state) => {
          if (state.branches[target]) {
              const hash = state.branches[target];
              return {
                  currentBranch: target,
                  HEAD: hash,
                  reflogHistory: [`${hash} HEAD@{0}: checkout: moving to ${target}`, ...state.reflogHistory]
              };
          }
          // Simple detached HEAD check
          const node = state.nodes.find(n => n.id === target || n.id.startsWith(target));
          if (node) {
               return {
                   HEAD: node.id,
                   currentBranch: 'DETACHED',
                   reflogHistory: [`${node.id} HEAD@{0}: checkout: moving to ${target}`, ...state.reflogHistory]
               };
          }
          return state;
      });
  },

  merge: (sourceBranch) => {
      set((state) => {
          const targetBranch = state.currentBranch;
          const sourceCommitId = state.branches[sourceBranch];
          const targetCommitId = state.branches[targetBranch];

          if (!sourceCommitId || !targetCommitId) return state;
          if (sourceCommitId === targetCommitId) return state; // Already up to date

          if (sourceBranch === 'conflict-branch') {
              return {
                 ...state,
                 isMerging: true,
                 conflictedFiles: ['conflicted.js'],
                 workingDirectory: [...state.workingDirectory, 'conflicted.js'],
                 completedScenarios: [...state.completedScenarios, 's10_conflict_started']
              }
          }

          // Simplified merge: Create a merge commit connecting both
          const mergeCommitId = generateHash();
          const newNode: GitNode = {
              id: mergeCommitId,
              message: `Merge branch '${sourceBranch}' into ${targetBranch}`,
              parentIds: [targetCommitId, sourceCommitId], 
          };

          const newReflog = [`${mergeCommitId} HEAD@{0}: merge ${sourceBranch}`, ...state.reflogHistory];

          return {
              nodes: [...state.nodes, newNode],
              HEAD: mergeCommitId,
              branches: { ...state.branches, [targetBranch]: mergeCommitId },
              staging: [],
              workingDirectory: [],
              reflogHistory: newReflog
          };
      });
  },

  reset: () => {
    set({
      nodes: [],
      HEAD: null,
      branches: {},
      currentBranch: 'main',
      staging: [],
      workingDirectory: [],
      isInitialized: false,
      currentScenarioId: null,
      completedScenarios: [],
      stashes: [],
      isMerging: false,
      conflictedFiles: [],
      tags: {},
    });
  },

  setScenario: (id) => {
    set({ currentScenarioId: id });
  },

  completeScenario: (id) => {
    set((state) => ({
      completedScenarios: state.completedScenarios.includes(id) 
        ? state.completedScenarios 
        : [...state.completedScenarios, id]
    }));
  },

  setTerminalInput: (input) => {
    set({ terminalInput: input });
  },

  stash: () => {
    set((state) => {
      if (state.workingDirectory.length === 0 && state.staging.length === 0) return state;
      const stashContent = [...state.staging, ...state.workingDirectory];
      return {
        stashes: [...state.stashes, stashContent],
        workingDirectory: [],
        staging: []
      };
    });
  },

  stashPop: () => {
    set((state) => {
      if (state.stashes.length === 0) return state;
      const newStashes = [...state.stashes];
      const popped = newStashes.pop() || [];
      return {
        stashes: newStashes,
        workingDirectory: [...new Set([...state.workingDirectory, ...popped])]
      };
    });
  },

  cherryPick: (commitId) => {
    set((state) => {
      const sourceNode = state.nodes.find(n => n.id === commitId || n.id.startsWith(commitId));
      if (!sourceNode || !state.HEAD) return state;

      const newCommitId = generateHash();
      const newNode: GitNode = {
        id: newCommitId,
        message: `${sourceNode.message} (cherry-picked)`,
        parentIds: [state.HEAD],
      };

      const newReflog = [`${newCommitId} HEAD@{0}: cherry-pick`, ...state.reflogHistory];

      return {
        nodes: [...state.nodes, newNode],
        HEAD: newCommitId,
        branches: state.currentBranch !== 'DETACHED' ? { ...state.branches, [state.currentBranch]: newCommitId } : state.branches,
        reflogHistory: newReflog
      };
    });
  },

  resetHard: (commitId) => {
    set((state) => {
      const targetNode = state.nodes.find(n => n.id === commitId || n.id.startsWith(commitId));
      if (!targetNode) return state;

      const newReflog = [`${targetNode.id} HEAD@{0}: reset: moving to ${commitId}`, ...state.reflogHistory];

      return {
        HEAD: targetNode.id,
        branches: state.currentBranch !== 'DETACHED' ? { ...state.branches, [state.currentBranch]: targetNode.id } : state.branches,
        workingDirectory: [],
        staging: [],
        reflogHistory: newReflog
      };
    });
  },

  revert: (commitId) => {
    set((state) => {
      let targetNode = null;
      if (commitId === 'HEAD') {
        targetNode = state.nodes.find(n => n.id === state.HEAD);
      } else {
        targetNode = state.nodes.find(n => n.id === commitId || n.id.startsWith(commitId));
      }
      
      if (!targetNode || !state.HEAD) return state;

      const newCommitId = generateHash();
      const newNode: GitNode = {
        id: newCommitId,
        message: `Revert "${targetNode.message}"`,
        parentIds: [state.HEAD],
      };

      return {
        nodes: [...state.nodes, newNode],
        HEAD: newCommitId,
        branches: state.currentBranch !== 'DETACHED' ? { ...state.branches, [state.currentBranch]: newCommitId } : state.branches,
        workingDirectory: [],
        staging: []
      };
    });
  },

  abortMerge: () => {
    set((state) => ({
      isMerging: false,
      conflictedFiles: [],
      workingDirectory: state.workingDirectory.filter(f => !state.conflictedFiles.includes(f))
    }));
  },

  triggerConflictScenario: () => {
    set((state) => {
      if (!state.HEAD) return state;
      const conflictHash = generateHash();
      const newNode: GitNode = {
         id: conflictHash,
         message: "Simulated conflicting changes",
         parentIds: [state.HEAD]
      };
      return {
         nodes: [...state.nodes, newNode],
         branches: { ...state.branches, 'conflict-branch': conflictHash }
      };
    });
  },

  tag: (name) => {
     set((state) => {
        if (!state.HEAD) return state;
        return {
           tags: { ...state.tags, [name]: state.HEAD }
        }
     });
  },

  fetch: () => {
     set((state) => {
        if (!state.HEAD) return state;
        const fetchHash = generateHash();
        const newNode: GitNode = {
           id: fetchHash,
           message: "Remote commit (fetched)",
           parentIds: [state.branches['origin/main'] || state.HEAD]
        };
        return {
           nodes: [...state.nodes, newNode],
           branches: { ...state.branches, 'origin/main': fetchHash }
        };
     });
  },

  pull: () => {
     get().fetch();
     get().merge('origin/main');
  },

  rebase: (targetBranch) => {
     set((state) => {
        const targetCommitId = state.branches[targetBranch];
        if (!targetCommitId || !state.HEAD) return state;
        
        const newCommitId = generateHash();
        const newNode: GitNode = {
           id: newCommitId,
           message: `Rebased onto ${targetBranch}`,
           parentIds: [targetCommitId]
        };
        
        const newReflog = [`${newCommitId} HEAD@{0}: rebase ${targetBranch}`, ...state.reflogHistory];

        return {
           nodes: [...state.nodes, newNode],
           HEAD: newCommitId,
           branches: { ...state.branches, [state.currentBranch]: newCommitId },
           reflogHistory: newReflog
        };
     });
  },

  amend: (message) => {
     set((state) => {
         if (!state.HEAD) return state;
         const headNode = state.nodes.find(n => n.id === state.HEAD);
         if (!headNode) return state;

         const newCommitId = generateHash();
         const newNode: GitNode = {
             id: newCommitId,
             message,
             parentIds: headNode.parentIds
         };

         const newReflog = [`${newCommitId} HEAD@{0}: amend`, ...state.reflogHistory];

         return {
             nodes: [...state.nodes, newNode],
             HEAD: newCommitId,
             branches: state.currentBranch !== 'DETACHED' ? { ...state.branches, [state.currentBranch]: newCommitId } : state.branches,
             staging: [],
             workingDirectory: [],
             reflogHistory: newReflog
         };
     });
  },

  push: () => {
     set((state) => {
         if (!state.branches['main']) return state;
         return {
             branches: { ...state.branches, 'origin/main': state.branches['main'] }
         };
     });
  },

  resetSoft: (commitId) => {
     set((state) => {
         const targetNode = state.nodes.find(n => n.id === commitId || n.id.startsWith(commitId));
         if (!targetNode) return state;

         const newReflog = [`${targetNode.id} HEAD@{0}: reset: moving to ${commitId}`, ...state.reflogHistory];

         return {
             HEAD: targetNode.id,
             branches: state.currentBranch !== 'DETACHED' ? { ...state.branches, [state.currentBranch]: targetNode.id } : state.branches,
             staging: [...state.staging, 'uncommitted_change.js'], // Simulating uncommitted work being staged
             reflogHistory: newReflog
         };
     });
  },

  squash: (count, message) => {
      set((state) => {
          if (!state.HEAD) return state;
          
          let curr = state.nodes.find(n => n.id === state.HEAD);
          let nodesToSkip = count;
          while (curr && nodesToSkip > 0 && curr.parentIds.length > 0) {
              curr = state.nodes.find(n => n.id === curr!.parentIds[0]);
              nodesToSkip--;
          }
          
          if (!curr) return state;
          
          const newCommitId = generateHash();
          const newNode: GitNode = {
              id: newCommitId,
              message,
              parentIds: curr.parentIds
          };

          const newReflog = [`${newCommitId} HEAD@{0}: squash ${count}`, ...state.reflogHistory];

          return {
             nodes: [...state.nodes, newNode],
             HEAD: newCommitId,
             branches: state.currentBranch !== 'DETACHED' ? { ...state.branches, [state.currentBranch]: newCommitId } : state.branches,
             reflogHistory: newReflog
          };
      });
  },

  restore: (file) => {
     set((state) => {
        if (!state.staging.includes(file)) return state;
        return {
           staging: state.staging.filter(f => f !== file),
           workingDirectory: [...new Set([...state.workingDirectory, file])]
        };
     });
  }
}));
