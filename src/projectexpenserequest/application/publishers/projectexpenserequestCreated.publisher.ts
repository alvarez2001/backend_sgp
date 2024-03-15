import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { DeclarationExchanges } from '@shared/infrastructure/messaging/rabbitmq/declaration-exchanges';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { ProjectExpenseRequest } from '../../domain/entity/projectexpenserequest.entity';
import { ProjectExpenseRequestCreatedConsumer } from '../consumers/projectexpenserequestCreated.consumer';

@Injectable()
export class ProjectExpenseRequestCreatedPublisher {
    constructor(private readonly rabbitMQService: RabbitMQService) {
        appEvents.on(DeclarationQueues.projectexpenserequest_created, async projectexpenserequest => {
            await this.send(projectexpenserequest);
        });
    }

    async send(data: ProjectExpenseRequest): Promise<void> {
        const model = {
            data,
            writeModel: ProjectExpenseRequest.name,
            exchange: DeclarationExchanges.projectexpenserequest_exchange,
            displayNames: {
                [DeclarationQueues.projectexpenserequest_created]: ProjectExpenseRequestCreatedConsumer.name,
            },
        };
        await this.rabbitMQService.publishToExchange(
            DeclarationExchanges.projectexpenserequest_exchange,
            JSON.stringify(model),
            { persistent: true },
        );
    }
}
