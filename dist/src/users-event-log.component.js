var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { UsersService } from './users.service';
var UsersEventLogComponent = (function () {
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
UsersEventLogComponent = __decorate([
    Component({
        selector: 'erdiko-users-event-log',
        template: "\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <br />\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <table class=\"table table-bordered table-hover\"> \n            <thead>\n                <tr>\n                    <th (click)=\"sort('id')\">\n                        ID\n                        <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th>\n                    <th (click)=\"sort('user_id')\">\n                        User ID\n                        <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th>\n                    <th>\n                        Event Log\n                    </th>\n                    <th>\n                        Event Data\n                    </th>\n                    <th (click)=\"sort('created_at')\">\n                        Created At\n                        <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th>\n                </tr>\n            </thead>\n\n            <tbody *ngIf=\"wait\"> \n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <i class=\"fa fa-refresh fa-spin fa-2x fa-fw\"></i> \n                    </td>\n                </tr>\n            </tbody>\n\n            <tbody *ngIf=\"!wait && events.length <= 0\">\n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <alert type=\"warning\">Sorry, no user events were found.</alert>\n                    </td>\n                </tr>\n            </tbody>\n\n            <tbody *ngIf=\"!wait && events.length > 0\">\n                <tr class=\"users-events\" *ngFor=\"let event of events\">\n                    <td> {{event.id}} </td>\n                    <td> {{event.user_id}} </td>\n                    <td> {{event.event}} </td>\n                    <td> {{event.event_data|json}} </td>\n                    <td> {{event.created_at}} </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n<div class=\"row paging\" *ngIf=\"eventsTotal\">\n    <div class=\"col-xs-4\">\n\n        <nav aria-label=\"Page navigation\">\n          <ul class=\"pagination pagination-sm\">\n\n            <li *ngIf=\"(currentPage > 1)\">\n              <a (click)=\"clickPrev()\" aria-label=\"Previous\">\n                <span aria-hidden=\"true\">&laquo;</span>\n              </a>\n            </li>\n\n            <li \n                *ngFor=\"let page of pages\"\n                 [ngClass]=\"{'active': (page == currentPage)}\"\n                >\n                <a (click)=\"clickPage(page)\">{{ page }}</a>\n            </li>\n\n            <li *ngIf=\"(currentPage < getPageCount())\">\n              <a (click)=\"clickNext()\" aria-label=\"Next\">\n                <span aria-hidden=\"true\">&raquo;</span>\n              </a>\n            </li>\n\n          </ul>\n        </nav>\n\n    </div>\n</div>\n  ",
        providers: [UsersService]
    }),
    __param(0, Inject(UsersService))
], UsersEventLogComponent);
export { UsersEventLogComponent };
//# sourceMappingURL=users-event-log.component.js.map