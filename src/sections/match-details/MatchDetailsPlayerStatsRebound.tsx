import { Match } from '../../modules/matches/domain/Match';
import { Player } from '../../modules/matches/domain/Player';
import { Card } from '../../components/Card/Card';

import styles from './MatchDetailsPlayerStatsRebound.module.scss'

export function MatchDetailsPlayerStatsRebound({ match }: { match: Match }) {

  function orderPlayersByRebound(players: Player[]) {
    return players.sort((a, b) => b.statistics.totalRebound - a.statistics.totalRebound);
  }

  function renderCard(player: Player) {
    return (
      <Card key={`rebound-player-${player.id}`}>
        <div className={styles.matchDetailsPlayerStatsRebound__playerCard}>
          {player.facePicture && <img src={player.facePicture} alt={player.name} />}
          <div className={styles.matchDetailsPlayerStatsRebound__playerInfo}>
            <div className={styles.matchDetailsPlayerStatsRebound__playerName}>{player.name}</div>
            <div className={styles.matchDetailsPlayerStatsRebound__playerRebound}>{player.statistics.totalRebound} Rebotes</div>
          </div>
        </div>
      </Card>
    )
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
      <div className={styles.matchDetailsPlayerStatsRebound__cardsContainer}>
        <div className={styles.matchDetailsPlayerStatsRebound__cards}>
          <div className={styles.matchDetailsPlayerStatsRebound__sectionTitle}>
            <img src={match.localTeam.logo} />
            Top 3 jugadores
          </div>
          {orderPlayersByRebound(match.localTeam.players).slice(0, 3).map((player) => renderCard(player))}
        </div>
        <div className={styles.matchDetailsPlayerStatsRebound__cards}>
          <div className={styles.matchDetailsPlayerStatsRebound__sectionTitle}>
          <img src={match.visitorTeam.logo} />
            Top 3 jugadores
          </div>
          {orderPlayersByRebound(match.visitorTeam.players).slice(0, 3).map((player) => renderCard(player))}
        </div>
      </div>
      <div className={styles.matchDetailsPlayerStatsRebound__tablesContainer}>
        <div>
          <div className={styles.matchDetailsPlayerStatsRebound__sectionTitle}>
            <img src={match.localTeam.logo} />
            Todos los jugadores
          </div>
          {renderTable(match.localTeam.players)}
        </div>
        <div>
          <div className={styles.matchDetailsPlayerStatsRebound__sectionTitle}>
            <img src={match.visitorTeam.logo} />
            Todos los jugadores
          </div>
          {renderTable(match.visitorTeam.players)}
        </div>
      </div>
    </div>
  )
}