'use client'

import { useState, useEffect } from 'react'
import { content } from '@/lib/content'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

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

        {/* Desktop */}
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
          <a
            href={`mailto:${content.email}`}
            className="text-sm px-4 py-1.5 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-all"
          >
            Hire me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-muted"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1 transition-transform" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current transition-transform" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-subtle px-6 py-4 flex flex-col gap-4">
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
          <a
            href={`mailto:${content.email}`}
            className="text-sm text-accent"
            onClick={() => setMenuOpen(false)}
          >
            Hire me
          </a>
        </div>
      )}
    </nav>
  )
}
