# Contributing to GitHub Visualizer

Thanks for your interest in contributing! This document explains how to get started.

---

## Local Development Setup

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/Github-Visualizer.git
cd Github-Visualizer

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open http://localhost:3000
```

### Tech You Should Know
- **React** — Components and hooks
- **Next.js** — App Router, file-based routing
- **Three.js / React Three Fiber** — 3D rendering (for visualization work)
- **TypeScript** — Type safety throughout
- **Tailwind CSS** — Utility-first styling

---

## How to Propose Changes

### For Bug Fixes
1. Check if an issue already exists
2. If not, open one describing the bug
3. Fork → Branch → Fix → PR
4. Reference the issue in your PR

### For New Features
1. Open an issue first to discuss the idea
2. Wait for maintainer feedback before coding
3. Keep scope small — one feature per PR

### For Typos/Docs
- Just open a PR directly, no issue needed

---

## Code Style

We don't have a strict style guide, but please:

- **Use TypeScript** — No `any` types unless absolutely necessary
- **Name things clearly** — `fetchRepoTree` > `getData`
- **Keep components small** — Under 150 lines is ideal
- **Use Tailwind** — No inline styles or separate CSS files
- **No comments explaining obvious code** — Code should be self-documenting

### Formatting
We use the default Prettier/ESLint setup. Run before committing:
```bash
npm run lint
```

---

## What Makes a Good PR

✅ **Good PRs:**
- Solve one problem
- Have a clear title: `Fix: Tooltip not showing on hover`
- Include a screenshot if it's visual
- Don't break existing functionality

❌ **PRs that need work:**
- Mix multiple unrelated changes
- Have vague titles: `Update stuff`
- Add console.logs or debug code
- Include commented-out code

---

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx           # Landing page
│   ├── visualize/         # Visualization page
│   ├── learn/             # Git learning page
│   └── privacy/           # Privacy policy
├── features/
│   ├── visualizer/        # 3D treemap components
│   │   ├── CityScene.tsx  # Main 3D canvas
│   │   ├── CityBuilder.tsx # Treemap algorithm
│   │   └── Fetcher.ts     # GitHub API
│   └── learn/             # Git learning components
│       ├── Terminal.tsx   # Terminal simulator
│       └── GraphView.tsx  # Commit graph
└── components/            # Shared UI components
```

---

## Getting Help

- **Stuck?** Open a Discussion (not an Issue)
- **Found a bug?** Open an Issue with reproduction steps
- **Want to chat?** Reach out via GitHub Issues

---

## Recognition

All contributors are added to the README. Significant contributions may be highlighted in release notes.

---

Thanks for helping make GitHub Visualizer better! 🎉
