'use client'

import { type ReactElement } from 'react'
import { motion } from 'framer-motion'
import { Mail, Download } from 'lucide-react'
import { content } from '@/lib/content'
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/icons'
import styles from './Contact.module.css'

type SocialItem = { href: string; Icon: () => ReactElement; label: string }

export default function Contact() {
  const socials = [
    content.social.github && {
      href: content.social.github,
      Icon: () => <GitHubIcon size={18} />,
      label: 'GitHub',
    },
    content.social.linkedin && {
      href: content.social.linkedin,
      Icon: () => <LinkedInIcon size={18} />,
      label: 'LinkedIn',
    },
    content.social.twitter && {
      href: content.social.twitter,
      Icon: () => <XIcon size={18} />,
      label: 'X',
    },
  ].filter(Boolean) as SocialItem[]

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.p>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Get in touch
        </motion.h2>
        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I&apos;m open to new opportunities. Whether you have a question, a project, or just want
          to say hello — my inbox is always open.
        </motion.p>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <a href={`mailto:${content.email}`} className={styles.primaryBtn}>
            <Mail size={16} />
            Say hello
          </a>
          <a href="/Salar_Ghotaslo_CV.pdf" download className={styles.secondaryBtn}>
            <Download size={16} />
            Download CV
          </a>
        </motion.div>

        {socials.length > 0 && (
          <motion.div
            className={styles.socials}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.socialLink}
              >
                <Icon />
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
