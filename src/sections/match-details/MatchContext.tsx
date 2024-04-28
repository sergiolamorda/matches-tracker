import { createContext, useContext, useState, useEffect } from "react";
import { MatchRepository } from "../../modules/matches/domain/MatchRepository";

export interface ContextState {
  matchRepository: MatchRepository | null,
}

const MatchContext = createContext({} as ContextState);

export function MatchContextProvider({ children, repository }: { children: React.ReactElement, repository: MatchRepository }) {
  const [matchRepository, setMatchRepository] = useState<MatchRepository | null>(null);

  useEffect(() => {
    repository.get(103789).then(repositoryData => {
      console.log(repositoryData)
    })
  }, [repository])



  return (
    <MatchContext.Provider value={{ matchRepository }}>
      {children}
    </MatchContext.Provider>
  )
}

export const useMatchContext = () => useContext(MatchContext);