import { MatchWidget } from "./modules/matches-widgets/domain/MatchWidget";

export interface TrackerConfig {
  matchesWidgets: Array<MatchWidget>;
}

export const config: TrackerConfig = {
  matchesWidgets: [
    {
      id: 103789,
    }
  ]
}