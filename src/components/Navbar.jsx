import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scroll = id => {
    setOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className={styles.logo_bracket}>&lt;</span>
        <span className={styles.logo_name}>Harsh</span>
        <span className={styles.logo_bracket}>/&gt;</span>
      </div>
      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        {links.map((l, i) => (
          <li key={l} style={{ animationDelay: `${i * 0.05}s` }}>
            <button onClick={() => scroll(l)}>
              <span className={styles.num}>0{i + 1}.</span>{l}
            </button>
          </li>
        ))}
        <li>
          <a href="#contact" className={styles.cta} onClick={e => { e.preventDefault(); scroll('Contact') }}>
            Hire Me
          </a>
        </li>
      </ul>
      <button className={`${styles.hamburger} ${open ? styles.active : ''}`} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
    </nav>
  )
}
