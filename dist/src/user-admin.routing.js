import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserResolve } from './user-resolve.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersEventLogComponent } from './users-event-log/users-event-log.component';
import { UserEditComponent } from './user-edit/user-edit.component';
/**
 * Application Routes
 *
 */
// clang-format off
var userAdminRoutes = [
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
    }
];
// clang-format on
export var UserAdminRouting = RouterModule.forChild(userAdminRoutes);
//# sourceMappingURL=user-admin.routing.js.map