import { Match } from '../../modules/matches/domain/Match';
import { Player } from '../../modules/matches/domain/Player';

import styles  from './MatchDetailsPlayerStatsPoints.module.scss';

export function MatchDetailsPlayerStatsPoints({ match }: { match: Match }) {

  function orderPlayersByPoints(players: Player[]) {
    return players.sort((a, b) => b.statistics.points - a.statistics.points);
  }

  function renderTable(players: Player[]) {
    return (
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>1pt</th>
            <th>2pt</th>
            <th>3pt</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {orderPlayersByPoints(players).map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.statistics.success.onePointShot}</td>
              <td>{player.statistics.success.twoPointsShot}</td>
              <td>{player.statistics.success.threePointsShot}</td>
              <td>{player.statistics.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <div className={styles.matchDetailsPlayerStatsPoints}>
        {renderTable(match.localTeam.players)}
        {renderTable(match.visitorTeam.players)}
      </div>
    </>
  )
};