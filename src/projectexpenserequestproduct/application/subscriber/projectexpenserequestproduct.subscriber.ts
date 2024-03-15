import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { ProjectExpenseRequestProduct } from '../../domain/entity/projectexpenserequestproduct.entity';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';

@EventSubscriber()
export class ProjectExpenseRequestProductSubscriber implements EntitySubscriberInterface<ProjectExpenseRequestProduct> {
  listenTo() {
    return ProjectExpenseRequestProduct;
  }

  afterInsert(event: InsertEvent<ProjectExpenseRequestProduct>): void {
    appEvents.emit(DeclarationQueues.projectexpenserequestproduct_created, event.entity);
  }

  afterUpdate(event: UpdateEvent<ProjectExpenseRequestProduct>): void {
    appEvents.emit(DeclarationQueues.projectexpenserequestproduct_updated, event.entity);
  }
}
