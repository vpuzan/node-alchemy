import express from 'express';
import {getSortedAndFilteredMeteors} from '../use_case/meteors.js';
import Exception from "../exception/exception.js";
import {isBoolean} from '../utils/boolean_utils.js';
import {getLatestPhoto} from "../use_case/photos.js";

const router = express.Router();

router.get('/meteors', async (req, res, next) => {
    try {
        const {startDate, endDate, count, wereDangerousMeteors} = req.query;
        const filteredData = await getSortedAndFilteredMeteors(startDate, endDate, isBoolean(count), isBoolean(wereDangerousMeteors));
        res.render('../templates/meteors.njk', filteredData);
    } catch (error) {
        next(new Exception(error.status, `Error fetching data: ${error.message}`));
    }
});

router.post('/rover-photo', async (req, res, next) => {
    try {
        const {userId, userName, userApiKey} = req.body;
        const {photoUrl, camera} = await getLatestPhoto(userApiKey);
        return res.render('../templates/photo.njk', {userId, userName, photoUrl, camera});
    } catch (error) {
        next(new Exception(error.status, `Failed to get the latest photo from rover due to: ${error.message}`))
    }
})

export default router;
