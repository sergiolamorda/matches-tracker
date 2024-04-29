import { MatchRepository } from "../../domain/MatchRepository";
import { Match } from "../../domain/Match";

export function getMatch(repository: MatchRepository, matchId: number): Promise<Match|null> {
  return repository.get(matchId);
}