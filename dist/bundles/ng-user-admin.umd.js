(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/http'), require('@angular/router'), require('@angular/forms'), require('ngx-bootstrap'), require('rxjs'), require('rxjs/add/operator/map')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/http', '@angular/router', '@angular/forms', 'ngx-bootstrap', 'rxjs', 'rxjs/add/operator/map'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['ng-user-admin'] = global.ng['ng-user-admin'] || {}),global.ng.core,global._angular_platformBrowser,global.vendor._angular_http,global._angular_router,global._angular_forms,global.ngxBootstrap,global.rxjs));
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
var MessageService = (function () {
    function MessageService() {
        this.messageUpdate = new rxjs.Subject();
        this.messages = {
            'login': {
                'success': "You have Successfully logged in",
                'no-password': "Username or Password is invalid",
                'no-access': "You need to login to gain access",
                'error': "An error occurred. Please try again"
            },
            'logout': {
                'success': "You have Successfully logged out",
                'error': "You have been logged out unexpectedly"
            },
            'create-user': {
                'success': "User was successfully created",
                'error': "An error occurred. Please try again"
            },
            'edit-user': {
                'success': "User record was successfully updated",
                'error': "An error occurred. Please try again"
            },
            'edit-password': {
                'success': "User password successfully updated",
                'error': "An error occurred. Please try again"
            },
            'delete-user': {
                'success': "User successfully deleted",
                'error': "An error occured. Please try again"
            }
        };
    }
    MessageService.prototype.setMessageType = function (result) {
        switch (result) {
            case 'success':
                return 'success';
            case 'warning':
                return 'warning';
            default:
                return 'danger';
        }
    };
    MessageService.prototype.sendMessage = function (action, result) {
        var messageType = this.setMessageType(result);
        var message = this.messages[action][result];
        this.messageUpdate.next({ body: message, type: messageType });
    };
    MessageService.prototype.getMessage = function () {
        return this.messageUpdate.asObservable();
    };
    MessageService.prototype.clearMessage = function () {
        this.messageUpdate.next(null);
    };
    return MessageService;
}());
MessageService = __decorate$3([
    _angular_core.Injectable()
], MessageService);

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
__decorate$4([
    _angular_core.ViewChild('confirmDeleteModal')
], exports.UserListComponent.prototype, "confirmDeleteModal", void 0);
exports.UserListComponent = __decorate$4([
    _angular_core.Component({
        selector: 'erdiko-user-list',
        templateUrl: './user-list.component.html'
    }),
    __param$2(0, _angular_core.Inject(UsersService))
], exports.UserListComponent);

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
__decorate$5([
    _angular_core.Input()
], exports.UserEventLogComponent.prototype, "inputUserId", void 0);
exports.UserEventLogComponent = __decorate$5([
    _angular_core.Component({
        selector: 'erdiko-user-event-log',
        templateUrl: './user-event-log.component.html',
        providers: [UsersService]
    }),
    __param$3(0, _angular_core.Inject(UsersService))
], exports.UserEventLogComponent);

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
exports.UsersEventLogComponent = __decorate$6([
    _angular_core.Component({
        selector: 'erdiko-users-event-log',
        templateUrl: './users-event-log.component.html',
        providers: [UsersService]
    }),
    __param$4(0, _angular_core.Inject(UsersService))
], exports.UsersEventLogComponent);

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
__decorate$7([
    _angular_core.Input()
], PasswordComponent.prototype, "passwordForm", void 0);
PasswordComponent = __decorate$7([
    _angular_core.Component({
        selector: 'erdiko-password',
        templateUrl: './password.component.html'
    })
], PasswordComponent);

var User = (function () {
    function User() {
    }
    return User;
}());

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param$5 = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.UserEditComponent = (function () {
    function UserEditComponent(usersService, route, router, messageService) {
        // init the wait state (and indication animation) to 'off'
        this.wait = false;
        this.passWait = false;
        this.usersService = usersService;
        this.messageService = messageService;
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
    UserEditComponent.prototype.isUserFormValid = function () {
        if (this.wait) {
            return false;
        }
        if (!this.user.id) {
            if (!this.passwordForm.valid) {
                return false;
            }
            else {
                if (this.passwordForm.controls['password'].value !== this.passwordForm.controls['confirm'].value) {
                    return false;
                }
            }
        }
        return (this.userForm.valid && !this.wait);
    };
    UserEditComponent.prototype.isPassFormValid = function () {
        if (this.passWait) {
            return false;
        }
        if (!this.passwordForm.valid) {
            return false;
        }
        else {
            if (this.passwordForm.controls['password'].value !== this.passwordForm.controls['confirm'].value) {
                return false;
            }
        }
        return true;
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
            this.messageService.sendMessage("edit-user", "success");
            if ("create" === res.method) {
                // navigate to Edit User for the new user
                this.router.navigate(['/user/' + res.user.id]);
                this.messageService.sendMessage("create-user", "success");
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
__decorate$8([
    _angular_core.ViewChild(PasswordComponent)
], exports.UserEditComponent.prototype, "passwordComponent", void 0);
exports.UserEditComponent = __decorate$8([
    _angular_core.Component({
        selector: 'erdiko-user-edit',
        providers: [MessageService],
        templateUrl: './user-edit.component.html'
    }),
    __param$5(0, _angular_core.Inject(UsersService)),
    __param$5(1, _angular_core.Inject(_angular_router.ActivatedRoute)),
    __param$5(2, _angular_core.Inject(_angular_router.Router)),
    __param$5(3, _angular_core.Inject(MessageService))
], exports.UserEditComponent);

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.MessageComponent = (function () {
    function MessageComponent(messageService, router) {
        var _this = this;
        this.messageService = messageService;
        this.router = router;
        this.messageSubscription = this.messageService
            .getMessage()
            .subscribe(function (message) { return _this.message = message; });
    }
    MessageComponent.prototype.close = function () {
        this.message = null;
    };
    return MessageComponent;
}());
exports.MessageComponent = __decorate$9([
    _angular_core.Component({
        selector: 'erdiko-message',
        templateUrl: './message.component.html'
    })
], exports.MessageComponent);

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
            providers: [AuthService, UsersService, MessageService]
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
            PasswordComponent,
            exports.MessageComponent
        ],
        exports: [
            exports.UserListComponent,
            exports.UserEventLogComponent,
            exports.UsersEventLogComponent,
            exports.UserEditComponent,
            exports.MessageComponent
        ],
        providers: [
            AuthService,
            UsersService,
            MessageService
        ]
    })
], exports.UserAdminModule);
var UserAdminModule_1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
