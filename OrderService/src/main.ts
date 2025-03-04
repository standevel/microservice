/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const QUEUE = 'order_queue';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });
  const scheme: SecuritySchemeObject = {
    scheme: 'jwt', type: 'apiKey'
  }
  const config = new DocumentBuilder()
    .setTitle('Order Service API')
    .setDescription('The order microservice API documentation')
    .setVersion('1.0')
    .addTag('Order Service')
    .addBearerAuth(scheme)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger/index.html', app, document);

  app.use(bodyParser.json({ limit: '200mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: QUEUE,
      queueOptions: {
        durable: true
      }
    }
  });

  app.startAllMicroservices();
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
