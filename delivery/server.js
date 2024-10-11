import express from 'express';
import {getSortedAndFilteredMeteors} from '../use_case/meteors.js';
import {config} from '../config/config.js';
import Exception from "../exception/exception.js";
import errorHandler from "../exception/error_middleware.js";
import nunjucks from 'nunjucks';

const server = express();

function isBoolean(str) {
    const boolMap = {
        'true': true,
        'false': false,
        'yes': true,
        'no': false,
        '1': true,
        '0': false
    };

    return boolMap[str.toLowerCase()] ?? null;
}

server.get('/meteors', async (req, res, next) => {
    try {
        const {startDate, endDate, count, wereDangerousMeteors } = req.query;
        const filteredData = await getSortedAndFilteredMeteors(startDate, endDate, isBoolean(count), isBoolean(wereDangerousMeteors));
        // res.json(filteredData);
        res.render('meteors.njk', filteredData);
    } catch (error) {
        next(new Exception(error.status, `Error fetching data: ${error.message}`));
    }
});

server.use(errorHandler);

nunjucks.configure('templates', {
    autoescape: true,
    express: server
})

server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
