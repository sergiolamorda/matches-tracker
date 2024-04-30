import { Team } from './Team';
import { Player } from './Player';

const START_MATCH_EVENT_ID = 122;
const START_PERIOD_EVENT_ID = 121;
const WON_JUMP_EVENT_ID = 178;
const LOST_JUMP_EVENT_ID = 179;
const TURNOVER_EVENT_ID = 106;
const STEAL_EVENT_ID = 103;
const THREE_POINTS_SHOT_MISSED_EVENT_ID = 98;
const DEFENSIVE_REBOUND_EVENT_ID = 104;
const TWO_POINTS_SHOT_MADE_EVENT_ID = 93;
const THREE_POINTS_SHOT_MADE_EVENT_ID = 94;
const TWO_POINTS_SHOT_MISSED_EVENT_ID = 97;
const FOUL_NO_FT_EVENT_ID = 159;
const FOUL_RECEIVED_EVENT_ID = 110;
const ASSIST_THREE_POINTS_SHOT_EVENT_ID = 108;
const OFFENSIVE_REBOUND_EVENT_ID = 101;
const ASSIST_TWO_POINTS_SHOT_EVENT_ID = 107;
const FAST_BREAK_TWO_POINTS_EVENT_ID = 130;
const OFFENSIVE_FOUL_EVENT_ID = 109;
const SUBSTITUTION_OUT_EVENT_ID = 115;
const SUBSTITUTION_IN_EVENT_ID = 112;
const BLOCK_RECEIVED_EVENT_ID = 105;
const BLOCK_EVENT_ID = 102;
const FOUL_TWO_FT_EVENT_ID = 161;
const FREE_THROW_MADE_EVENT_ID = 92;
const END_OF_THE_QUARTER_EVENT_ID = 116;
const FREE_THROW_MISSED_EVENT_ID = 96;
const TIMEOUT_EVENT_ID = 113;
const FOUL_ONE_FT_EVENT_ID = 160;
const DUNK_EVENT_ID = 100;
const ASSIST_FOUL_RECEIVED_EVENT_ID = 119;
const FAST_BREAK_THREE_POINTS_EVENT_ID = 131;
const END_MATCH_EVENT_ID = 123;

export interface MatchEvent {
  eventType: number,
  team: Team,
  player: Player | null,
  periodId: number,
  crono: string,
  minute: number,
  second: number,
  localScore: number,
  visitorScore: number,
  description: string,
  localEvent: boolean
}

export function isMatchEventPlayByPlayValid(matchEvent: MatchEvent): boolean {
  switch (matchEvent.eventType) {
    case START_PERIOD_EVENT_ID:
    case WON_JUMP_EVENT_ID:
    case LOST_JUMP_EVENT_ID:
    case TURNOVER_EVENT_ID:
    case STEAL_EVENT_ID:
    case THREE_POINTS_SHOT_MISSED_EVENT_ID:
    case DEFENSIVE_REBOUND_EVENT_ID:
    case TWO_POINTS_SHOT_MADE_EVENT_ID:
    case THREE_POINTS_SHOT_MADE_EVENT_ID:
    case TWO_POINTS_SHOT_MISSED_EVENT_ID:
    case FOUL_NO_FT_EVENT_ID:
    case FOUL_RECEIVED_EVENT_ID:
    case ASSIST_THREE_POINTS_SHOT_EVENT_ID:
    case OFFENSIVE_REBOUND_EVENT_ID:
    case ASSIST_TWO_POINTS_SHOT_EVENT_ID:
    case FAST_BREAK_TWO_POINTS_EVENT_ID:
    case OFFENSIVE_FOUL_EVENT_ID:
    case SUBSTITUTION_OUT_EVENT_ID:
    case SUBSTITUTION_IN_EVENT_ID:
    case BLOCK_RECEIVED_EVENT_ID:
    case BLOCK_EVENT_ID:
    case FOUL_TWO_FT_EVENT_ID:
    case FREE_THROW_MADE_EVENT_ID:
    case END_OF_THE_QUARTER_EVENT_ID:
    case FREE_THROW_MISSED_EVENT_ID:
    case TIMEOUT_EVENT_ID:
    case FOUL_ONE_FT_EVENT_ID:
    case DUNK_EVENT_ID:
    case ASSIST_FOUL_RECEIVED_EVENT_ID:
    case FAST_BREAK_THREE_POINTS_EVENT_ID:
      return true;
    default:
      return false;
  }
}

export function isMatchEventScored(matchEvent: MatchEvent): boolean {
  switch (matchEvent.eventType) {
    case TWO_POINTS_SHOT_MADE_EVENT_ID:
    case THREE_POINTS_SHOT_MADE_EVENT_ID:
    case FREE_THROW_MADE_EVENT_ID:
      return true;
    default:
      return false;
  }
}