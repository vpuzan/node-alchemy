import {fetchMeteors} from '../repository/nasa.js';
import {format} from "date-fns";

export const getSortedAndFilteredMeteors = async (startDateQuery, endDateQuery, count, wereDangerousMeteors) => {
    let {startDate, endDate} = setUpDatePeriod(startDateQuery, endDateQuery);
    const response = await fetchMeteors(startDate, endDate);
    let filteredMeteorData = mainInfoFilter(response);
    pushMeteorsCount(count, filteredMeteorData, response);
    pushDengerousMeteors(wereDangerousMeteors, filteredMeteorData);
    return filteredMeteorData;
};

function getDangerousMeteors(meteorsData) {
    const dangerousMeteors = [];
    for (const [date, meteors] of Object.entries(meteorsData)) {
        meteors.forEach(meteor => {
            if (meteor.isHazardous) {
                dangerousMeteors.push(meteor);
            }
        });
    }

    return dangerousMeteors;
}

function getSortedMeteors(response) {
    return Object.entries(response.near_earth_objects).sort((a, b) => {
        const dateA = new Date(a[0]);
        const dateB = new Date(b[0]);
        return dateA.getTime() - dateB.getTime();
    });
}

function mainInfoFilter(response, count, wereDangerousMeteors) {
    const filteredData = {};

    for (const [date, meteors] of getSortedMeteors(response)) {
        filteredData[date] = meteors.reduce((acc, meteor) => {
            if (!meteor.close_approach_data || !meteor.close_approach_data[0]) {
                return acc;
            }
            return [
                ...acc,
                createMainInfoEntity(meteor)
            ];

        }, []);
    }
    return {meteorsData: filteredData, count};
}

function createMainInfoEntity(meteor) {
    return {
        id: meteor.id,
        name: meteor.name,
        diameter: (meteor.estimated_diameter.meters.estimated_diameter_min + meteor.estimated_diameter.meters.estimated_diameter_max) / 2,
        isHazardous: meteor.is_potentially_hazardous_asteroid,
        closeApproachDate: meteor.close_approach_data[0].close_approach_date_full,
        relativeVelocity: meteor.close_approach_data[0].relative_velocity.kilometers_per_second
    };
}

function getFirstDayOfWeek(date, firstDayOfWeek = 1) {
    const day = date.getDay();
    let diff = day - firstDayOfWeek;
    if (diff < 0) {
        diff -= 7;
    }
    return new Date(date.setDate(date.getDate() - diff));
}
function getLastDayOfWeek(date, lastDayOfWeek = 6) {
    const day = date.getDay();
    let diff = lastDayOfWeek - day;
    if (diff <= 0) {
        diff += 7;
    }
    return new Date(date.setDate(date.getDate() + diff));
}

function getWeekRange(date) {
    const startDate = format(getFirstDayOfWeek(date), "yyyy-MM-dd");
    const endDate = format(getLastDayOfWeek(date), "yyyy-MM-dd");
    return {startDate, endDate};
}

function pushMeteorsCount(count, filteredMeteorData, response) {
    if (Boolean(count)) {
        filteredMeteorData.count = response.element_count;
    }
}

function pushDengerousMeteors(wereDangerousMeteors, filteredMeteorData) {
    if (Boolean(wereDangerousMeteors)) {
        filteredMeteorData.wereDangerousMeteors = getDangerousMeteors(filteredMeteorData.meteorsData);
        if (filteredMeteorData.wereDangerousMeteors.length > 0) {
            filteredMeteorData.isWereDangerousMeteors = true;
        }
    }
}

function setUpDatePeriod(startDateQuery, endDateQuery) {
    let {startDate, endDate} = getWeekRange(new Date());
    if (startDateQuery) {
        startDate = startDateQuery;
    }
    if (endDateQuery) {
        endDate = endDateQuery;
    }
    return {startDate, endDate};
}
