# Agent Rules — salar_CV

> **Important:** This is Next.js 15 App Router. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Project
Personal website with a floating AI chatbot. See `PLAN.md` for the full iteration-by-iteration build guide and `CLAUDE.md` for architecture and commands.

## Non-negotiable rules

- **All personal content lives in `src/lib/content.ts`** — never hardcode it in components, API routes, or metadata. This is the single source of truth.
- **Never expose `OPENROUTER_API_KEY`** — it lives in `.env.local` only. Do not log it, return it in a response, or import it into any client component.
- **Server Components by default** — only add `'use client'` when you need state, effects, or browser APIs. The only client components at MVP are `ChatBot.tsx` and `Nav.tsx`.
- **Design tokens go in `globals.css` only** — CSS custom properties (`--accent`, `--background`, etc.), not in `tailwind.config.ts`.
- **`npm run test` must pass before any work is considered done** — run it after every non-trivial change.

## Content changes

When updating personal data, edit `src/lib/content.ts` only. If you add a new top-level field, also extend `buildContextFromContent()` in the same file so the chatbot picks it up. Run `npm run test` after.

## Chatbot changes

- API route: `src/app/api/chat/route.ts`
- Streaming helper: `src/lib/openrouter.ts` — do not call OpenRouter directly from the route
- Widget: `src/components/ChatBot.tsx`
- Model is set in `route.ts` — change it there if swapping

## Testing

| Layer | Tool | Location |
|---|---|---|
| Unit | Vitest | `src/lib/*.test.ts` |
| Integration | Vitest | `src/app/api/**/*.test.ts` |
| E2E | Playwright | `e2e/` |

- Write tests alongside the code they cover, not after
- Unit tests must not make real network calls — mock `fetch` at the boundary
