import { EstimatedDiameter } from '#/dto/estimated_diameter';
import { CloseApproachData } from '#/dto/close_approach_data';

export interface Meteor {
  id: string;
  name: string;
  estimated_diameter: EstimatedDiameter;
  isHazardous: string;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
}
