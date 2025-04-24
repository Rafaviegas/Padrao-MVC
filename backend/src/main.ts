import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { WinstonModule } from 'nest-winston';
import { cloudwatchLogger } from 'src/cloudwatch-logger/cloudwatch-logger'

async function bootstrap() {
  
 const app = await NestFactory.create(AppModule, {
   logger: WinstonModule.createLogger({
     transports: cloudwatchLogger.transports,
    }),
  });

  // Valdidatções DTO
  app.useGlobalPipes(new ValidationPipe()); 

  // Configurações do Swagger
  const config = new DocumentBuilder()
    .setTitle('Padrão MVC')
    .setDescription('DOcumentação Swagger da API padrão MVC')
    .setVersion('1.0')
    .addTag('Padrão MVC')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Inicia NestJs
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicação rodando em: http://localhost:${port}`);
}
bootstrap();
