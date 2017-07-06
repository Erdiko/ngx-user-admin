var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tpl } from './password.component.tpl';
/**
 * Password Component
 *
 * Component to display password update form
 */
var PasswordComponent = (function () {
    function PasswordComponent() {
    }
    PasswordComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], PasswordComponent.prototype, "passwordForm", void 0);
    PasswordComponent = __decorate([
        Component({
            selector: 'erdiko-password',
            template: tpl
        }),
        __metadata("design:paramtypes", [])
    ], PasswordComponent);
    return PasswordComponent;
}());
export { PasswordComponent };
//# sourceMappingURL=password.component.js.map