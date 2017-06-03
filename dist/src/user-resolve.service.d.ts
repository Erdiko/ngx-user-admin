import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from './user.model';
import { UsersService } from './users.service';
export declare class UserResolve implements Resolve<any> {
    private us;
    private router;
    constructor(us: UsersService, router: Router);
    resolve(route: ActivatedRouteSnapshot): Promise<User> | boolean;
}
