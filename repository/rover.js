import {axiosInstance} from '../config/axios_config.js';

import {config} from "../config/config.js";

export const getPhotos = async (apiKey) => {
    const params = {
        api_key: apiKey,
        sol: config.sol,
        camera: config.camera
    };

    const response = await axiosInstance.get(axiosInstance.getUri() + config.photoRoverUrl, {params});
    return response.data.photos;

}