/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private notificationService: NotificationService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('order_queue')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    const message = context.getMessage();
    const content = JSON.parse(message['content'].toString());
    console.log(`Pattern: ${context.getPattern()} message: ${message} content: ${content}`);
    console.log('Order received:', content);
    console.log('order data: ', content.data);
    this.notificationService.sendNotification(content.data);
    return { message: 'Order received and queued successfully' };
  }
}
