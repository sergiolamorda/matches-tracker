import styles from './Container.module.scss';

export function Container({ children }: { children: React.ReactElement }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}