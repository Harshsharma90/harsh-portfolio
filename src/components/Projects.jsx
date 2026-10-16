import { useEffect, useRef } from 'react'
import styles from './Projects.module.css'

const projects = [
  {
    title: 'Chatapp',
    desc: 'A real-time chat application built with React (Vite) and Firebase for seamless communication. It supports secure Email/Password login and Continue with Google (OAuth 2.0) authentication. Users can search for registered members and chat in real-time using Firebase Firestore. A fast, responsive, and production-ready chat solution with reliable data sync.',
    tech: ['Html', 'Css', 'JavaScript', 'Firebase', 'React', 'Vite'],
    github: 'https://github.com/Harshsharma90/talktalk',
    live: 'https://baatcheet2.vercel.app/',
    num: '01',
    featured: true,
    color: '#4facfe',
  },
  {
    title: 'TaskFlow',
    desc: 'A modern Todo Web Application built using React and Firebase, featuring secure user authentication with email/password and Google login. Users can efficiently manage their daily tasks by adding, organizing, and setting timers for each task. The app provides timely notifications to ensure productivity and task completion. It also includes a feedback system where users can share their experience and suggestions. Designed with a clean and user-friendly interface for a seamless experience.',
    tech: [  'HTML', 'CSS',' JavaScript',  'React', 'Firebase',  ],
    github: 'https://github.com/Harshsharma90/taskflow-app',
    live: 'https://harshtaskflowapp.vercel.app/',
    num: '02',
    featured: true,
    color: '#63dca9',
  },
  {
    title: 'TaskFlow',
    desc: 'Kanban-style project management app with drag-and-drop, team collaboration, deadlines, email notifications, and detailed analytics dashboard.',
    tech: ['React', 'Express', 'MongoDB', 'JWT', 'Nodemailer'],
    github: 'https://github.com',
    live: 'https://taskflow.demo',
    num: '03',
    featured: true,
    color: '#f093fb',
  },
 
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.08 })
    sectionRef.current?.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-reveal style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <span className={styles.section_num}>03.</span>
          <h2 className={styles.section_title}>Projects</h2>
          <p className={styles.section_sub}>Things I've built with ❤️</p>
        </div>

        <div className={styles.featured}>
          {projects.filter(p => p.featured).map((p, i) => (
            <div
              key={p.num}
              className={`${styles.project_card} ${styles.featured_card}`}
              data-reveal
              style={{ opacity: 0, transform: 'translateY(30px)', transition: `all 0.8s ease ${i * 0.12}s`, '--accent-color': p.color }}
            >
              <div className={styles.card_num}>{p.num}</div>
              <div className={styles.card_content}>
                <div className={styles.card_top}>
                  <h3 className={styles.card_title} style={{ color: p.color }}>{p.title}</h3>
                  <div className={styles.card_links}>
                    <a href={p.github} target="_blank" rel="noreferrer" title="GitHub">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" title="Live Demo">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                      </a>
                    )}
                  </div>
                </div>
                <p className={styles.card_desc}>{p.desc}</p>
                <div className={styles.tech_stack}>
                  {p.tech.map(t => (
                    <span key={t} className={styles.tech_tag}>{t}</span>
                  ))}
                </div>
              </div>
              <div className={styles.card_glow} style={{ background: p.color }} />
            </div>
          ))}
        </div>

    

       
      </div>
    </section>
  )
}
