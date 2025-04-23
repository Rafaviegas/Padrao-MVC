import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [PrismaModule, UserModule, AuthModule],
})
export class AppModule {}
