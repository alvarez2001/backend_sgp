import { Module } from '@nestjs/common';
import { RabbitmqModule } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.module';
import { ProjectExpenseRequestProductCreatedConsumer } from './application/consumers/projectexpenserequestproductCreated.consumer';
import { ProjectExpenseRequestProductCreatedPublisher } from './application/publishers/projectexpenserequestproductCreated.publisher';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectExpenseRequestProduct } from './domain/entity/projectexpenserequestproduct.entity';
import { ProjectExpenseRequestProductRepository } from './infrastructure/repository/projectexpenserequestproduct.repository';
import { ProjectExpenseRequestProductController } from './interfaces/api/projectexpenserequestproduct.controller';
import { ProjectExpenseRequestProductService } from './application/projectexpenserequestproduct.service';
import { PROJECTEXPENSEREQUESTPRODUCT_REPOSITORY_INTERFACE } from './domain/interfaces/projectexpenserequestproductRepository.interface';
import { ProjectExpenseRequestProductSubscriber } from './application/subscriber/projectexpenserequestproduct.subscriber';
import { ProjectExpenseRequestProductUpdatedConsumer } from './application/consumers/projectexpenserequestproductUpdated.consumer';
import { ProjectExpenseRequestProductUpdatedPublisher } from './application/publishers/projectexpenserequestproductUpdated.publisher';

@Module({
    controllers: [ProjectExpenseRequestProductController],
    exports: [ProjectExpenseRequestProductService],
    imports: [RabbitmqModule, TypeOrmModule.forFeature([ProjectExpenseRequestProduct])],
    providers: [
        {
            provide: PROJECTEXPENSEREQUESTPRODUCT_REPOSITORY_INTERFACE,
            useClass: ProjectExpenseRequestProductRepository,
        },
        ProjectExpenseRequestProductCreatedConsumer,
        ProjectExpenseRequestProductCreatedPublisher,
        ProjectExpenseRequestProductUpdatedConsumer,
        ProjectExpenseRequestProductUpdatedPublisher,
        ProjectExpenseRequestProductService,
        ProjectExpenseRequestProductSubscriber,
    ],
})
export class ProjectExpenseRequestProductModule {}
