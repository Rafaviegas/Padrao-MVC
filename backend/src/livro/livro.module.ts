import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { CloudwatchLoggerModule } from 'src/cloudwatch-logger/cloudwatch-logger.module';
import { LivroService } from '../livro/service/livro.service';
import { LivroController } from '../livro/controller/livro.controller';

@Module({
  imports: [PrismaModule, CloudwatchLoggerModule],
  controllers: [LivroController],
  providers: [LivroService],
  exports: [LivroService],
})
export class LivroModule {}
