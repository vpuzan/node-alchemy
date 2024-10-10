import axios from 'axios';
import https from 'https';
import dotenv from "dotenv";

dotenv.config({path: './resources/.env'});

const {NASA_API_URL, NASA_API_KEY} = process.env || (() => {
    throw new Error('Missing env keys');
})();

const axiosConfig = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false, // switch off certificate for testing
    }),
};

export const fetchMeteors = async (startDate, endDate) => {
    const apiUrl = `${NASA_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
    const response = await axios.get(apiUrl, axiosConfig);
    return response.data;
};
