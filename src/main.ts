import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AlertModule,
         ModalModule,
         TabsModule }          from 'ngx-bootstrap';


import { AppComponent } from './app.component';

@NgModule({
  imports: [ 
      BrowserModule,
  
      AlertModule.forRoot(),
      ModalModule.forRoot(),
      TabsModule.forRoot()
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
