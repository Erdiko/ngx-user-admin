import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { AuthService }          from "../auth.service";

import { tpl } from './header.component.tpl';

/**
 * Header Component
 * 
 * Displays application header, with alternate header when the user is logged in
 */
@Component({
  selector: 'app-header',
  template: tpl
})
export class HeaderComponent implements OnInit {

    /**
     * set local instance of the auth service and router
     */
    constructor(
        private authService: AuthService,
        private router: Router) { 

    }

    /**
     * 
     */
    ngOnInit() { }

    /**
     * returns true if the user is logged in, used to display full header based on user state
     */
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    /**
     * handle click action if the user clicks "logout"
     */
    clickLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
