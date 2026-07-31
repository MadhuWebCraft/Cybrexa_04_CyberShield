# CyberShield Agent Guide

## Project Overview

CyberShield is a responsive cyber threat intelligence dashboard designed as a portfolio-grade Security Operations Center interface. It uses React, TypeScript, TanStack Start, Vite, Tailwind CSS, Framer Motion, Recharts, and Lucide icons, and is configured for Netlify deployment.

## Architecture

- `src/routes/` contains the TanStack file routes and root metadata shell.
- `src/pages/DashboardPage.tsx` composes the complete dashboard experience and global interface state.
- `src/components/` contains navigation, intelligence workflows, charts, and map visualizations.
- `src/data/mockData.ts` centralizes editable placeholder intelligence, CVE, glossary, map, and news data.
- `src/services/threatService.ts` contains simulated threat feed and indicator-enrichment logic.
- `src/hooks/` contains reusable React hooks such as animated counters.
- `src/types/` defines shared domain models; `src/utils/` contains formatting helpers.
- `src/styles.css` defines the visual system, responsive behavior, and animation states.

## Conventions

- Use PascalCase for React components and camelCase for utilities, hooks, and state.
- Keep domain data outside components and type all shared records.
- Prefer semantic HTML and include accessible labels for icon-only controls.
- Reuse the CSS variables in `src/styles.css` instead of introducing one-off colors.
- Keep motion focused on transform and opacity, and respect reduced-motion preferences.
- Treat data in `src/data/mockData.ts` as demonstration content that can later be replaced by API responses.

## Non-obvious Decisions

- The project uses TanStack Start on top of React and Vite because the Netlify dashboard starter supplies production routing and deployment integration.
- News imagery and the world map are original CSS/SVG visualizations, avoiding remote or copyrighted image assets.
- IP and domain lookups are intentionally deterministic simulations; no indicator is transmitted externally.
- Settings remain client-local for this demonstration and do not require persistent storage.

## Commands

- `pnpm dev` starts local development.
- `pnpm build` creates the production bundle.

Do not commit generated build output or secrets.
