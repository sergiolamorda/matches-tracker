import { createContext, useContext, useState, useEffect } from "react";
import { MatchRepository } from "../../modules/matches/domain/MatchRepository";
import { getMatch } from "../../modules/matches/application/get/getMatch";
import { Match } from "../../modules/matches/domain/Match";

export interface ContextState {
  getMatch: (matchId: number) => Promise<Match|null>;
}

const MatchContext = createContext({} as ContextState);

export function MatchContextProvider({ children, repository }: { children: React.ReactElement, repository: MatchRepository }) {
  
  async function get(matchId: number): Promise<Match|null> {
    return await getMatch(repository, matchId);
  }

  return (
    <MatchContext.Provider value={{ getMatch: get }}>
      {children}
    </MatchContext.Provider>
  )
}

export const useMatchContext = () => useContext(MatchContext);