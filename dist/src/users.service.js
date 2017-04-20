var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from "rxjs";
var UsersService = (function () {
    function UsersService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.listUrl = "/ajax/erdiko/users/admin/list";
        this.userUrl = "/ajax/erdiko/users/admin/retrieve";
        this.updateUrl = "/ajax/erdiko/users/admin/update";
        this.createUrl = "/ajax/erdiko/users/admin/create";
        this.deleteUrl = "/ajax/erdiko/users/admin/delete";
        this.changePassUrl = "/ajax/erdiko/users/admin/changepass";
        this.userEventUrl = "/ajax/erdiko/users/admin/eventlogs";
        this.dataStore = {};
        this._users$ = new BehaviorSubject(null);
        this._total$ = new BehaviorSubject(null);
        this._events$ = new BehaviorSubject(null);
        this._eventsTotal$ = new BehaviorSubject(null);
        // hack to help with local development
        this._baseUrl = "";
        if (window.location && "localhost" == window.location.hostname) {
            this._baseUrl = "http://docker.local:8088";
        }
    }
    Object.defineProperty(UsersService.prototype, "users$", {
        get: function () {
            return this._users$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsersService.prototype, "total$", {
        get: function () {
            return this._total$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsersService.prototype, "events$", {
        get: function () {
            return this._events$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsersService.prototype, "eventsTotal$", {
        get: function () {
            return this._eventsTotal$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     *
     */
    UsersService.prototype._getHeaderOptions = function () {
        // add authorization header with jwt token
        var headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.token
        });
        var options = new RequestOptions({ headers: headers });
        return options;
    };
    /**
     * Get list of users based on sort, returns an observable
     *
     */
    UsersService.prototype.getUsers = function (pagesize, page, sortCol, sortDir) {
        var _this = this;
        var url = this._baseUrl + this.listUrl;
        if (pagesize) {
            url += "?pagesize=" + pagesize;
        }
        if (page) {
            url += "&page=" + page;
        }
        if (sortCol) {
            url += "&sort=" + sortCol;
        }
        if (sortDir) {
            url += "&direction=" + sortDir;
        }
        var options = this._getHeaderOptions();
        return this.http.get(url, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.dataStore.users = [];
            _this.dataStore.total = 0;
            if (true == data.body.success) {
                _this.dataStore.users = data.body.users.users;
                _this.dataStore.total = data.body.users.total;
            }
            _this._users$.next(_this.dataStore.users);
            _this._total$.next(_this.dataStore.total);
        }, function (error) {
            // log the error!
            console.error("Error retrieving users!", url, error);
            _this._users$.next([]);
            _this._total$.next(0);
        });
    };
    /**
     * Get a specific user, returns a promise
     *
     */
    UsersService.prototype.getUser = function (id) {
        var url = this._baseUrl + this.userUrl + '?id=' + id;
        var options = this._getHeaderOptions();
        return this.http.get(url, options)
            .toPromise()
            .then(function (response) { return response.json().body.user; })
            .catch(this.handleError);
    };
    /**
     * Update a specific user
     *
     */
    UsersService.prototype.updateUser = function (user) {
        var body = JSON.stringify(user);
        var options = this._getHeaderOptions();
        var url = this._baseUrl + this.updateUrl;
        return this.http.post(url, body, options)
            .toPromise()
            .then(function (response) { return response.json().body; })
            .catch(this.handleError);
    };
    /**
     * Create a new user
     *
     */
    UsersService.prototype.createUser = function (user) {
        var body = JSON.stringify(user);
        var options = this._getHeaderOptions();
        var url = this._baseUrl + this.createUrl;
        return this.http.post(url, body, options)
            .toPromise()
            .then(function (response) { return response.json().body; })
            .catch(this.handleError);
    };
    /**
     * Delete a user record
     *
     */
    UsersService.prototype.deleteUser = function (id) {
        var body = JSON.stringify({ "id": id });
        var options = this._getHeaderOptions();
        var url = this._baseUrl + this.deleteUrl;
        return this.http.post(url, body, options)
            .toPromise()
            .then(function (response) { return response.json().body; })
            .catch(this.handleError);
    };
    /**
     * Update a user record password
     *
     */
    UsersService.prototype.changePassword = function (id, newpass) {
        var body = JSON.stringify({ 'id': id, 'newpass': newpass });
        var options = this._getHeaderOptions();
        var url = this._baseUrl + this.changePassUrl;
        return this.http.post(url, body, options)
            .toPromise()
            .then(function (response) { return response.json().body; })
            .catch(this.handleError);
    };
    /**
     * get event logs for a user
     *
     */
    UsersService.prototype.getUsersEvents = function (id, pagesize, page, sortCol, sortDir) {
        var _this = this;
        var url = this._baseUrl + this.userEventUrl + "?";
        if (id) {
            url += "user_id=" + id + "&";
        }
        if (pagesize) {
            url += "pagesize=" + pagesize + "&";
        }
        if (page) {
            url += "page=" + page + "&";
        }
        if (sortCol) {
            url += "sort=" + sortCol + "&";
        }
        if (sortDir) {
            url += "direction=" + sortDir;
        }
        var options = this._getHeaderOptions();
        return this.http.get(url, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.dataStore.events = [];
            _this.dataStore.eventsTotal = 0;
            if (true == data.body.success) {
                _this.dataStore.events = data.body.logs;
                _this.dataStore.eventsTotal = data.body.total;
            }
            _this._events$.next(_this.dataStore.events);
            _this._eventsTotal$.next(_this.dataStore.eventsTotal);
        }, function (error) {
            // log the error!
            console.error("Error retrieving user event logs!", url, error);
            _this._events$.next([]);
            _this._events$.next(0);
        });
    };
    /**
     * handle response errors
     *
     */
    UsersService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return UsersService;
}());
UsersService = __decorate([
    Injectable()
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map