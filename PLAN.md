# Personal CV Website — Build Plan

## How to rebuild this site

**You only need to provide two things before starting:**
1. `CV_content.md` — your personal data in human-readable form (bio, skills, projects, experience, contact). This is the source document.
2. `Picture_of_me.jpg` — your profile photo, placed in the repo root.

Everything else — the UI, the AI chatbot, the metadata — is built from those two inputs. No other files need personalising.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router (TypeScript) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Geist Sans + Geist Mono (ships with Next.js) |
| AI chatbot | OpenRouter API (`OPENROUTER_API_KEY` in `.env.local`) |
| Testing | Vitest (unit + integration), Playwright (E2E) |
| Deployment | Vercel |

---

## Iteration 0 — Personalise (human step, do this first)

> This is the only iteration that requires human input. All subsequent iterations are for Claude.

1. Fill in `CV_content.md` with your personal data — name, role, location, contact, bio paragraphs, skills, projects, experience, education, and social links.
2. Place your profile photo at `Picture_of_me.jpg` in the repo root.
3. Optionally place your CV PDF at `Salar_Ghotaslo_CV.pdf` in the repo root.

Once these files exist, hand the project to Claude with: *"Follow PLAN.md from Iteration 1."*

---

## Iteration 1 — Scaffold

**Goal:** working Next.js app with correct dependencies and config.

Steps:
1. Run `npx create-next-app@latest` with flags: `--typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
2. Install additional packages: `framer-motion lucide-react`
3. Install dev packages: `vitest @vitejs/plugin-react jsdom @testing-library/react`
4. Create `vitest.config.mts` configured for jsdom environment
5. Create `.env.local` with `OPENROUTER_API_KEY=` and `NEXT_PUBLIC_BASE_URL=http://localhost:3000`
6. Copy `Picture_of_me.jpg` into `public/`
7. Copy CV PDF (rename to `Salar_Ghotaslo_CV.pdf`) into `public/`

**Done when:** `npm run dev` starts without errors and `http://localhost:3000` loads the default Next.js page.

---

## Iteration 2 — Design system

**Goal:** all visual tokens defined; a blank page with the correct background colour confirms it's working.

In `src/app/globals.css`, define CSS custom properties:

```css
:root {
  --background: #0a0a0f;
  --surface:    #111118;
  --border:     #1e1e2e;
  --accent:     #7c6aff;   /* primary purple */
  --accent-2:   #00d4ff;   /* cyan gradient pair */
  --text:       #e8e8f0;
  --muted:      #6b6b80;
}
```

Rules:
- All colours are referenced as `var(--token)` or mapped Tailwind classes — never hardcoded hex values in components
- Design tokens go in `globals.css` only, **not** in `tailwind.config.ts`
- Typography: Geist Sans for headings and body, Geist Mono for code — both configured in `layout.tsx`

**Done when:** `npm run dev` shows a dark (`#0a0a0f`) background.

---

## Iteration 3 — Content and data layer

**Goal:** single source of truth for all personal data, with a serialiser for the AI chatbot.

1. Create `src/lib/content.ts` by reading `CV_content.md` and populating every field:

```ts
export const content = {
  name: string,
  email: string,
  phone: string,
  role: string,
  location: string,
  bio: string[],                 // one paragraph per array item
  stats: {
    yearsOfExperience: number,
    projectsShipped: number,
    technologiesUsed: number,
  },
  skills: { category: string, items: string[] }[],
  projects: {
    name: string,
    description: string,
    tech: string[],
    github: string | null,
    live: string | null,
    featured: boolean,
  }[],
  experience: {
    company: string,
    role: string,
    start: string,
    end: string,
    tech: string[],
    bullets: string[],
  }[],
  education: {
    institution: string,
    qualification: string,
    year: string,
    detail: string,
  }[],
  social: {
    github: string | null,
    linkedin: string | null,
    twitter: string | null,
  },
} as const;
```

2. Add `buildContextFromContent()` in the same file — serialises the object to plain text for the AI system prompt.

3. Create `src/lib/content.test.ts` — unit tests covering:
   - All required fields are present and correctly typed
   - `buildContextFromContent()` output contains name, bio, skills, projects, and experience

**Done when:** `npm run test` passes.

---

## Iteration 4 — Static UI sections

**Goal:** full single-page layout visible in the browser with real content from `content.ts`.

Build each component as a **Server Component** (no `'use client'`). All data comes from `content.ts` imported in `src/app/page.tsx` and passed as props.

| Component | File | Key requirements |
|---|---|---|
| Root layout | `src/app/layout.tsx` | Geist fonts, `<html>` lang, imports Nav and wraps page |
| Nav | `src/components/Nav.tsx` | `'use client'` — sticky, glass-morphism on scroll, anchor links, mobile hamburger |
| Hero | `src/components/Hero.tsx` | Full-viewport, animated headline, two CTAs: *View Projects* + *Chat with my AI* |
| About | `src/components/About.tsx` | Two-column (photo left, bio right), quick-stats row (years / projects / tech), stacks on mobile |
| Skills | `src/components/Skills.tsx` | Tag grid grouped by category, stagger fade-in on scroll |
| Projects | `src/components/Projects.tsx` | Card grid, tech tags, GitHub/live links; featured card spans full row |
| Experience | `src/components/Experience.tsx` | Vertical timeline, bullet points, animated on scroll |
| Contact | `src/components/Contact.tsx` | Email CTA (mailto), social icon row, CV download button |

Page order in `src/app/page.tsx`: Hero → About → Skills → Projects → Experience → Contact

Section IDs for anchor nav: `#about`, `#skills`, `#projects`, `#experience`, `#contact`

Photo: `<Image src="/Picture_of_me.jpg" />` in About — never reference the repo root path.

**Done when:** all sections render with real content, page scrolls smoothly, nav links jump to the correct section, and mobile layout stacks correctly.

---

## Iteration 5 — AI chatbot

**Goal:** floating chat widget that answers questions about the person using streamed AI responses.

### `src/lib/openrouter.ts`
Typed streaming wrapper around the OpenRouter `/v1/chat/completions` endpoint. Must:
- Accept `messages` array and `systemPrompt` string
- Return a `ReadableStream` of text tokens
- Surface API errors cleanly without leaking the API key

### `src/app/api/chat/route.ts`
`POST /api/chat` handler:
- Reads `{ messages }` from the request body; returns `400` if malformed
- Builds the system prompt with `buildContextFromContent()`
- Calls the OpenRouter helper and pipes the stream to the response
- Model: `anthropic/claude-sonnet-4-5` (configurable here)
- Never logs or returns `OPENROUTER_API_KEY`

### `src/components/ChatBot.tsx` (`'use client'`)
Floating widget:
- Fixed bottom-right chat bubble button (Lucide `MessageCircle` icon)
- Opens/closes with a spring animation (Framer Motion)
- Panel size: ~380×520 px
- Shows three suggested starter questions before the first message
- Streams tokens from `/api/chat` into the message list in real time
- Conversation lives in React state — not persisted across page refreshes

### `src/components/ChatMessage.tsx`
Single message bubble — `user` and `assistant` variants.

Add to `src/lib/openrouter.test.ts`:
- Streaming chunks are parsed and emitted correctly
- Network errors are surfaced without crashing

**Done when:** the chat bubble opens, a question can be typed, and a streamed response appears. `npm run test` still passes.

---

## Iteration 6 — Polish and animations

**Goal:** smooth, production-quality motion throughout.

- Hero: headline fades and slides up on page load (Framer Motion, 300 ms)
- Sections: each animates into view on scroll using `useInView` with `once: true`
- Nav: background opacity transitions from transparent to glass-morphism on scroll
- Cards: subtle lift (`translateY`) + border glow on hover via Tailwind `group-hover`
- Chatbot: spring open/close, message bubbles fade in as they arrive
- Mobile: hamburger opens a slide-down full-width menu; all layouts stack cleanly at `sm` breakpoint

**Done when:** scrolling the page shows smooth section reveals, card hovers feel responsive, and mobile layout has no overflow or clipping.

---

## Iteration 7 — Metadata and SEO

**Goal:** correct Open Graph tags and page metadata for social sharing.

In `src/app/layout.tsx`, use Next.js `generateMetadata` or the `metadata` export:
- `title`: `${content.name} — ${content.role}`
- `description`: first sentence of `content.bio[0]`
- `og:title`, `og:description`, `og:image`: `/og-image.png`
- `og:url`: `NEXT_PUBLIC_BASE_URL`
- `canonical`: `NEXT_PUBLIC_BASE_URL`

Create `public/og-image.png` — 1200×630 px, dark background, name + role text.

**Done when:** `npm run build` succeeds and pasting the site URL into a social share preview tool shows the correct title, description, and image.

---

## Iteration 8 — Tests

**Goal:** confidence that nothing in the data or API layer is broken.

| Layer | Tool | Location | What to cover |
|---|---|---|---|
| Unit | Vitest | `src/lib/*.test.ts` | `buildContextFromContent()` output, content schema shape, OpenRouter streaming helper |
| Integration | Vitest | `src/app/api/**/*.test.ts` | `/api/chat` happy path, `400` on bad input, error forwarding, system prompt contains bio + skills |
| E2E | Playwright | `e2e/` | Page loads, section nav, chatbot opens and returns a reply, CV download resolves, mobile layout |

Rules:
- Unit tests must not make real network calls — mock `fetch` at the boundary
- Write tests alongside the code they cover, not after
- `npm run test` must pass before any deploy

**Done when:** `npm run test` is green.

---

## Iteration 9 — Deploy

**Goal:** live production URL on Vercel.

```bash
vercel login                                         # one-time auth
vercel --yes                                         # first deploy (preview)
vercel env add OPENROUTER_API_KEY production         # paste key from .env.local
vercel env add NEXT_PUBLIC_BASE_URL production       # paste the Vercel domain
vercel --prod                                        # promote to production
```

Subsequent deploys: push to `main` — Vercel auto-deploys on every commit.

**Done when:** the live URL loads, the chatbot works, and the CV PDF downloads.

---

## Stretch goals (post-MVP)

- Dark/light theme toggle
- Blog section (MDX-powered)
- Contact form with email delivery (Resend API)
- Project case-study detail pages
- Vercel Analytics (free tier)
- Playwright E2E in CI (GitHub Actions)
