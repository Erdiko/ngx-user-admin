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
import { MessageService } from './message.service';
import { UsersService } from './users.service';
import { User } from "./user.model";
import { PasswordComponent } from './password.component';
var UserEditComponent = (function () {
    function UserEditComponent(usersService, route, router, messageService) {
        // init the wait state (and indication animation) to 'off'
        this.wait = false;
        this.passWait = false;
        this.usersService = usersService;
        this.messageService = messageService;
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
            this.messageService.sendMessage("edit-user", "success");
            if ("create" === res.method) {
                // navigate to Edit User for the new user
                this.router.navigate(['/user/' + res.user.id]);
                this.messageService.sendMessage("create-user", "success");
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
        providers: [MessageService],
        templateUrl: './user-edit.component.html'
    }),
    __param(0, Inject(UsersService)),
    __param(1, Inject(ActivatedRoute)),
    __param(2, Inject(Router)),
    __param(3, Inject(MessageService))
], UserEditComponent);
export { UserEditComponent };
//# sourceMappingURL=user-edit.component.js.map