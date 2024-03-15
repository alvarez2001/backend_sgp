import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { DeclarationExchanges } from '@shared/infrastructure/messaging/rabbitmq/declaration-exchanges';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { ProjectExpenseRequestProduct } from '../../domain/entity/projectexpenserequestproduct.entity';
import { ProjectExpenseRequestProductUpdatedConsumer } from '../consumers/projectexpenserequestproductUpdated.consumer';

@Injectable()
export class ProjectExpenseRequestProductUpdatedPublisher {
    constructor(private readonly rabbitMQService: RabbitMQService) {
        appEvents.on(DeclarationQueues.projectexpenserequestproduct_updated, async projectexpenserequestproduct => {
            await this.send(projectexpenserequestproduct);
        });
    }

    async send(data: ProjectExpenseRequestProduct): Promise<void> {
        const model = {
            data,
            writeModel: ProjectExpenseRequestProduct.name,
            exchange: DeclarationExchanges.projectexpenserequestproduct_exchange,
            displayNames: {
                [DeclarationQueues.projectexpenserequestproduct_updated]: ProjectExpenseRequestProductUpdatedConsumer.name,
            },
        };
        await this.rabbitMQService.publishToExchange(
            DeclarationExchanges.projectexpenserequestproduct_exchange,
            JSON.stringify(model),
            { persistent: true },
        );
    }
}
