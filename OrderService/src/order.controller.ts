/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('orders')
export class OrderController {
    constructor(private queueService: QueueService) { }

    @Post()
    async createOrder(@Body() orderDto: any) {
        // Process order logic (e.g., save to DB, validation, etc.)
        console.log('Order received:', orderDto);

        // Send to RabbitMQ queue dynamically
        await this.queueService.sendToQueue('order_queue', orderDto);

        return { message: 'Order received and queued successfully' };
    }
}