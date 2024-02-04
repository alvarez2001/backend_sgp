import { Module } from '@nestjs/common';
import { RabbitmqModule } from './shared/infrastructure/messaging/rabbitmq/rabbitmq.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    RabbitmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, EventEmitterModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres', // asume que usas PostgreSQL
        host: configService.get<string>('WRITE_DB_HOST', 'localhost'),
        port: configService.get<number>('WRITE_DB_PORT', 5432),
        username: configService.get<string>('WRITE_DB_USERNAME', 'root'),
        password: configService.get<string>('WRITE_DB_PASSWORD', 'root'),
        database: configService.get<string>('WRITE_DB_DATABASE', 'pgsql'),
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('WRITE_DB_SYNCHRONIZE', true), // Ten cuidado con esta opción en producción
        subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('READ_DB_HOST')}:${configService.get('READ_DB_PORT')}`,
        auth: {
          username: configService.get('READ_DB_USERNAME'),
          password: configService.get('READ_DB_PASSWORD'),
        },
        dbName: configService.get('READ_DB_DATABASE'),
      }),
    }),

    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
