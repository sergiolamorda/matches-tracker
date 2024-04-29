import { Match } from '../../modules/matches/domain/Match'
import { Section } from '../layout/Section'
import styles from './MatchDetailsHeader.module.scss'

export function MatchDetailsHeader({ match }: { match: Match }) {
  return (
    <Section>
      <div className={styles.matchDetailsHeader}>
        <div className={styles.matchDetailsHeader__logoContainer}>
          <img src={match.localTeam.logo} className={styles.matchDetailsHeader__logo} />
        </div>
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
        <div className={styles.matchDetailsHeader__logoContainer}>
          <img src={match.visitorTeam.logo} className={styles.matchDetailsHeader__logo} />
        </div>
      </div>
    </Section>
  )
}