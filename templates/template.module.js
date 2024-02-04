module.exports = (
  entityNameLowerCase,
  entityNameCamelCase,
) => `import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from 'src/shared/infrastructure/messaging/rabbitmq/rabbitmq.module';
import { ${entityNameCamelCase}CreatedConsumer } from './application/consumers/${entityNameLowerCase}Created.consumer';
import { ${entityNameCamelCase}CreatedPublisher } from './application/publishers/${entityNameLowerCase}Created.publisher';
import { ${entityNameCamelCase} } from './domain/entity/${entityNameLowerCase}.entity';
import { ${entityNameCamelCase}Repository } from './infrastructure/repository/${entityNameLowerCase}.repository';
import { ${entityNameCamelCase}Controller } from './interfaces/api/${entityNameLowerCase}.controller';
import { ${entityNameCamelCase}Service } from './application/${entityNameLowerCase}.service';
import { ${entityNameCamelCase.toUpperCase()}_REPOSITORY_INTERFACE } from './domain/interfaces/${entityNameLowerCase}Repository.interface';
import { ${entityNameCamelCase}Subscriber } from './application/subscriber/${entityNameLowerCase}.subscriber';
import { ${entityNameCamelCase}Read, ${entityNameCamelCase}ReadSchema } from './domain/entity/${entityNameLowerCase}.read';
import { ${entityNameCamelCase}ReadRepository } from './infrastructure/repository/${entityNameLowerCase}.read.repository';
import { ${entityNameCamelCase.toUpperCase()}_READ_REPOSITORY_INTERFACE } from './domain/interfaces/${entityNameLowerCase}ReadRepository.interface';
import { ${entityNameCamelCase}ReadService } from './application/${entityNameLowerCase}.read.service';
import { ${entityNameCamelCase}UpdatedConsumer } from './application/consumers/${entityNameLowerCase}Updated.consumer';
import { ${entityNameCamelCase}UpdatedPublisher } from './application/publishers/${entityNameLowerCase}Updated.publisher';

@Module({
  controllers: [${entityNameCamelCase}Controller],
  exports: [],
  imports: [
    RabbitmqModule,
    TypeOrmModule.forFeature([${entityNameCamelCase}]),
    MongooseModule.forFeature([
      { name: ${entityNameCamelCase}Read.name, schema: ${entityNameCamelCase}ReadSchema },
    ]),
  ],
  providers: [
    {
      provide: ${entityNameCamelCase.toUpperCase()}_REPOSITORY_INTERFACE,
      useClass: ${entityNameCamelCase}Repository,
    },
    {
      provide: ${entityNameCamelCase.toUpperCase()}_READ_REPOSITORY_INTERFACE,
      useClass: ${entityNameCamelCase}ReadRepository,
    },
    ${entityNameCamelCase}CreatedConsumer,
    ${entityNameCamelCase}CreatedPublisher,
    ${entityNameCamelCase}UpdatedConsumer,
    ${entityNameCamelCase}UpdatedPublisher,
    ${entityNameCamelCase}Service,
    ${entityNameCamelCase}ReadService,
    ${entityNameCamelCase}Subscriber,
  ],
})
export class ${entityNameCamelCase}Module {}
`;
