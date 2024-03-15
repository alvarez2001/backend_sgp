import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.service';
import { DeclarationExchanges } from '@shared/infrastructure/messaging/rabbitmq/declaration-exchanges';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';
import { Project } from '../../domain/entity/project.entity';
import { ProjectCreatedConsumer } from '../consumers/projectCreated.consumer';

@Injectable()
export class ProjectCreatedPublisher {
    constructor(private readonly rabbitMQService: RabbitMQService) {
        appEvents.on(DeclarationQueues.project_created, async project => {
            await this.send(project);
        });
    }

    async send(data: Project): Promise<void> {
        const model = {
            data,
            writeModel: Project.name,
            exchange: DeclarationExchanges.project_exchange,
            displayNames: {
                [DeclarationQueues.project_created]: ProjectCreatedConsumer.name,
            },
        };
        await this.rabbitMQService.publishToExchange(
            DeclarationExchanges.project_exchange,
            JSON.stringify(model),
            { persistent: true },
        );
    }
}
