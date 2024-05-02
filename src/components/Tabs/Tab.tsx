import styles from './Tab.module.scss'
import { useTabsContext } from './TabsContext'

export function Tab({ 
  label, 
  icon,
  tab,
}: { 
  label: string,
  icon?: React.ReactElement,
  tab: number,
}) {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <div 
      onClick={() => setActiveTab(tab)} 
      className={styles.tab}
      aria-selected={activeTab === tab}
      role="tab"
    >
      {label}
      {icon}
    </div>
  )
}