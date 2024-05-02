import { faker } from '@faker-js/faker';
import { Factory } from "fishery";

import { Period } from '../../../../src/modules/matches/domain/Period';

import { MatchEventMother } from './MatchEventMother';

const PeriodFactory = Factory.define<Period>(() => {
  return {
    id: faker.number.int({ min: 1, max: 4 }),
    events: MatchEventMother.createList(100),
  }
});

export const PeriodMother = {
  create: (params?: Partial<Period>): Period => PeriodFactory.build(params),
};