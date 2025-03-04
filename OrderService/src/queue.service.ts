/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class QueueService {
    queues = ['order_queue'];
    constructor(@Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy) { }
    async onModuleInit() {
        await this.client.connect().catch(err => console.log('RabitMQ connect Error: ', err.message));
        for (const queue of this.queues) {
            console.log('Queue initialized');
            this.client.send(queue, 'Queue initialized');
        }
    }
    async sendToQueue(queueName: string, message: any) {
        console.log(`Sending message to queue: ${queueName} message:${message}`);
        this.client.send(queueName, message).subscribe(res => console.log('queued: ', res));  // Use emit instead of send
    }

    async consumeQueue(queueName: string, callback: (message: any) => void) {
        console.log(`Consuming messages from queue: ${queueName}`);
        this.client.send('data', (message) => callback(message));

    }
}
