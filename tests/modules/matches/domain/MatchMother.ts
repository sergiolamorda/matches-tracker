import { faker } from '@faker-js/faker';
import { Factory } from "fishery";

import { Match } from '../../../../src/modules/matches/domain/Match';
import { Period } from '../../../../src/modules/matches/domain/Period';

import { TeamMother } from './TeamMother';
import { PeriodMother } from './PeriodMother';

const MatchFactory = Factory.define<Match>(() => {
  const localTeam = TeamMother.create();
  const visitorTeam = TeamMother.create();

  const periods = [] as Array<Period>;
  for (let i = 0; i < 4; i++) {
    periods.push(PeriodMother.create({ id: i + 1 }));
  }

  periods.forEach((period) => {
    period.events.forEach((event) => {
      const team = event.localEvent ? localTeam : visitorTeam;
      const player = team.players[faker.number.int({ min: 0, max: team.players.length - 1 })];

      event.periodId = period.id;
      event.team = team;
      event.player = player;
    });
  });

  return {
    id: faker.number.int(),
    localTeam: localTeam,
    visitorTeam: visitorTeam,
    localScore: faker.number.int(),
    visitorScore: faker.number.int(),
    periods: periods,
  }
});

export const MatchMother = {
  create: (params?: Partial<Match>): Match => MatchFactory.build(params),
};