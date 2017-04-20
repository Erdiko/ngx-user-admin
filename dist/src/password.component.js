var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Input } from '@angular/core';
var PasswordComponent = (function () {
    function PasswordComponent() {
    }
    PasswordComponent.prototype.ngOnInit = function () { };
    return PasswordComponent;
}());
__decorate([
    Input()
], PasswordComponent.prototype, "passwordInput", void 0);
PasswordComponent = __decorate([
    Component({
        selector: 'erdiko-password',
        template: "\n<div class=\"form-group\" [formGroup] = \"passwordInput\">\n    <p class=\"col-xs-12\">Passwords must contain at least 1 alpha & 1 numeric character, with a minimum length of 5 characters</p>\n    <label for=\"password\" class=\"col-xs-2 control-label\">New Password</label>\n    <div class=\"col-xs-10\">\n        <input  type=\"password\" \n                class=\"form-control\" \n                name=\"password\" \n                formControlName=\"password\"\n                pattern=\"^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{4,}$\"\n                required>\n        <div class=\"text-danger\" *ngIf=\"passwordInput.get('password').hasError('required') && passwordInput.get('password').touched\">\n        Password is required\n        </div>\n    </div>\n</div>\n<div class=\"form-group\" [formGroup] = \"passwordInput\">\n    <label for=\"password\" class=\"col-xs-2 control-label\">Confirm Password</label>\n    <div class=\"col-xs-10\">\n\n        <input  type=\"password\" \n                class=\"form-control\" \n                name=\"confirm\" \n                formControlName=\"confirm\"\n                validateEquality=\"password\"\n                required>\n\n        <div class=\"text-danger\" *ngIf=\"passwordInput.get('confirm').hasError('required') && passwordInput.get('confirm').touched\">\n        Password Confirm is required\n        </div>\n    </div>\n</div>\n  "
    })
], PasswordComponent);
export { PasswordComponent };
//# sourceMappingURL=password.component.js.map