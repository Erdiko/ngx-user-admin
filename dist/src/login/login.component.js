var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { tpl } from './login.component.tpl';
var LoginComponent = (function () {
    function LoginComponent(authService, router, fb) {
        this.authService = authService;
        this.router = router;
        this.fb = fb;
        // init the wait state (and indication animation) to 'off'
        this.wait = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this._initForm();
    };
    LoginComponent.prototype._initForm = function () {
        this.loginForm = this.fb.group({
            email: ['', Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i)],
            password: ['', Validators.required]
        });
    };
    LoginComponent.prototype.onSubmit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.wait = true;
        if (valid) {
            this.authService.login(value)
                .subscribe(function (result) {
                if (result === true) {
                    _this.router.navigate(['/']);
                    //this.messageService.sendMessage("login", "success");
                }
                else {
                    //this.messageService.sendMessage("login", "error");
                    _this.wait = false;
                }
            }, function (err) {
                //this.messageService.sendMessage("login", "no-password");
                _this.wait = false;
            });
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        template: tpl
    }),
    __metadata("design:paramtypes", [AuthService,
        Router,
        FormBuilder])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map