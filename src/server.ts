import express, { Application } from 'express';
import nunjucks from 'nunjucks';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { configApp } from './config/config';
import meteorsController from './delivery/controller';
import Exception from './exception/exception';
import errorHandler from './exception/error_middleware';


const app: Application = express();

nunjucks.configure('templates', {
  autoescape: true,
  express: app,
});



Sentry.setupExpressErrorHandler(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(meteorsController);
app.use(errorHandler);

Sentry.init({
  dsn: `${configApp.dsn}`,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  release: '0.1.0',
  integrations: [Sentry.captureConsoleIntegration(),
    nodeProfilingIntegration()
  ]
});



app.listen(configApp.port, (error?: Exception) => {
  if (error) {
    Sentry.captureException(error);
    // console.log(error);
  } else {
    Sentry.captureMessage(`Server listening on port ${configApp.port}`);
    // console.log(`Server listening on port ${configApp.port}`);
  }
});
