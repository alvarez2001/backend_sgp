module.exports = (
  entityNameLowerCase,
  entityNameCamelCase,
) => `import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from 'src/shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { ConsumeMessage } from 'amqplib';
import { DeclarationQueues } from 'src/shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { ${entityNameCamelCase}ReadService } from '../${entityNameLowerCase}.read.service';

@Injectable()
export class ${entityNameCamelCase}UpdatedConsumer implements OnModuleInit {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly ${entityNameLowerCase}Service: ${entityNameCamelCase}ReadService,
  ) {}

  async onModuleInit() {
    await this.rabbitMQService.consume(
      DeclarationQueues.${entityNameLowerCase}_updated,
      this.handleMessage.bind(this),
    );
  }

  private async handleMessage(msg: ConsumeMessage | null) {
    if (msg) {
      try {
        const data = JSON.parse(JSON.parse(msg.content.toString()));

        if (
          data.displayNames.hasOwnProperty(DeclarationQueues.${entityNameLowerCase}_updated) &&
          data.displayNames[DeclarationQueues.${entityNameLowerCase}_updated] ==
            ${entityNameCamelCase}UpdatedConsumer.name
        ) {
          await this.${entityNameLowerCase}Service.update${entityNameCamelCase}(data.data.id, data.data);
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
