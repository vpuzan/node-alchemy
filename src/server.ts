import express, { Application } from 'express';
import nunjucks from 'nunjucks';
import { configApp } from './config/config';
import meteorsController from './delivery/controller';
import Exception from './exception/exception';
import errorHandler from './exception/error_middleware';

const app: Application = express();

nunjucks.configure('templates', {
  autoescape: true,
  express: app,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(meteorsController);
app.use(errorHandler);

app.listen(configApp.port, (error?: Exception) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server listening on port ${configApp.port}`);
  }
});
