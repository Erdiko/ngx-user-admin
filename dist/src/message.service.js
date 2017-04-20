var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
var MessageService = (function () {
    function MessageService() {
        this.messageUpdate = new Subject();
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
MessageService = __decorate([
    Injectable()
], MessageService);
export { MessageService };
//# sourceMappingURL=message.service.js.map