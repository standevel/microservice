/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @MessagePattern('order_queue')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    const message = context.getMessage();
    const content = JSON.parse(message['content'].toString());
    console.log(`Pattern: ${context.getPattern()} message: ${message} content: ${content}`);
  }
}
