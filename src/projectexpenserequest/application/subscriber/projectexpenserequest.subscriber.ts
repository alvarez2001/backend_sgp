import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { ProjectExpenseRequest } from '../../domain/entity/projectexpenserequest.entity';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';

@EventSubscriber()
export class ProjectExpenseRequestSubscriber implements EntitySubscriberInterface<ProjectExpenseRequest> {
  listenTo() {
    return ProjectExpenseRequest;
  }

  afterInsert(event: InsertEvent<ProjectExpenseRequest>): void {
    appEvents.emit(DeclarationQueues.projectexpenserequest_created, event.entity);
  }

  afterUpdate(event: UpdateEvent<ProjectExpenseRequest>): void {
    appEvents.emit(DeclarationQueues.projectexpenserequest_updated, event.entity);
  }
}
