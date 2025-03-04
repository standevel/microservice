/* eslint-disable prettier/prettier */
import { NotificationService } from './notification.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';

const QUEUE = 'ORDER'
@Module({
  imports: [ClientsModule.register([
    {
      name: 'RABBITMQ_CLIENT',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  ]),],
  controllers: [
    AppController],
  providers: [
    NotificationService, QueueService, AppService],
})
export class AppModule { }
