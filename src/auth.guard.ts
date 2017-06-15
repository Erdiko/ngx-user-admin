import { Injectable }          from '@angular/core';
import { Router, CanActivate } from '@angular/router';

/**
 * Route Guard preventing access to users without the expected localStorage value
 *
 */
@Injectable()
export class AuthGuard implements CanActivate {

    /**
     * initialize the guard class and set router to injected Router instance
     */
    constructor(private router: Router) { }

    /**
     * returns true if the user has a valid localStorage token
     * and allows the user to access logged in routes
     */
    canActivate() : boolean {

        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        //TODO add flash message!
        this.router.navigate(['/login']);
        //this.messageService.sendMessage("login", "no-access");
        return false;
    }

}
