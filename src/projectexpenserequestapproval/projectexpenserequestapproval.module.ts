import { Module } from '@nestjs/common';
import { RabbitmqModule } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.module';
import { ProjectExpenseRequestApprovalCreatedConsumer } from './application/consumers/projectexpenserequestapprovalCreated.consumer';
import { ProjectExpenseRequestApprovalCreatedPublisher } from './application/publishers/projectexpenserequestapprovalCreated.publisher';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectExpenseRequestApproval } from './domain/entity/projectexpenserequestapproval.entity';
import { ProjectExpenseRequestApprovalRepository } from './infrastructure/repository/projectexpenserequestapproval.repository';
import { ProjectExpenseRequestApprovalController } from './interfaces/api/projectexpenserequestapproval.controller';
import { ProjectExpenseRequestApprovalService } from './application/projectexpenserequestapproval.service';
import { PROJECTEXPENSEREQUESTAPPROVAL_REPOSITORY_INTERFACE } from './domain/interfaces/projectexpenserequestapprovalRepository.interface';
import { ProjectExpenseRequestApprovalSubscriber } from './application/subscriber/projectexpenserequestapproval.subscriber';
import { ProjectExpenseRequestApprovalUpdatedConsumer } from './application/consumers/projectexpenserequestapprovalUpdated.consumer';
import { ProjectExpenseRequestApprovalUpdatedPublisher } from './application/publishers/projectexpenserequestapprovalUpdated.publisher';

@Module({
    controllers: [ProjectExpenseRequestApprovalController],
    exports: [ProjectExpenseRequestApprovalService],
    imports: [RabbitmqModule, TypeOrmModule.forFeature([ProjectExpenseRequestApproval])],
    providers: [
        {
            provide: PROJECTEXPENSEREQUESTAPPROVAL_REPOSITORY_INTERFACE,
            useClass: ProjectExpenseRequestApprovalRepository,
        },
        ProjectExpenseRequestApprovalCreatedConsumer,
        ProjectExpenseRequestApprovalCreatedPublisher,
        ProjectExpenseRequestApprovalUpdatedConsumer,
        ProjectExpenseRequestApprovalUpdatedPublisher,
        ProjectExpenseRequestApprovalService,
        ProjectExpenseRequestApprovalSubscriber,
    ],
})
export class ProjectExpenseRequestApprovalModule {}
