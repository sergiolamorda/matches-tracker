import { Match } from "../../modules/matches/domain/Match"
import { Player } from "../../modules/matches/domain/Player"
import { Card } from "../../components/Card/Card"	

import styles from './MatchDetailsPlayerStatsAssists.module.scss'

export function MatchDetailsPlayerStatsAssists({ match }: { match: Match }) {

  function orderPlayersByAssists(players: Player[]) {
    return players.sort((a, b) => b.statistics.asis - a.statistics.asis);
  }

  function renderCard(player: Player) {
    return (
      <Card key={`rebound-player-${player.id}`}>
        <div className={styles.matchDetailsPlayerStatsAssists__playerCard}>
          <img src={player.facePicture} alt={player.name} />
          <div className={styles.matchDetailsPlayerStatsAssists__playerInfo}>
            <div className={styles.matchDetailsPlayerStatsAssists__playerName}>{player.name}</div>
            <div className={styles.matchDetailsPlayerStatsAssists__playerRebound}>{player.statistics.asis} Asistencias</div>
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
      <div className={styles.matchDetailsPlayerStatsAssists__cardsContainer}>
        <div className={styles.matchDetailsPlayerStatsAssists__cards}>
          <div className={styles.matchDetailsPlayerStatsAssists__sectionTitle}>
            <img src={match.localTeam.logo} />
            Top 3 jugadores
          </div>
          {orderPlayersByAssists(match.localTeam.players).slice(0, 3).map((player) => renderCard(player))}
        </div>
        <div className={styles.matchDetailsPlayerStatsAssists__cards}>
          <div className={styles.matchDetailsPlayerStatsAssists__sectionTitle}>
          <img src={match.visitorTeam.logo} />
            Top 3 jugadores
          </div>
          {orderPlayersByAssists(match.visitorTeam.players).slice(0, 3).map((player) => renderCard(player))}
        </div>
      </div>
      <div className={styles.matchDetailsPlayerStatsAssists__tablesContainer}>
        <div>
          <div className={styles.matchDetailsPlayerStatsAssists__sectionTitle}>
            <img src={match.localTeam.logo} />
            Todos los jugadores
          </div>
          {renderTable(match.localTeam.players)}
        </div>
        <div>
          <div className={styles.matchDetailsPlayerStatsAssists__sectionTitle}>
            <img src={match.visitorTeam.logo} />
            Todos los jugadores
          </div>
          {renderTable(match.visitorTeam.players)}
        </div>
      </div>
    </div>


    // <div className={styles.matchDetailsPlayerStatsAssists}>
    //   {renderTable(match.localTeam.players)}
    //   {renderTable(match.visitorTeam.players)}
    // </div>
  )
}