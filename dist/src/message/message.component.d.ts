import { OnDestroy } from '@angular/core';
import { MessageService } from '../message.service';
export declare class MessageComponent implements OnDestroy {
    private messages;
    private subscription;
    private messageService;
    constructor(messageService: MessageService);
    ngOnDestroy(): void;
}
