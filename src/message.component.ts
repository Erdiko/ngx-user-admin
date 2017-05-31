import { Component, NgModule, OnInit, ViewChild, AfterViewInit, Inject }   from '@angular/core';
import { Subscription }         from "rxjs";
import { MessageService }       from './message.service';

@Component({
  selector: 'erdiko-message',
  template: `
<alert *ngIf="message" [type]="message.type" (click)="close()">{{ message.body }}</alert>
`
})
export class MessageComponent {

  public messageType: string;
  public message: any;
  public messageSubscription: Subscription;

  constructor(private messageService: MessageService) { 


    this.messageSubscription = this.messageService
                                   .getMessage()
                                   .subscribe(message => this.message = message);
    
  }

  close(){
    this.message = null;
  }

}
