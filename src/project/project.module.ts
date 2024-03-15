import { Module } from '@nestjs/common';
import { RabbitmqModule } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.module';
import { ProjectCreatedConsumer } from './application/consumers/projectCreated.consumer';
import { ProjectCreatedPublisher } from './application/publishers/projectCreated.publisher';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './domain/entity/project.entity';
import { ProjectRepository } from './infrastructure/repository/project.repository';
import { ProjectController } from './interfaces/api/project.controller';
import { ProjectService } from './application/project.service';
import { PROJECT_REPOSITORY_INTERFACE } from './domain/interfaces/projectRepository.interface';
import { ProjectSubscriber } from './application/subscriber/project.subscriber';
import { ProjectUpdatedConsumer } from './application/consumers/projectUpdated.consumer';
import { ProjectUpdatedPublisher } from './application/publishers/projectUpdated.publisher';

@Module({
    controllers: [ProjectController],
    exports: [ProjectService],
    imports: [RabbitmqModule, TypeOrmModule.forFeature([Project])],
    providers: [
        {
            provide: PROJECT_REPOSITORY_INTERFACE,
            useClass: ProjectRepository,
        },
        ProjectCreatedConsumer,
        ProjectCreatedPublisher,
        ProjectUpdatedConsumer,
        ProjectUpdatedPublisher,
        ProjectService,
        ProjectSubscriber,
    ],
})
export class ProjectModule {}
