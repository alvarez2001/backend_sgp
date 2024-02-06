import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { DeclarationExchanges } from '@shared/infrastructure/messaging/rabbitmq/declaration-exchanges';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { Authentication } from '../../domain/entity/authentication.entity';
import { AuthenticationRead } from '../../domain/entity/authentication.read';
import { AuthenticationUpdatedConsumer } from '../consumers/authenticationUpdated.consumer';

@Injectable()
export class AuthenticationUpdatedPublisher {
  constructor(private readonly rabbitMQService: RabbitMQService) {
    appEvents.on(
      DeclarationQueues.authentication_updated,
      async (authentication) => {
        await this.send(authentication);
      },
    );
  }

  async send(data: any) {
    const model: any = {
      data,
      writeModel: Authentication.name,
      readModel: AuthenticationRead.name,
      exchange: DeclarationExchanges.authentication_exchange,
      displayNames: {
        [DeclarationQueues.authentication_updated]:
          AuthenticationUpdatedConsumer.name,
      },
    };
    await this.rabbitMQService.publishToExchange(
      DeclarationExchanges.authentication_exchange,
      JSON.stringify(model),
      { persistent: true },
    );
  }
}
