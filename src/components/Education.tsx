'use client'

import { motion } from 'framer-motion'
import { content } from '@/lib/content'

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-sm uppercase tracking-widest text-accent mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-fg mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Where I&apos;ve studied
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {content.education.map((edu, i) => (
            <motion.div
              key={`${edu.institution}-${i}`}
              className="bg-surface border border-subtle rounded-2xl p-6 hover:border-accent/30 transition-colors"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-base font-semibold text-fg">{edu.qualification}</h3>
                <span className="text-xs text-muted shrink-0">{edu.year}</span>
              </div>
              <p className="text-sm text-accent mb-3">{edu.institution}</p>
              {edu.detail && (
                <p className="text-sm text-muted leading-relaxed">{edu.detail}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
