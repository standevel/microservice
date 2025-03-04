 # Microservices with RabbitMQ

## Overview
This project implements two microservices: **Order Service** and **Notification Service**, which communicate asynchronously via RabbitMQ.

## Architecture
- **Order Service**: Handles order creation and enqueues order messages.
- **Notification Service**: Consumes order messages and sends user notifications.
- **Queue Service**: Manages RabbitMQ interactions for both services.

## Setup Instructions
### Prerequisites
- Node.js & npm
- Docker (for RabbitMQ)
- NestJS CLI

### Running the Services
1. Clone the repository and install dependencies:
   ```sh
   npm install
   ```
2. Start RabbitMQ using Docker:
   ```sh
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
   ```
3. Start the services:
   ```sh
   npm run start:order
   npm run start:notification
   ```
4. Run tests:
   ```sh
   npm run test
   ```

## Challenges & Solutions
1. **Message Loss**: Used durable queues and acknowledged messages.
2. **Service Discovery**: Used NestJS `ClientProxy` for better microservices support.
3. **Testing RabbitMQ**: Mocked `ClientProxy` for unit testing.

