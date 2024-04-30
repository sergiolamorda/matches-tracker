import styles from './Tab.module.scss'
import { useTabsContext } from './TabsContext'

export function Tab({ label, tab }: { label: string, tab: number }) {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <div 
      onClick={() => setActiveTab(tab)} 
      className={styles.tab}
      aria-selected={activeTab === tab}
      role="tab"
    >
      {label}
    </div>
  )
}