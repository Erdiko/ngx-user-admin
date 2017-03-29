import { Component, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserAdminModule } from '../index';

@Component({
    selector: 'my-app',
    template: `
     <app-user-list></app-user-list>
  `,
})
export class AppComponent {

}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        UserAdminModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
