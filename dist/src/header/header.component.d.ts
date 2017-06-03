import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
export declare class HeaderComponent implements OnInit {
    private authService;
    private router;
    constructor(authService: AuthService, router: Router);
    ngOnInit(): void;
    isLoggedIn(): boolean;
    clickLogout(): void;
}
