import { fetchMeteors } from '#/repository/nasa';
import { setUpDatePeriod } from '#/utils/date_utils';
import { MeteorResponse } from '#/dto/meteor_response';
import { ResultObject } from '#/dto/result_object';
import { Meteor } from '#/dto/meteor';

function getSortedMeteors(response: MeteorResponse): [string, Meteor[]][] {
  return Object.entries(response.near_earth_objects).sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    return dateA.getTime() - dateB.getTime();
  });
}

function createMainInfoEntity(meteor: Meteor) {
  return {
    id: meteor.id,
    name: meteor.name,
    diameter: (meteor.estimated_diameter.meters.estimated_diameter_min + meteor.estimated_diameter.meters.estimated_diameter_max) / 2,
    isHazardous: meteor.is_potentially_hazardous_asteroid,
    closeApproachDate: meteor.close_approach_data[0]?.close_approach_date_full,
    relativeVelocity: meteor.close_approach_data[0]?.relative_velocity.kilometers_per_second,
  };
}

function filterMeteors(response: MeteorResponse) {
  return getSortedMeteors(response).reduce((acc, [date, meteors]) => {
    acc[date] = meteors.reduce((acc: Meteor[], meteor) => {
      if (!meteor.close_approach_data || !meteor.close_approach_data[0]) {
        return acc;
      }
      return [...acc, createMainInfoEntity(meteor)];
    }, []);
    return acc;
  }, {} as Record<string, Meteor[]>);
}

function createResultObject(
  filteredMeteors: Record<string, Meteor[]>,
  response: MeteorResponse,
  count: boolean,
  wereDangerousMeteors: boolean,
  dangerousMeteors: Meteor[]
): ResultObject {
  const result: ResultObject = { meteorsData: filteredMeteors };
  if (count) {
    result.count = response.element_count;
  }
  if (wereDangerousMeteors) {
    if (dangerousMeteors.length > 0) {
      result.wereDangerousMeteors = dangerousMeteors;
      result.isWereDangerousMeteors = true;
    }
  }
  return result;
}

function getDangerousMeteors(meteorsData: Record<string, Meteor[]>): Meteor[] {
  return Object.values(meteorsData)
    .flatMap((meteors) => meteors)
    .filter((meteor) => meteor.isHazardous);
}

export const getSortedAndFilteredMeteors = async (
  startDateQuery: string,
  endDateQuery: string,
  count: boolean,
  wereDangerousMeteors: boolean
): Promise<ResultObject> => {
  const { startDate, endDate } = setUpDatePeriod(startDateQuery, endDateQuery);
  const response: MeteorResponse = await fetchMeteors(startDate, endDate);
  const filteredMeteors = filterMeteors(response);

  const dangerousMeteors = getDangerousMeteors(filteredMeteors);

  return createResultObject(
    filteredMeteors,
    response,
    count,
    wereDangerousMeteors,
    dangerousMeteors
  );
};