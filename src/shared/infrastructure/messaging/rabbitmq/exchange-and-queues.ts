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
    [DeclarationExchanges.project_exchange]: [
        DeclarationQueues.project_created,
        DeclarationQueues.project_updated,
    ],
    [DeclarationExchanges.projectexpenserequest_exchange]: [
        DeclarationQueues.projectexpenserequest_created,
        DeclarationQueues.projectexpenserequest_updated,
    ],
    [DeclarationExchanges.projectexpenserequestapproval_exchange]: [
        DeclarationQueues.projectexpenserequestapproval_created,
        DeclarationQueues.projectexpenserequestapproval_updated,
    ],
    [DeclarationExchanges.projectexpenserequestproduct_exchange]: [
        DeclarationQueues.projectexpenserequestproduct_created,
        DeclarationQueues.projectexpenserequestproduct_updated,
    ],
};
