import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudwatchLoggerModule } from './cloudwatch-logger/cloudwatch-logger.module';
import { CategoriesModule } from './categories/categories.module';
import { LivroModule } from './livro/livro.module';
import { LeitorModule } from './leitor/reader.module';

@Module({
  imports: [ PrismaModule, UserModule, AuthModule, CloudwatchLoggerModule, CategoriesModule, LivroModule, LeitorModule],
})
export class AppModule {}
