import { useEffect, useRef, useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.1 })
    sectionRef.current?.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  // ✅ REPLACED: fake setTimeout → real Formspree fetch
  const submit = async e => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/movnbeaw', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams(form),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 3000) // reset after 3s
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.bg_glow} />
      <div className={styles.container}>
        <div className={styles.header} data-reveal style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <span className={styles.section_num}>05.</span>
          <h2 className={styles.section_title}>Let's Work Together</h2>
          <p className={styles.section_sub}>
            Open to full-time roles, freelance projects & exciting collaborations.
            Drop me a message — I respond within 24 hours.
          </p>
        </div>

        <div className={styles.layout}>
          <div className={styles.info} data-reveal style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease 0.1s' }}>
            <div className={styles.info_card}>
              <div className={styles.info_icon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div className={styles.info_label}>Email</div>
                <a href="mailto:ishusharmaa8516@gmail.com" className={styles.info_value}>ishusharmaa8516@gmail.com</a>
              </div>
            </div>
            <div className={styles.info_card}>
              <div className={styles.info_icon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div className={styles.info_label}>Location</div>
                <div className={styles.info_value}>India (Open to Remote)</div>
              </div>
            </div>
            <div className={styles.info_card}>
              <div className={styles.info_icon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <div className={styles.info_label}>Availability</div>
                <div className={styles.info_value} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className={styles.status_dot} />
                  Open to Opportunities
                </div>
              </div>
            </div>
            <div className={styles.socials}>
              {[
                { label: 'GitHub', href: 'https://github.com/Harshsharma90' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/harshsharma9050' },
              ].map(s => (
                <a key={s.label} href={s.href} className={styles.social_link} target="_blank" rel="noreferrer">
                  {s.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                </a>
              ))}
            </div>
          </div>

          <form className={styles.form} onSubmit={submit} data-reveal style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease 0.2s' }}>
            <div className={styles.form_row}>
              <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input name="name" value={form.name} onChange={handle} required placeholder="John Doe" className={styles.input} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input name="email" type="email" value={form.email} onChange={handle} required placeholder="john@example.com" className={styles.input} />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Message</label>
              <textarea name="message" value={form.message} onChange={handle} required placeholder="Tell me about your project..." className={styles.textarea} rows={6} />
            </div>

            {status === 'error' && (
              <p style={{ color: 'red', fontSize: '14px', margin: '0 0 8px' }}>
                Something went wrong. Please try again or email directly.
              </p>
            )}

            <button type="submit" className={styles.submit} disabled={status === 'sending'}>
              {status === 'sending' ? (
                <span className={styles.loading}>Sending...</span>
              ) : status === 'sent' ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Message Sent!
                </>
              ) : (
                <>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}