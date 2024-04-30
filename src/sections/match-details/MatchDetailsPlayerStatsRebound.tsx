import { Match } from '../../modules/matches/domain/Match';
import { Player } from '../../modules/matches/domain/Player';

import styles from './MatchDetailsPlayerStatsRebound.module.scss'

export function MatchDetailsPlayerStatsRebound({ match }: { match: Match }) {

  function orderPlayersByRebound(players: Player[]) {
    return players.sort((a, b) => b.statistics.totalRebound - a.statistics.totalRebound);
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
          {orderPlayersByRebound(players).map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.statistics.totalRebound}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className={styles.matchDetailsPlayerStatsRebound}>
      {renderTable(match.localTeam.players)}
      {renderTable(match.visitorTeam.players)}
    </div>
  )
}