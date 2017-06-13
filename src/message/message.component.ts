import { Component, OnDestroy, Inject }   from '@angular/core';
import { Subscription }                   from 'rxjs/Subscription';

import { MessageService }                 from '../message.service';

import { tpl } from './message.component.tpl';

@Component({
  selector: 'erdiko-message',
  template: tpl
})
export class MessageComponent implements OnDestroy {

    private messages: any;
    private subscription: Subscription;

    private messageService: MessageService;

    constructor(@Inject(MessageService) messageService: MessageService) { 
        this.messageService = messageService;

        this.subscription = this.messageService
                                .getMessage()
                                .subscribe(message => { 
                                    this.messages = message 
                                });
    }

    ngOnDestroy() { 
        this.subscription.unsubscribe();   
    }

}
