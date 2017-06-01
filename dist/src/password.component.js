var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Input } from '@angular/core';
import { tpl } from './password.component.tpl';
var PasswordComponent = (function () {
    function PasswordComponent() {
    }
    PasswordComponent.prototype.ngOnInit = function () { };
    return PasswordComponent;
}());
__decorate([
    Input()
], PasswordComponent.prototype, "passwordForm", void 0);
PasswordComponent = __decorate([
    Component({
        selector: 'erdiko-password',
        template: tpl
    })
], PasswordComponent);
export { PasswordComponent };
//# sourceMappingURL=password.component.js.map