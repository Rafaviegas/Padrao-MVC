import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/module/user.module';
@Module({
  imports: [PrismaModule, UserModule],
})
export class AppModule {}
