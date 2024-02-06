import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from '@shared/infrastructure/messaging/rabbitmq/rabbitmq.module';
import { AuthenticationCreatedConsumer } from './application/consumers/authenticationCreated.consumer';
import { AuthenticationCreatedPublisher } from './application/publishers/authenticationCreated.publisher';
import { Authentication } from './domain/entity/authentication.entity';
import { AuthenticationRepository } from './infrastructure/repository/authentication.repository';
import { AuthenticationController } from './interfaces/api/authentication.controller';
import { AuthenticationService } from './application/authentication.service';
import { AUTHENTICATION_REPOSITORY_INTERFACE } from './domain/interfaces/authenticationRepository.interface';
import { AuthenticationSubscriber } from './application/subscriber/authentication.subscriber';
import {
  AuthenticationRead,
  AuthenticationReadSchema,
} from './domain/entity/authentication.read';
import { AuthenticationReadRepository } from './infrastructure/repository/authentication.read.repository';
import { AUTHENTICATION_READ_REPOSITORY_INTERFACE } from './domain/interfaces/authenticationReadRepository.interface';
import { AuthenticationReadService } from './application/authentication.read.service';
import { AuthenticationUpdatedConsumer } from './application/consumers/authenticationUpdated.consumer';
import { AuthenticationUpdatedPublisher } from './application/publishers/authenticationUpdated.publisher';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './domain/strategy/jwt.strategy';
import * as process from 'process';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthenticationController],
  exports: [],
  imports: [
    RabbitmqModule,
    TypeOrmModule.forFeature([Authentication]),
    MongooseModule.forFeature([
      { name: AuthenticationRead.name, schema: AuthenticationReadSchema },
    ]),
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY_JWT'),
        signOptions: { expiresIn: `${configService.get('HOURS_JWT')}h` },
      }),
    }),
  ],
  providers: [
    {
      provide: AUTHENTICATION_REPOSITORY_INTERFACE,
      useClass: AuthenticationRepository,
    },
    {
      provide: AUTHENTICATION_READ_REPOSITORY_INTERFACE,
      useClass: AuthenticationReadRepository,
    },
    AuthenticationCreatedConsumer,
    AuthenticationCreatedPublisher,
    AuthenticationUpdatedConsumer,
    AuthenticationUpdatedPublisher,
    AuthenticationService,
    AuthenticationReadService,
    AuthenticationSubscriber,
    JwtStrategy,
  ],
})
export class AuthenticationModule {}