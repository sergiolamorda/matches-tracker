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