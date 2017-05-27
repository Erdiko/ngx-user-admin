import { NgModule, ModuleWithProviders }             from '@angular/core';

import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule }               from '@angular/http';

import { RouterModule, Routes }     from '@angular/router';

import { FormsModule,
         ReactiveFormsModule }      from '@angular/forms';

import { AlertModule,
         ModalModule,
         TabsModule }               from 'ngx-bootstrap';

import { AuthService }              from './auth.service';
import { UsersService }             from './users.service';
import { MessageService }           from './message.service';

import { UserListComponent }        from './user-list.component';
import { UserEventLogComponent }    from './user-event-log.component';
import { UsersEventLogComponent }   from './users-event-log.component';

import { PasswordComponent }       from './password.component';
import { UserEditComponent }       from './user-edit.component';

const routes: Routes = [
];

@NgModule({
    imports: [ 
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,

        AlertModule,
        ModalModule,
        TabsModule
    ],
    declarations: [ 
        UserListComponent,
        UserEventLogComponent,
        UsersEventLogComponent,
        UserEditComponent,
        PasswordComponent
    ],
    exports: [ 
        UserListComponent,
        UserEventLogComponent,
        UsersEventLogComponent
    ],
    providers: [
        AuthService,
        UsersService,
        MessageService
    ]
})
export class UserAdminModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserAdminModule,
            providers: [AuthService, UsersService, MessageService]
        }
    }
}
