import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
var cors = require('cors');

const corsOptions ={
  origin:'http://localhost:3001', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
  'Access-Control-Allow-Origin': '*',
  'access-control-allow-credentials': true
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 3001;
  app.setGlobalPrefix('api');
  app.use(cors(corsOptions))
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
