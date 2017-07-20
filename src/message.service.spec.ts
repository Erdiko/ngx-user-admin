/* tslint:disable:no-unused-variable */

import {
    async,
    getTestBed,
    inject,
    TestBed
} from '@angular/core/testing';

import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import 'rxjs/Rx';

import { MessageService } from './message.service';

describe('MessageService', () => {

    let service: MessageService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
            
            ]
         });

        const testbed = getTestBed();
    }));

    it('#setMessage should add a message to the array', () => {
        

    });

    it('#getMessage should return an array of observable messages', () => {

        
    });

});
