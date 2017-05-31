import { Component, NgModule, OnInit, ViewChild, AfterViewInit, Inject }   from '@angular/core';
import { Subscription }         from "rxjs";
import { MessageService }       from './message.service';

@Component({
  selector: 'erdiko-message',
  providers: [MessageService],
  template: `
<alert *ngIf="message" [type]="message.type" (click)="close()">{{ message.body }}</alert>
`
})
export class MessageComponent {

    public messageType: string;
    public message: any;
    public messageSubscription: Subscription;

    public messageService: MessageService;

    constructor(@Inject(MessageService) messageService: MessageService) { 
        this.messageService = messageService;
    }

    close(){
        this.message = null;
    }

}
