import express from 'express';
import {config} from "./config/config.js";
import controller from './delivery/controller.js'
import errorHandler from './exception/error_middleware.js';
import nunjucks from 'nunjucks';

const app = express();

app.use(controller)
app.use(errorHandler)

nunjucks.configure('templates', {
    autoescape: true,
    express: app
})


app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
