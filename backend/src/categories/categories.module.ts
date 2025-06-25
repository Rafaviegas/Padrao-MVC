// src/categories/categories.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { CloudwatchLoggerModule } from 'src/cloudwatch-logger/cloudwatch-logger.module';
import { CategoriaService } from './service/categoria';
import { CategoriaController } from './controller/categoria';

@Module({
  imports: [PrismaModule, CloudwatchLoggerModule],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService],
})
export class CategoriesModule {}
