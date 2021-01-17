import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import { errors } from 'celebrate';
// import * as Sentry from '@sentry/node';
// import * as Tracing from '@sentry/tracing';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
// import sentryConfig from '@config/sentry';

import '@shared/container';
import '@shared/infra/typeorm';
import rateLimiter from './middlewares/rateLimiter';

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
app.use(rateLimiter);
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(routes);

app.use(errors);

// Global exception handler
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  console.log(err.message);
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
