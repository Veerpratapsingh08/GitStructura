# Project Hygiene

To keep the GitHub Visualizer project maintainable, educational, and focused, we adhere to the following strict standards.

## Repository Structure

- `src/app`: Contains Next.js app router pages and layouts.
- `src/components`: Reusable UI and 3D components.
- `src/store`: Zustand state management stores.
- `public`: Static assets like textures, models, and fonts.
- `docs`: Internal documentation (this folder).

## Naming Conventions

- **Components:** PascalCase (e.g., `CommitNode.tsx`).
- **Functions/Variables:** camelCase (e.g., `fetchUserData`).
- **CSS Classes/Tailwind:** Keep inline or use clsx/tailwind-merge for dynamic classes.
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_NODES`).

## Semantic CSS & Styling

- We use Tailwind CSS. Stick to the configured theme colors in `tailwind.config.ts` (or `@theme` in CSS).
- Avoid arbitrary values (e.g., `w-[31px]`) unless absolutely necessary.
- Ensure proper contrast ratios for accessibility.

## Anti-Feature-Creep Framework

To ensure the project stays focused on visualization and doesn't become bloated:
1. **Does it improve visualization or understanding of GitHub data?** If no, reject.
2. **Is it a core feature or an edge case?** Prioritize core features.
3. **Does it overly complicate the 3D scene?** Keep performance in mind.

## Coding Rules

- Use TypeScript strictly. No `any`.
- Keep 3D logic separated from UI overlay logic where possible.
- Lint your code before committing (`npm run lint`).
