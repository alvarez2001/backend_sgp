import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../../../shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { DeclarationExchanges } from '../../../shared/infrastructure/messaging/rabbitmq/declaration-exchanges';
import { appEvents } from '../../../shared/infrastructure/messaging/event-emitter';

@Injectable()
export class UserCreatedPublisher {
  constructor(private readonly rabbitMQService: RabbitMQService) {
    appEvents.on('user.created', async (user) => {
      await this.send(user);
    });
  }

  async send(data: any) {
    await this.rabbitMQService.publishToExchange(
      DeclarationExchanges.user_exchange,
      JSON.stringify(data),
      { persistent: true },
    );
  }
}
