import {axiosInstance} from '../config/axios_config.js';
import {config} from '../config/config.js';


export const fetchMeteors = async (startDate, endDate) => {
    const params = {
        start_date: startDate,
        end_date: endDate
    };
    const response = await axiosInstance.get(axiosInstance.getUri() + config.meteorsUrl, {params});
    return response.data;
};
