import { faker } from '@faker-js/faker';
import { Factory } from "fishery";

import { MatchWidget } from "../../../../src/modules/matches-widgets/domain/MatchWidget";

const MatchWidgetFactory = Factory.define<MatchWidget>(() => ({
  id: faker.number.int(),
  localLogo: faker.image.urlLoremFlickr({ category: 'abstract' }),
  localName: faker.company.name(),
  visitorLogo: faker.image.urlLoremFlickr({ category: 'abstract' }),
  visitorName: faker.company.name(),
}));

export const MatchWidgetMother = {
  create: (params?: Partial<MatchWidget>): MatchWidget => MatchWidgetFactory.build(params),
  createList: (length: number): MatchWidget[] => MatchWidgetFactory.buildList(length),
};