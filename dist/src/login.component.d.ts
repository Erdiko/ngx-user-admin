import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
export declare class LoginComponent implements OnInit {
    private authService;
    private router;
    private fb;
    wait: any;
    title: string;
    loginForm: FormGroup;
    loggedOut: string;
    error: string;
    constructor(authService: AuthService, router: Router, fb: FormBuilder);
    ngOnInit(): void;
    private _initForm();
    onSubmit({value, valid}: {
        value: any;
        valid: boolean;
    }): void;
}
