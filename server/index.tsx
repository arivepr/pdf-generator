import express from 'express';
import path from 'path';
import cors from 'cors';
import promBundle from 'express-prom-bundle';

import winston from 'winston';
import expressWinston from 'express-winston';

import config from './config';
import router from './routes/routes';

const PORT = config.webPort;
export const OPTIONS_HEADER_NAME = 'x-pdf-gen-options';

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    requestWhitelist: ['url', 'method', 'httpVersion', 'originalUrl', 'query'],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
  })
);
app.use('/', router);

app.listen(PORT, () => console.info('info', `Listening on port ${PORT}`));

const metricsApp = express();

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  metricsPath: config.metricsPath,
  promClient: {
    collectDefaultMetrics: {},
  },
});

metricsApp.use(metricsMiddleware);
metricsApp.listen(config.metricsPort, () => {
  console.info(`Metrics server listening on port ${config.metricsPort}`);
});
