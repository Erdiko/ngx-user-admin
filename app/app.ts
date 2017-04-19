import { Component, NgModule }  from '@angular/core'
import { FormsModule }          from '@angular/forms';
import { BrowserModule }        from '@angular/platform-browser';
import { UserAdminModule }      from '../index';

@Component({
    selector: 'my-app',
    template: `
    <h3>NG User Admin Test</h3>
    <erdiko-user-admin></erdiko-user-admin>
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
