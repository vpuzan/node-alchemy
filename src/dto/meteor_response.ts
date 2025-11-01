import { Meteor } from '#/dto/meteor';

export interface MeteorResponse {
  near_earth_objects: Record<string, Meteor[]>;
  element_count: number;
}
