import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from './users.service';
/**
 * Returns a User model for a provided ID, if one is found. Else
 * return false and navigate the user to the default route
 */
export declare class UserResolve implements Resolve<any> {
    private us;
    private router;
    /**
     * set user service and router to local instances
     */
    constructor(us: UsersService, router: Router);
    resolve(route: ActivatedRouteSnapshot): any;
}
