import { Router, CanActivate } from '@angular/router';
export declare class AuthGuard implements CanActivate {
    private router;
    constructor(router: Router);
    canActivate(): boolean;
}
