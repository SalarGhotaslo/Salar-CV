'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { content } from '@/lib/content'
import styles from './About.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function About() {
  const stats = [
    { label: 'Years experience', value: content.stats.yearsOfExperience },
    { label: 'Projects shipped', value: content.stats.projectsShipped },
    { label: 'Technologies', value: content.stats.technologiesUsed },
  ]

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <m.p
          className={styles.eyebrow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          About
        </m.p>
        <m.h2
          className={styles.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Who I am
        </m.h2>

        <div className={styles.grid}>
          <m.div
            className={styles.photoWrap}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.photoFrame}>
              <div className={styles.photoGlow} />
              <div className={styles.photoBox}>
                <Image
                  src="/Picture_of_me.jpg"
                  alt={content.name}
                  fill
                  className={styles.photo}
                  priority
                />
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.bio}>
              {content.bio.map((para, i) => (
                <p key={i} className={styles.bioPara}>
                  {para}
                </p>
              ))}
            </div>

            <div className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statCard}>
                  <p className={styles.statValue}>{s.value}+</p>
                  <p className={styles.statLabel}>{s.label}</p>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
