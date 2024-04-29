import styles from './Tabs.module.scss';

export function Tabs({ children }: { children: React.ReactElement | Array<React.ReactElement> }) {
  return (
    <div className={styles.tabs}>
      {children}
    </div>
  )
}