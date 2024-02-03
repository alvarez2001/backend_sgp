import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from '../../domain/entity/user.entity';
import { appEvents } from '../../../shared/infrastructure/messaging/event-emitter';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  afterInsert(event: InsertEvent<User>): void {
    appEvents.emit('user.created', event.entity);
  }
}
