# Architecture

## What is GitHub Visualizer?

GitHub Visualizer is a minimalist, 3D web application designed to help users visualize their GitHub activity, repositories, and connections in an immersive environment.

## Tech Stack

- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS, Framer Motion for 2D animations
- **3D Rendering:** Three.js, React Three Fiber (@react-three/fiber), React Three Drei (@react-three/drei)
- **State Management:** Zustand

## Core Features

- **Profile Visualization:** Rendering a 3D representation of a user's GitHub contribution graph.
- **Repository Mapping:** Displaying repositories as nodes in a 3D space.
- **Interactive UI:** A clean, accessible overlay to control and interact with the 3D scene.

## Target Audience

Developers, open-source maintainers, and tech enthusiasts who want a more engaging way to view and share their open-source contributions.

## Future Roadmap

- OAuth integration to load real-time user data.
- More visualization modes (e.g., commit history timelines, network graphs for repository forks/stars).
- Exportable high-quality renders of the visualizer.
