import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin:'http://localhost:3001/',
    credentials: true,
  })
  const port = process.env.APP_PORT || 3001;
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Build system docs')
    .setDescription('Build system API description')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, "0.0.0.0");
}
bootstrap();
