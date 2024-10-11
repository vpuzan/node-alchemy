import express from 'express';
import {getSortedAndFilteredMeteors} from '../use_case/meteors.js';
import Exception from "../exception/exception.js";
import { isBoolean } from '../utils/boolean_utils.js';

const router = express.Router();

router.get('/meteors', async (req, res, next) => {
    try {
        const {startDate, endDate, count, wereDangerousMeteors } = req.query;
        const filteredData = await getSortedAndFilteredMeteors(startDate, endDate, isBoolean(count), isBoolean(wereDangerousMeteors));
        res.json(filteredData);
    } catch (error) {
        next(new Exception(error.status, `Error fetching data: ${error.message}`));
    }
});

export default router;
