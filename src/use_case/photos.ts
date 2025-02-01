import { getPhotos } from '#/repository/rover';
import { configApp } from '#/config/config';
import Exception from '#/exception/exception';
import { Photo } from '#/dto/rover_photo';

export const getLatestPhoto = async (apiKey: string): Promise<{ photoUrl: string, camera: string }> => {
  const photos: Photo[] = await getPhotos(apiKey);
  if (photos.length === 0) {
    throw new Exception(404, 'No images found for the specified sol');
  }
  photos.sort((a, b) => new Date(a.earth_date).getTime() - new Date(b.earth_date).getTime());
  return {
    photoUrl: photos[0].img_src,
    camera: configApp.camera!
  };
};