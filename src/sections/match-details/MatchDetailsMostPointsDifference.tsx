import { Match } from "../../modules/matches/domain/Match"
import { MatchEvent } from "../../modules/matches/domain/MatchEvent"
import { Team } from "../../modules/matches/domain/Team"
import { isMatchEventScored } from "../../modules/matches/domain/MatchEvent";

import styles from './MatchDetailsMostPointsDifference.module.scss';

interface MostPointsDifference {
  pointsDifference: number;
  team: Team | null;
  crono: string;
  periodId: number;
  localScore: number;
  visitorScore: number;
}

export function MatchDetailsMostPointsDifference({ match }: { match: Match }) {

  function getMostPointsDifference(match: Match): MostPointsDifference[] {
    const allEvents = match.periods.flatMap((period) => period.events);

    const pointsDifferences = allEvents.reduce((acc, event) => {
      if (isMatchEventScored(event)) {
        const difference = Math.abs(event.localScore - event.visitorScore);

        acc.push({
          pointsDifference: difference,
          team: event.localScore > event.visitorScore ? event.team : event.team,
          crono: event.crono,
          periodId: event.periodId,
          localScore: event.localScore,
          visitorScore: event.visitorScore,
        });
      }
      return acc;
    }, [] as MostPointsDifference[]);

    const highestPointsDifference = pointsDifferences.reduce((acc, pointsDifference) => {
      if (pointsDifference.pointsDifference > acc.pointsDifference) {
        return pointsDifference;
      }
      return acc;
    }, { pointsDifference: 0, team: null, crono: '', periodId: 0 } as MostPointsDifference);

    return pointsDifferences.filter((pointsDifference) => pointsDifference.pointsDifference === highestPointsDifference.pointsDifference);
  }

  return (
    <div className={styles.matchDetailsMostPointsDifference}>
      <table>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Parte</th>
            <th>Tiempo</th>            
            <th>Puntos de diferencia</th>
          </tr>
        </thead>
        <tbody>
          {getMostPointsDifference(match).map((pointsDifference, index) => (
            <tr key={`points-difference-${index}`}>
              <td>
                <div className={styles.matchDetailsMostPointsDifference__team}>
                  <img src={pointsDifference.team?.logo} /> 
                  <div>{pointsDifference.team?.longName}</div>
                </div>
              </td>
              <td>{pointsDifference.periodId}</td>
              <td>{pointsDifference.crono.slice(3)}</td>              
              <td>+{pointsDifference.pointsDifference} <small>({pointsDifference.localScore} - {pointsDifference.visitorScore})</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}