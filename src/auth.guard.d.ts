import { Router, CanActivate } from '@angular/router';
/**
 * Route Guard preventing access to users without the expected localStorage value
 *
 */
export declare class AuthGuard implements CanActivate {
    private router;
    /**
     * initialize the guard class and set router to injected Router instance
     */
    constructor(router: Router);
    /**
     * returns true if the user has a valid localStorage token
     * and allows the user to access logged in routes
     */
    canActivate(): boolean;
}
