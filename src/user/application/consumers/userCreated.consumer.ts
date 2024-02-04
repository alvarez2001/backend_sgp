import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { ConsumeMessage } from 'amqplib';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { UserReadService } from '../user.read.service';

@Injectable()
export class UserCreatedConsumer implements OnModuleInit {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly userService: UserReadService,
  ) {}

  async onModuleInit() {
    await this.rabbitMQService.consume(
      DeclarationQueues.user_created,
      this.handleMessage.bind(this),
    );
  }

  private async handleMessage(msg: ConsumeMessage | null) {
    if (msg) {
      try {
        const data = JSON.parse(JSON.parse(msg.content.toString()));

        if (
          data.displayNames.hasOwnProperty(DeclarationQueues.user_created) &&
          data.displayNames[DeclarationQueues.user_created] ==
            UserCreatedConsumer.name
        ) {
          await this.userService.createUser(data.data);
        }

        this.rabbitMQService.ack(msg);
      } catch (error) {
        console.error('Error procesando el mensaje:', error);
        this.rabbitMQService.nack(msg);
      }
    }
  }
}
