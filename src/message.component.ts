import { Component, NgModule, OnInit, ViewChild, AfterViewInit, Inject }   from '@angular/core';
import { Subscription }         from "rxjs";
import { Router }               from '@angular/router';

import { MessageService }       from './message.service';

@Component({
  selector: 'erdiko-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {

  public messageType: string;
  public message: any;
  public messageSubscription: Subscription;

  constructor(private messageService: MessageService,
              private router:         Router)        { 


    this.messageSubscription = this.messageService
                                   .getMessage()
                                   .subscribe(message => this.message = message);
    
  }

  close(){
    this.message = null;
  }

}
