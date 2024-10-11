import dotenv from 'dotenv'

dotenv.config()

const {NASA_API_URL, NASA_API_KEY,PORT} = process.env || (() => {
    throw new Error('Missing env keys');
})();

export const config = {
    port: PORT,
    nasaUrl: `${NASA_API_URL}?api_key=${NASA_API_KEY}`
}
