# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important:** This is Next.js 15 App Router. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## What this project is

Personal website — a single scrollable page with a floating AI chatbot that answers questions about the owner. See `PLAN.md` for the full build spec and iteration guide.

## If you are building this from scratch

Read `PLAN.md` and follow the iterations in order, starting at **Iteration 1**. Before you start, confirm that the human has completed **Iteration 0** (filled in `CV_content.md` and placed `Picture_of_me.jpg` in the repo root).

## Commands

```bash
npm run dev        # start dev server (http://localhost:3000)
npm run build      # production build + type check
npm run lint       # ESLint
npm run test       # Vitest unit tests
npm run test:watch # tests in watch mode
```

Run a single test file:
```bash
npx vitest run src/lib/openrouter.test.ts
```

## Architecture

### Single source of truth
`src/lib/content.ts` holds all personal data. Every UI section and the AI chatbot system prompt are derived from it — never hardcode personal content (name, bio, skills, projects, experience, contact) in components, API routes, or metadata.

To update content: edit `src/lib/content.ts` only. Nothing else needs changing.

### AI chatbot
- **Route:** `POST /api/chat` (`src/app/api/chat/route.ts`) — streaming endpoint
- **Provider:** OpenRouter (`OPENROUTER_API_KEY` in `.env.local` — never expose client-side)
- **Helper:** `src/lib/openrouter.ts` — typed SSE streaming wrapper
- System prompt is built at request-time by `buildContextFromContent()` — no vector DB
- `ChatBot.tsx` is a `'use client'` floating widget; conversation lives in React state only

### Component model
- Server Components by default; only add `'use client'` for state, effects, or browser APIs
- `ChatBot.tsx` and `Nav.tsx` are the only client components
- All sections receive data as props from `src/app/page.tsx`, which imports `content.ts`

### Routing
Single route (`/`) with anchor-based scroll navigation — no multi-page routing.

### Styling
Tailwind CSS v4 + Framer Motion. Design tokens are CSS custom properties in `src/app/globals.css` — **not** in `tailwind.config.ts`. Reference them via `var(--token-name)`.

## Code conventions

- `@/` path alias for all `src/` imports
- Helpers and their types go in `src/lib/`
- Add tests in `src/lib/*.test.ts` alongside any new utility function
- `npm run test` must pass before any deploy or PR merge
- Unit tests must not make real network calls — mock `fetch` at the boundary
