import { PlayerStatistics } from "./PlayerStatistics";

export interface Player {
  id: number,
  name: string,
  nameAbbrev: string,
  facePicture: string | null,
  bodyPicture: string | null,
  statistics: PlayerStatistics,
  shirtNumber: number,
}