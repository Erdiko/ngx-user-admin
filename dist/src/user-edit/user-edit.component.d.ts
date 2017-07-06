import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';
import { User } from "../user.model";
import { MessageService } from '../message.service';
import { PasswordComponent } from '../password/password.component';
/**
 * User Edit Component
 *
 * Component to display form to create a new user or to edit an exiting user
 */
export declare class UserEditComponent implements OnInit {
    passwordComponent: PasswordComponent;
    usersService: UsersService;
    route: ActivatedRoute;
    router: Router;
    fb: FormBuilder;
    messageService: MessageService;
    /**
     * Flag used to show/hide the wait spinner
     */
    wait: any;
    /**
     * Flag used to show/hide the wait spinner
     */
    passWait: any;
    private title;
    userForm: FormGroup;
    passwordForm: FormGroup;
    user: User;
    roles: {
        "value": string;
        "key": string;
    }[];
    constructor(usersService: UsersService, route: ActivatedRoute, router: Router, messageService: MessageService);
    ngOnInit(): void;
    private _initForms();
    isUserFormValid(): boolean;
    isPassFormValid(): boolean;
    onSubmit({value, valid}: {
        value: any;
        valid: boolean;
    }): Promise<void> | undefined;
    private _handleResponse(res);
    onSubmitChangepass({value, valid}: {
        value: any;
        valid: boolean;
    }): Promise<void> | undefined;
    private _handlePasswordResponse(res);
    private _handleError(error);
    createEditHeader(): string;
}
