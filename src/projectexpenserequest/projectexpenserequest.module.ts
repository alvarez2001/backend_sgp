import { Module } from '@nestjs/common';
import { RabbitmqModule } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.module';
import { ProjectExpenseRequestCreatedConsumer } from './application/consumers/projectexpenserequestCreated.consumer';
import { ProjectExpenseRequestCreatedPublisher } from './application/publishers/projectexpenserequestCreated.publisher';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectExpenseRequest } from './domain/entity/projectexpenserequest.entity';
import { ProjectExpenseRequestRepository } from './infrastructure/repository/projectexpenserequest.repository';
import { ProjectExpenseRequestController } from './interfaces/api/projectexpenserequest.controller';
import { ProjectExpenseRequestService } from './application/projectexpenserequest.service';
import { PROJECTEXPENSEREQUEST_REPOSITORY_INTERFACE } from './domain/interfaces/projectexpenserequestRepository.interface';
import { ProjectExpenseRequestSubscriber } from './application/subscriber/projectexpenserequest.subscriber';
import { ProjectExpenseRequestUpdatedConsumer } from './application/consumers/projectexpenserequestUpdated.consumer';
import { ProjectExpenseRequestUpdatedPublisher } from './application/publishers/projectexpenserequestUpdated.publisher';

@Module({
    controllers: [ProjectExpenseRequestController],
    exports: [ProjectExpenseRequestService],
    imports: [RabbitmqModule, TypeOrmModule.forFeature([ProjectExpenseRequest])],
    providers: [
        {
            provide: PROJECTEXPENSEREQUEST_REPOSITORY_INTERFACE,
            useClass: ProjectExpenseRequestRepository,
        },
        ProjectExpenseRequestCreatedConsumer,
        ProjectExpenseRequestCreatedPublisher,
        ProjectExpenseRequestUpdatedConsumer,
        ProjectExpenseRequestUpdatedPublisher,
        ProjectExpenseRequestService,
        ProjectExpenseRequestSubscriber,
    ],
})
export class ProjectExpenseRequestModule {}
