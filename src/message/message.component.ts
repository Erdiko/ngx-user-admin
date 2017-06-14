import { Component, OnDestroy, Inject }   from '@angular/core';
import { Subscription }                   from 'rxjs/Subscription';

import { MessageService }                 from '../message.service';

import { tpl } from './message.component.tpl';

/**
 * Message Component
 * 
 * Displays flash messages from service
 */
@Component({
  selector: 'erdiko-message',
  template: tpl
})
export class MessageComponent implements OnDestroy {

    /**
     * Current message
     */
    private message: any;

    /**
     * Message service subscription
     */
    private subscription: Subscription;

    /**
     * local instance of message service
     */
    private messageService: MessageService;

    /**
     * 
     */
    constructor(@Inject(MessageService) messageService: MessageService) { 
        this.messageService = messageService;

        this.subscription = this.messageService
                                .getMessage()
                                .subscribe(message => { 
                                    this.message = message 
                                });
    }

    /**
     * stop subscription to prevent memory leaks
     */
    ngOnDestroy() { 
        this.subscription.unsubscribe();   
    }

}
