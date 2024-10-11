import dotenv from 'dotenv'

dotenv.config()

const {NASA_API_URL, NASA_API_KEY,PORT} = process.env || (() => {
    throw new Error('Missing env keys');
})();

export const config = {
    port: PORT,
    NASA_API_KEY: NASA_API_KEY,
    nasaUrl: `${NASA_API_URL}`
}
