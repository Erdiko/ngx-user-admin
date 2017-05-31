import { Subscription } from "rxjs";
import { MessageService } from './message.service';
export declare class MessageComponent {
    private messageService;
    messageType: string;
    message: any;
    messageSubscription: Subscription;
    constructor(messageService: MessageService);
    close(): void;
}
