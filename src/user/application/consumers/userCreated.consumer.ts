import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '../../../shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { ConsumeMessage } from 'amqplib';
import { DeclarationQueues } from '../../../shared/infrastructure/messaging/rabbitmq/declaration-queues';

@Injectable()
export class UserCreatedConsumer implements OnModuleInit {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async onModuleInit() {
    await this.rabbitMQService.consume(
      DeclarationQueues.user_created,
      this.handleMessage.bind(this),
    );
  }

  private handleMessage(msg: ConsumeMessage | null) {
    if (msg) {
      try {
        console.log('Mensaje recibido:', msg.content.toString());
        // Procesa el mensaje aquí
        // Si el mensaje se procesa correctamente
        this.rabbitMQService.ack(msg);
      } catch (error) {
        console.error('Error procesando el mensaje:', error);
        // Si el mensaje no pudo ser procesado correctamente
        this.rabbitMQService.nack(msg);
      }
    }
  }
}
