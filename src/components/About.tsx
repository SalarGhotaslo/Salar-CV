'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { content } from '@/lib/content'

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
    <section id="about" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-sm uppercase tracking-widest text-accent mb-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          About
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-fg mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Who I am
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-full max-w-sm">
              <div
                className="absolute -inset-1 rounded-2xl blur-sm opacity-40"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-glow))' }}
              />
              <div
                className="relative rounded-2xl overflow-hidden w-full"
                style={{ aspectRatio: '1080 / 1853' }}
              >
                <Image
                  src="/Picture_of_me.jpg"
                  alt={content.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center bottom' }}
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4 mb-10">
              {content.bio.map((para, i) => (
                <p key={i} className="text-muted leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-surface border border-subtle rounded-xl p-4 text-center"
                >
                  <p className="text-3xl font-bold text-accent mb-1">{s.value}+</p>
                  <p className="text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
