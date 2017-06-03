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
import { MessageService } from './message.service';
import { tpl } from './message.component.tpl';
var MessageComponent = (function () {
    function MessageComponent(messageService) {
        var _this = this;
        this.messageService = messageService;
        this.subscription = this.messageService
            .getMessage()
            .subscribe(function (message) {
            _this.message = message;
        });
    }
    MessageComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return MessageComponent;
}());
MessageComponent = __decorate([
    Component({
        selector: 'erdiko-message',
        template: tpl
    }),
    __param(0, Inject(MessageService)),
    __metadata("design:paramtypes", [MessageService])
], MessageComponent);
export { MessageComponent };
//# sourceMappingURL=message.component.js.map