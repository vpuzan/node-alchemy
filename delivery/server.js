import express from 'express';
import {getSortedAndFilteredMeteors} from '../use_case/meteors.js';
import dotenv from "dotenv";

dotenv.config({path: './resources/.env'});

const server = express();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.get('/meteors', async (req, res) => {
    try {
        const filteredData = await getSortedAndFilteredMeteors();
        res.json(filteredData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
});
