import { Subscription } from "rxjs";
import { MessageService } from './message.service';
export declare class MessageComponent {
    messageType: string;
    message: any;
    messageSubscription: Subscription;
    messageService: MessageService;
    constructor(messageService: MessageService);
    close(): void;
}
