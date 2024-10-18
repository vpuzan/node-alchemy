import {getPhotos} from '../repository/rover.js';
import {config} from '../config/config.js';
import Exception from '../exception/exception.js';

export const getLatestPhoto = async (apiKey) => {
  const photos = await getPhotos(apiKey);
  if (photos.length === 0) {
    throw new Exception(404, 'No images found for the specified sol');
  }
  photos.sort((a, b) => new Date(a.earth_date) - new Date(b.earth_date));
  return {photoUrl: photos[0].img_src, camera: config.camera};
};
