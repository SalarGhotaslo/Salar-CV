# Agent Rules — salar_CV

> **Important:** This is Next.js 15 App Router. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Project
Personal website for Salar with an AI chatbot. See `PLAN.md` for the full MVP spec and `CLAUDE.MD` for architecture guidance.

## Rules
- All personal content (bio, skills, projects, experience) lives in `src/lib/content.ts` — never hardcode it in components or the API route
- Server Components by default; only add `'use client'` for state, effects, or browser APIs
- The chatbot system prompt is built at request-time from `content.ts` — do not introduce a vector DB or external knowledge store
- The OpenRouter key is in `.env.local` as `OPENROUTER_API_KEY` — never log or expose it client-side
- Tailwind design tokens (colours, spacing) are CSS custom properties in `globals.css`, not in `tailwind.config.ts`

## Testing
Every non-trivial piece of logic must be covered before it is considered done.

| Layer | Tool | Location | What to cover |
|---|---|---|---|
| Unit | Vitest | `src/lib/*.test.ts` | Pure functions — `buildContextFromContent()`, content schema validation, OpenRouter helper |
| Integration | Vitest + `node-fetch` / `msw` | `src/app/api/**/*.test.ts` | `/api/chat` route — correct system prompt, streaming response, error handling |
| Feature (E2E) | Playwright | `e2e/` | Critical user flows — page loads, section navigation, chatbot opens and returns a streamed reply |

Rules:
- Write tests alongside the code they cover, not after
- Unit tests must not make real network calls — mock `fetch` at the boundary
- Integration tests hit the real Next.js route handler (use `createMocks` or the Next.js test helpers)
- Feature tests run against `npm run dev` (or a preview build) using Playwright
- `npm run test` (Vitest) must pass before any PR is merged; Playwright tests run in CI on every push
