/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { QueueService } from './queue.service';

@Injectable()
export class NotificationService {
    constructor(private queueService: QueueService) { }



    async sendNotification(order: any) {
        console.log(`Sending notification for order:`, order);
        //  email/SMS sending logic goes here
    }

}
