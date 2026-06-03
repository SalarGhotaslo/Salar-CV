'use client'

import { motion } from 'framer-motion'
import { content } from '@/lib/content'

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
    <section id="skills" className="py-24 px-6 bg-surface scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-sm uppercase tracking-widest text-accent mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-fg mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          What I work with
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-xs uppercase tracking-widest text-muted mb-4">
                {group.category}
              </h3>
              <motion.ul
                className="space-y-2"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.items.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={item}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-subtle text-sm text-fg hover:border-accent/40 transition-colors"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--accent)' }}
                    />
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
