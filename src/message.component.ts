import { Component, OnDestroy, Inject }   from '@angular/core';
import { Subscription }                   from 'rxjs/Subscription';
import { MessageService }                 from './message.service';

@Component({
  selector: 'erdiko-message',
  template: `
<alert *ngIf="message" [type]="message.type" dismissOnTimeout="3000" dismissible=true>{{ message.body }}</alert>
`
})
export class MessageComponent implements OnDestroy {

    private message: any;
    private subscription: Subscription;

    private messageService: MessageService;

    constructor(@Inject(MessageService) messageService: MessageService) { 
        this.messageService = messageService;

        this.subscription = this.messageService
                                .getMessage()
                                .subscribe(message => { 
                                    this.message = message 
                                });
    }

    ngOnDestroy() { 
        this.subscription.unsubscribe();   
    }

}
