'use client'

import { m } from 'framer-motion'
import { content } from '@/lib/content'
import styles from './Experience.module.css'

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <m.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </m.p>
        <m.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Where I&apos;ve worked
        </m.h2>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          <div className={styles.entries}>
            {content.experience.map((exp, i) => {
              const isEven = i % 2 === 0
              return (
                <m.div
                  key={`${exp.company}-${i}`}
                  className={`${styles.entry} ${isEven ? '' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className={styles.dot} />
                  <div className={styles.spacer} />

                  <div className={styles.card}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.role}>{exp.role}</h3>
                      <span className={styles.dates}>
                        {exp.start} – {exp.end}
                      </span>
                    </div>
                    <p className={styles.company}>{exp.company}</p>
                    {exp.tech.length > 0 && (
                      <div className={styles.techList}>
                        {exp.tech.map((t) => (
                          <span key={t} className={styles.techTag}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <ul className={styles.bullets}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} className={styles.bullet}>
                          <span className={styles.bulletIcon}>›</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
