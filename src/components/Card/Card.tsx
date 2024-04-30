import styles from './Card.module.scss';

export function Card({ children }: { children: React.ReactElement|React.ReactElement[] }) {
  
  return (
    <div className={styles.card}>
      {children}
    </div>
  )
}