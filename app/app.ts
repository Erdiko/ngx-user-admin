import { Component, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserAdminModule } from '../index';

@Component({
    selector: 'my-app',
    template: `
     <div class="container">
         <div class="row">
             <div class="col-xs-12">
                 <h3>User List Component</h3>
                 <erdiko-user-list></erdiko-user-list>
             </div>
         </div>
     </div>
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
