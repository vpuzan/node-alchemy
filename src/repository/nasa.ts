import {axiosInstance} from '#/config/axios_config';
import {configApp} from '#/config/config';

export const fetchMeteors = async (startDate: string, endDate: string) => {
  const params = {
    start_date: startDate,
    end_date: endDate,
  };
  const response = await axiosInstance.get(
    axiosInstance.getUri() + configApp.meteorsUrl,
    {params}
  );
  return response.data;
};
