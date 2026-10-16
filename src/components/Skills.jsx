import { useEffect, useRef } from 'react'
import styles from './Skills.module.css'

const techStack = [
  { cat: 'Frontend', color: '#4facfe', items: [
    { name: 'React.js', level: 95 }, { name: 'JavaScript (ES6+)', level: 92 },
    { name: 'Redux Toolkit', level: 85 },
    { name: 'HTML5 / CSS3', level: 90 }, { name: 'Tailwind CSS', level: 88 },
  ]},
  { cat: 'Backend', color: '#63dca9', items: [
    { name: 'Node.js', level: 93 }, { name: 'Express.js', level: 91 },
    { name: 'REST API Design', level: 90 }, { name: 'JWT / OAuth', level: 85 },
   
  ]},
  { cat: 'Database', color: '#f093fb', items: [
    { name: 'MongoDB', level: 92 }, 
    
    { name: 'Firebase', level: 80 }, { name: 'MySQL', level: 72 },
  ]},
  { cat: 'DevOps & Tools', color: '#fa8231', items: [
    { name: 'Git / GitHub', level: 95 }, 
    { name: 'AWS (EC2, S3)', level: 72 }, 
    { name: 'Postman', level: 92 }, { name: 'Vercel / Netlify', level: 90 },
  ]},
]

const marqueeItems = ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript', 'Docker', 'Redis', 'AWS', 'GraphQL', 'PostgreSQL', 'Tailwind', 'Git']

function useIntersect(ref, cb) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) cb(e.target) })
    }, { threshold: 0.15 })
    const el = ref.current
    if (el) obs.observe(el)
    return () => obs.disconnect()
  }, [])
}

export default function Skills() {
  const sectionRef = useRef(null)
  const barsRef = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-level]').forEach(bar => {
            const lvl = bar.getAttribute('data-level')
            setTimeout(() => { bar.style.width = lvl + '%' }, 200)
          })
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.2 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

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

  return (
    <section id="skills" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-reveal style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <span className={styles.section_num}>02.</span>
          <h2 className={styles.section_title}>Tech Arsenal</h2>
          <p className={styles.section_sub}>Tools & technologies I work with daily</p>
        </div>

        <div className={styles.grid}>
          {techStack.map((group, gi) => (
            <div key={group.cat} className={styles.card} data-reveal style={{ opacity: 0, transform: 'translateY(30px)', transition: `all 0.7s ease ${gi * 0.1}s` }}>
              <div className={styles.card_header}>
                <div className={styles.dot} style={{ background: group.color, boxShadow: `0 0 10px ${group.color}` }} />
                <h3 className={styles.card_title} style={{ color: group.color }}>{group.cat}</h3>
              </div>
              <div className={styles.bars}>
                {group.items.map(item => (
                  <div key={item.name} className={styles.bar_row}>
                    <div className={styles.bar_label}>
                      <span>{item.name}</span>
                      <span className={styles.bar_pct}>{item.level}%</span>
                    </div>
                    <div className={styles.bar_track}>
                      <div
                        className={styles.bar_fill}
                        data-level={item.level}
                        style={{ width: 0, background: `linear-gradient(90deg, ${group.color}88, ${group.color})`, transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.marquee_wrap}>
          <div className={styles.marquee}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={styles.marquee_item}>
                <span className={styles.marquee_dot}>◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
