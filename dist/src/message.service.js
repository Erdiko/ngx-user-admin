var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
/**
 * Service that handles flash messages
 */
var MessageService = (function () {
    function MessageService() {
        /**
         * Messages observable
         */
        this.subject = new Subject();
    }
    /**
     * Add a message to the array
     */
    MessageService.prototype.setMessage = function (msg) {
        this.subject.next(msg);
    };
    /**
     * Return observable array of messages
     */
    MessageService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    return MessageService;
}());
MessageService = __decorate([
    Injectable()
], MessageService);
export { MessageService };
//# sourceMappingURL=message.service.js.map