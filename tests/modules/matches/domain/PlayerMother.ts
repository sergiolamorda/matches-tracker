import { faker } from '@faker-js/faker';
import { Factory } from "fishery";

import { Player } from '../../../../src/modules/matches/domain/Player';

import { PlayerStatisticsMother } from './PlayerStatisticsMother';

const PlayerFactory = Factory.define<Player>(() => ({
  id: faker.number.int(),
  name: faker.person.fullName(),
  nameAbbrev: faker.person.firstName(),
  facePicture: faker.image.urlLoremFlickr({ category: 'abstract' }),
  bodyPicture: faker.image.urlLoremFlickr({ category: 'abstract' }),
  statistics: PlayerStatisticsMother.create(),
  shirtNumber: faker.number.int({ min: 1, max: 99 }),
}));

export const PlayerMother = {
  create: (params?: Partial<Player>): Player => PlayerFactory.build(params),
  createList: (length: number): Player[] => PlayerFactory.buildList(length),
};