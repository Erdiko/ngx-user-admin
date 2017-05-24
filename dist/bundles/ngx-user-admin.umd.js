(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/http'), require('@angular/router'), require('@angular/forms'), require('ngx-bootstrap'), require('rxjs'), require('rxjs/add/operator/map')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/http', '@angular/router', '@angular/forms', 'ngx-bootstrap', 'rxjs', 'rxjs/add/operator/map'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['ngx-user-admin'] = global.ng['ngx-user-admin'] || {}),global.ng.core,global._angular_platformBrowser,global.vendor._angular_http,global._angular_router,global._angular_forms,global.ngxBootstrap,global.rxjs));
}(this, (function (exports,_angular_core,_angular_platformBrowser,_angular_http,_angular_router,_angular_forms,ngxBootstrap,rxjs) { 'use strict';

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
        this.token = currentUser && currentUser.token;
        this._baseUrl = "";
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
        var headers = new _angular_http.Headers({ 'Content-Type': 'application/json' });
        var options = new _angular_http.RequestOptions({ headers: headers });
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
            .catch(function (error) { return rxjs.Observable.throw(error.json().error || 'Server error'); });
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
AuthService = __decorate$1([
    _angular_core.Injectable(),
    __param(0, _angular_core.Inject(_angular_http.Http))
], AuthService);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param$1 = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
        this._users$ = new rxjs.BehaviorSubject(null);
        this._total$ = new rxjs.BehaviorSubject(null);
        this._events$ = new rxjs.BehaviorSubject(null);
        this._eventsTotal$ = new rxjs.BehaviorSubject(null);
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
        var headers = new _angular_http.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.token
        });
        var options = new _angular_http.RequestOptions({ headers: headers });
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
            .then(function (response) { return response.json().body.user; });
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
            .then(function (response) { return response.json().body; });
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
UsersService = __decorate$2([
    _angular_core.Injectable(),
    __param$1(0, _angular_core.Inject(_angular_http.Http)),
    __param$1(1, _angular_core.Inject(AuthService))
], UsersService);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param$2 = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.UserListComponent = (function () {
    function UserListComponent(usersService, route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.currentPage = 1;
        this.pagesize = 10;
        this.pages = [];
        this.usersService = usersService;
        // init the wait state (and indication animation) to 'off'
        this.wait = false;
        // default the sort col and direction
        this.sortCol = 'id';
        this.sortDir = 'desc';
        // subscribe to the service to get data
        this.users$ = this.usersService.users$.subscribe(function (users$) { return _this.users = users$; });
        this.total$ = this.usersService.total$.subscribe(function (total$) { return _this.total = total$; });
        // listen for the total when it gets updated, update more stuff
        this.usersService.total$.subscribe(function () { return _this._listUpdated(); });
        this.selectedUser = false;
    }
    // on init get a list of the users
    UserListComponent.prototype.ngOnInit = function () {
        this._getUsers();
    };
    // unsub all the things
    UserListComponent.prototype.ngOnDestroy = function () {
        this.users$.unsubscribe();
        this.total$.unsubscribe();
    };
    // update the user list by making another request to the users service
    UserListComponent.prototype._getUsers = function () {
        this.wait = true;
        this.usersService.getUsers(this.pagesize, this.currentPage, this.sortCol, this.sortDir);
    };
    // list has been updated; toggle wait state off and generate pagination links
    UserListComponent.prototype._listUpdated = function () {
        this.wait = false;
        this._setPagination();
    };
    // return pagination links count
    UserListComponent.prototype.getPageCount = function () {
        return Math.ceil(this.total / this.pagesize);
    };
    // create a list of pagination links
    UserListComponent.prototype._setPagination = function () {
        this.pages = [];
        for (var i = 1; i <= this.getPageCount(); i++) {
            this.pages.push(i);
        }
    };
    // pagination click listeners
    UserListComponent.prototype.clickPage = function (idx) {
        this.currentPage = idx;
        this._getUsers();
    };
    UserListComponent.prototype.clickNext = function () {
        this.currentPage++;
        this._getUsers();
    };
    UserListComponent.prototype.clickPrev = function () {
        this.currentPage--;
        this._getUsers();
    };
    // sort click listeners
    UserListComponent.prototype.sort = function (col) {
        // toggle sort dir if the user clicks on currently sorted column
        if (this.sortCol == col) {
            this.sortDir = (this.sortDir == "desc") ? "asc" : "desc";
        }
        else {
            // else default the sort to asc
            this.sortDir = "asc";
        }
        this.sortCol = col;
        this._getUsers();
    };
    UserListComponent.prototype.clickDelete = function (idx) {
        this.selectedUser = idx;
        this.confirmDeleteModal.show();
    };
    UserListComponent.prototype.cancelDelete = function () {
        this.confirmDeleteModal.hide();
    };
    UserListComponent.prototype.confirmDelete = function (idx) {
        var _this = this;
        this.confirmDeleteModal.hide();
        this.wait = true;
        this.usersService.deleteUser(this.selectedUser)
            .then(function (res) { return _this._handleResponse(res); })
            .catch(function (error) { return _this.error = error; });
    };
    UserListComponent.prototype._handleResponse = function (res) {
        this._getUsers();
        this.wait = false;
        if (false == res.success) {
            this.error = res.error_message;
        }
    };
    return UserListComponent;
}());
__decorate$3([
    _angular_core.ViewChild('confirmDeleteModal')
], exports.UserListComponent.prototype, "confirmDeleteModal", void 0);
exports.UserListComponent = __decorate$3([
    _angular_core.Component({
        selector: 'erdiko-user-list',
        template: "\n<div class=\"row\">\n    <div class=\"col-xs-4\">\n        <button class=\"btn btn-info btn-sm\" routerLink=\"/user/\">Create a New User</button>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <br />\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <table class=\"table table-bordered table-hover\"> \n            <thead> \n                <tr> \n                    <th (click)=\"sort('id')\">\n                        ID \n                        <i *ngIf=\"sortCol == 'id'\" class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th> \n                    <th (click)=\"sort('name')\">\n                        User Name\n                        <i *ngIf=\"sortCol == 'name'\" class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th> \n                    <th>\n                        Role\n                    </th> \n                    <th>\n                        Last Login\n                    </th> \n                    <th>\n                        Joined\n                    </th> \n                    <th>Edit</th> \n                    <th>Delete</th> \n                </tr> \n            </thead> \n\n            <tbody *ngIf=\"wait\"> \n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <i class=\"fa fa-refresh fa-spin fa-2x fa-fw\"></i> \n                    </td>\n                </tr>\n            </tbody> \n\n            <tbody *ngIf=\"!wait && error\"> \n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <alert type=\"warning\">{{ error }}</alert>\n                    </td>\n                </tr>\n            </tbody> \n\n            <tbody *ngIf=\"!wait && !error && users && users.length < 1\"> \n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <alert type=\"warning\">Sorry, no users were found. Please try again.</alert>\n                    </td>\n                </tr>\n            </tbody> \n\n            <tbody *ngIf=\"!wait && !error && users && users.length > 0\"> \n                <tr class=\"user_row\" *ngFor=\"let user of users; let index = index\"> \n                    <th class=\"user_id\" scope=\"row\">{{ user.id }}</th> \n                    <td class=\"user_name\">{{ user.name }}</td> \n                    <td class=\"user_role_name\">{{ user.role.name }}</td> \n                    <td class=\"user_last_login\">{{ user.last_login }}</td> \n                    <td class=\"user_joined\">{{ user.joined }}</td> \n                    <td class=\"user_edit\"><a routerLink=\"/user/{{ user.id }}\">Edit</a></td>\n                    <td class=\"user_delete\"><button type=\"button\" class=\"btn btn-danger\" (click)=\"clickDelete(user.id)\">Delete</button></td> \n                </tr> \n            </tbody> \n        </table>\n    </div>\n</div>\n<div class=\"row paging\" *ngIf=\"total\">\n    <div class=\"col-xs-4\">\n\n        <nav aria-label=\"Page navigation\">\n          <ul class=\"pagination pagination-sm\">\n\n            <li *ngIf=\"(currentPage > 1)\">\n              <a (click)=\"clickPrev()\" aria-label=\"Previous\">\n                <span aria-hidden=\"true\">&laquo;</span>\n              </a>\n            </li>\n\n            <li \n                *ngFor=\"let page of pages; let index = index\"\n                 [ngClass]=\"{'active': (page == currentPage)}\"\n                 [attr.id]=\"'page'+(index + 1)\"\n                >\n                <a (click)=\"clickPage(page)\">{{ page }}</a>\n            </li>\n\n            <li *ngIf=\"(currentPage < getPageCount())\">\n              <a (click)=\"clickNext()\" aria-label=\"Next\">\n                <span aria-hidden=\"true\">&raquo;</span>\n              </a>\n            </li>\n\n          </ul>\n        </nav>\n\n    </div>\n</div>\n\n<div bsModal #confirmDeleteModal=\"bs-modal\" class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\">Delete?</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"cancelDelete()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <p>Are you sure you want to delete this user?</p>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-6\">\n                <button type=\"button\" class=\"btn btn-warning\" (click)=\"cancelDelete()\">Cancel</button>\n            </div>\n            <div class=\"col-xs-6\">\n                <button type=\"button\" class=\"btn btn-danger\" (click)=\"confirmDelete(selectedUser)\">Confirm</button>\n            </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n  "
    }),
    __param$2(0, _angular_core.Inject(UsersService))
], exports.UserListComponent);

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param$3 = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.UserEventLogComponent = (function () {
    function UserEventLogComponent(usersService) {
        var _this = this;
        this.usersService = usersService;
        this.userID = null;
        this.pageSize = 10;
        this.currentPage = 1;
        this.sortCol = 'id';
        this.sortDir = 'desc';
        this.pages = [];
        /**
         * Subscribe to the usersService to get events
         */
        this.events$ = this.usersService.events$.subscribe(function (events$) { return _this.events = events$; });
        /**
         * When getting events is finished, hide the loading animation
         */
        this.usersService.events$.subscribe(function () { return _this.wait = false; });
        /**
         * Subscribe to the usersService to get total number of events
         */
        this.eventsTotal$ = this.usersService.eventsTotal$.subscribe(function (eventsTotal$) { return _this.eventsTotal = eventsTotal$; });
        /**
         * When total number of events is known, set the pagination
         */
        this.usersService.eventsTotal$.subscribe(function () { return _this._setPages(); });
    }
    /**
     * Sorts event log specified by the parameter
     * @param {string} column - instruction specifying which column to sort
     */
    UserEventLogComponent.prototype.sort = function (column) {
        if (this.sortCol != column) {
            this.sortCol = column;
        }
        this.sortDir = (this.sortDir === 'desc') ? 'asc' : 'desc';
        this._getEvents();
    };
    /**
     * Show loading animation while request for Users Event Log is being made
     */
    UserEventLogComponent.prototype._getEvents = function () {
        this.wait = true;
        this.usersService.getUsersEvents(this.userID, this.pageSize, this.currentPage, this.sortCol, this.sortDir);
    };
    /**
     * Sets array of pages
     */
    UserEventLogComponent.prototype._setPages = function () {
        this.pages = []; //reset page before setting pages
        for (var i = 1; i <= this.getPageCount(); i++) {
            this.pages.push(i);
        }
    };
    /**
     * Called when clicking on numbered link to get to certain page
     */
    UserEventLogComponent.prototype.clickPage = function (i) {
        this.currentPage = i;
        this._getEvents();
    };
    /**
     * Called when clicking '<<' link to lead to proceeding page
     */
    UserEventLogComponent.prototype.clickPrev = function () {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
        this._getEvents();
    };
    /**
     * Called when clicking '>>' link to lead to succeeding page
     */
    UserEventLogComponent.prototype.clickNext = function () {
        if (this.currentPage < this.getPageCount()) {
            this.currentPage++;
        }
        this._getEvents();
    };
    /**
     * Get the number of pages necessary to house set of 10 event logs
     */
    UserEventLogComponent.prototype.getPageCount = function () {
        return Math.ceil(this.eventsTotal / this.pageSize);
    };
    UserEventLogComponent.prototype.ngOnInit = function () {
        this.userID = this.inputUserId;
        this._getEvents();
    };
    UserEventLogComponent.prototype.ngOnDestroy = function () {
        this.events$.unsubscribe();
        this.eventsTotal$.unsubscribe();
    };
    return UserEventLogComponent;
}());
__decorate$4([
    _angular_core.Input()
], exports.UserEventLogComponent.prototype, "inputUserId", void 0);
exports.UserEventLogComponent = __decorate$4([
    _angular_core.Component({
        selector: 'erdiko-user-event-log',
        template: "\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                <span>User Event Log</span>\n            </div>\n            <div class=\"panel-body\">\n\n                <table class=\"table table-bordered table-hover\">\n                    <thead>\n\n                        <tr>\n                            <th (click)=\"sort('id')\">\n                                ID\n                                <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                            </th>\n                            <th>\n                                Event Log\n                            </th>\n                            <th>\n                                Event Data\n                            </th>\n                            <th (click)=\"sort('created_at')\">\n                                Created At\n                                <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                            </th>\n                        </tr>\n                    </thead>\n\n                    <tbody *ngIf=\"wait\"> \n                        <tr>\n                            <td colspan=\"7\" align=\"center\">\n                                <i class=\"fa fa-refresh fa-spin fa-2x fa-fw\"></i> \n                            </td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"!wait && events.length <= 0\">\n                        <tr>\n                            <td colspan=\"7\" align=\"center\">\n                                <alert type=\"warning\">Sorry, no user events were found.</alert>\n                            </td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"!wait && events.length > 0\">\n                        <tr class=\"user-events\" *ngFor=\"let event of events\">\n                            <td> {{event.id}} </td>\n                            <td> {{event.event}} </td>\n                            <td> {{event.event_data|json}} </td>\n                            <td> {{event.created_at}} </td>\n                        </tr>\n                    </tbody>\n\n                </table>\n            </div>\n        </div>\n\n        <div class=\"row paging\" *ngIf=\"eventsTotal\">\n            <div class=\"col-xs-4\">\n\n                <nav aria-label=\"Page navigation\">\n                <ul class=\"pagination pagination-sm\">\n\n                    <li *ngIf=\"(currentPage > 1)\">\n                    <a (click)=\"clickPrev()\" aria-label=\"Previous\">\n                        <span aria-hidden=\"true\">&laquo;</span>\n                    </a>\n                    </li>\n\n                    <li \n                        *ngFor=\"let page of pages\"\n                        [ngClass]=\"{'active': (page == currentPage)}\"\n                        >\n                        <a (click)=\"clickPage(page)\">{{ page }}</a>\n                    </li>\n\n                    <li *ngIf=\"(currentPage < getPageCount())\">\n                    <a (click)=\"clickNext()\" aria-label=\"Next\">\n                        <span aria-hidden=\"true\">&raquo;</span>\n                    </a>\n                    </li>\n\n                </ul>\n                </nav>\n\n            </div>\n        </div>\n    </div>\n</div>\n  ",
        providers: [UsersService]
    }),
    __param$3(0, _angular_core.Inject(UsersService))
], exports.UserEventLogComponent);

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param$4 = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.UsersEventLogComponent = (function () {
    function UsersEventLogComponent(usersService) {
        var _this = this;
        this.usersService = usersService;
        this.userID = null;
        this.pageSize = 10;
        this.currentPage = 1;
        this.sortCol = 'id';
        this.sortDir = 'desc';
        this.pages = [];
        /**
         * Subscribe to the usersService to get events
         */
        this.events$ = this.usersService.events$.subscribe(function (events$) { return _this.events = events$; });
        /**
         * When getting events is finished, hide the loading animation
         */
        this.usersService.events$.subscribe(function () { return _this.wait = false; });
        /**
         * Subscribe to the usersService to get total number of events
         */
        this.eventsTotal$ = this.usersService.eventsTotal$.subscribe(function (eventsTotal$) { return _this.eventsTotal = eventsTotal$; });
        /**
         * When total number of events is known, set the pagination
         */
        this.usersService.eventsTotal$.subscribe(function () { return _this._setPages(); });
    }
    /**
     * Sorts event log specified by the parameter
     * @param {string} column - instruction specifying which column to sort
     */
    UsersEventLogComponent.prototype.sort = function (column) {
        if (this.sortCol != column) {
            this.sortCol = column;
        }
        this.sortDir = (this.sortDir === 'desc') ? 'asc' : 'desc';
        this._getEvents();
    };
    /**
     * Show loading animation while request for Users Event Log is being made
     */
    UsersEventLogComponent.prototype._getEvents = function () {
        this.wait = true;
        this.usersService.getUsersEvents(this.userID, this.pageSize, this.currentPage, this.sortCol, this.sortDir);
    };
    /**
     * Sets array of pages
     */
    UsersEventLogComponent.prototype._setPages = function () {
        this.pages = []; //reset page before setting pages
        for (var i = 1; i <= this.getPageCount(); i++) {
            this.pages.push(i);
        }
    };
    /**
     * Called when clicking on numbered link to get to certain page
     */
    UsersEventLogComponent.prototype.clickPage = function (i) {
        this.currentPage = i;
        this._getEvents();
    };
    /**
     * Called when clicking '<<' link to lead to proceeding page
     */
    UsersEventLogComponent.prototype.clickPrev = function () {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
        this._getEvents();
    };
    /**
     * Called when clicking '>>' link to lead to succeeding page
     */
    UsersEventLogComponent.prototype.clickNext = function () {
        if (this.currentPage < this.getPageCount()) {
            this.currentPage++;
        }
        this._getEvents();
    };
    /**
     * Get the number of pages necessary to house set of 10 event logs
     */
    UsersEventLogComponent.prototype.getPageCount = function () {
        return Math.ceil(this.eventsTotal / this.pageSize);
    };
    /**
     * Calls for Events at the initialization of component
     */
    UsersEventLogComponent.prototype.ngOnInit = function () {
        this._getEvents();
    };
    /**
     * Clean up by unsubscribing observables to avoid memory leak
     */
    UsersEventLogComponent.prototype.ngOnDestroy = function () {
        this.events$.unsubscribe();
        this.eventsTotal$.unsubscribe();
    };
    return UsersEventLogComponent;
}());
exports.UsersEventLogComponent = __decorate$5([
    _angular_core.Component({
        selector: 'erdiko-users-event-log',
        template: "\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <br />\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <table class=\"table table-bordered table-hover\"> \n            <thead>\n                <tr>\n                    <th (click)=\"sort('id')\">\n                        ID\n                        <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th>\n                    <th (click)=\"sort('user_id')\">\n                        User ID\n                        <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th>\n                    <th>\n                        Event Log\n                    </th>\n                    <th>\n                        Event Data\n                    </th>\n                    <th (click)=\"sort('created_at')\">\n                        Created At\n                        <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th>\n                </tr>\n            </thead>\n\n            <tbody *ngIf=\"wait\"> \n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <i class=\"fa fa-refresh fa-spin fa-2x fa-fw\"></i> \n                    </td>\n                </tr>\n            </tbody>\n\n            <tbody *ngIf=\"!wait && events.length <= 0\">\n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <alert type=\"warning\">Sorry, no user events were found.</alert>\n                    </td>\n                </tr>\n            </tbody>\n\n            <tbody *ngIf=\"!wait && events.length > 0\">\n                <tr class=\"users-events\" *ngFor=\"let event of events\">\n                    <td> {{event.id}} </td>\n                    <td> {{event.user_id}} </td>\n                    <td> {{event.event}} </td>\n                    <td> {{event.event_data|json}} </td>\n                    <td> {{event.created_at}} </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n<div class=\"row paging\" *ngIf=\"eventsTotal\">\n    <div class=\"col-xs-4\">\n\n        <nav aria-label=\"Page navigation\">\n          <ul class=\"pagination pagination-sm\">\n\n            <li *ngIf=\"(currentPage > 1)\">\n              <a (click)=\"clickPrev()\" aria-label=\"Previous\">\n                <span aria-hidden=\"true\">&laquo;</span>\n              </a>\n            </li>\n\n            <li \n                *ngFor=\"let page of pages\"\n                 [ngClass]=\"{'active': (page == currentPage)}\"\n                >\n                <a (click)=\"clickPage(page)\">{{ page }}</a>\n            </li>\n\n            <li *ngIf=\"(currentPage < getPageCount())\">\n              <a (click)=\"clickNext()\" aria-label=\"Next\">\n                <span aria-hidden=\"true\">&raquo;</span>\n              </a>\n            </li>\n\n          </ul>\n        </nav>\n\n    </div>\n</div>\n  ",
        providers: [UsersService]
    }),
    __param$4(0, _angular_core.Inject(UsersService))
], exports.UsersEventLogComponent);

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PasswordComponent = (function () {
    function PasswordComponent() {
    }
    PasswordComponent.prototype.ngOnInit = function () { };
    return PasswordComponent;
}());
__decorate$6([
    _angular_core.Input()
], PasswordComponent.prototype, "passwordForm", void 0);
PasswordComponent = __decorate$6([
    _angular_core.Component({
        selector: 'erdiko-password',
        template: "\n<form \n        id=\"user-password-change\" \n        class=\"form-horizontal\"\n        novalidate \n        (ngSubmit)=\"onSubmitChangepass(passwordForm)\" \n        [formGroup]=\"passwordForm\"\n    >\n\n    <div class=\"form-group\">\n        <p class=\"col-xs-12\">Passwords must contain at least 1 alpha & 1 numeric character, with a minimum length of 5 characters</p>\n        <label for=\"password\" class=\"col-xs-2 control-label\">New Password</label>\n        <div class=\"col-xs-10\">\n            <input  type=\"password\" \n                    class=\"form-control\" \n                    name=\"password\" \n                    formControlName=\"password\"\n                    required>\n            <div class=\"text-danger\" *ngIf=\"passwordForm.get('password').hasError('required') && passwordForm.get('password').touched\">\n            Password is required\n            </div>\n        </div>\n    </div>\n    <div class=\"form-group\" [formGroup] = \"passwordForm\">\n        <label for=\"password\" class=\"col-xs-2 control-label\">Confirm Password</label>\n        <div class=\"col-xs-10\">\n\n            <input  type=\"password\" \n                    class=\"form-control\" \n                    name=\"confirm\" \n                    formControlName=\"confirm\"\n                    required>\n\n            <div class=\"text-danger\" *ngIf=\"passwordForm.get('confirm').hasError('required') && passwordForm.get('confirm').touched\">\n            Password Confirm is required\n            </div>\n        </div>\n    </div>\n</form>\n  "
    })
], PasswordComponent);

var User = (function () {
    function User() {
    }
    return User;
}());

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param$5 = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.UserEditComponent = (function () {
    function UserEditComponent(usersService, route, router) {
        // init the wait state (and indication animation) to 'off'
        this.wait = false;
        this.passWait = false;
        this.usersService = usersService;
        this.route = route;
        this.router = router;
        this.fb = new _angular_forms.FormBuilder();
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
            password: ['', [_angular_forms.Validators.required, _angular_forms.Validators.minLength(3)]],
            confirm: ['', _angular_forms.Validators.required]
        });
        this.userForm = this.fb.group({
            name: ['', [_angular_forms.Validators.required, _angular_forms.Validators.minLength(3)]],
            email: ['', _angular_forms.Validators.required],
            role: ['', _angular_forms.Validators.required]
        });
        if (this.user.id) {
            this.userForm.controls['name'].setValue(this.user.name);
            this.userForm.controls['email'].setValue(this.user.email);
            this.userForm.controls['role'].setValue(this.user.role.id);
        }
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
            //this.messageService.sendMessage("edit-user", "success");
            if ("create" === res.method) {
                // navigate to Edit User for the new user
                this.router.navigate(['/user/' + res.user.id]);
                //this.messageService.sendMessage("create-user", "success");
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
__decorate$7([
    _angular_core.ViewChild(PasswordComponent)
], exports.UserEditComponent.prototype, "passwordComponent", void 0);
exports.UserEditComponent = __decorate$7([
    _angular_core.Component({
        selector: 'erdiko-user-edit',
        template: "\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <button class=\"btn btn-info btn-sm\" routerLink=\"/list/\">\n            <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i> Back to User List\n        </button>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <br/>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div id=\"id-title\" *ngIf=\"user.id\">\n            User {{ user.id }}\n        </div>\n        <div class=\"panel panel-default\" id=\"edit-update\">\n            <tabset>\n                <tab [heading]=\"createEditHeader()\">\n                    <div class=\"panel-body\">\n                        <alert *ngIf=\"msg\" type=\"success\">{{ msg }}</alert>\n                        <alert *ngIf=\"error\" type=\"danger\">{{ error }}</alert>\n\n                            <form \n                                    id=\"user-edit\" \n                                    class=\"form-horizontal\"\n                                    novalidate \n                                    (ngSubmit)=\"onSubmit(userForm)\" \n                                    [formGroup]=\"userForm\"\n                                >\n\n                                <div class=\"form-group\" *ngIf=\"user && user.id\">\n                                    <label for=\"name\" class=\"col-xs-2 control-label\">ID</label>\n                                    <div class=\"col-xs-10\">\n                                        <p>{{ user.id }}</p>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\" *ngIf=\"user && user.created_at\">\n                                    <label for=\"name\" class=\"col-xs-2 control-label\">Joined</label>\n                                    <div class=\"col-xs-10\">\n                                        <p *ngIf=\"!user.created_at\">n/a</p>\n                                        <p>{{ user.created_at }}</p>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\" *ngIf=\"user.id\">\n                                    <label for=\"name\" class=\"col-xs-2 control-label\">Last Login</label>\n                                    <div class=\"col-xs-10\">\n                                        <p *ngIf=\"!user.last_login\">n/a</p>\n                                        <p>{{ user.last_login }}</p>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"name\" class=\"col-xs-2 control-label\">Name</label>\n                                    <div class=\"col-xs-10\">\n                                        <input type=\"text\" class=\"form-control\" name=\"name\" formControlName=\"name\" placeholder=\"Name\">\n                                        <div class=\"text-danger\" *ngIf=\"userForm.get('name').hasError('required') && userForm.get('name').touched\">\n                                        Name is required\n                                        </div>\n                                        <div class=\"text-danger\" *ngIf=\"userForm.get('name').hasError('minlength') && userForm.get('name').touched\">\n                                        Minimum of 2 characters\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"email\" class=\"col-xs-2 control-label\">Email</label>\n                                    <div class=\"col-xs-10\">\n                                        <input type=\"email\" class=\"form-control\" name=\"email\" \n                                                formControlName=\"email\" placeholder=\"Email\">\n                                        <div class=\"text-danger\" *ngIf=\"userForm.get('email').hasError('required') && userForm.get('email').touched\">\n                                        Email is required\n                                        </div>\n                                        <div class=\"text-danger\" *ngIf=\"userForm.get('email').hasError('pattern') && userForm.get('email').touched\">\n                                        A Valid email is required\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"role\" class=\"col-xs-2 control-label\">Role</label>\n                                    <div class=\"col-xs-10\" id=\"select-role\">\n                                            <select class=\"form-control\" name=\"role\" formControlName=\"role\">\n                                                <option value=\"2\">Admin</option>\n                                                <option value=\"1\">User</option>\n                                            </select>\n                                        <div class=\"text-danger\" *ngIf=\"userForm.get('role').hasError('required') && userForm.get('role').touched\">\n                                        Role is required\n                                        </div>\n                                    </div>\n                                </div>\n\n                            </form>\n\n                            <!--show password input if creating user-->\n                            <erdiko-password *ngIf=\"!user.id\" [passwordForm]=\"passwordForm\"></erdiko-password>\n\n                            <div class=\"form-group\">\n                                <div class=\"col-xs-offset-2 col-xs-4\">\n                                    <button type=\"cancel\" class=\"btn btn-warning\" routerLink=\"/list/\">Cancel</button>\n                                </div>\n                                <div class=\"col-xs-offset-2 col-xs-4\">\n                                    <button type=\"submit\" class=\"btn btn-success\" (click)=\"onSubmit(userForm)\" [disabled]=\"!userForm.valid || wait || (!user.id && !passwordForm.valid)\">\n                                        Save\n                                        <i *ngIf=\"wait\" class=\"fa fa-refresh fa-spin fa-fw\"></i> \n                                    </button>\n                                </div>\n                            </div>\n                    </div>\n                </tab>\n\n                <tab heading=\"Update Password\" *ngIf=\"user.id\">\n\n                    <div class=\"panel-body\">\n\n                        <alert *ngIf=\"passMsg\" type=\"success\">{{ passMsg }}</alert>\n                        <alert *ngIf=\"passError\" type=\"danger\">{{ passError }}</alert>\n\n                        <erdiko-password [passwordForm]=\"passwordForm\"></erdiko-password>\n\n                        <div class=\"form-group\">\n                            <div class=\"col-xs-offset-2 col-xs-4\">\n                                <button type=\"cancel\" class=\"btn btn-warning\" routerLink=\"/list/\">Cancel</button>\n                            </div>\n                            <div class=\"col-xs-offset-2 col-xs-4\">\n                                <button type=\"submit\" class=\"btn btn-success\" (click)=\"onSubmitChangepass(passwordForm)\" [disabled]=\"!passwordForm.valid || passWait\">\n                                    Save\n                                    <i *ngIf=\"passWait\" class=\"fa fa-refresh fa-spin fa-fw\"></i> \n                                </button>\n                            </div>\n                        </div>\n\n                    </div>\n                </tab>\n            </tabset>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <br/>\n    </div>\n</div>\n"
    }),
    __param$5(0, _angular_core.Inject(UsersService)),
    __param$5(1, _angular_core.Inject(_angular_router.ActivatedRoute)),
    __param$5(2, _angular_core.Inject(_angular_router.Router))
], exports.UserEditComponent);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var routes = [];
exports.UserAdminModule = UserAdminModule_1 = (function () {
    function UserAdminModule() {
    }
    UserAdminModule.forRoot = function () {
        return {
            ngModule: UserAdminModule_1,
            providers: [AuthService, UsersService]
        };
    };
    return UserAdminModule;
}());
exports.UserAdminModule = UserAdminModule_1 = __decorate([
    _angular_core.NgModule({
        imports: [
            _angular_platformBrowser.BrowserModule,
            _angular_http.HttpModule,
            _angular_router.RouterModule.forRoot(routes),
            _angular_forms.FormsModule,
            _angular_forms.ReactiveFormsModule,
            ngxBootstrap.AlertModule,
            ngxBootstrap.ModalModule,
            ngxBootstrap.TabsModule
        ],
        declarations: [
            exports.UserListComponent,
            exports.UserEventLogComponent,
            exports.UsersEventLogComponent,
            exports.UserEditComponent,
            PasswordComponent
        ],
        exports: [
            exports.UserListComponent,
            exports.UserEventLogComponent,
            exports.UsersEventLogComponent
        ]
    })
], exports.UserAdminModule);
var UserAdminModule_1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
