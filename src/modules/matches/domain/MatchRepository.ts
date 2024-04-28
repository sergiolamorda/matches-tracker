import { Match } from "./Match";

export interface MatchRepository {
  get: (matchId: number) => Promise<Match | null>;
}