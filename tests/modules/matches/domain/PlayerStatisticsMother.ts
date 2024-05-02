import { faker } from '@faker-js/faker';
import { Factory } from "fishery";

import { PlayerStatistics } from '../../../../src/modules/matches/domain/PlayerStatistics';

const PlayerStatisticsFactory = Factory.define<PlayerStatistics>(() => {
  const success = {
    onePointShot: faker.number.int({ max: 20 }),
    twoPointsShot: faker.number.int({ max: 20 }),
    threePointsShot: faker.number.int({ max: 20 }),
  };

  return {
    lastOrder: faker.number.int(),
    success: success,
    tried: {
      onePointShot: success.onePointShot + faker.number.int({ max: 40 }),
      twoPointsShot: success.twoPointsShot + faker.number.int({ max: 40 }),
      threePointsShot: success.threePointsShot + faker.number.int({ max: 40 }),
    },
    asis: faker.number.int({ min: 0, max: 10 }),
    blocks: faker.number.int({ min: 0, max: 10 }),
    personalFouls: faker.number.int({ min: 0, max: 5 }),
    points: success.onePointShot + success.twoPointsShot * 2 + success.threePointsShot * 3,
    receivedFouls: faker.number.int({ min: 0, max: 10 }),
    steals: faker.number.int({ min: 0, max: 10 }),
    totalRebound: faker.number.int({ min: 0, max: 10 }),
    turnovers: faker.number.int({ min: 0, max: 10 }),
  }
});

export const PlayerStatisticsMother = {
  create: (params?: Partial<PlayerStatistics>): PlayerStatistics => PlayerStatisticsFactory.build(params),
};