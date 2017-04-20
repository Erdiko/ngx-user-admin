var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, ViewChild } from '@angular/core';
var UserListComponent = (function () {
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
__decorate([
    ViewChild('confirmDeleteModal')
], UserListComponent.prototype, "confirmDeleteModal", void 0);
UserListComponent = __decorate([
    Component({
        selector: 'erdiko-user-list',
        template: "\n<div class=\"row\">\n    <div class=\"col-xs-4\">\n        <button class=\"btn btn-info btn-sm\" routerLink=\"/user/\">Create a New User</button>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <br />\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <table class=\"table table-bordered table-hover\"> \n            <thead> \n                <tr> \n                    <th (click)=\"sort('id')\">\n                        ID \n                        <i *ngIf=\"sortCol == 'id'\" class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th> \n                    <th (click)=\"sort('name')\">\n                        User Name\n                        <i *ngIf=\"sortCol == 'name'\" class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th> \n                    <th>\n                        Role\n                    </th> \n                    <th>\n                        Last Login\n                    </th> \n                    <th>\n                        Joined\n                    </th> \n                    <th>Edit</th> \n                    <th>Delete</th> \n                </tr> \n            </thead> \n\n            <tbody *ngIf=\"wait\"> \n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <i class=\"fa fa-refresh fa-spin fa-2x fa-fw\"></i> \n                    </td>\n                </tr>\n            </tbody> \n\n            <tbody *ngIf=\"!wait && error\"> \n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <alert type=\"warning\">{{ error }}</alert>\n                    </td>\n                </tr>\n            </tbody> \n\n            <tbody *ngIf=\"!wait && !error && users && users.length < 1\"> \n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <alert type=\"warning\">Sorry, no users were found. Please try again.</alert>\n                    </td>\n                </tr>\n            </tbody> \n\n            <tbody *ngIf=\"!wait && !error && users && users.length > 0\"> \n                <tr class=\"user_row\" *ngFor=\"let user of users; let index = index\"> \n                    <th class=\"user_id\" scope=\"row\">{{ user.id }}</th> \n                    <td class=\"user_name\">{{ user.name }}</td> \n                    <td class=\"user_role_name\">{{ user.role.name }}</td> \n                    <td class=\"user_last_login\">{{ user.last_login }}</td> \n                    <td class=\"user_joined\">{{ user.joined }}</td> \n                    <td class=\"user_edit\"><a routerLink=\"/user/{{ user.id }}\">Edit</a></td>\n                    <td class=\"user_delete\"><button type=\"button\" class=\"btn btn-danger\" (click)=\"clickDelete(user.id)\">Delete</button></td> \n                </tr> \n            </tbody> \n        </table>\n    </div>\n</div>\n<div class=\"row paging\" *ngIf=\"total\">\n    <div class=\"col-xs-4\">\n\n        <nav aria-label=\"Page navigation\">\n          <ul class=\"pagination pagination-sm\">\n\n            <li *ngIf=\"(currentPage > 1)\">\n              <a (click)=\"clickPrev()\" aria-label=\"Previous\">\n                <span aria-hidden=\"true\">&laquo;</span>\n              </a>\n            </li>\n\n            <li \n                *ngFor=\"let page of pages; let index = index\"\n                 [ngClass]=\"{'active': (page == currentPage)}\"\n                 [attr.id]=\"'page'+(index + 1)\"\n                >\n                <a (click)=\"clickPage(page)\">{{ page }}</a>\n            </li>\n\n            <li *ngIf=\"(currentPage < getPageCount())\">\n              <a (click)=\"clickNext()\" aria-label=\"Next\">\n                <span aria-hidden=\"true\">&raquo;</span>\n              </a>\n            </li>\n\n          </ul>\n        </nav>\n\n    </div>\n</div>\n\n<div bsModal #confirmDeleteModal=\"bs-modal\" class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\">Delete?</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"cancelDelete()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <p>Are you sure you want to delete this user?</p>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-6\">\n                <button type=\"button\" class=\"btn btn-warning\" (click)=\"cancelDelete()\">Cancel</button>\n            </div>\n            <div class=\"col-xs-6\">\n                <button type=\"button\" class=\"btn btn-danger\" (click)=\"confirmDelete(selectedUser)\">Confirm</button>\n            </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n  "
    })
], UserListComponent);
export { UserListComponent };
//# sourceMappingURL=user-list.component.js.map