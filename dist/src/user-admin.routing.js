var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from './auth.guard';
import { UserResolve } from './user-resolve.service';
import { UserListComponent } from './user-list.component';
import { UsersEventLogComponent } from './users-event-log.component';
import { UserEditComponent } from './user-edit.component';
// clang-format off
var appRoutes = [
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
var UserAdminRoutingModule = (function () {
    function UserAdminRoutingModule() {
    }
    return UserAdminRoutingModule;
}());
UserAdminRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(appRoutes, { useHash: true })
        ],
        exports: [
            RouterModule
        ],
        providers: [
            AuthGuard
        ]
    })
], UserAdminRoutingModule);
export { UserAdminRoutingModule };
//# sourceMappingURL=user-admin.routing.js.map