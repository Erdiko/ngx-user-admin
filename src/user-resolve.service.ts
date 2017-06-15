import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';

import { User }           from './user.model';
import { UsersService }   from './users.service';

/**
 * Returns a User model for a provided ID, if one is found. Else
 * return false and navigate the user to the default route
 */
@Injectable()
export class UserResolve implements Resolve<any> {

    /**
     * set user service and router to local instances
     */
    constructor(
                private us: UsersService, 
                private router: Router
                ) {

    }

    resolve(route: ActivatedRouteSnapshot): Promise<User>|boolean {
        let id = route.params['id'];
        return this.us.getUser(id).then(user => {
            if (user) {
                return user;
            } else {
                this.router.navigate(['']);
                return false;
            }
        });
    }

}
