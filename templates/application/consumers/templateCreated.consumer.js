module.exports = (
  entityNameLowerCase,
  entityNameCamelCase,
) => `import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '../../../shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { ConsumeMessage } from 'amqplib';
import { DeclarationQueues } from '../../../shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { ${entityNameCamelCase}ReadService } from '../${entityNameLowerCase}.read.service';

@Injectable()
export class ${entityNameCamelCase}CreatedConsumer implements OnModuleInit {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly ${entityNameLowerCase}Service: ${entityNameCamelCase}ReadService,
  ) {}

  async onModuleInit() {
    await this.rabbitMQService.consume(
      DeclarationQueues.${entityNameLowerCase}_created,
      this.handleMessage.bind(this),
    );
  }

  private async handleMessage(msg: ConsumeMessage | null) {
    if (msg) {
      try {
        const data = JSON.parse(JSON.parse(msg.content.toString()));

        if (
          data.displayNames.hasOwnProperty(DeclarationQueues.${entityNameLowerCase}_created) &&
          data.displayNames[DeclarationQueues.${entityNameLowerCase}_created] ==
            ${entityNameCamelCase}CreatedConsumer.name
        ) {
          await this.${entityNameLowerCase}Service.create${entityNameCamelCase}(data.data);
        }

        this.rabbitMQService.ack(msg);
      } catch (error) {
        console.error('Error procesando el mensaje:', error);
        this.rabbitMQService.nack(msg);
      }
    }
  }
}
`;
