var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { User } from "./user.model";
import { PasswordComponent } from './password.component';
var UserEditComponent = (function () {
    function UserEditComponent(usersService, route, router) {
        // init the wait state (and indication animation) to 'off'
        this.wait = false;
        this.passWait = false;
        this.usersService = usersService;
        this.route = route;
        this.router = router;
        this.fb = new FormBuilder();
        this.user = new User();
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.forEach(function (data) {
            if (undefined !== data.user && data.user) {
                _this.user = data.user;
            }
        });
        this._initForms();
    };
    UserEditComponent.prototype._initForms = function () {
        this.passwordForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(3)]],
            confirm: ['', Validators.required]
        });
        this.userForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', Validators.required],
            role: ['', Validators.required]
        });
        if (this.user.id) {
            this.userForm.controls['name'].setValue(this.user.name);
            this.userForm.controls['email'].setValue(this.user.email);
            this.userForm.controls['role'].setValue(this.user.role.id);
        }
    };
    UserEditComponent.prototype.isUserFormValid = function () {
        if (this.wait) {
            return false;
        }
        if (!this.user.id) {
            if (!this.passwordForm.valid) {
                return false;
            }
            else {
                if (this.passwordForm.controls['password'].value !== this.passwordForm.controls['confirm'].value) {
                    return false;
                }
            }
        }
        return (this.userForm.valid && !this.wait);
    };
    UserEditComponent.prototype.isPassFormValid = function () {
        if (this.passWait) {
            return false;
        }
        if (!this.passwordForm.valid) {
            return false;
        }
        else {
            if (this.passwordForm.controls['password'].value !== this.passwordForm.controls['confirm'].value) {
                return false;
            }
        }
        return true;
    };
    UserEditComponent.prototype.onSubmit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.wait = true;
        this.msg = this.error = '';
        if (valid) {
            if (this.user.id) {
                value.id = this.user.id;
                return this.usersService.updateUser(value)
                    .then(function (res) { return _this._handleResponse(res); })
                    .catch(function (error) { return _this.error = error; });
            }
            else {
                var create = {
                    email: value.email,
                    name: value.name,
                    role: value.role,
                    password: this.passwordForm.controls['password'].value
                };
                return this.usersService.createUser(create)
                    .then(function (res) { return _this._handleResponse(res); })
                    .catch(function (error) { return _this.error = error; });
            }
        }
    };
    UserEditComponent.prototype._handleResponse = function (res) {
        this.wait = false;
        if (true == res.success) {
            //this.msg = "User record was successfully updated."
            //this.messageService.sendMessage("edit-user", "success");
            if ("create" === res.method) {
                // navigate to Edit User for the new user
                this.router.navigate(['/user/' + res.user.id]);
                //this.messageService.sendMessage("create-user", "success");
            }
        }
        else {
            this._handleError(res.error_message);
        }
    };
    UserEditComponent.prototype.onSubmitChangepass = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.passWait = true;
        this.passMsg = this.passError = '';
        if (valid) {
            return this.usersService.changePassword(this.user.id, value.passwordInput.password)
                .then(function (res) { return _this._handlePasswordResponse(res); })
                .catch(function (error) { return _this.passError = error; });
        }
    };
    UserEditComponent.prototype._handlePasswordResponse = function (res) {
        this.passWait = false;
        this.passwordForm.reset();
        if (true == res.success) {
            this.messageService.sendMessage("edit-password", "success");
        }
        else {
            this.passError = res.error_message;
        }
    };
    UserEditComponent.prototype._handleError = function (error) {
        this.error = error;
    };
    UserEditComponent.prototype.createEditHeader = function () {
        var panelHeader = this.user.id ? "Edit User" : "Create User";
        return panelHeader;
    };
    return UserEditComponent;
}());
__decorate([
    ViewChild(PasswordComponent)
], UserEditComponent.prototype, "passwordComponent", void 0);
UserEditComponent = __decorate([
    Component({
        selector: 'erdiko-user-edit',
        template: "\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <button class=\"btn btn-info btn-sm\" routerLink=\"/list/\">\n            <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i> Back to User List\n        </button>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <br/>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div id=\"id-title\" *ngIf=\"user.id\">\n            User {{ user.id }}\n        </div>\n        <div class=\"panel panel-default\" id=\"edit-update\">\n            <tabset>\n                <tab [heading]=\"createEditHeader()\">\n                    <div class=\"panel-body\">\n                        <alert *ngIf=\"msg\" type=\"success\">{{ msg }}</alert>\n                        <alert *ngIf=\"error\" type=\"danger\">{{ error }}</alert>\n\n                            <form \n                                    id=\"user-edit\" \n                                    class=\"form-horizontal\"\n                                    novalidate \n                                    (ngSubmit)=\"onSubmit(userForm)\" \n                                    [formGroup]=\"userForm\"\n                                >\n\n                                <div class=\"form-group\" *ngIf=\"user && user.id\">\n                                    <label for=\"name\" class=\"col-xs-2 control-label\">ID</label>\n                                    <div class=\"col-xs-10\">\n                                        <p>{{ user.id }}</p>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\" *ngIf=\"user && user.created_at\">\n                                    <label for=\"name\" class=\"col-xs-2 control-label\">Joined</label>\n                                    <div class=\"col-xs-10\">\n                                        <p *ngIf=\"!user.created_at\">n/a</p>\n                                        <p>{{ user.created_at }}</p>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\" *ngIf=\"user.id\">\n                                    <label for=\"name\" class=\"col-xs-2 control-label\">Last Login</label>\n                                    <div class=\"col-xs-10\">\n                                        <p *ngIf=\"!user.last_login\">n/a</p>\n                                        <p>{{ user.last_login }}</p>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"name\" class=\"col-xs-2 control-label\">Name</label>\n                                    <div class=\"col-xs-10\">\n                                        <input type=\"text\" class=\"form-control\" name=\"name\" formControlName=\"name\" placeholder=\"Name\">\n                                        <div class=\"text-danger\" *ngIf=\"userForm.get('name').hasError('required') && userForm.get('name').touched\">\n                                        Name is required\n                                        </div>\n                                        <div class=\"text-danger\" *ngIf=\"userForm.get('name').hasError('minlength') && userForm.get('name').touched\">\n                                        Minimum of 2 characters\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"email\" class=\"col-xs-2 control-label\">Email</label>\n                                    <div class=\"col-xs-10\">\n                                        <input type=\"email\" class=\"form-control\" name=\"email\" \n                                                formControlName=\"email\" placeholder=\"Email\">\n                                        <div class=\"text-danger\" *ngIf=\"userForm.get('email').hasError('required') && userForm.get('email').touched\">\n                                        Email is required\n                                        </div>\n                                        <div class=\"text-danger\" *ngIf=\"userForm.get('email').hasError('pattern') && userForm.get('email').touched\">\n                                        A Valid email is required\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"role\" class=\"col-xs-2 control-label\">Role</label>\n                                    <div class=\"col-xs-10\" id=\"select-role\">\n                                            <select class=\"form-control\" name=\"role\" formControlName=\"role\">\n                                                <option value=\"2\">Admin</option>\n                                                <option value=\"1\">User</option>\n                                            </select>\n                                        <div class=\"text-danger\" *ngIf=\"userForm.get('role').hasError('required') && userForm.get('role').touched\">\n                                        Role is required\n                                        </div>\n                                    </div>\n                                </div>\n\n                            </form>\n\n                            <!--show password input if creating user-->\n                            <erdiko-password *ngIf=\"!user.id\" [passwordForm]=\"passwordForm\"></erdiko-password>\n\n                            <div class=\"form-group\">\n                                <div class=\"col-xs-offset-2 col-xs-4\">\n                                    <button type=\"cancel\" class=\"btn btn-warning\" routerLink=\"/list/\">Cancel</button>\n                                </div>\n                                <div class=\"col-xs-offset-2 col-xs-4\">\n                                    <button type=\"submit\" class=\"btn btn-success\" (click)=\"onSubmit(userForm)\" [disabled]=\"!isUserFormValid()\">\n                                        Save\n                                        <i *ngIf=\"wait\" class=\"fa fa-refresh fa-spin fa-fw\"></i> \n                                    </button>\n                                </div>\n                            </div>\n                    </div>\n                </tab>\n\n                <tab heading=\"Update Password\" *ngIf=\"user.id\">\n\n                    <div class=\"panel-body\">\n\n                        <alert *ngIf=\"passMsg\" type=\"success\">{{ passMsg }}</alert>\n                        <alert *ngIf=\"passError\" type=\"danger\">{{ passError }}</alert>\n\n                        <erdiko-password [passwordForm]=\"passwordForm\"></erdiko-password>\n\n                        <div class=\"form-group\">\n                            <div class=\"col-xs-offset-2 col-xs-4\">\n                                <button type=\"cancel\" class=\"btn btn-warning\" routerLink=\"/list/\">Cancel</button>\n                            </div>\n                            <div class=\"col-xs-offset-2 col-xs-4\">\n                                <button type=\"submit\" class=\"btn btn-success\" (click)=\"onSubmitChangepass(passwordForm)\" [disabled]=\"!isPassFormValid()\">\n                                    Save\n                                    <i *ngIf=\"passWait\" class=\"fa fa-refresh fa-spin fa-fw\"></i> \n                                </button>\n                            </div>\n                        </div>\n\n                    </div>\n                </tab>\n            </tabset>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <br/>\n    </div>\n</div>\n"
    }),
    __param(0, Inject(UsersService)),
    __param(1, Inject(ActivatedRoute)),
    __param(2, Inject(Router))
], UserEditComponent);
export { UserEditComponent };
//# sourceMappingURL=user-edit.component.js.map