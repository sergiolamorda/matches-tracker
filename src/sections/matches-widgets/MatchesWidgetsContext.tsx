import React, { createContext, useState, useEffect, useContext } from "react";

import { MatchWidget } from "../../modules/matches-widgets/domain/MatchWidget";
import { MatchWidgetRepository } from "../../modules/matches-widgets/domain/MatchWidgetRepository";
import { getAllMatchesWidgets } from "../../modules/matches-widgets/application/get-all/getAllMatchesWidgets";
import { createMatchWidget as createMatchWidgetService } from "../../modules/matches-widgets/application/create/createMatchWidget";
import { config } from "../../tracker_config";

export interface ContextState {
  matchesWidgets: MatchWidget[];
  createMatchWidget: (matchWidget: MatchWidget) => void;
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

  const createMatchWidget = ({ id, localLogo, localName, visitorLogo, visitorName }: MatchWidget) => {
    const matchWidget = { id, localLogo, localName, visitorLogo, visitorName } as MatchWidget;
    
    createMatchWidgetService(repository, matchWidget)
      .then(() => {
        setMatchesWidgets([...matchesWidgets, matchWidget]);
      });
  }

  useEffect(() => {
    loadAllMatches();
  }, [repository])

  return (
    <MatchesWidgetsContext.Provider value={{ matchesWidgets, createMatchWidget }}>
      {children}
    </MatchesWidgetsContext.Provider>
  )
}

export const useMatchesWidgetsContext = () => useContext(MatchesWidgetsContext);

