var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { User } from "../user.model";
import { MessageService } from '../message.service';
import { PasswordComponent } from '../password/password.component';
import { tpl } from './user-edit.component.tpl';
/**
 * User Edit Component
 *
 * Component to display form to create a new user or to edit an exiting user
 */
var UserEditComponent = (function () {
    function UserEditComponent(usersService, route, router, messageService) {
        // init the wait state (and indication animation) to 'off'
        this.wait = false;
        this.passWait = false;
        this.usersService = usersService;
        this.route = route;
        this.router = router;
        this.messageService = messageService;
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
        if (valid) {
            if (this.user.id) {
                value.id = this.user.id;
                return this.usersService.updateUser(value)
                    .then(function (res) { return _this._handleResponse(res); })
                    .catch(function (error) { return _this._handleError(error); });
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
                    .catch(function (error) { return _this._handleError(error); });
            }
        }
    };
    UserEditComponent.prototype._handleResponse = function (res) {
        this.wait = false;
        if (true == res.success) {
            this.messageService.setMessage([{ "type": "success", "body": "User record was successfully updated" }, { "type": "success", "body": "User record was super successfully updated" }]);
            if ("create" === res.method) {
                // navigate to Edit User for the new user
                this.router.navigate(['/user/' + res.user.id]);
                this.messageService.setMessage([{ "type": "success", "body": "User was successfully created" }, { "type": "success", "body": "User was super successfully created" }]);
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
        if (valid) {
            return this.usersService.changePassword(this.user.id, value.passwordInput.password)
                .then(function (res) { return _this._handlePasswordResponse(res); })
                .catch(function (error) { return _this._handleError(error); });
        }
    };
    UserEditComponent.prototype._handlePasswordResponse = function (res) {
        this.passWait = false;
        this.passwordForm.reset();
        if (true == res.success) {
            this.messageService.setMessage([{ "type": "success", "body": "User password successfully updated" }, { "type": "success", "body": "User password super successfully updated" }]);
        }
        else {
            this.messageService.setMessage([{ "type": "danger", "body": res.error }, { "type": "danger", "body": res.error }]);
        }
    };
    UserEditComponent.prototype._handleError = function (error) {
        this.messageService.setMessage([{ "type": "danger", "body": error }, { "type": "danger", "body": error }]);
    };
    UserEditComponent.prototype.createEditHeader = function () {
        var panelHeader = this.user.id ? "Edit User" : "Create User";
        return panelHeader;
    };
    return UserEditComponent;
}());
__decorate([
    ViewChild(PasswordComponent),
    __metadata("design:type", PasswordComponent)
], UserEditComponent.prototype, "passwordComponent", void 0);
UserEditComponent = __decorate([
    Component({
        selector: 'erdiko-user-edit',
        template: tpl
    }),
    __param(0, Inject(UsersService)),
    __param(1, Inject(ActivatedRoute)),
    __param(2, Inject(Router)),
    __param(3, Inject(MessageService)),
    __metadata("design:paramtypes", [UsersService,
        ActivatedRoute,
        Router,
        MessageService])
], UserEditComponent);
export { UserEditComponent };
//# sourceMappingURL=user-edit.component.js.map