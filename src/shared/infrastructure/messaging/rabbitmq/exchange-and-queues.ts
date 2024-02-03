import { DeclarationExchanges } from './declaration-exchanges';
import { DeclarationQueues } from './declaration-queues';

export const ExchangesAndQueues: {
  [exchange: string]: string[];
} = {
  [DeclarationExchanges.user_exchange]: [
    DeclarationQueues.user_created,
    DeclarationQueues.user_updated,
    DeclarationQueues.user_deleted,
  ],
};
