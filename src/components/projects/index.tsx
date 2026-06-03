'use client'

import { m } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { content } from '@/lib/content'
import { GitHubIcon } from '@/components/icons'
import styles from './Projects.module.css'

export default function Projects() {
  const featured = content.projects.filter((p) => p.featured)
  const rest = content.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <m.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </m.p>
        <m.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Things I&apos;ve built
        </m.h2>

        <div className={styles.list}>
          {featured.map((p, i) => (
            <m.div
              key={p.name}
              className={styles.featuredCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className={styles.featuredHeader}>
                <div>
                  <span className={styles.featuredBadge}>Featured</span>
                  <h3 className={styles.cardTitle}>{p.name}</h3>
                </div>
                <div className={styles.cardLinks}>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      aria-label="GitHub"
                    >
                      <GitHubIcon size={16} />
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      aria-label="Live site"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              <p className={styles.cardDesc}>{p.description}</p>
              <div className={styles.techList}>
                {p.tech.map((t) => (
                  <span key={t} className={styles.techTag}>
                    {t}
                  </span>
                ))}
              </div>
            </m.div>
          ))}

          {rest.length > 0 && (
            <div className={styles.grid}>
              {rest.map((p, i) => (
                <m.div
                  key={p.name}
                  className={styles.card}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardSmallTitle}>{p.name}</h3>
                    <div className={styles.cardSmallLinks}>
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardSmallLink}
                          aria-label="GitHub"
                        >
                          <GitHubIcon size={16} />
                        </a>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardSmallLink}
                          aria-label="Live site"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className={styles.cardSmallDesc}>{p.description}</p>
                  <div className={styles.techList}>
                    {p.tech.map((t) => (
                      <span key={t} className={styles.techTag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </m.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
