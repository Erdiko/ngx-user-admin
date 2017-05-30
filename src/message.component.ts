import { Component, OnDestroy } from '@angular/core';
import { MessageService }       from '../shared/message.service';
import { Subscription }         from "rxjs";
import { Router }               from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnDestroy {

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

  ngOnDestroy() {
    //Memory Leak is bad.
    this.messageSubscription.unsubscribe();
  }

}
