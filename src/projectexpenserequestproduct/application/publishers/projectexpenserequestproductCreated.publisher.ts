import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { DeclarationExchanges } from '@shared/infrastructure/messaging/rabbitmq/declaration-exchanges';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { ProjectExpenseRequestProduct } from '../../domain/entity/projectexpenserequestproduct.entity';
import { ProjectExpenseRequestProductCreatedConsumer } from '../consumers/projectexpenserequestproductCreated.consumer';

@Injectable()
export class ProjectExpenseRequestProductCreatedPublisher {
    constructor(private readonly rabbitMQService: RabbitMQService) {
        appEvents.on(DeclarationQueues.projectexpenserequestproduct_created, async projectexpenserequestproduct => {
            await this.send(projectexpenserequestproduct);
        });
    }

    async send(data: ProjectExpenseRequestProduct): Promise<void> {
        const model = {
            data,
            writeModel: ProjectExpenseRequestProduct.name,
            exchange: DeclarationExchanges.projectexpenserequestproduct_exchange,
            displayNames: {
                [DeclarationQueues.projectexpenserequestproduct_created]: ProjectExpenseRequestProductCreatedConsumer.name,
            },
        };
        await this.rabbitMQService.publishToExchange(
            DeclarationExchanges.projectexpenserequestproduct_exchange,
            JSON.stringify(model),
            { persistent: true },
        );
    }
}
