import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { DeclarationExchanges } from '@shared/infrastructure/messaging/rabbitmq/declaration-exchanges';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { ProjectExpenseRequestApproval } from '../../domain/entity/projectexpenserequestapproval.entity';
import { ProjectExpenseRequestApprovalCreatedConsumer } from '../consumers/projectexpenserequestapprovalCreated.consumer';

@Injectable()
export class ProjectExpenseRequestApprovalCreatedPublisher {
    constructor(private readonly rabbitMQService: RabbitMQService) {
        appEvents.on(DeclarationQueues.projectexpenserequestapproval_created, async projectexpenserequestapproval => {
            await this.send(projectexpenserequestapproval);
        });
    }

    async send(data: ProjectExpenseRequestApproval): Promise<void> {
        const model = {
            data,
            writeModel: ProjectExpenseRequestApproval.name,
            exchange: DeclarationExchanges.projectexpenserequestapproval_exchange,
            displayNames: {
                [DeclarationQueues.projectexpenserequestapproval_created]: ProjectExpenseRequestApprovalCreatedConsumer.name,
            },
        };
        await this.rabbitMQService.publishToExchange(
            DeclarationExchanges.projectexpenserequestapproval_exchange,
            JSON.stringify(model),
            { persistent: true },
        );
    }
}
