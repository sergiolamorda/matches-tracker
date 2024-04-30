import { Match } from "../../modules/matches/domain/Match"
import { Player } from "../../modules/matches/domain/Player"

import styles from './MatchDetailsPlayerStatsAssists.module.scss'

export function MatchDetailsPlayerStatsAssists({ match }: { match: Match }) {

  function orderPlayersByAssists(players: Player[]) {
    return players.sort((a, b) => b.statistics.asis - a.statistics.asis);
  }

  function renderTable(players: Player[]) {
    return (
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderPlayersByAssists(players).map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.statistics.asis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }


  return (
    <div className={styles.matchDetailsPlayerStatsAssists}>
      {renderTable(match.localTeam.players)}
      {renderTable(match.visitorTeam.players)}
    </div>
  )
}