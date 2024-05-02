import Skeleton from "react-loading-skeleton";

import { MatchEvent } from "../../modules/matches/domain/MatchEvent";
import { isMatchEventScored } from "../../modules/matches/domain/MatchEvent";

import styles from './MatchDetailsPlayByPlayEvents.module.scss'
import { Player } from "../../modules/matches/domain/Player";

export function MatchDetailsPlayByPlayEvents({ 
  matchEvents,
}: { 
  matchEvents: Array<MatchEvent>|Array<undefined>,
}) {
  function renderEvent(event: MatchEvent|undefined): React.ReactElement | null{
    return (
      <>
        <div>
          {event ? 
            (
              <>
                {event.description}
                {renderPlayer(event.player)}
              </>
            ) : (
              <Skeleton width={100} height={20} />
            )
          }          
        </div>
        {event ? 
          (
            <img src={event.team.logo} />
          ) : (
            <Skeleton width={20} height={20} />
          )
        }
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
        <div key={`event-${index}-${matchEvent?.periodId || index}`} className={styles.matchDetailsPlayByPlayEvents__event}>
          <div className={styles.matchDetailsPlayByPlayEvents__eventDescription}>
            <div className={styles.matchDetailsPlayByPlayEvents__eventDescriptionLocalEvent}>
              {matchEvent ? 
                (
                  matchEvent.localEvent && renderEvent(matchEvent)
                ) : renderEvent(undefined)
              }
              
            </div>
          </div>
          <div className={styles.matchDetailsPlayByPlayEvents__cronoContainer}>
            <div className={styles.matchDetailsPlayByPlayEvents__crono}>
              {matchEvent ? (
                matchEvent.crono.slice(3)
              ): (
                <Skeleton width={40} />
              )}
            </div>
            {matchEvent && isMatchEventScored(matchEvent) && (
              <div className={styles.matchDetailsPlayByPlayEvents__score}>
                {matchEvent.localScore} - {matchEvent.visitorScore}
              </div>
            )}
          </div>
          <div className={styles.matchDetailsPlayByPlayEvents__eventDescription}>
            <div className={styles.matchDetailsPlayByPlayEvents__eventDescriptionVisitorEvent}>
              {matchEvent ? 
                (
                  !matchEvent.localEvent && renderEvent(matchEvent)
                ) : renderEvent(undefined)
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}