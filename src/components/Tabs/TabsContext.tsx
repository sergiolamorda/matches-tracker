import { createContext, useContext, useState } from "react";

export interface ContextState {
  activeTab: number,
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
}

const TabsContext = createContext({} as ContextState);

export function TabsContextProvider({ children, defaultTab }: { children: React.ReactElement, defaultTab: number }) {
  const [activeTab, setActiveTab] = useState<number>(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export const useTabsContext = () => useContext(TabsContext);