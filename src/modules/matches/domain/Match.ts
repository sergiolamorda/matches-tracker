export interface PlayerStatistics {
  lastOrder: number,
  success: {
    onePointShot: number,
    twoPointsShot: number,
    threePointsShot: number,
  },
  tried: {
    onePointShot: number,
    twoPointsShot: number,
    threePointsShot: number,
  },
  asis: number,
  blocks: number,
  personalFouls: number,
  points: number,
  receivedFouls: number,
  steals: number,
  totalRebound: number,
  turnovers: number,
}

export interface Player {
  id: number,
  name: string,
  nameAbbrev: string,
  facePicture: string | null,
  bodyPicture: string | null,
  statistics: PlayerStatistics,
}

export interface Team {
  id: number,
  longName: string,
  abbrevName: string,
  shortName: string,
  logo: string,
  players: Player[],
}

export interface Event {
  team: Team,
  player: Player | null,
  period: Period,
  crono: string,
  minute: number,
  second: number,
  localScore: number,
  visitorScore: number,
}

export interface Period {
  id: number,
  events: Event[]
}

export interface Match {
  id: number,
  localTeam: Team,
  visitorTeam: Team,
  localScore: number,
  visitorScore: number,
  periods: Period[],
}