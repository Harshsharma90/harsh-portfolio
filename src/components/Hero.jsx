import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'
import resumePDF from '../assets/Harsh_Sharma_Resume.pdf'

const roles = ['MERN Stack Developer', 'React Specialist', 'Node.js Engineer', 'Full Stack Builder']

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const canvasRef = useRef(null)

  // Typewriter
  useEffect(() => {
    const target = roles[roleIdx]
    let timeout
    if (!deleting) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
      } else {
        setDeleting(false)
        setRoleIdx(i => (i + 1) % roles.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,220,169,${p.alpha})`
        ctx.fill()
      })
      // Lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(99,220,169,${0.08 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="about" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.noise} />

      <div className={styles.content}>
        <div className={`${styles.greeting} opacity-0 animate-fade-up`}>
          <span className={styles.wave}>👋</span>
          <span>Hello, I'm</span>
        </div>

        <h1 className={`${styles.name} opacity-0 animate-fade-up delay-1`}>
          <span className={styles.name_main}>Harsh</span>
          <span className={styles.name_dot}>.</span>
        </h1>

        <div className={`${styles.role} opacity-0 animate-fade-up delay-2`}>
          <span className={styles.role_prefix}>{'>'} </span>
          <span className={styles.role_text}>{displayed}</span>
          <span className={styles.cursor_blink}>|</span>
        </div>

        <p className={`${styles.bio} opacity-0 animate-fade-up delay-3`}>
          I craft scalable full-stack web applications using the MERN stack.
          Passionate about clean architecture, performant APIs, and pixel-perfect UIs
          that users actually love to use.
        </p>

        <div className={`${styles.actions} opacity-0 animate-fade-up delay-4`}>
          <button className={styles.btn_primary} onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <a href={resumePDF} className={styles.btn_secondary} target="_blank" rel="noreferrer">
            Download CV
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          </a>
        </div>

        <div className={`${styles.socials} opacity-0 animate-fade-up delay-5`}>
          {[
            { name: 'GitHub', href: 'https://github.com/Harshsharma90', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
            { name: 'LinkedIn', href: 'www.linkedin.com/in/harshsharma9050', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
           
          ].map(s => (
            <a key={s.name} href={s.href} className={styles.social} target="_blank" rel="noreferrer" title={s.name}>
              <span style={{ width: 18, height: 18 }}>{s.icon}</span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.scroll_hint}>
        <div className={styles.scroll_line} />
        <span>scroll</span>
      </div>

      <div className={styles.badge_float}>
        <div className={styles.badge_ring}>
          <svg className={styles.badge_text_svg} viewBox="0 0 120 120">
            <defs>
              <path id="circle" d="M 60,60 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
            </defs>
            <text fontSize="10.5" fill="var(--accent)" fontFamily="var(--font-mono)" letterSpacing="2">
              <textPath href="#circle">MERN STACK • FULL STACK • DEVELOPER •</textPath>
            </text>
          </svg>
          <div className={styles.badge_center}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </div>
        </div>
      </div>
    </section>
  )
}
