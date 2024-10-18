import {fetchMeteors} from '../repository/nasa.js';
import {setUpDatePeriod} from '../utils/date_utils.js';

function getSortedMeteors(response) {
  return Object.entries(response.near_earth_objects).sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    return dateA.getTime() - dateB.getTime();
  });
}

function createMainInfoEntity(meteor) {
  return {
    id: meteor.id,
    name: meteor.name,
    diameter:
      (meteor.estimated_diameter.meters.estimated_diameter_min +
        meteor.estimated_diameter.meters.estimated_diameter_max) /
      2,
    isHazardous: meteor.is_potentially_hazardous_asteroid,
    closeApproachDate: meteor.close_approach_data[0].close_approach_date_full,
    relativeVelocity:
      meteor.close_approach_data[0].relative_velocity.kilometers_per_second,
  };
}

function filterMeteors(response) {
  return getSortedMeteors(response).reduce((acc, [date, meteors]) => {
    acc[date] = meteors.reduce((acc, meteor) => {
      if (!meteor.close_approach_data || !meteor.close_approach_data[0]) {
        return acc;
      }
      return [...acc, createMainInfoEntity(meteor)];
    }, []);
    return acc;
  }, {});
}

function createResultObject(
  filteredMeteors,
  response,
  count,
  wereDangerousMeteors,
  dangerousMeteors
) {
  const result = {meteorsData: filteredMeteors};
  if (count) {
    result.count = response.element_count;
  }
  if (wereDangerousMeteors) {
    result.wereDangerousMeteors = dangerousMeteors;
    if (dangerousMeteors.length > 0) {
      result.isWereDangerousMeteors = true;
    }
  }
  return result;
}

function getDangerousMeteors(meteorsData) {
  return Object.values(meteorsData)
    .flatMap((meteors) => meteors)
    .filter((meteor) => meteor.isHazardous);
}

export const getSortedAndFilteredMeteors = async (
  startDateQuery,
  endDateQuery,
  count,
  wereDangerousMeteors
) => {
  const {startDate, endDate} = setUpDatePeriod(startDateQuery, endDateQuery);
  const response = await fetchMeteors(startDate, endDate);
  // Filter response
  const filteredMeteors = filterMeteors(response);

  // Filter dangerous meteors
  const dangerousMeteors = getDangerousMeteors(filteredMeteors);

  // Create final result with additional info
  return createResultObject(
    filteredMeteors,
    response,
    count,
    wereDangerousMeteors,
    dangerousMeteors
  );
};
