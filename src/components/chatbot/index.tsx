'use client'

import { useState, useRef, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { parseSSEChunk } from '@/lib/openrouter'
import styles from './ChatBot.module.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STARTERS = [
  'What technologies do you work with?',
  'Tell me about your experience',
  'What projects have you built?',
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-chat', handler)
    return () => window.removeEventListener('open-chat', handler)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200)
  }, [open])

  async function send(text: string) {
    if (!text.trim() || streaming) return

    const userMsg: Message = { role: 'user', content: text.trim() }
    const history = [...messages, userMsg]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setStreaming(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok || !res.body) throw new Error('Request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += parseSSEChunk(decoder.decode(value, { stream: true }))
        setMessages([...history, { role: 'assistant', content: accumulated }])
      }
    } catch {
      setMessages([
        ...history,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ])
    } finally {
      setStreaming(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chat"
        className={styles.toggleBtn}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <m.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </m.span>
          ) : (
            <m.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} />
            </m.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={styles.panel}
          >
            <div className={styles.header}>
              <span className={styles.statusDot} />
              <div>
                <p className={styles.headerTitle}>Ask about Salar</p>
                <p className={styles.headerSub}>AI assistant · usually instant</p>
              </div>
            </div>

            <div className={styles.messages}>
              {messages.length === 0 && (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>
                    Ask me anything about Salar&apos;s experience, skills, or projects.
                  </p>
                  <div className={styles.starters}>
                    {STARTERS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className={styles.starterBtn}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`${styles.messageRow} ${
                    m.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant
                  }`}
                >
                  <div
                    className={`${styles.bubble} ${
                      m.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant
                    }`}
                  >
                    {m.content ? (
                      m.content
                    ) : (
                      <span className={styles.dotLoader}>
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className={styles.inputBar}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={streaming}
                placeholder="Ask something…"
                className={styles.input}
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                className={styles.sendBtn}
              >
                <Send size={15} />
              </button>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
