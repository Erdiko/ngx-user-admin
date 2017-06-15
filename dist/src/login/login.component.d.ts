import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';
/**
 * Login Component
 *
 * Displays login form and handles form submissions
 */
export declare class LoginComponent implements OnInit {
    private authService;
    private router;
    private fb;
    /**
     * Flag used to show/hide the wait spinner
     */
    wait: any;
    /**
     * Title of the login form
     */
    title: string;
    /**
     * local MessageService instance
     */
    messageService: MessageService;
    /**
     * FormGroup instance used to construct the login form
     */
    loginForm: FormGroup;
    /**
     *
     */
    loggedOut: string;
    /**
     *
     */
    error: string;
    /**
     *
     */
    constructor(messageService: MessageService, authService: AuthService, router: Router, fb: FormBuilder);
    /**
     * initialize and render the form on the onInit life cycle hook
     */
    ngOnInit(): void;
    /**
     * initialize the form group and add validators
     */
    private _initForm();
    /**
     * handle the onSubmit action for the login form
     *
     *
     */
    onSubmit({value, valid}: {
        value: any;
        valid: boolean;
    }): void;
}
