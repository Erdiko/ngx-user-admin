var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
/**
 * Returns a User model for a provided ID, if one is found. Else
 * return false and navigate the user to the default route
 */
var UserResolve = (function () {
    /**
     * set user service and router to local instances
     */
    function UserResolve(us, router) {
        this.us = us;
        this.router = router;
    }
    UserResolve.prototype.resolve = function (route) {
        var _this = this;
        var id = route.params['id'];
        return this.us.getUser(id).then(function (user) {
            if (user) {
                return user;
            }
            else {
                _this.router.navigate(['']);
                return false;
            }
        });
    };
    UserResolve = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [UsersService,
            Router])
    ], UserResolve);
    return UserResolve;
}());
export { UserResolve };
//# sourceMappingURL=user-resolve.service.js.map