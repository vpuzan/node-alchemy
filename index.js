import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';
import {format} from "date-fns";
import express from "express";

dotenv.config();

const {NASA_API_KEY, NASA_API_URL, PORT} = process.env || (() => {
    throw new Error('Missing env keys');
})();


const server = express();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

const {startDate, endDate} = getWeekRange(new Date());

const apiUrl = `${NASA_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;

const axiosConfig = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false // switch off certificate for testing
    })
};

axios.get(apiUrl, axiosConfig)
    .then(response => {
        const {data} = response;
        console.log('JSON Response:', JSON.stringify(data, null, 2));

        console.log(`Number of asteroids seen from Monday to Friday: ${data?.element_count}`);

        Object.entries(data?.near_earth_objects || {})
            .sort((a, b) => {
                const dateA = new Date(a[0]);
                const dateB = new Date(b[0]);
                return dateA.getTime() - dateB.getTime();
            })
            .forEach(([key, value]) => {
                console.log(`On ${key} there are ${value.length} asteroids near earth.`);
            });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function getMonday(date) {
    var day = date.getDay(),
        diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function getFriday(date) {
    var day = date.getDay(),
        diff = date.getDate() - day + (day <= 4 ? 5 : -2);
    return new Date(date.setDate(diff));
}

function getWeekRange(date) {
    const startDate = format(getMonday(date), "yyyy-MM-dd");
    const endDate = format(getFriday(date), "yyyy-MM-dd");
    return {startDate, endDate};
}
