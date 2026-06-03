'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { content } from '@/lib/content'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      if (menuOpen) setMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#111118]/80 backdrop-blur-md border-b border-subtle'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-fg font-semibold tracking-tight">
          {content.name.split(' ')[0]}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-fg transition-colors"
            >
              {l.label}
            </a>
          ))}
          {/* <a
            href={`mailto:${content.email}`}
            className="text-sm px-4 py-1.5 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-all"
          >
            Hire me
          </a> */}
        </div>

        {/* Animated hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-muted"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-current transition-transform duration-300 origin-center ${
              menuOpen ? 'translate-y-[6px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current my-1 transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-transform duration-300 origin-center ${
              menuOpen ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Animated mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-surface border-b border-subtle"
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted hover:text-fg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              {/* <a
                href={`mailto:${content.email}`}
                className="text-sm text-accent font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Hire me
              </a> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
