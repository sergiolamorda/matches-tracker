import { Match } from '../../modules/matches/domain/Match';
import { Player } from '../../modules/matches/domain/Player';
import { Card } from '../../components/Card/Card';
import { PieChart } from '../../components/PieChart/PieChart';

import styles  from './MatchDetailsPlayerStatsPoints.module.scss';

export function MatchDetailsPlayerStatsPoints({ match }: { match: Match }) {
  function orderPlayersByPoints(players: Player[]) {
    return players.sort((a, b) => b.statistics.points - a.statistics.points);
  }

  function renderCard(player: Player) {
    return (
      <Card key={`points-player-${player.id}`}>
        <div className={styles.matchDetailsPlayerStatsPoints__playerCard}>
          <div className={styles.matchDetailsPlayerStatsPoints__playerCardShow}>
            <div className={styles.matchDetailsPlayerStatsPoints__playerCardtitle}>{player.name}</div>
            <div className={styles.matchDetailsPlayerStatsPoints__playerCardPoints}>{player.statistics.points} puntos</div>
            <div className={styles.matchDetailsPlayerStatsPoints__playerCardPicture}>
              {player.bodyPicture && <img src={player.bodyPicture} alt={player.name} />}
            </div>
          </div>
          <div className={styles.matchDetailsPlayerStatsPoints__playerCardStats}>
            <div className={styles.matchDetailsPlayerStatsPoints__playerCardStat}>
              <PieChart
                percentage={player.statistics.success.twoPointsShot / player.statistics.tried.twoPointsShot * 100}
                width={50}
                thickness={3}
                color="black"
              />
              <div className={styles.matchDetailsPlayerStatsPoints__playerCardStatInfoContainer}>
                <div className={styles.matchDetailsPlayerStatsPoints__playerCardStatLabel}>Tiros de campo</div>
                <div>
                  <div className={styles.matchDetailsPlayerStatsPoints__playerCardStatInfo}>
                    {player.statistics.success.twoPointsShot} / {player.statistics.tried.twoPointsShot}
                  
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.matchDetailsPlayerStatsPoints__playerCardStat}>
              <PieChart
                percentage={player.statistics.success.onePointShot / player.statistics.tried.onePointShot * 100}
                width={50}
                thickness={3}
                color="black"
              />
              <div className={styles.matchDetailsPlayerStatsPoints__playerCardStatInfoContainer}>
                <div className={styles.matchDetailsPlayerStatsPoints__playerCardStatLabel}>Tiros libres</div>
                <div>
                  <div className={styles.matchDetailsPlayerStatsPoints__playerCardStatInfo}>
                    {player.statistics.success.onePointShot} / {player.statistics.tried.onePointShot}
                  
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.matchDetailsPlayerStatsPoints__playerCardStat}>
              <PieChart
                percentage={player.statistics.success.threePointsShot / player.statistics.tried.threePointsShot * 100}
                width={50}
                thickness={3}
                color="black"
              />
              <div className={styles.matchDetailsPlayerStatsPoints__playerCardStatInfoContainer}>
                <div className={styles.matchDetailsPlayerStatsPoints__playerCardStatLabel}>Tiros de tres</div>
                <div>
                  <div className={styles.matchDetailsPlayerStatsPoints__playerCardStatInfo}>
                    {player.statistics.success.threePointsShot} / {player.statistics.tried.threePointsShot}
                  
                  </div>
                </div>
              </div>
            </div>
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
    <div className={styles.matchDetailsPlayerStatsPoints}>
      <div className={styles.matchDetailsPlayerStatsPoints__cardsContainer}>
        <div className={styles.matchDetailsPlayerStatsPoints__cards}>
          <div className={styles.matchDetailsPlayerStatsPoints__sectionTitle}>
            <img src={match.localTeam.logo} />
            Top 3 jugadores
          </div>
          {orderPlayersByPoints(match.localTeam.players).slice(0, 3).map((player) => renderCard(player))}
        </div>
        <div className={styles.matchDetailsPlayerStatsPoints__cards}>
          <div className={styles.matchDetailsPlayerStatsPoints__sectionTitle}>
          <img src={match.visitorTeam.logo} />
            Top 3 jugadores
          </div>
          {orderPlayersByPoints(match.visitorTeam.players).slice(0, 3).map((player) => renderCard(player))}
        </div>
      </div>
      <div className={styles.matchDetailsPlayerStatsPoints__tablesContainer}>
        <div>
          <div className={styles.matchDetailsPlayerStatsPoints__sectionTitle}>
            <img src={match.localTeam.logo} />
            Todos los jugadores
          </div>
          {renderTable(match.localTeam.players)}
        </div>
        <div>
          <div className={styles.matchDetailsPlayerStatsPoints__sectionTitle}>
            <img src={match.visitorTeam.logo} />
            Todos los jugadores
          </div>
          {renderTable(match.visitorTeam.players)}
        </div>
      </div>
    </div>
  )
};