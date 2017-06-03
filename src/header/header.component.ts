import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { AuthService }          from "../auth.service";

import { tpl } from './header.component.tpl';

@Component({
  selector: 'app-header',
  template: tpl
})
export class HeaderComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router) { 

    }

    ngOnInit() { }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    clickLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
