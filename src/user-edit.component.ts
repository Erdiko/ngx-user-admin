import { Component, NgModule, OnInit, ViewChild, AfterViewInit, Inject }   from '@angular/core';
import { Router, ActivatedRoute }               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

import { MessageService }       from './message.service';
import { UsersService }         from './users.service';
import { User }                 from "./user.model";
import { PasswordComponent }    from './password.component';

import { AlertComponent, TabsModule } from 'ngx-bootstrap';

@Component({
  selector: 'erdiko-user-edit',
  providers: [MessageService],
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

    @ViewChild(PasswordComponent) passwordComponent: PasswordComponent

    public usersService: UsersService;
    public route: ActivatedRoute;
    public router: Router;
    public fb: FormBuilder;
    public messageService: MessageService;

    public wait: any;

    public passWait: any;

    private title: string;

    public userForm: FormGroup;
    public passwordForm: FormGroup;

    public error: string;
    public msg: string;

    public passError: string;
    public passMsg: string;

    public user: User;

    constructor(
           @Inject(UsersService) usersService: UsersService,
           @Inject(ActivatedRoute) route: ActivatedRoute,
           @Inject(Router) router: Router,
           @Inject(MessageService) messageService: MessageService) { 

        // init the wait state (and indication animation) to 'off'
        this.wait       = false;
        this.passWait   = false;

        this.usersService   = usersService;
        this.messageService = messageService;
        this.route          = route;
        this.router         = router;

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

        this.msg = this.error = '';

        if(valid) {
            if(this.user.id) {
                value.id = this.user.id;
                return this.usersService.updateUser(value)
                           .then(res => this._handleResponse(res))
                           .catch(error => this.error = error);
            } else {

                let create = {
                    email: value.email,
                    name: value.name,
                    role: value.role,
                    password: this.passwordForm.controls['password'].value
                };

                return this.usersService.createUser(create)
                           .then(res => this._handleResponse(res))
                           .catch(error => this.error = error);
            }
        }
    }
    
    private _handleResponse(res: any) {
        this.wait = false;
        if(true == res.success) {
            //this.msg = "User record was successfully updated."
            this.messageService.sendMessage("edit-user", "success");

            if("create" === res.method) {
                // navigate to Edit User for the new user
                this.router.navigate(['/user/' + res.user.id]);
                this.messageService.sendMessage("create-user", "success");
            }

        } else {
            this._handleError(res.error_message);
        }
    }

    onSubmitChangepass({ value, valid }: { value: any, valid: boolean }) {
        this.passWait = true;
        this.passMsg = this.passError = '';

        if(valid) {
            return this.usersService.changePassword(this.user.id, value.passwordInput.password)
                       .then(res => this._handlePasswordResponse(res))
                       .catch(error => this.passError = error);
        }
    }

    private _handlePasswordResponse(res: any) {
        this.passWait = false;

        this.passwordForm.reset();

        if(true == res.success) {
            this.messageService.sendMessage("edit-password", "success");
        } else {
            this.passError = res.error_message;
        }
    }

    private _handleError(error: string) {
        this.error = error;
    }

    public createEditHeader() {
        let panelHeader = this.user.id ? "Edit User" : "Create User";
        return panelHeader;
    }

}
