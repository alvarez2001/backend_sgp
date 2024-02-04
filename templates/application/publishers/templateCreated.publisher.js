module.exports = (
  entityNameLowerCase,
  entityNameCamelCase,
) => `import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { DeclarationExchanges } from 'src/shared/infrastructure/messaging/rabbitmq/declaration-exchanges';
import { appEvents } from 'src/shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from 'src/shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { ${entityNameCamelCase} } from '../../domain/entity/${entityNameLowerCase}.entity';
import { ${entityNameCamelCase}Read } from '../../domain/entity/${entityNameLowerCase}.read';
import { ${entityNameCamelCase}CreatedConsumer } from '../consumers/${entityNameLowerCase}Created.consumer';

@Injectable()
export class ${entityNameCamelCase}CreatedPublisher {
  constructor(private readonly rabbitMQService: RabbitMQService) {
    appEvents.on(DeclarationQueues.${entityNameLowerCase}_created, async (${entityNameLowerCase}) => {
      await this.send(${entityNameLowerCase});
    });
  }

  async send(data: any) {
    const model: any = {
      data,
      writeModel: ${entityNameCamelCase}.name,
      readModel: ${entityNameCamelCase}Read.name,
      exchange: DeclarationExchanges.${entityNameLowerCase}_exchange,
      displayNames: {
        [DeclarationQueues.${entityNameLowerCase}_created]: ${entityNameCamelCase}CreatedConsumer.name,
      },
    };
    await this.rabbitMQService.publishToExchange(
      DeclarationExchanges.${entityNameLowerCase}_exchange,
      JSON.stringify(model),
      { persistent: true },
    );
  }
}
`;
