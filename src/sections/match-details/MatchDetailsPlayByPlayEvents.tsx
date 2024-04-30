import { MatchEvent } from "../../modules/matches/domain/MatchEvent";
import { isMatchEventScored } from "../../modules/matches/domain/MatchEvent";
import { Match } from "../../modules/matches/domain/Match";

import styles from './MatchDetailsPlayByPlayEvents.module.scss'
import { Player } from "../../modules/matches/domain/Player";

export function MatchDetailsPlayByPlayEvents({ matchEvents, match }: { matchEvents: Array<MatchEvent>, match: Match}) {
  
  function renderEvent(event: MatchEvent): React.ReactElement | null{
    return (
      <>
        <div>
          {event.description}
          {renderPlayer(event.player)}
        </div>
        <img src={event.team.logo} />
        {/* {event.player?.facePicture && <img src={event.player.facePicture} />} */}
      </>
    )
  }

  function renderPlayer(player: Player | null): React.ReactElement | null{
    if (!player) {
      return null;
    }

    return (
      <>
        &nbsp;{player.nameAbbrev}
      </>
    )
  }

  return (
    <div className={styles.matchDetailsPlayByPlayEvents}>
      {matchEvents.map((matchEvent, index) => (
        <div key={`event-${index}-${matchEvent.periodId}`} className={styles.matchDetailsPlayByPlayEvents__event}>
          <div className={styles.matchDetailsPlayByPlayEvents__eventDescription}>
            <div className={styles.matchDetailsPlayByPlayEvents__eventDescriptionLocalEvent}>
              {matchEvent.localEvent && renderEvent(matchEvent)}
            </div>
          </div>
          <div className={styles.matchDetailsPlayByPlayEvents__cronoContainer}>
            <div className={styles.matchDetailsPlayByPlayEvents__crono}>{matchEvent.crono.slice(3)}</div>
            {isMatchEventScored(matchEvent) && (
              <div className={styles.matchDetailsPlayByPlayEvents__score}>
                {matchEvent.localScore} - {matchEvent.visitorScore}
              </div>
            )}
          </div>
          <div className={styles.matchDetailsPlayByPlayEvents__eventDescription}>
            <div className={styles.matchDetailsPlayByPlayEvents__eventDescriptionVisitorEvent}>
              {!matchEvent.localEvent && renderEvent(matchEvent)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}