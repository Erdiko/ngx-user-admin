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

import { AuthGuard }                from './auth.guard';
import { UserResolve }              from './user-resolve.service';

import { HeaderComponent }          from './header/header.component';
import { LoginComponent }           from './login/login.component';
import { HomeComponent }            from './home/home.component';

import { UserListComponent }        from './user-list/user-list.component';
import { UserEventLogComponent }    from './user-event-log/user-event-log.component';
import { UsersEventLogComponent }   from './users-event-log/users-event-log.component';

import { PasswordComponent }        from './password/password.component';
import { UserEditComponent }        from './user-edit/user-edit.component';

import { MessageComponent }         from './message/message.component';

/**
 * Application Routes
 *
 */
// clang-format off
const appRoutes = [
    {
        path: 'list',
        canActivate: [
            AuthGuard
        ],
        component: UserListComponent
    },
    {
        path: 'events',
        canActivate: [
            AuthGuard
        ],
        component: UsersEventLogComponent
    },
    {
        path: 'user',
        canActivate: [
            AuthGuard
        ],
        component: UserEditComponent
    },
    {
        path: 'user/:id',
        component: UserEditComponent,
        canActivate: [
            AuthGuard
        ],
        resolve: {
            user: UserResolve
        }
    },
    {
        path: '',
        canActivate: [
            AuthGuard
        ],
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
// clang-format on

/**
 * User Admin Module
 */
@NgModule({
    imports: [ 
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,

        AlertModule,
        ModalModule,
        TabsModule,

        RouterModule.forRoot(appRoutes)
    ],
    declarations: [ 
        HeaderComponent,
        LoginComponent,
        HomeComponent,
        UserListComponent,
        UserEventLogComponent,
        UsersEventLogComponent,
        UserEditComponent,
        PasswordComponent,
        MessageComponent
    ],
    exports: [ 
        HeaderComponent,
        LoginComponent,
        HomeComponent,
        UserListComponent,
        UserEventLogComponent,
        UsersEventLogComponent,
        UserEditComponent,
        MessageComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        UsersService,
        UserResolve,
        MessageService
    ]
})
export class UserAdminModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserAdminModule,
            providers: [AuthService, AuthGuard, UsersService, UserResolve, MessageService]
        }
    }
}
