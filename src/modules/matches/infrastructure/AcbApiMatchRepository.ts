import type { Match } from '../domain/Match';
import type { Team } from "../domain/Team";
import type { Period } from "../domain/Period";
import { MatchEvent } from "../domain/MatchEvent";
import type { Player } from "../domain/Player";
import type { PlayerStatistics } from "../domain/PlayerStatistics";
import { MatchRepository } from "../domain/MatchRepository";

const ENDPOINT = 'https://api2.acb.com/api/v1/openapilive/PlayByPlay/matchevents';
const TOKEN = import.meta.env.VITE_ACB_PUBLIC_TOKEN;

// import EXAMPLE_RESPONSE from '../../../response_example.json';

export function createAcbApiMatchRepository(): MatchRepository {
  return {
    get
  }
}

async function get(matchId: number) {
  const response = await fetch(`${ENDPOINT}?idMatch=${matchId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  }).then(response => response.json());

  // const response = EXAMPLE_RESPONSE;
 
  if (!response || response.length === 0) {
    return null;
  }

  const match = mapResponse(response);

  return Promise.resolve(match);
}

function mapResponse(response: Array<any>): Match {
  const localTeamEventResponse = response.find((event: any) => event.local);
  const visitorTeamEventResponse = response.find((event: any) => !event.local);

  const localTeam = mapTeamByResponse(localTeamEventResponse);
  const visitorTeam = mapTeamByResponse(visitorTeamEventResponse);

  localTeam.players = mapTeamPlayersByResponse(response, localTeam);
  visitorTeam.players = mapTeamPlayersByResponse(response, visitorTeam);

  const periods = mapPeriodsByResponse(response, localTeam, visitorTeam)

  const endMatchEvent = getEndMatchEventByResponse(response);

  const match = {
    id: response[0].id_match,
    localTeam: localTeam,
    visitorTeam: visitorTeam,
    localScore: endMatchEvent?.score_local,
    visitorScore: endMatchEvent?.score_visitor,
    periods: periods,
  }

  return match;
}

function mapTeamByResponse(eventResponse: any): Team {
  return {
    id: eventResponse.id_team,
    longName: eventResponse.team.team_actual_name,
    abbrevName: eventResponse.team.team_abbrev_name,
    shortName: eventResponse.team.team_actual_short_name,
    logo: eventResponse.team.media.find((element: any) => element.type === 'logo').url,
    players: [],
  };
}

function mapTeamPlayersByResponse(response: any, team: Team): Array<Player> {
  return response.reduce((players: Array<Player>, event: any) => {
    if (event.id_team !== team.id || event.statistics === null) {
      return players;
    }

    const findedPlayer = players.find((player: Player) => player.id === event.license.id_person);

    if (!findedPlayer) {
      players.push({
        id: event.license.id_person,
        name: event.license.licenseStr,
        nameAbbrev: event.license.licenseAbbrev,
        facePicture: event.license.media.find((media: any) => media?.type === 'foto_de_cara')?.url,
        bodyPicture: event.license.media.find((media: any) => media?.type === 'foto_cuerpo')?.url,
        statistics: mapPlayerStatisticsByEventResponse(event),
        shirtNumber: event.shirt_number,
      })

      return players;
    }

    if (event.order > findedPlayer.statistics.lastOrder) {
      findedPlayer.statistics = mapPlayerStatisticsByEventResponse(event);
    }

    return players;
  }, [] as Array<Player>);
}

function mapPlayerStatisticsByEventResponse(eventResponse: any): PlayerStatistics {
  return {
    lastOrder: eventResponse.order,
    success: {
      onePointShot: eventResponse.statistics['1pt_success'],
      twoPointsShot: eventResponse.statistics['2pt_success'],
      threePointsShot: eventResponse.statistics['3pt_success'],
    },
    tried: {
      onePointShot: eventResponse.statistics['1pt_tried'],
      twoPointsShot: eventResponse.statistics['2pt_tried'],
      threePointsShot: eventResponse.statistics['3pt_tried'],
    },
    asis: eventResponse.statistics.asis,
    blocks: eventResponse.statistics.blocks,
    personalFouls: eventResponse.statistics.personal_fouls,
    points: eventResponse.statistics.points,
    receivedFouls: eventResponse.statistics.received_fouls,
    steals: eventResponse.statistics.steals,
    totalRebound: eventResponse.statistics.total_rebound,
    turnovers: eventResponse.statistics.turnovers,
  }
}

function mapPeriodsByResponse(response: any, localTeam: Team, visitorTeam: Team): Array<Period> {
  return response.reduce((periods: Array<Period>, event: any) => {
    if (!event.period) {
      return periods;
    }

    let period = periods.find((period) => period.id === event.period);

    if (!period) {
      period = {
        id: event.period,
        events: []
      }

      periods.push(period);
    }

    const team = event.local ? localTeam : visitorTeam;

    period.events.push({
      eventType: event.id_playbyplaytype,
      team: team,
      player: team.players.find((player) => player.id === event.license?.id_person) || null,
      periodId: event.period,
      crono: event.crono,
      minute: event.minute,
      second: event.second,
      localScore: event.score_local,
      visitorScore: event.score_visitor,
      description: event.type.description,
      localEvent: event.local
    } as MatchEvent)

    return periods;
  }, [] as Array<Period>);
}

function getEndMatchEventByResponse(response: any): any {
  return response.find((event: any) => event.id_playbyplaytype === 123);
}