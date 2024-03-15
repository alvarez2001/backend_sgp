import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { DeclarationExchanges } from '@shared/infrastructure/messaging/rabbitmq/declaration-exchanges';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { ProjectExpenseRequest } from '../../domain/entity/projectexpenserequest.entity';
import { ProjectExpenseRequestUpdatedConsumer } from '../consumers/projectexpenserequestUpdated.consumer';

@Injectable()
export class ProjectExpenseRequestUpdatedPublisher {
    constructor(private readonly rabbitMQService: RabbitMQService) {
        appEvents.on(DeclarationQueues.projectexpenserequest_updated, async projectexpenserequest => {
            await this.send(projectexpenserequest);
        });
    }

    async send(data: ProjectExpenseRequest): Promise<void> {
        const model = {
            data,
            writeModel: ProjectExpenseRequest.name,
            exchange: DeclarationExchanges.projectexpenserequest_exchange,
            displayNames: {
                [DeclarationQueues.projectexpenserequest_updated]: ProjectExpenseRequestUpdatedConsumer.name,
            },
        };
        await this.rabbitMQService.publishToExchange(
            DeclarationExchanges.projectexpenserequest_exchange,
            JSON.stringify(model),
            { persistent: true },
        );
    }
}
