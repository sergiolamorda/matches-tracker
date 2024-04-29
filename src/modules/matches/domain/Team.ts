import { Player } from "./Player";

export interface Team {
  id: number,
  longName: string,
  abbrevName: string,
  shortName: string,
  logo: string,
  players: Player[],
}