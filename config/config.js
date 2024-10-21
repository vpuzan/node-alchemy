import dotenv from 'dotenv';

dotenv.config();

const {
  NASA_BASE_URL,
  METEORS_API_URL,
  PHOTOS_ROVER_API_URL,
  NASA_API_KEY,
  PORT,
  SOL,
  CAMERA,
  SENTRY_DSN
} =
  process.env ||
  (() => {
    throw new Error('Missing env keys');
  })();

export const config = {
  port: PORT,
  nasaBaseUrl: NASA_BASE_URL,
  meteorsUrl: `${METEORS_API_URL}?api_key=${NASA_API_KEY}`,
  photoRoverUrl: `${PHOTOS_ROVER_API_URL}`,
  sol: SOL,
  camera: CAMERA,
  dsn: SENTRY_DSN
};
