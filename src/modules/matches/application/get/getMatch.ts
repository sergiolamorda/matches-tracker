import { MatchRepository } from "../../domain/MatchRepository";

export function getMatch({ repository }: { repository: MatchRepository }) {
  return repository.get();
}