import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { MessageService } from './message.service';
export declare class MessageComponent {
    private messageService;
    private router;
    messageType: string;
    message: any;
    messageSubscription: Subscription;
    constructor(messageService: MessageService, router: Router);
    close(): void;
}
