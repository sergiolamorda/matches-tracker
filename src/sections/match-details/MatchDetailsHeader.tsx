import { Match } from '../../modules/matches/domain/Match'
import { Section } from '../layout/Section'
import { PieChart } from '../../components/PieChart/PieChart'
import styles from './MatchDetailsHeader.module.scss'
import { Team } from '../../modules/matches/domain/Team'

export function MatchDetailsHeader({ match }: { match: Match }) {
  
  function getTeamPointsStats(team: Team): {
    triedShots: {
      onePointShot: number,
      twoPointsShot: number,
      threePointsShot: number,
      total: number,
    },
    succesShots: {
      onePointShot: number,
      twoPointsShot: number,
      threePointsShot: number,
      total: number,
    },
  } {
    const triedShots = team.players.reduce((acc, player) => {
      return {
        onePointShot: acc.onePointShot + player.statistics.tried.onePointShot,
        twoPointsShot: acc.twoPointsShot + player.statistics.tried.twoPointsShot,
        threePointsShot: acc.threePointsShot + player.statistics.tried.threePointsShot,
        total: acc.total + player.statistics.tried.onePointShot + player.statistics.tried.twoPointsShot + player.statistics.tried.threePointsShot,
      }
    }, { onePointShot: 0, twoPointsShot: 0, threePointsShot: 0, total: 0 });

    const succesShots = team.players.reduce((acc, player) => {
      return {
        onePointShot: acc.onePointShot + player.statistics.success.onePointShot,
        twoPointsShot: acc.twoPointsShot + player.statistics.success.twoPointsShot,
        threePointsShot: acc.threePointsShot + player.statistics.success.threePointsShot,
        total: acc.total + player.statistics.success.onePointShot + player.statistics.success.twoPointsShot + player.statistics.success.threePointsShot,
      }
    }, { onePointShot: 0, twoPointsShot: 0, threePointsShot: 0, total: 0 });

    return { triedShots, succesShots }
  }

  function renderTeamStats(team: Team) {
    const teamPointsStats = getTeamPointsStats(team);
    const chartThickness = 3;
    

    return (
      <div className={styles.matchDetailsHeader__stats}>
        <h3>Estadísticas de tiros</h3>
        <div className={styles.matchDetailsHeader__statContainer}>
          <div className={styles.matchDetailsHeader__statContainerPie}>
            <PieChart 
              percentage={teamPointsStats.succesShots.twoPointsShot / teamPointsStats.triedShots.twoPointsShot * 100}
              width={60} 
              thickness={chartThickness} 
              color="white"
            />
          </div>
          <div>
            <div className={styles.matchDetailsHeader__statTitle}>Tiros de campo</div>
            <div className={styles.matchDetailsHeader__statValue}>{teamPointsStats.succesShots.twoPointsShot} / {teamPointsStats.triedShots.twoPointsShot}</div>
          </div>
        </div>
        <div className={styles.matchDetailsHeader__statContainer}>
          <div className={styles.matchDetailsHeader__statContainerPie}>
            <PieChart 
              percentage={teamPointsStats.succesShots.onePointShot / teamPointsStats.triedShots.onePointShot * 100}
              width={60} 
              thickness={chartThickness} 
              color="white"
            />
          </div>
          <div>
            <div className={styles.matchDetailsHeader__statTitle}>Tiros libres</div>
            <div className={styles.matchDetailsHeader__statValue}>{teamPointsStats.succesShots.onePointShot} / {teamPointsStats.triedShots.onePointShot}</div>
          </div>
        </div>
        <div className={styles.matchDetailsHeader__statContainer}>
          <div className={styles.matchDetailsHeader__statContainerPie}>
            <PieChart 
              percentage={teamPointsStats.succesShots.threePointsShot / teamPointsStats.triedShots.threePointsShot * 100}
              width={60} 
              thickness={chartThickness} 
              color="white"
            />
          </div>
          <div>
            <div className={styles.matchDetailsHeader__statTitle}>Tiros de tres</div>
            <div className={styles.matchDetailsHeader__statValue}>{teamPointsStats.succesShots.threePointsShot} / {teamPointsStats.triedShots.threePointsShot}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Section>
      <div className={styles.matchDetailsHeader}>
        <div className={styles.matchDetailsHeader__logoContainer}>
          <img src={match.localTeam.logo} className={styles.matchDetailsHeader__logo} />
        </div>
        <div className={styles.matchDetailsHeader__detailsContainer}>
          {renderTeamStats(match.localTeam)}
          <div className={styles.matchDetailsHeader__scoreContainer}>
            <div className={styles.matchDetailsHeader__scoreTeamContainer}>
              <img src={match.localTeam.logo} className={styles.matchDetailsHeader__scoreLogo} />
              <div>{match.localTeam.abbrevName}</div>
            </div>
            <div className={styles.matchDetailsHeader__scorePoints}>{match.localScore}</div>
            <div className={styles.matchDetailsHeader__matchStatus}>FINAL</div>
            <div className={styles.matchDetailsHeader__scorePoints}>{match.visitorScore}</div>
            <div className={styles.matchDetailsHeader__scoreTeamContainer}>
              <img src={match.visitorTeam.logo} className={styles.matchDetailsHeader__scoreLogo} />
              <div>{match.visitorTeam.abbrevName}</div>
            </div>
          </div>
          {renderTeamStats(match.visitorTeam)}
        </div>
        <div className={styles.matchDetailsHeader__logoContainer}>
          <img src={match.visitorTeam.logo} className={styles.matchDetailsHeader__logo} />
        </div>
      </div>
    </Section>
  )
}