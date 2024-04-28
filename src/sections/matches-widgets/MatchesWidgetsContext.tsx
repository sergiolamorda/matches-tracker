import React, { createContext, useState, useEffect, useContext } from "react";

import { MatchWidget } from "../../modules/matches-widgets/domain/MatchWidget";
import { MatchWidgetRepository } from "../../modules/matches-widgets/domain/MatchWidgetRepository";
import { getAllMatchesWidgets } from "../../modules/matches-widgets/application/get-all/getAllMatchesWidgets";
import { config } from "../../tracker_config";

export interface ContextState {
  matchesWidgets: MatchWidget[];
}

export const MatchesWidgetsContext = createContext({} as ContextState);

export function MatchesWidgetsContextProvider({
  children,
  repository
}: {
  children: React.ReactElement,
  repository: MatchWidgetRepository,
}) {
  const [matchesWidgets, setMatchesWidgets] = useState<MatchWidget[]>([]);

  const loadAllMatches = () => {
    getAllMatchesWidgets(repository).then((repositoryResponse) => {
      setMatchesWidgets(config.matchesWidgets.concat(repositoryResponse));
    })
  }

  useEffect(() => {
    loadAllMatches();
  }, [repository])

  return (
    <MatchesWidgetsContext.Provider value={{ matchesWidgets }}>
      {children}
    </MatchesWidgetsContext.Provider>
  )
}

export const useMatchesWidgetsContext = () => useContext(MatchesWidgetsContext);

