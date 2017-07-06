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
import { Component, Inject } from '@angular/core';
import { UsersService } from '../users.service';
import { tpl } from './users-event-log.component.tpl';
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
    UsersEventLogComponent = __decorate([
        Component({
            selector: 'erdiko-users-event-log',
            template: tpl
        }),
        __param(0, Inject(UsersService)),
        __metadata("design:paramtypes", [UsersService])
    ], UsersEventLogComponent);
    return UsersEventLogComponent;
}());
export { UsersEventLogComponent };
//# sourceMappingURL=users-event-log.component.js.map