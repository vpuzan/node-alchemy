import { Meteor } from '#/dto/meteor';

export interface ResultObject {
  meteorsData: Record<string, Meteor[]>;
  count?: number;
  wereDangerousMeteors?: Meteor[];
  isWereDangerousMeteors?: boolean;
}