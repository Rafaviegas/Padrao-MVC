import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudwatchLoggerModule } from './cloudwatch-logger/cloudwatch-logger.module';
@Module({
  imports: [ PrismaModule, UserModule, AuthModule, CloudwatchLoggerModule],
})
export class AppModule {}
