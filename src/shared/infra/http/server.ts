import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
// import * as Sentry from '@sentry/node';
// import * as Tracing from '@sentry/tracing';
import routes from './routes';
import uploadConfig from '../../../config/upload';
// import sentryConfig from './config/sentry';
import AppError from '../../errors/AppError';

import '../typeorm';

const app = express();

// Initializing sentry
// Sentry.init({
//   dsn: sentryConfig.dsn,
//   integrations: [
//     new Sentry.Integrations.Http({ tracing: true }),
//     new Tracing.Integrations.Express({ app }),
//   ],
//   tracesSampleRate: 1.0,
// });

// Using handlers for tracing
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Global exception handler
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    // Sentry.captureEvent(err);
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('server listening');
});
