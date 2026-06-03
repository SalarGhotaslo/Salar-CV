'use client'

import { m } from 'framer-motion'
import { content } from '@/lib/content'
import styles from './Hero.module.css'

export default function Hero() {
  const openChat = () => window.dispatchEvent(new Event('open-chat'))

  return (
    <section id="hero" className={styles.section}>
      <div className={styles.bg} />
      <div className={styles.blobPurple} />
      <div className={styles.blobCyan} />

      <div className={styles.content}>
        <m.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content.location}
        </m.p>

        <m.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hi, I&apos;m{' '}
          <span className={styles.gradientName}>{content.name.split(' ')[0]}</span>
        </m.h1>

        <m.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {content.role}
        </m.p>

        <m.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="#projects" className={styles.primaryCta}>
            View Projects
          </a>
          <button type="button" onClick={openChat} className={styles.secondaryCta}>
            Chat with my AI
          </button>
        </m.div>
      </div>

      <m.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <m.div
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </m.div>
    </section>
  )
}
