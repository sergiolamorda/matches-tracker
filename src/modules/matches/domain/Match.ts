import { Team } from './Team';
import { Period } from './Period';

export interface Match {
  id: number,
  localTeam: Team,
  visitorTeam: Team,
  localScore: number,
  visitorScore: number,
  periods: Period[],
}