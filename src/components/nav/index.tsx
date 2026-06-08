'use client'

import { useState, useEffect } from 'react'
import { m, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { content } from '@/lib/content'
import styles from './Nav.module.css'

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
  const [activeSection, setActiveSection] = useState('')

  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      if (menuOpen) setMenuOpen(false)

      const ids = links.map((l) => l.href.slice(1))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(ids[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
         role="navigation" aria-label="Main navigation">
      <m.div className={styles.progressBar} style={{ scaleX: progressScale }} />

      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          {content.name.split(' ')[0]}
        </a>

        <div className={styles.desktopLinks}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`${styles.link} ${activeSection === l.href.slice(1) ? styles.linkActive : ''}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTopOpen : ''}`} />
          <span className={`${styles.barMiddle} ${menuOpen ? styles.barMiddleHidden : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBottomOpen : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={styles.mobileMenu}
          >
            <div className={styles.mobileLinks}>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`${styles.link} ${activeSection === l.href.slice(1) ? styles.linkActive : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
