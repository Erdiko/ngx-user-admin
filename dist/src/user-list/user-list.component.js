var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { UsersService } from '../users.service';
import { MessageService } from '../message.service';
/**
 * HTML template for this component
 */
import { tpl } from './user-list.component.tpl';
/**
 * User List Component
 *
 * Displays a sortable list of current users in the system
 */
var UserListComponent = (function () {
    /**
     *
     */
    function UserListComponent(usersService, messageService, route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        /**
         *
         */
        this.currentPage = 1;
        /**
         *
         */
        this.pagesize = 10;
        /**
         *
         */
        this.pages = [];
        this.usersService = usersService;
        this.messageService = messageService;
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
    /**
     * on init get a list of the users
     */
    UserListComponent.prototype.ngOnInit = function () {
        this._getUsers();
    };
    /**
     * unsub all the things
     */
    UserListComponent.prototype.ngOnDestroy = function () {
        this.users$.unsubscribe();
        this.total$.unsubscribe();
    };
    /**
     * update the user list by making another request to the users service
     */
    UserListComponent.prototype._getUsers = function () {
        this.wait = true;
        this.usersService.getUsers(this.pagesize, this.currentPage, this.sortCol, this.sortDir);
    };
    /**
     * list has been updated; toggle wait state off and generate pagination links
     */
    UserListComponent.prototype._listUpdated = function () {
        this.wait = false;
        this._setPagination();
    };
    /**
     * return pagination links count
     */
    UserListComponent.prototype.getPageCount = function () {
        return Math.ceil(this.total / this.pagesize);
    };
    /**
     * create a list of pagination links
     */
    UserListComponent.prototype._setPagination = function () {
        this.pages = [];
        for (var i = 1; i <= this.getPageCount(); i++) {
            this.pages.push(i);
        }
    };
    /**
     * pagination click listeners
     */
    UserListComponent.prototype.clickPage = function (idx) {
        this.currentPage = idx;
        this._getUsers();
    };
    /**
     * handles "next" pagination button click
     */
    UserListComponent.prototype.clickNext = function () {
        this.currentPage++;
        this._getUsers();
    };
    /**
     * handles "prev" pagination button click
     */
    UserListComponent.prototype.clickPrev = function () {
        this.currentPage--;
        this._getUsers();
    };
    /**
     * sort click listeners
     */
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
    /**
     *
     */
    UserListComponent.prototype.clickDelete = function (idx) {
        this.selectedUser = idx;
        this.confirmDeleteModal.show();
    };
    /**
     *
     */
    UserListComponent.prototype.cancelDelete = function () {
        this.confirmDeleteModal.hide();
    };
    /**
     *
     */
    UserListComponent.prototype.confirmDelete = function (idx) {
        var _this = this;
        this.confirmDeleteModal.hide();
        this.wait = true;
        this.usersService.deleteUser(this.selectedUser)
            .then(function (res) { return _this._handleResponse(res); })
            .catch(function (error) { return _this.messageService.setMessage({ "type": "danger", "body": error }); });
    };
    /**
     *
     */
    UserListComponent.prototype._handleResponse = function (res) {
        this._getUsers();
        this.wait = false;
        if (false !== res.success) {
            this.messageService.setMessage({ "type": "success", "body": "User successfully deleted" });
        }
        else {
            this.messageService.setMessage({ "type": "danger", "body": res.error_message });
        }
    };
    return UserListComponent;
}());
__decorate([
    ViewChild('confirmDeleteModal'),
    __metadata("design:type", ModalDirective)
], UserListComponent.prototype, "confirmDeleteModal", void 0);
UserListComponent = __decorate([
    Component({
        selector: 'erdiko-user-list',
        template: tpl
    }),
    __param(0, Inject(UsersService)),
    __param(1, Inject(MessageService)),
    __metadata("design:paramtypes", [UsersService,
        MessageService,
        ActivatedRoute,
        Router])
], UserListComponent);
export { UserListComponent };
//# sourceMappingURL=user-list.component.js.map