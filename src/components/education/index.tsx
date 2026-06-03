'use client'

import { m } from 'framer-motion'
import { content } from '@/lib/content'
import styles from './Education.module.css'

export default function Education() {
  return (
    <section id="education" className={styles.section}>
      <div className={styles.container}>
        <m.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education
        </m.p>
        <m.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Where I&apos;ve studied
        </m.h2>

        <div className={styles.grid}>
          {content.education.map((edu, i) => (
            <m.div
              key={`${edu.institution}-${i}`}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.qualification}>{edu.qualification}</h3>
                <span className={styles.year}>{edu.year}</span>
              </div>
              <p className={styles.institution}>{edu.institution}</p>
              {edu.detail && <p className={styles.detail}>{edu.detail}</p>}
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
