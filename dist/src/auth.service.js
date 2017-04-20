var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
var AuthService = (function () {
    /**
     *
     *
     */
    function AuthService(http) {
        this.http = http;
        this.loginUrl = "/ajax/users/authentication/login";
        this.logoutUrl = "/ajax/users/authentication/logout";
        var currentUser = { 'token': false };
        //currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        // hack to help with local development
        this._baseUrl = "";
        if (window.location && "localhost" == window.location.hostname) {
            this._baseUrl = "http://docker.local:8088";
        }
    }
    /**
     *
     *
     */
    AuthService.prototype.isLoggedIn = function () {
        return Boolean(localStorage.getItem('currentUser'));
    };
    /**
     *
     *
     */
    AuthService.prototype.login = function (form) {
        var _this = this;
        var body = JSON.stringify(form);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var url = this._baseUrl + this.loginUrl;
        return this.http.post(url, body, options)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().body.token;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ token: token }));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        })
            .catch(function (error) { return Observable.throw(error.json().error || 'Server error'); });
    };
    /**
     *
     *
     */
    AuthService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __param(0, Inject(Http))
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map