import { DeclarationExchanges } from './declaration-exchanges';
import { DeclarationQueues } from './declaration-queues';

export const ExchangesAndQueues: {
    [exchange: string]: string[];
} = {
    [DeclarationExchanges.user_exchange]: [
        DeclarationQueues.user_created,
        DeclarationQueues.user_updated,
    ],
    [DeclarationExchanges.authentication_exchange]: [
        DeclarationQueues.authentication_created,
        DeclarationQueues.authentication_updated,
    ],
};
