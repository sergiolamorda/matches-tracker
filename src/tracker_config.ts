import { MatchWidget } from "./modules/matches-widgets/domain/MatchWidget";

export interface TrackerConfig {
  matchesWidgets: Array<MatchWidget>;
}

export const config: TrackerConfig = {
  matchesWidgets: [
    {
      id: 103789,
      localLogo: 'https://static.acb.com/img/www/clubes2024/2324BarcaLogoweb.png',
      localName: 'Barça',
      visitorLogo: 'https://static.acb.com/img/e/53/16/1453195579.png',
      visitorName: 'Joventut'
    }
  ]
}