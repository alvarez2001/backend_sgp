import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { ProjectExpenseRequestApproval } from '../../domain/entity/projectexpenserequestapproval.entity';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';

@EventSubscriber()
export class ProjectExpenseRequestApprovalSubscriber implements EntitySubscriberInterface<ProjectExpenseRequestApproval> {
  listenTo() {
    return ProjectExpenseRequestApproval;
  }

  afterInsert(event: InsertEvent<ProjectExpenseRequestApproval>): void {
    appEvents.emit(DeclarationQueues.projectexpenserequestapproval_created, event.entity);
  }

  afterUpdate(event: UpdateEvent<ProjectExpenseRequestApproval>): void {
    appEvents.emit(DeclarationQueues.projectexpenserequestapproval_updated, event.entity);
  }
}
