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
  template: `
<div class="row">
    <div class="col-xs-12">
        <button class="btn btn-info btn-sm" routerLink="/list/" (click)="messageService.clearMessage()">
            <i class="fa fa-chevron-left" aria-hidden="true"></i> Back to User List
        </button>
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <br/>
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <div id="id-title" *ngIf="user.id">
            User {{ user.id }}
        </div>
        <div class="panel panel-default" id="edit-update">
            <tabset (click)="messageService.clearMessage()">
                <tab [heading]="createEditHeader()">
                    <div class="panel-body">
                        <alert *ngIf="msg" type="success">{{ msg }}</alert>
                        <alert *ngIf="error" type="danger">{{ error }}</alert>

                        <form 
                                id="user-edit" 
                                class="form-horizontal"
                                novalidate 
                                (ngSubmit)="onSubmit(userForm)" 
                                [formGroup]="userForm"
                            >

                            <div class="form-group" *ngIf="user && user.id">
                                <label for="name" class="col-xs-2 control-label">ID</label>
                                <div class="col-xs-10">
                                    <p>{{ user.id }}</p>
                                </div>
                            </div>
                            <div class="form-group" *ngIf="user && user.created_at">
                                <label for="name" class="col-xs-2 control-label">Joined</label>
                                <div class="col-xs-10">
                                    <p *ngIf="!user.created_at">n/a</p>
                                    <p>{{ user.created_at }}</p>
                                </div>
                            </div>
                            <div class="form-group" *ngIf="user.id">
                                <label for="name" class="col-xs-2 control-label">Last Login</label>
                                <div class="col-xs-10">
                                    <p *ngIf="!user.last_login">n/a</p>
                                    <p>{{ user.last_login }}</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="name" class="col-xs-2 control-label">Name</label>
                                <div class="col-xs-10">
                                    <input type="text" class="form-control" name="name" formControlName="name" placeholder="Name">
                                    <div class="text-danger" *ngIf="userForm.get('name').hasError('required') && userForm.get('name').touched">
                                    Name is required
                                    </div>
                                    <div class="text-danger" *ngIf="userForm.get('name').hasError('minlength') && userForm.get('name').touched">
                                    Minimum of 2 characters
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="col-xs-2 control-label">Email</label>
                                <div class="col-xs-10">
                                    <input type="email" class="form-control" name="email" 
                                            formControlName="email" placeholder="Email"
                                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$">
                                    <div class="text-danger" *ngIf="userForm.get('email').hasError('required') && userForm.get('email').touched">
                                    Email is required
                                    </div>
                                    <div class="text-danger" *ngIf="userForm.get('email').hasError('pattern') && userForm.get('email').touched">
                                    A Valid email is required
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="role" class="col-xs-2 control-label">Role</label>
                                <div class="col-xs-10" id="select-role">
                                        <select class="form-control" name="role" formControlName="role">
                                            <option value="2">Admin</option>
                                            <option value="1">User</option>
                                        </select>
                                    <div class="text-danger" *ngIf="userForm.get('role').hasError('required') && userForm.get('role').touched">
                                    Role is required
                                    </div>
                                </div>
                            </div>
                            
                            <!--show password input if creating user-->
                            <erdiko-password *ngIf="!user.id" [passwordInput]="userForm.controls.passwordInput"></erdiko-password>

                            <div class="form-group">
                                <div class="col-xs-offset-2 col-xs-4">
                                    <button type="cancel" class="btn btn-warning" routerLink="/list/" (click)="messageService.clearMessage()"> Cancel</button>
                                </div>
                                <div class="col-xs-offset-2 col-xs-4">
                                    <button type="submit" class="btn btn-success" [disabled]="userForm.invalid || wait">
                                        Save
                                        <i *ngIf="wait" class="fa fa-refresh fa-spin fa-fw"></i> 
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </tab>

                <tab heading="Update Password" *ngIf="user.id">

                    <div class="panel-body">

                        <alert *ngIf="passMsg" type="success">{{ passMsg }}</alert>
                        <alert *ngIf="passError" type="danger">{{ passError }}</alert>

                        <form 
                                id="user-password-change" 
                                class="form-horizontal"
                                novalidate 
                                (ngSubmit)="onSubmitChangepass(passwordForm)" 
                                [formGroup]="passwordForm"
                            >
                            <erdiko-password [passwordInput]="passwordForm.controls.passwordInput"></erdiko-password>

                            <div class="form-group">
                                <div class="col-xs-offset-2 col-xs-4">
                                    <button type="cancel" class="btn btn-warning" routerLink="/list/">Cancel</button>
                                </div>
                                <div class="col-xs-offset-2 col-xs-4">
                                    <button type="submit" class="btn btn-success" [disabled]="passwordForm.controls.passwordInput.invalid || passWait">
                                        Save
                                        <i *ngIf="passWait" class="fa fa-refresh fa-spin fa-fw"></i> 
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </tab>
            </tabset>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-xs-12">
        <br/>
    </div>
</div>
`  
})
export class UserEditComponent implements OnInit {

    @ViewChild(PasswordComponent) passwordComponent: PasswordComponent

    private usersService: UsersService;
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
           private messageService: MessageService,
           private route: ActivatedRoute,
           private router: Router,
           private fb: FormBuilder
        ) { 

        // init the wait state (and indication animation) to 'off'
        this.wait       = false;
        this.passWait   = false;

        this.usersService = usersService;

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

        this.userForm = this.fb.group({
            name:  ['', [Validators.required, Validators.minLength(3)]],
            email: ['', Validators.required],
            role:  ['', Validators.required],
            passwordInput: this.fb.group({
                password: ['', [Validators.required, Validators.minLength(3)]],
                confirm: ['', Validators.required],
            })
        });

        this.passwordForm = this.fb.group({
            passwordInput: this.fb.group({
                password:  ['', [Validators.required, Validators.minLength(3)]],
                confirm: ['', Validators.required],
            })
        });

        if(this.user.id) {
            this.userForm.controls['name'].setValue(this.user.name);
            this.userForm.controls['email'].setValue(this.user.email);
            this.userForm.controls['role'].setValue(this.user.role.id);
        }

    }

    onSubmit({ value, valid }: { value: any, valid: boolean }) {

        let create = {
            email: value.email,
            name: value.name,
            role: value.role,
            password: value.passwordInput.password
        };

        this.wait = true;

        this.msg = this.error = '';

        if(valid) {
            if(this.user.id) {
                value.id = this.user.id;
                return this.usersService.updateUser(value)
                           .then(res => this._handleResponse(res))
                           .catch(error => this.error = error);
            } else {
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

        console.log("create res", res);
        if(true == res.success) {
            this.messageService.sendMessage("edit-password", "success");
        } else {
            console.log("error res", res);
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
