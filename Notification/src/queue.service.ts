/* eslint-disable prettier/prettier */
// queue.service.ts - Handles RabbitMQ interactions using NestJS ClientProxy
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class QueueService {
    queues = ['order_queue'];
    constructor(@Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy) { }
    async onModuleInit() {
        await this.client.connect().catch(err => console.log('RabitMQ connect Error: ', err.message));
        for (const queue of this.queues) {
            console.log('Queue initialized: ', queue);
            this.client.emit(queue, 'Queue initialized');
        }
    }

    async sendToQueue(queueName: string, message: any) {
        console.log(`Sending message to queue: ${queueName}`);
        this.client.emit(queueName, message).subscribe(() => console.log('Message sent'));
    }

    async consumeQueue(queueName: string, callback: (message: any) => void) {
        console.log(`Consuming messages from queue: ${queueName} `);
        callback({ message: 'Hello World!' });
        this.client.send({ cmd: queueName }, {}).subscribe(callback);
    }

}
