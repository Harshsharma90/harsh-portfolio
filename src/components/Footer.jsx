import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span style={{ color: 'var(--accent)' }}>&lt;</span>Harsh<span style={{ color: 'var(--accent)' }}>/&gt;</span>
        </div>
        <p className={styles.copy}>
          Designed & Built by <span style={{ color: 'var(--accent)' }}>Harsh</span> · {new Date().getFullYear()}
        </p>
        <p className={styles.stack}>
          React + Vite · MERN Stack Developer
        </p>
      </div>
    </footer>
  )
}
