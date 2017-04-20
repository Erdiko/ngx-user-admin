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
import { UserListComponent } from './user-list.component';
import { UserEventLogComponent } from './user-event-log.component';
import { UsersEventLogComponent } from './users-event-log.component';
import { PasswordComponent } from './password.component';
import { UserEditComponent } from './user-edit.component';
var routes = [];
var UserAdminModule = UserAdminModule_1 = (function () {
    function UserAdminModule() {
    }
    UserAdminModule.forRoot = function () {
        return {
            ngModule: UserAdminModule_1,
            providers: [AuthService, UsersService]
        };
    };
    return UserAdminModule;
}());
UserAdminModule = UserAdminModule_1 = __decorate([
    NgModule({
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
            UsersEventLogComponent,
            UserEditComponent
        ]
    })
], UserAdminModule);
export { UserAdminModule };
var UserAdminModule_1;
//# sourceMappingURL=user-admin.module.js.map