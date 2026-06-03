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

## Security rules — do not remove or weaken these

| Protection | Where | Rule |
|---|---|---|
| API key | `src/lib/openrouter.ts` | `OPENROUTER_API_KEY` is read server-side only; never import or log it in client code |
| System prompt injection | `src/app/api/chat/route.ts` | Strip any message where `role === "system"` from user-supplied payloads before forwarding |
| Input size | `src/app/api/chat/route.ts` | Max 20 messages per request; each message truncated at 2000 chars |
| Rate limiting | `src/app/api/chat/route.ts` | 15 requests per IP per hour via in-memory map; do not remove |
| Token cost cap | `src/lib/openrouter.ts` | `max_tokens: 500` on every request; do not remove |
| Error leakage | `src/lib/openrouter.ts` + `route.ts` | Log full error server-side (`console.error`); return only a generic message to the client |
| HTTP headers | `next.config.ts` | `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` set globally |
| History size | `src/components/ChatBot.tsx` | Only the last 10 messages are sent per request; do not increase without justification |

## Testing

| Layer | Tool | Location |
|---|---|---|
| Unit | Vitest | `src/lib/*.test.ts` |
| Integration | Vitest | `src/app/api/**/*.test.ts` |
| E2E | Playwright | `e2e/` |

- Write tests alongside the code they cover, not after
- Unit tests must not make real network calls — mock `fetch` at the boundary
