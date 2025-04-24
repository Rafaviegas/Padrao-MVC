import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Padrão MVC')
    .setDescription('DOcumentação Swagger da API padrão MVC')
    .setVersion('1.0')
    .addTag('Padrão MVC')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);



  app.useGlobalPipes(new ValidationPipe()); 
  await app.listen(port);
  console.log(`Application is running on: localhost:${port}`);
}
bootstrap();
