import { Injectable } from "@nestjs/common";
import { cloudwatchConfig } from './cloudwathc-logger.config';
import * as winston from 'winston';
import { timestamp } from "rxjs";
const WinstonCloudwatch = require('winston-cloudwatch')


@Injectable()
export class CloudwatchLoggerService {
    private logger: winston.Logger

    constructor() {
        this.logger = winston.createLogger({
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
      }

    log(message: string, meta: Record<string, any> = {}) {
        this.logger.info(message, { ...meta, timestamp: new Date().toISOString() });
      }
    
    warn(message: string, meta: Record<string, any> = {}) {
        this.logger.warn(message, { ...meta, timestamp: new Date().toISOString() });
      }
    
    error(message: string, meta: Record<string, any> = {}) {
        this.logger.error(message, { ...meta, timestamp: new Date().toISOString() });
      }


}