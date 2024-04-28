
import type { Match, Team, Period, Event, Player, PlayerStatistics } from "../domain/Match";
import { MatchRepository } from "../domain/MatchRepository";

// const ENDPOINT = 'https://api2.acb.com/api/v1/openapilive/PlayByPlay/matchevents';
const ENDPOINT = 'https://api2.acb.com/api/v1/openapilive/PlayByPlay/matchevents?idMatch=103789';
const TOKEN = import.meta.env.VITE_ACB_PUBLIC_TOKEN;

import EXAMPLE_RESPONSE from '../../../response_example.json';

export function createAcbApiMatchRepository(): MatchRepository {
  return {
    get
  }
}

async function get(matchId: number) {
  /*
  const response = await fetch(ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  }).then(response => response.json());
  */

  // console.log(EXAMPLE_RESPONSE);

  /*
  if (!response) {
    return null;
  }
  */

  const response = EXAMPLE_RESPONSE;

  console.log(response);

  const match = mapResponse(response);

  Promise.resolve(match);
}

function mapResponse(response: Array<any>): Match {
  const localTeamEventResponse = response.find((event: any) => event.local);
  const visitorTeamEventResponse = response.find((event: any) => !event.local);

  const localTeam = mapTeamByResponse(localTeamEventResponse);
  const visitorTeam = mapTeamByResponse(visitorTeamEventResponse);

  localTeam.players = mapTeamPlayersByResponse(response, localTeam);
  visitorTeam.players = mapTeamPlayersByResponse(response, visitorTeam);

  console.log(localTeam);
  console.log(visitorTeam);

  return {
    id: response[0].id_match,
    localTeam: localTeam,
    visitorTeam: visitorTeam,
    localScore: 0,
    visitorScore: 0,
    periods: [],
  }
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

    let findedPlayer = players.find((player: Player) => player.id === event.license.id_person);

    if (!findedPlayer) {
      players.push({
        id: event.license.id_person,
        name: event.license.licenseStr,
        nameAbbrev: event.license.licenseAbbrev,
        facePicture: event.license.media.find((media: any) => media?.type === 'foto_de_cara')?.url,
        bodyPicture: event.license.media.find((media: any) => media?.type === 'foto_cuerpo')?.url,
        statistics: mapPlayerStatisticsByEventResponse(event),
      })

      return players;
    }

    if (event.order > findedPlayer.statistics.lastOrder) {
      findedPlayer.statistics = mapPlayerStatisticsByEventResponse(event);
    }

    return players;
  }, [] as Array<Player>)
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