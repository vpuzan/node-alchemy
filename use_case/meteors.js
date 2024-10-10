import {fetchMeteors} from '../repository/nasa.js';
import {format} from "date-fns";

const {startDate, endDate} = getWeekRange(new Date());

export const getSortedAndFilteredMeteors = async () => {
    const response = await fetchMeteors(startDate, endDate);
    return mainInfoFilter(response);
};

function getSortedMeteors(response) {
    return Object.entries(response.near_earth_objects).sort((a, b) => {
        const dateA = new Date(a[0]);
        const dateB = new Date(b[0]);
        return dateA.getTime() - dateB.getTime();
    });
}

function mainInfoFilter(response) {
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
    return filteredData;
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

function getMonday(date) {
    let day = date.getDay(),
        diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function getFriday(date) {
    let day = date.getDay(),
        diff = date.getDate() - day + (day <= 4 ? 5 : -2);
    return new Date(date.setDate(diff));
}

function getWeekRange(date) {
    const startDate = format(getMonday(date), "yyyy-MM-dd");
    const endDate = format(getFriday(date), "yyyy-MM-dd");
    return {startDate, endDate};
}
