import {axiosInstance} from '../config/axios_config.js';
import {config} from '../config/config.js';


export const fetchMeteors = async (startDate, endDate) => {
    const params = {
        start_date: startDate,
        end_date: endDate,
        api_key: config.NASA_API_KEY,
    };
    const response = await axiosInstance.get('feed', {params});
    return response.data;
};
