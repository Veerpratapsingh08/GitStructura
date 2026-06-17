# GitHub Visualizer

**See your code. Understand your structure.**

A visual developer tool that transforms GitHub repositories into interactive 2.5D treemaps and teaches Git through a hands-on terminal simulator.

![GitHub Visualizer Demo](./docs/screenshots/hero.png)

[**🌐 Live Demo**](https://github-visualizer-olive.vercel.app/) &nbsp;&nbsp; 

---

## What This Does

### 🗺️ Repository Visualization
Paste any GitHub URL and watch it transform into a treemap where:
- **Block height** = file size
- **Block color** = file type (TypeScript is blue, CSS is purple, etc.)
- **Nested rectangles** = folder hierarchy

*🚀 New:* **Private Repository Support!** You can now securely provide a GitHub Personal Access Token (PAT) locally to bypass API rate limits and visualize private repositories.

Hover over any block to see file details. Drag to orbit. Scroll to zoom.

### 🎓 Interactive Git Learning
A built-in terminal simulator where you can practice Git commands and see the commit graph update in real-time. Features a fully custom Git engine supporting **18 interactive scenarios** (including rebase, merge conflicts, detached HEAD, and reflog tracking). No risk of breaking anything—it's all simulated.

---

## Screenshots

| Repository Treemap | Git Learning Terminal |
|-------------------|----------------------|
| ![Treemap](./docs/screenshots/treemap.png) | ![Terminal](./docs/screenshots/terminal.png) |



---

## Philosophy

This project believes in:

- **Visual understanding over raw metrics** — A picture of your codebase tells you more than LOC counts
- **Minimal UI, maximum clarity** — Hide controls until needed, let the visualization speak
- **Learning by interaction** — Type commands, see results, build intuition
- **Exploration over instruction** — No tutorials, just tools to discover

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| 3D Rendering | Three.js + React Three Fiber |
| Styling | Tailwind CSS |
| Language | TypeScript |
| API | GitHub REST API (unauthenticated) |

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/Veerpratapsingh08/Github-Visualizer.git
cd Github-Visualizer/github-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Requirements
- Node.js 18+
- npm 9+

---

## Non-Goals

Things this project intentionally does not do:

- **No backend** — Everything runs client-side
- **No analytics/tracking** — Your data stays securely in your browser
- **No historical analysis** — We show current state, not trends

---

## Known Limitations

- **Rate limiting**: GitHub's unauthenticated API allows ~60 requests/hour. We highly recommend using the optional local PAT input to increase this to 5,000/hour.
- **Large repos**: Repositories with 10,000+ files may take a few seconds to render, though they are highly optimized using Three.js `InstancedMesh`.
- **Mobile**: The 3D view is not optimized for touch devices yet.

---

## Roadmap

### Now
- [x] Treemap visualization
- [x] File type color coding
- [x] Interactive Git terminal
- [x] Commit graph visualization

### Next
- [ ] Export visualization as image
- [ ] Keyboard navigation

### Later
- [ ] Compare two branches visually
- [ ] VS Code extension

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**Good first issues** are labeled `good-first-issue` — these are ideal for newcomers.

### Quick Contribution Ideas
- Add support for a new file type color
- Improve mobile responsiveness
- Add a new Git command to the simulator
- Fix a typo in the UI

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

## Author

**Veer Pratap Singh**  
[Portfolio](https://veerpratapsingh.vercel.app) · [GitHub](https://github.com/Veerpratapsingh08)

---

<p align="center">
  Made with ❤️ for developers who think visually
</p>
