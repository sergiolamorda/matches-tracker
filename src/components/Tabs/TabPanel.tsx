import { useTabsContext } from "./TabsContext"

export function TabPanel({ children, tab }: { children: React.ReactElement, tab: number }) {
  const { activeTab } = useTabsContext();
  
  return (
    <>
      {activeTab === tab && children}
    </>
  )
}