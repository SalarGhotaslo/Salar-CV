# Personal CV Website

A single-page personal website with a floating AI chatbot that answers questions about the owner in real time. Built with Next.js 15 App Router, Tailwind CSS v4, and Framer Motion.

## Features

- Single scrollable page: Hero → About → Skills → Projects → Experience → Contact
- Floating AI chatbot powered by OpenRouter — streams answers about you based on your content file
- Server Components by default, minimal client-side JS
- Dark-first design with animated sections and glass-morphism nav

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router (TypeScript) |
| Styling | Tailwind CSS v4 + Framer Motion |
| AI | OpenRouter API (`claude-sonnet-4-5` by default) |
| Icons | Lucide React |
| Fonts | Geist Sans + Geist Mono |
| Tests | Vitest (unit + integration) |
| Deployment | Vercel |

---

## Using this as a template

To make this site your own, you only need to change two files:

1. **`src/lib/content.ts`** — replace every field with your personal data (name, bio, skills, projects, experience, contact, social links). The AI chatbot, every UI section, and all page metadata are derived from this file automatically.
2. **`public/Picture_of_me.jpg`** — replace with your own photo (keep the same filename).

Optionally replace `public/Salar_Ghotaslo_CV.pdf` with your own CV PDF.

> If you're rebuilding with Claude Code, see `PLAN.md` — it contains a step-by-step iteration guide. Hand it `CV_content.md` and `Picture_of_me.jpg` and ask it to follow the plan from Iteration 1.

---

## Getting started

**1. Install dependencies**
```bash
npm install
```

**2. Add your OpenRouter API key**
```bash
# create .env.local
OPENROUTER_API_KEY=your_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**3. Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Commands

```bash
npm run dev        # dev server
npm run build      # production build + type check
npm run lint       # ESLint
npm run test       # Vitest unit tests
npm run test:watch # tests in watch mode
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout — fonts, metadata
│   ├── page.tsx              # Home page — assembles all sections
│   ├── globals.css           # Tailwind base + CSS design tokens
│   └── api/chat/route.ts     # POST /api/chat — streaming AI endpoint
├── components/
│   ├── Nav.tsx               # Sticky scroll-aware nav (client)
│   ├── Hero.tsx              # Full-viewport animated hero
│   ├── About.tsx             # Bio + photo + quick stats
│   ├── Skills.tsx            # Tech/skill grid
│   ├── Projects.tsx          # Project cards with tech tags
│   ├── Experience.tsx        # Work history timeline
│   ├── Contact.tsx           # Email, social links, CV download
│   ├── ChatBot.tsx           # Floating chat widget (client)
│   └── ChatMessage.tsx       # Message bubble
└── lib/
    ├── content.ts            # ★ All personal data lives here ★
    ├── content.test.ts       # Schema + serialiser tests
    ├── openrouter.ts         # Typed OpenRouter streaming helper
    └── openrouter.test.ts    # Streaming helper tests
```

---

## Deployment

```bash
vercel login
vercel --yes                                        # preview deploy
vercel env add OPENROUTER_API_KEY production        # add API key
vercel env add NEXT_PUBLIC_BASE_URL production      # add production URL
vercel --prod                                       # promote to production
```

After the first deploy, push to `main` and Vercel auto-deploys.
