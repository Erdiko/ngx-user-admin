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
import { AuthService } from "../auth.service";
import { tpl } from './header.component.tpl';
/**
 * Header Component
 *
 * Displays application header, with alternate header when the user is logged in
 */
var HeaderComponent = (function () {
    /**
     * set local instance of the auth service and router
     */
    function HeaderComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    /**
     *
     */
    HeaderComponent.prototype.ngOnInit = function () { };
    /**
     * returns true if the user is logged in, used to display full header based on user state
     */
    HeaderComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    /**
     * handle click action if the user clicks "logout"
     */
    HeaderComponent.prototype.clickLogout = function () {
        this.authService.logout();
        this.router.navigate(['/login']);
    };
    HeaderComponent = __decorate([
        Component({
            selector: 'app-header',
            template: tpl
        }),
        __metadata("design:paramtypes", [AuthService,
            Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map