var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, ModalModule, TabsModule } from 'ngx-bootstrap';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { MessageService } from './message.service';
import { AuthGuard } from './auth.guard';
import { UserResolve } from './user-resolve.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEventLogComponent } from './user-event-log/user-event-log.component';
import { UsersEventLogComponent } from './users-event-log/users-event-log.component';
import { PasswordComponent } from './password/password.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MessageComponent } from './message/message.component';
/**
 * User Admin Module
 */
var UserAdminModule = (function () {
    function UserAdminModule() {
    }
    UserAdminModule_1 = UserAdminModule;
    UserAdminModule.forRoot = function () {
        return {
            ngModule: UserAdminModule_1,
            providers: [AuthService, AuthGuard, UsersService, UserResolve, MessageService]
        };
    };
    UserAdminModule = UserAdminModule_1 = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                HttpModule,
                FormsModule,
                RouterModule,
                ReactiveFormsModule,
                AlertModule,
                ModalModule,
                TabsModule //,
                //UserAdminRouting
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
    ], UserAdminModule);
    return UserAdminModule;
    var UserAdminModule_1;
}());
export { UserAdminModule };
//# sourceMappingURL=user-admin.module.js.map