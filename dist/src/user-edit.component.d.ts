import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from './message.service';
import { UsersService } from './users.service';
import { User } from "./user.model";
import { PasswordComponent } from './password.component';
export declare class UserEditComponent implements OnInit {
    private messageService;
    private route;
    private router;
    private fb;
    passwordComponent: PasswordComponent;
    private usersService;
    wait: any;
    passWait: any;
    private title;
    userForm: FormGroup;
    passwordForm: FormGroup;
    error: string;
    msg: string;
    passError: string;
    passMsg: string;
    user: User;
    constructor(usersService: UsersService, messageService: MessageService, route: ActivatedRoute, router: Router, fb: FormBuilder);
    ngOnInit(): void;
    private _initForms();
    onSubmit({value, valid}: {
        value: any;
        valid: boolean;
    }): Promise<any> | undefined;
    private _handleResponse(res);
    onSubmitChangepass({value, valid}: {
        value: any;
        valid: boolean;
    }): Promise<any> | undefined;
    private _handlePasswordResponse(res);
    private _handleError(error);
    createEditHeader(): string;
}
