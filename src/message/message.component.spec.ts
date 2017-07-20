/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';

import { AlertModule }             from 'ngx-bootstrap';

import { MessageService }          from '../message.service';
import { MessageComponent }        from './message.component';

describe('MessageComponent', () => {
    let component: MessageComponent;
    let fixture: ComponentFixture<MessageComponent>;

    let bodyData: any;

    beforeEach(async(() => {
    
        TestBed.configureTestingModule({
            declarations: [
                MessageComponent
            ],
            imports: [
                AlertModule.forRoot(),
            ],
            providers: [
                MessageService
            ],
            schemas:  [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();

        const testbed = getTestBed();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
