import * as winston from 'winston';
const WinstonCloudwatch = require('winston-cloudwatch');
import { cloudwatchConfig } from './cloudwathc-logger.config';

export const cloudwatchLogger = winston.createLogger({
  transports: [
    new WinstonCloudwatch({
      logGroupName: cloudwatchConfig.logGroupName,
      logStreamName: cloudwatchConfig.logStreamName,
      awsRegion: cloudwatchConfig.awsRegion,
      awsAccessKeyId: cloudwatchConfig.awsAccessKeyId,
      awsSecretKey: cloudwatchConfig.awsSecretAccessKey,
      jsonMessage: true,
    }),
  ],
});
