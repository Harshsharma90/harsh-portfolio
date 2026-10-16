import { useEffect, useRef, useState } from 'react'
import styles from './Experience.module.css'

const experiences = [
  {
    company: 'Algonive',
    role: 'React Developer',
    period: 'Apr 2026 – Present',
    type: 'Full-time',
    points: [
      'Built dynamic and responsive user interfaces using React and modern JavaScript',
      'Implemented authentication using Firebase (email/password and Google login)',
      'Integrated Firebase services like Firestore for database and real-time data handling',
      'Collaborated on development, debugging, and enhancing overall user experience',
    ],
  },
 
  {
    company: 'Jaypay It Solutions Pvt. Ltd.',
    role: 'Frontend Developer',
    period: 'Apr 2022 – May 2023',
    type: 'Internship',
    points: [
      'Develops responsive and user-friendly interfaces using HTML, CSS, and JavaScript',
      'Builds dynamic web applications with modern frameworks like React',
      'Ensures cross-browser compatibility and optimized performance',
      'Collaborates with backend developers to integrate APIs and improve user experience',
    ],
  },
]

export default function Experience() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)

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

  const exp = experiences[active]

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-reveal style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <span className={styles.section_num}>04.</span>
          <h2 className={styles.section_title}>Experience</h2>
          <p className={styles.section_sub}>Where I've shipped production code</p>
        </div>

        <div className={styles.layout} data-reveal style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease 0.1s' }}>
          <div className={styles.tabs}>
            {experiences.map((e, i) => (
              <button
                key={e.company}
                className={`${styles.tab} ${active === i ? styles.tab_active : ''}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.tab_company}>{e.company}</span>
                <span className={styles.tab_period}>{e.period}</span>
              </button>
            ))}
            <div className={styles.tab_indicator} style={{ transform: `translateY(${active * 100}%)` }} />
          </div>

          <div className={styles.content}>
            <div className={styles.role_header}>
              <h3 className={styles.role_title}>{exp.role}</h3>
              <span className={styles.at}>@</span>
              <span className={styles.company}>{exp.company}</span>
              <span className={styles.badge}>{exp.type}</span>
            </div>
            <div className={styles.period}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {exp.period}
            </div>
            <ul className={styles.points}>
              {exp.points.map((pt, i) => (
                <li key={i} className={styles.point} style={{ animationDelay: `${i * 0.08}s` }}>
                  <span className={styles.point_arrow}>▹</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
