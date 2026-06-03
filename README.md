# Salar CV — Personal Website

A visually striking personal website with a built-in AI chatbot that answers questions about Salar. Built with Next.js 15 App Router, Tailwind CSS v4, and Framer Motion.

## Features

- Single scrollable page: Hero → About → Skills → Projects → Experience → Contact
- Floating AI chatbot powered by OpenRouter — answers questions about Salar based on `lib/content.ts`
- Streaming chat responses via `/api/chat`
- Server Components by default, minimal client-side JS
- Dark-first design with glass-morphism and animated sections

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS v4 + Framer Motion |
| Language | TypeScript |
| AI | OpenRouter API (claude-sonnet-4-5 by default) |
| Icons | Lucide React |
| Fonts | Geist Sans + Geist Mono |
| Deployment | Vercel |

## Getting Started

**1. Install dependencies**
```bash
npm install
```

**2. Set up environment variables**
```bash
cp .env.example .env.local
```
Add your OpenRouter API key to `.env.local`:
```
OPENROUTER_API_KEY=your_key_here
```

**3. Start the dev server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev        # dev server
npm run build      # production build + type check
npm run lint       # ESLint
npm run test       # Vitest unit tests
npm run test:watch # tests in watch mode
```

## Personalising the Content

All personal data (bio, skills, projects, experience, social links) lives in a single file:

```
src/lib/content.ts
```

Edit this file to update every section of the site and the AI chatbot's knowledge simultaneously. Never hardcode personal content in components.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, nav, footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind base + design tokens
│   └── api/chat/route.ts   # Streaming AI chat endpoint
├── components/
│   ├── Nav.tsx             # Sticky, scroll-aware nav
│   ├── Hero.tsx            # Animated full-viewport hero
│   ├── About.tsx           # Bio + photo
│   ├── Skills.tsx          # Tech/skill grid
│   ├── Projects.tsx        # Project cards
│   ├── Experience.tsx      # Work timeline
│   ├── Contact.tsx         # Email + social links
│   ├── ChatBot.tsx         # Floating chat widget (client)
│   └── ChatMessage.tsx     # Message bubble
└── lib/
    ├── content.ts          # All personal data (single source of truth)
    └── openrouter.ts       # Typed OpenRouter streaming helper
```

## Deployment

Deploy to Vercel with one click or via the CLI:

```bash
npx vercel
```

Add `OPENROUTER_API_KEY` as an environment variable in your Vercel project settings.
