import styles from './Section.module.scss'

export function Section({ children }: { children: React.ReactElement }) {
  return (
    <section className={styles.section}>
      {children}
    </section>
  )
}