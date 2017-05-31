var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var MessageComponent = (function () {
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
MessageComponent = __decorate([
    Component({
        selector: 'erdiko-message',
        templateUrl: './message.component.html'
    })
], MessageComponent);
export { MessageComponent };
//# sourceMappingURL=message.component.js.map