import { NgModule } from '@angular/core';

import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule }               from '@angular/http';

import { RouterModule, Routes }     from '@angular/router';

import { Ng2BootstrapModule }       from 'ngx-bootstrap';

import { AuthService }              from './auth.service';
import { UsersService }             from './users.service';

import { UserListComponent }        from './user-list.component';

const loginRoutes: Routes = [
];

@NgModule({
    imports: [ 
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(loginRoutes),

        Ng2BootstrapModule.forRoot()
    ],
    declarations: [ 
        UserListComponent
    ],
    exports: [ 
        UserListComponent,
    ],
    providers: [
        AuthService,
        UsersService,
    ],
})
export class UserAdminModule {}
