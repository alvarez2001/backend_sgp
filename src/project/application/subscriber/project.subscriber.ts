import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Project } from '../../domain/entity/project.entity';
import { appEvents } from '@shared/infrastructure/messaging/event-emitter';
import { DeclarationQueues } from '@shared/infrastructure/messaging/rabbitmq/declaration-queues';

@EventSubscriber()
export class ProjectSubscriber implements EntitySubscriberInterface<Project> {
  listenTo() {
    return Project;
  }

  afterInsert(event: InsertEvent<Project>): void {
    appEvents.emit(DeclarationQueues.project_created, event.entity);
  }

  afterUpdate(event: UpdateEvent<Project>): void {
    appEvents.emit(DeclarationQueues.project_updated, event.entity);
  }
}
