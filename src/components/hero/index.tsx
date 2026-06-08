'use client'

import { useRef, useMemo } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { content } from '@/lib/content'
import styles from './Hero.module.css'

function seededRandom(i: number): number {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function Hero() {
  const openChat = () => window.dispatchEvent(new Event('open-chat'))
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  const stars = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      left: `${seededRandom(i * 2) * 100}%`,
      top: `${seededRandom(i * 2 + 1) * 100}%`,
      width: `${seededRandom(i * 2 + 2) * 3 + 1}px`,
      height: `${seededRandom(i * 2 + 3) * 3 + 1}px`,
      opacity: seededRandom(i * 2 + 4) * 0.5 + 0.2,
      duration: seededRandom(i * 2 + 5) * 3 + 2,
      delay: seededRandom(i * 2 + 6) * 2,
    })), [])

  return (
    <section id="hero" ref={sectionRef} className={styles.section}>
      <div className={styles.bg} />

      <div className={styles.gridBg} />

      <m.div
        className={styles.blobPurple}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        className={styles.blobCyan}
        animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className={styles.stars}>
        {stars.map((s, i) => (
          <m.div
            key={i}
            className={styles.star}
            style={{
              left: s.left,
              top: s.top,
              width: s.width,
              height: s.height,
              opacity: s.opacity,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: s.delay,
            }}
          />
        ))}
      </div>

      <m.div className={styles.content} style={{ opacity: heroOpacity, scale: heroScale }}>
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
            <m.span
              className={styles.ctaGlow}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            View Projects
          </a>
          <button type="button" onClick={openChat} className={styles.secondaryCta}>
            Chat with my AI
          </button>
        </m.div>
      </m.div>

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
