import { faker } from '@faker-js/faker';
import { Factory } from "fishery";

import { MatchWidget } from "../../../../src/modules/matches-widgets/domain/MatchWidget";

const MatchWidgetFactory = Factory.define<MatchWidget>(() => ({
  id: faker.number.int(),
}));

export const MatchWidgetMother = {
  create: (params?: Partial<MatchWidget>): MatchWidget => MatchWidgetFactory.build(params),
  createList: (length: number): MatchWidget[] => MatchWidgetFactory.buildList(length),
};