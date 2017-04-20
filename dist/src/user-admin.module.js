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
import { AlertModule, ModalModule, TabsModule } from 'ngx-bootstrap';
import { UsersService } from './users.service';
import { UserListComponent } from './user-list.component';
import { UserEventLogComponent } from './user-event-log.component';
import { UsersEventLogComponent } from './users-event-log.component';
var routes = [];
var UserAdminModule = (function () {
    function UserAdminModule() {
    }
    return UserAdminModule;
}());
UserAdminModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            HttpModule,
            RouterModule.forRoot(routes),
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
            UsersEventLogComponent
        ],
        providers: [
            UsersService
        ]
    })
], UserAdminModule);
export { UserAdminModule };
//# sourceMappingURL=user-admin.module.js.map