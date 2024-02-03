import { Injectable, OnModuleDestroy } from '@nestjs/common';
import {
  connect,
  AmqpConnectionManager,
  ChannelWrapper,
} from 'amqp-connection-manager';
import { Channel, ConsumeMessage } from 'amqplib';
import { ExchangesAndQueues } from './exchange-and-queues';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQService implements OnModuleDestroy {
  private readonly connectionManager: AmqpConnectionManager;
  private channelWrapper: ChannelWrapper;

  constructor(private configService: ConfigService) {
    // Establece la conexión con RabbitMQ
    this.connectionManager = connect(
      [
        `amqp://${this.configService.get<string>('RABBITMQ_USERNAME')}:${this.configService.get<string>('RABBITMQ_PASSWORD')}@${this.configService.get<string>('RABBITMQ_HOST')}/${this.configService.get<string>('RABBITMQ_VHOST')}`,
      ],
      {
        heartbeatIntervalInSeconds: 5,
      },
    );

    // Crea un canal de comunicación
    this.channelWrapper = this.connectionManager.createChannel({
      json: true,
      setup: async () => {
        // channel: Channel
        // Aquí puedes asegurar colas e intercambiadores, si es necesario
        // Ejemplo: await channel.assertQueue('my_queue', { durable: true });
        // await channel.assertQueue('my_queue', { durable: true });
      },
    });
  }

  /**
   * Configura múltiples exchanges de tipo 'fanout' y vincula las colas especificadas a cada exchange.
   */
  async setupFanoutExchanges() {
    const exchangesWithQueues = ExchangesAndQueues;
    return this.channelWrapper.addSetup(async (channel: Channel) => {
      for (const [exchange, queues] of Object.entries(exchangesWithQueues)) {
        try {
          await channel.assertExchange(exchange, 'fanout', { durable: true });
          for (const queue of queues) {
            await channel.assertQueue(queue, { durable: true });
            await channel.bindQueue(queue, exchange, '');
            console.log(`Cola ${queue} vinculada a exchange ${exchange}`);
          }
        } catch (error) {
          console.error(
            `Error configurando exchange ${exchange} y colas ${queues}:`,
            error,
          );
        }
      }
    });
  }

  /**
   * Publica un mensaje a un exchange específico.
   * @param {string} exchange El nombre del exchange al que publicar el mensaje.
   * @param {string} message El mensaje a publicar.
   * @param {Object} [options={}] Opciones de publicación.
   */
  async publishToExchange(
    exchange: string,
    message: string,
    options: object = {},
  ) {
    return this.channelWrapper.publish(exchange, '', message, options);
  }

  /**
   * Consume mensajes de una cola específica.
   * @param {string} queue Nombre de la cola de la que consumir mensajes.
   * @param {(msg: ConsumeMessage | null) => void} onMessage Callback que maneja los mensajes.
   */
  async consume(
    queue: string,
    onMessage: (msg: ConsumeMessage | null) => void,
  ) {
    await this.channelWrapper.waitForConnect(async (err) => {
      if (err) {
        console.log('aca');
        return;
      }
      await this.setupFanoutExchanges();
      await this.channelWrapper.addSetup(async (channel: Channel) => {
        // Asegurar la cola antes de consumir puede ser opcional, dependiendo de tu configuración
        // return channel.assertQueue(queue, { durable: true })
        //   .then(() => channel.consume(queue, onMessage, { noAck: false }));
        return channel.consume(queue, onMessage, { noAck: false });
      });
    });
  }

  /**
   * Envía un mensaje a una cola específica.
   * @param {string} queue Nombre de la cola a la que enviar el mensaje.
   * @param {string} message Mensaje a enviar.
   * @param {Options.Publish} [options] Opciones de publicación.
   */
  async send(queue: string, message: string, options = {}) {
    return this.channelWrapper.sendToQueue(queue, message, options);
  }

  /**
   * Envía un ack al mensaje para indicar que ha sido procesado correctamente.
   * @param {ConsumeMessage} msg Mensaje a confirmar.
   */
  ack(msg: ConsumeMessage) {
    this.channelWrapper.ack(msg);
  }

  /**
   * Envía un nack al mensaje para indicar que no ha sido procesado correctamente.
   * @param {ConsumeMessage} msg Mensaje a rechazar.
   */
  nack(msg: ConsumeMessage) {
    this.channelWrapper.nack(msg);
  }

  /**
   * Cierra la conexión con RabbitMQ cuando el módulo es destruido.
   */
  onModuleDestroy() {
    if (this.connectionManager) {
      this.connectionManager.close();
    }
  }
}
