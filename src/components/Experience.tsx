'use client'

import { motion } from 'framer-motion'
import { content } from '@/lib/content'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-sm uppercase tracking-widest text-accent mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-fg mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Where I&apos;ve worked
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-subtle md:-translate-x-px" />

          <div className="space-y-12">
            {content.experience.map((exp, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={`${exp.company}-${i}`}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[-4px] md:left-1/2 top-6 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-surface md:-translate-x-1/2" />

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div className="ml-6 md:ml-0 md:w-1/2 bg-background border border-subtle rounded-2xl p-6 hover:border-accent/30 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="text-base font-semibold text-fg">{exp.role}</h3>
                      <span className="text-xs text-muted shrink-0">
                        {exp.start} – {exp.end}
                      </span>
                    </div>
                    <p className="text-sm text-accent mb-4">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2 text-sm text-muted">
                          <span className="text-accent mt-1 shrink-0">›</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
