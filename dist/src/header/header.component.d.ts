import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
/**
 * Header Component
 *
 * Displays application header, with alternate header when the user is logged in
 */
export declare class HeaderComponent implements OnInit {
    private authService;
    private router;
    /**
     * set local instance of the auth service and router
     */
    constructor(authService: AuthService, router: Router);
    /**
     *
     */
    ngOnInit(): void;
    /**
     * returns true if the user is logged in, used to display full header based on user state
     */
    isLoggedIn(): boolean;
    /**
     * handle click action if the user clicks "logout"
     */
    clickLogout(): void;
}
