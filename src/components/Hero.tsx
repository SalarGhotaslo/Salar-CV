'use client'

import { motion } from 'framer-motion'
import { content } from '@/lib/content'

export default function Hero() {
  const openChat = () => window.dispatchEvent(new Event('open-chat'))

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-accent/10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-[#00d4ff]/10 pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl">
        <motion.p
          className="text-sm uppercase tracking-widest text-muted mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content.location}
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-fg mb-5 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hi, I&apos;m{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent-glow))' }}
          >
            {content.name.split(' ')[0]}
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-muted mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {content.role}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-all hover:shadow-[0_0_24px_rgba(124,106,255,0.45)]"
          >
            View Projects
          </a>
          <button
            type="button"
            onClick={openChat}
            className="px-8 py-3 rounded-full border border-subtle text-fg font-medium hover:border-accent/50 hover:bg-surface transition-all"
          >
            Chat with my AI
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-0.5 h-10"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
