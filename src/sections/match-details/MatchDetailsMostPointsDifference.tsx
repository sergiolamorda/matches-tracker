import { Match } from "../../modules/matches/domain/Match"
import { MatchEvent } from "../../modules/matches/domain/MatchEvent"
import { Team } from "../../modules/matches/domain/Team"
import { isMatchEventScored } from "../../modules/matches/domain/MatchEvent";
import { Card } from "../../components/Card/Card";

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

  interface pointsDifferenceEvents {
    pointsDifference: number;
    isLocalTeam: boolean;
    periodId: number;
    minute: number;
    second: number;
  }

  function getPointsDifferenceEvents(match: Match): pointsDifferenceEvents[] {
    const allEvents = match.periods.flatMap((period) => period.events);

    const pointsDifferenceEvents = allEvents.reduce((acc, event) => {
      if (isMatchEventScored(event)) {
        const difference = event.localScore - event.visitorScore;

        acc.push({
          pointsDifference: difference,
          isLocalTeam: event.localScore > event.visitorScore,
          periodId: event.periodId,
          minute: event.minute,
          second: event.second,
        });
      }
      return acc;
    }, [] as pointsDifferenceEvents[]);

    return pointsDifferenceEvents;
  }

  function printChart(pointsDifferenceEvents: pointsDifferenceEvents[], match: Match) {
    const width = 1600;
    const height = 900;
    const axisScalePointsUnit = 5;
    const axisLineColour = '#000000';
    const widthLogoPercentage = 0.1;

    const axisLineStrokeWidth = width / 300;
    const axisLineStrokeWidthSmall = width / 600;
    const xAxisSteps = 11;
    const maxLabelUnit = axisScalePointsUnit * 5;

    console.log(pointsDifferenceEvents);
    const polylinePoints = pointsDifferenceEvents.reduce((acc, pointsDifferenceEvent) => {
      const periodsPercent = 100 / match.periods.length;
      const minutesPercent = periodsPercent / 10;
      const secondsPercent = minutesPercent / 60;

      // Calculate x percentage based on period, minute and second of the event
      const x = periodsPercent * (pointsDifferenceEvent.periodId) - (minutesPercent * pointsDifferenceEvent.minute) - (secondsPercent * pointsDifferenceEvent.second);
      
      // Calculate y percentatge with 0 in the middle of the chart
      const y = pointsDifferenceEvent.pointsDifference * 100 / maxLabelUnit;

      return [...acc, [x, y]];
    }, [[0, 0]]);

    return (
      <svg viewBox={`0 0 ${width} ${height}`}>
        <line
          x1={`${width * 0.1}`}
          y1={`${height * 0.1}`}
          x2={`${width * 0.1}`}
          y2={height * 0.9}
          stroke={axisLineColour}
          strokeWidth={axisLineStrokeWidth}
        />

        {Array.from({ length: xAxisSteps }).map((_, index) => {
          const y = (height * 0.1) + index * (height * 0.8 / (xAxisSteps - 1));
          const label = Math.abs(maxLabelUnit - (index * axisScalePointsUnit));
          return (
            <g key={`axis-y-${index}`}>
              <line
                x1={`${width * 0.1 - (width * 0.005)}`}
                y1={y}
                x2={`${width * 0.1 + (width * 0.005)}`}
                y2={y}
                stroke={axisLineColour}
                strokeWidth={axisLineStrokeWidthSmall}
              />
              <text x={`${width * 0.1 - (width * 0.02)}`} y={y} textAnchor="end" alignmentBaseline="middle">
                +{label}
              </text>
            </g>
          );
        })}

        <line
          x1={`${width * 0.1}`}
          y1={`${height * 0.5}`}
          x2={width * 0.9}
          y2={height * 0.5}
          stroke={axisLineColour}
          strokeWidth={axisLineStrokeWidthSmall}
        />

        <image
          x={width * 0.2 + widthLogoPercentage}
          y={height * 0.1}
          width={width * widthLogoPercentage}
          href={match.localTeam.logo}
          opacity="0.5"
          transform={`translate(-${width * widthLogoPercentage / 2}, 0)`}
        />

        <image
          x={width * 0.2 + widthLogoPercentage}
          y={height * 0.9 - width * widthLogoPercentage }
          width={width * widthLogoPercentage}
          href={match.visitorTeam.logo}
          opacity="0.5"
          transform={`translate(-${width * widthLogoPercentage / 2}, 0)`}
        />

        <polyline
          fill="none"
          stroke="#0074d9"
          strokeWidth="3"
          points={
            polylinePoints
              .map((point) => `${width * 0.1 + (point[0] * (width * 0.8) / 100)} ${height * 0.5 - (point[1] * (height * 0.4) / 100)}`)
                .join(' ')
          }
        />
      </svg>
    )

  }

  return (
    <div className={styles.matchDetailsMostPointsDifference}>
      <div className={styles.matchDetailsMostPointsDifference__chartContainer}>
        <div className={styles.matchDetailsMostPointsDifference__sectionTitle}>
          Diferencia de puntos
        </div>
        {printChart(getPointsDifferenceEvents(match), match)}
      </div>
      <div className={styles.matchDetailsMostPointsDifference__sectionTitle}>
        Mayor diferencia de puntos
      </div>
      <Card>
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
      </Card>
    </div>
  )
}