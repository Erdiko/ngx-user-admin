import { Component, NgModule, OnInit, ViewChild, AfterViewInit, Inject }   from '@angular/core';
import { Router, ActivatedRoute }               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

import { UsersService }         from '../users.service';
import { User }                 from "../user.model";
import { MessageService }       from '../message.service';

import { AlertComponent, TabsModule } from 'ngx-bootstrap';

import { PasswordComponent }    from '../password/password.component';

import { tpl } from './user-edit.component.tpl';

/**
 * User Edit Component
 *
 * Component to display form to create a new user or to edit an exiting user
 */
@Component({
  selector: 'erdiko-user-edit',
  template: tpl
})
export class UserEditComponent implements OnInit {

    @ViewChild(PasswordComponent) passwordComponent: PasswordComponent

    public usersService: UsersService;
    public route: ActivatedRoute;
    public router: Router;
    public fb: FormBuilder;
    public messageService: MessageService;

    /**
     * Flag used to show/hide the wait spinner
     */
    public wait: any;

    /**
     * Flag used to show/hide the wait spinner
     */
    public passWait: any;

    private title: string;

    public userForm: FormGroup;
    public passwordForm: FormGroup;

    public user: User;

    // TODO replace this with an array from a service 
    public roles = [
        { "value": "3", "key": "General" },
        { "value": "2", "key": "Admin" },
        { "value": "1", "key": "Super Admin" },
    ];

    constructor(
           @Inject(UsersService) usersService: UsersService,
           @Inject(ActivatedRoute) route: ActivatedRoute,
           @Inject(Router) router: Router,
           @Inject(MessageService) messageService: MessageService) { 

        // init the wait state (and indication animation) to 'off'
        this.wait       = false;
        this.passWait   = false;

        this.usersService   = usersService;
        this.route          = route;
        this.router         = router;

        this.messageService = messageService;

        this.fb = new FormBuilder();

        this.user = new User();
    }

    ngOnInit() {

        this.route.data.forEach((data: { user: any }) => {
            if(undefined !== data.user && data.user) {
                this.user = data.user;
            }
        });

        this._initForms();
    }

    private _initForms() {

        this.passwordForm = this.fb.group({
            password:  ['', [Validators.required, Validators.minLength(3)]],
            confirm: ['', Validators.required]
        });

        this.userForm = this.fb.group({
            name:  ['', [Validators.required, Validators.minLength(3)]],
            email: ['', Validators.required],
            role:  ['', Validators.required]
        });

        if(this.user.id) {
            this.userForm.controls['name'].setValue(this.user.name);
            this.userForm.controls['email'].setValue(this.user.email);
            this.userForm.controls['role'].setValue(this.user.role.id);
        }

    }

    isUserFormValid() {

        if(this.wait) {
            return false;
        }

        if(!this.user.id) {
            if(!this.passwordForm.valid) {
                return false;
            } else {
                if(this.passwordForm.controls['password'].value !== this.passwordForm.controls['confirm'].value) {
                    return false;
                }
            }
        }

        return (this.userForm.valid && !this.wait);
    }

    isPassFormValid() {

        if(this.passWait) {
            return false;
        }

        if(!this.passwordForm.valid) {
            return false;
        } else {
            if(this.passwordForm.controls['password'].value !== this.passwordForm.controls['confirm'].value) {
                return false;
            }
        }

        return true;
    }

    onSubmit({ value, valid }: { value: any, valid: boolean }) {

        this.wait = true;

        console.log("valid", valid);
        if(valid) {
            if(this.user.id) {
                value.id = this.user.id;
                return this.usersService.updateUser(value)
                           .then(res => this._handleResponse(res))
                           .catch(error => this._handleError(error));
            } else {

                let create = {
                    email: value.email,
                    name: value.name,
                    role: value.role,
                    password: this.passwordForm.controls['password'].value
                };

                return this.usersService.createUser(create)
                           .then(res => this._handleResponse(res))
                           .catch(error => this._handleError(error));
            }
        }
    }
    
    private _handleResponse(res: any) {
        this.wait = false;
        if(true == res.success) {
            this.messageService.setMessage([{"type": "success", "body": "User record was successfully updated"}]);

            if("create" === res.method) {
                // navigate to Edit User for the new user
                this.router.navigate(['/user/' + res.user.id]);
                this.messageService.setMessage([{"type": "success", "body": "User was successfully created"}]);
            }

        } else {
            this._handleError(res.error_message);
        }
    }

    onSubmitChangepass({ value, valid }: { value: any, valid: boolean }) {
        this.passWait = true;
        if(valid) {
            return this.usersService.changePassword(this.user.id, value.password)
                       .then(res => this._handlePasswordResponse(res))
                       .catch(error => this._handleError(error));
        }
    }

    private _handlePasswordResponse(res: any) {
        this.passWait = false;

        this.passwordForm.reset();

        if(true == res.success) {
            this.messageService.setMessage([{"type": "success", "body": "User password successfully updated"}]);
        } else {
            this.messageService.setMessage([{"type": "danger", "body": res.error}, {"type": "danger", "body": res.error}]);
        }
    }

    private _handleError(error: string) {
        this.error = error;
        this.messageService.setMessage([{"type": "danger", "body": error}]);
    }

    public createEditHeader() {
        let panelHeader = this.user.id ? "Edit User" : "Create User";
        return panelHeader;
    }

}
