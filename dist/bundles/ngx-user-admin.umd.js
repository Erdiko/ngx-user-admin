(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/http'), require('@angular/router'), require('ngx-bootstrap'), require('rxjs'), require('rxjs/add/operator/map')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/http', '@angular/router', 'ngx-bootstrap', 'rxjs', 'rxjs/add/operator/map'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['ngx-user-admin'] = global.ng['ngx-user-admin'] || {}),global.ng.core,global._angular_platformBrowser,global._angular_http,global._angular_router,global.ngxBootstrap,global.rxjs));
}(this, (function (exports,_angular_core,_angular_platformBrowser,_angular_http,_angular_router,ngxBootstrap,rxjs) { 'use strict';

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
    _angular_core.Injectable()
], AuthService);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.UsersService = (function () {
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
exports.UsersService = __decorate$2([
    _angular_core.Injectable()
], exports.UsersService);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.UserListComponent = (function () {
    function UserListComponent(usersService, route, router) {
        var _this = this;
        this.usersService = usersService;
        this.route = route;
        this.router = router;
        this.currentPage = 1;
        this.pagesize = 10;
        this.pages = [];
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
    })
], exports.UserListComponent);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var routes = [];
exports.UserAdminModule = (function () {
    function UserAdminModule() {
    }
    return UserAdminModule;
}());
exports.UserAdminModule = __decorate([
    _angular_core.NgModule({
        imports: [
            _angular_platformBrowser.BrowserModule,
            _angular_http.HttpModule,
            _angular_router.RouterModule.forRoot(routes),
            ngxBootstrap.AlertModule,
            ngxBootstrap.ModalModule,
            ngxBootstrap.TabsModule
        ],
        declarations: [
            exports.UserListComponent
        ],
        exports: [
            exports.UserListComponent
        ],
        providers: [
            AuthService,
            exports.UsersService
        ]
    })
], exports.UserAdminModule);

Object.defineProperty(exports, '__esModule', { value: true });

})));
