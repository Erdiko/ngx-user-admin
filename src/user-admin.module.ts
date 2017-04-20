import { NgModule } from '@angular/core';

import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule }               from '@angular/http';

import { RouterModule, Routes }     from '@angular/router';

import { AlertModule,
         ModalModule,
         TabsModule }               from 'ngx-bootstrap';

import { AuthService }              from './auth.service';
import { UsersService }             from './users.service';

import { UserListComponent }        from './user-list.component';
import { UserEventLogComponent }    from './user-event-log.component';
import { UsersEventLogComponent }   from './users-event-log.component';

const loginRoutes: Routes = [
];

@NgModule({
    imports: [ 
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(loginRoutes),

        AlertModule,
        ModalModule,
        TabsModule
    ],
    declarations: [ 
        UserListComponent,
        UserEventLogComponent,
        UsersEventLogComponent
    ],
    exports: [ 
        UserListComponent,
        UserEventLogComponent,
        UsersEventLogComponent,
    ],
    providers: [
        AuthService,
        UsersService
    ]
})
export class UserAdminModule {}
