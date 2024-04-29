import { MatchEvent } from "../../modules/matches/domain/MatchEvent";

import styles from './MatchDetailsPlayByPlayEvents.module.scss'

export function MatchDetailsPlayByPlayEvents({ matchEvents }: { matchEvents: Array<MatchEvent> }) {

  function renderEvent(event: MatchEvent) {
    return (
      <div>
        {event.description}
      </div>
    )
  }

  return (
    <div className={styles.matchDetailsPlayByPlayEvents}>
      {matchEvents.map((matchEvent, index) => (
        <div key={`event-${index}-${matchEvent.periodId}`} className={styles.matchDetailsPlayByPlayEvents__event}>
          <div className={styles.matchDetailsPlayByPlayEvents__eventDescription}>
            {matchEvent.localEvent && renderEvent(matchEvent)}
          </div>
          <div className={styles.matchDetailsPlayByPlayEvents__cronoContainer}>
            <div className={styles.matchDetailsPlayByPlayEvents__crono}>{matchEvent.crono.slice(3)}</div>
            <div className={styles.matchDetailsPlayByPlayEvents__score}>
              {matchEvent.localScore} - {matchEvent.visitorScore}
            </div>            
          </div>
          <div className={styles.matchDetailsPlayByPlayEvents__eventDescription}>
            {!matchEvent.localEvent && renderEvent(matchEvent)}
          </div>
        </div>
      ))}
    </div>
  )
}