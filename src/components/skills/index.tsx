'use client'

import { m } from 'framer-motion'
import { content } from '@/lib/content'
import styles from './Skills.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <m.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </m.p>
        <m.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          What I work with
        </m.h2>

        <div className={styles.grid}>
          {content.skills.map((group) => (
            <div key={group.category}>
              <h3 className={styles.categoryTitle}>{group.category}</h3>
              <m.ul
                className={styles.list}
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.items.map((skill) => (
                  <m.li key={skill} variants={item} className={styles.item}>
                    <span className={styles.dot} />
                    {skill}
                  </m.li>
                ))}
              </m.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
