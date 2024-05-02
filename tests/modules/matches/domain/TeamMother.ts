import { faker } from '@faker-js/faker';
import { Factory } from "fishery";

import { Team } from '../../../../src/modules/matches/domain/Team';

import { PlayerMother } from './PlayerMother';

const TeamFactory = Factory.define<Team>(() => ({
  id: faker.number.int(),
  longName: faker.company.name(),
  abbrevName: faker.word.adjective(),
  shortName: faker.word.adjective(),
  logo: faker.image.urlLoremFlickr({ category: 'abstract' }),
  players: PlayerMother.createList(11),
}));

export const TeamMother = {
  create: (params?: Partial<Team>): Team => TeamFactory.build(params),
};