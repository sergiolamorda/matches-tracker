import { faker } from '@faker-js/faker';
import { Factory } from "fishery";

import { MatchEvent, EVENTS_IDS } from '../../../../src/modules/matches/domain/MatchEvent';

import { TeamMother } from './TeamMother';
import { PlayerMother } from './PlayerMother';

const fakeDescriptions = [
  'Inicio Periodo',
  'Salto ganado',
  'Intento fallado',
  'Rebote Defensivo',
  'Canasta de 3',
  'Falta recibida',
];

const MatchEventFactory = Factory.define<MatchEvent>(() => {
  const randomDescriptions = Object.values(EVENTS_IDS)
    .map((id) => { return { id, description: fakeDescriptions[faker.number.int({ min: 0, max: fakeDescriptions.length - 1 })] } });

  const randomEventType = Object.values(EVENTS_IDS)[faker.number.int({ min: 0, max: Object.values(EVENTS_IDS).length - 1 })];
  
  return {
    eventType: randomEventType,
    team: TeamMother.create(),
    player: PlayerMother.create(),
    periodId: faker.number.int({ min: 0, max: 0 }),
    crono: `00:0${faker.number.int({ min: 0, max: 9 })}:0${faker.number.int({ min: 0, max: 9 })}`,
    minute: faker.number.int({ min: 0, max: 0 }),
    second: faker.number.int({ min: 0, max: 0 }),
    localScore: faker.number.int({ min: 0, max: 99 }),
    visitorScore: faker.number.int({ min: 0, max: 99 }),
    description: randomDescriptions.find((description) => description.id === randomEventType)?.description || 'Evento',
    localEvent: faker.datatype.boolean()
  } 
});

export const MatchEventMother = {
  create: (params?: Partial<MatchEvent>): MatchEvent => MatchEventFactory.build(params),
  createList: (length: number): MatchEvent[] => MatchEventFactory.buildList(length),
};