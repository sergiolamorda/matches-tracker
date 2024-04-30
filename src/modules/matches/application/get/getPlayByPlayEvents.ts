import { MatchEvent } from "../../domain/MatchEvent";
import { isMatchEventPlayByPlayValid } from "../../domain/MatchEvent";

export function getPlayByPlayEvents(matchEvents: Array<MatchEvent>): Array<MatchEvent> {
  return matchEvents.filter((matchEvent: MatchEvent) => isMatchEventPlayByPlayValid(matchEvent));
}
