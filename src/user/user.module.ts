import { Module } from '@nestjs/common';
import { RabbitmqModule } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.module';
import { UserCreatedConsumer } from './application/consumers/userCreated.consumer';
import { UserCreatedPublisher } from './application/publishers/userCreated.publisher';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entity/user.entity';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserController } from './interfaces/api/user.controller';
import { UserService } from './application/user.service';
import { USER_REPOSITORY_INTERFACE } from './domain/interfaces/userRepository.interface';
import { UserSubscriber } from './application/subscriber/user.subscriber';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRead, UserReadSchema } from './domain/entity/user.read';
import { UserReadRepository } from './infrastructure/repository/user.read.repository';
import { USER_READ_REPOSITORY_INTERFACE } from './domain/interfaces/userReadRepository.interface';
import { UserReadService } from './application/user.read.service';
import { UserUpdatedConsumer } from './application/consumers/userUpdated.consumer';
import { UserUpdatedPublisher } from './application/publishers/userUpdated.publisher';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [
    RabbitmqModule,
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([
      { name: UserRead.name, schema: UserReadSchema },
    ]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY_INTERFACE,
      useClass: UserRepository,
    },
    {
      provide: USER_READ_REPOSITORY_INTERFACE,
      useClass: UserReadRepository,
    },
    UserCreatedConsumer,
    UserCreatedPublisher,
    UserUpdatedConsumer,
    UserUpdatedPublisher,
    UserService,
    UserReadService,
    UserSubscriber,
  ],
})
export class UserModule {}
