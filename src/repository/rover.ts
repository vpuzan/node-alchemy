import {axiosInstance} from '#/config/axios_config';
import {configApp} from '#/config/config';

export const getPhotos = async (apiKey: string) => {
  const params = {
    api_key: apiKey,
    sol: configApp.sol,
    camera: configApp.camera,
  };

  const response = await axiosInstance.get(
    axiosInstance.getUri() + configApp.photoRoverUrl,
    {params}
  );
  return response.data.photos;
};
