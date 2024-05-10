import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS 설정 추가
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Mission')
    .setDescription('Mission API description')
    .setVersion('1.0')
    .addTag('mission')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

// http://localhost:3000/api
