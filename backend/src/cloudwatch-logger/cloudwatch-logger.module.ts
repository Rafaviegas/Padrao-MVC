import { Module } from '@nestjs/common';
import { CloudwatchLoggerService } from './cloudwatch-logger.service';

@Module({
  providers: [CloudwatchLoggerService],
  exports: [CloudwatchLoggerService],
})
export class CloudwatchLoggerModule {}
