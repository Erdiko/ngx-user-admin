import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from "@angular/router";

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {

    let router: any;

    let service: AuthGuard = null;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                {
                    provide: Router, 
                    useClass: class { navigate = jasmine.createSpy("navigate"); } 
                }
            ],
            imports: [ 

            ]
        });

        var store = {};

        spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
            return store[key] || null;
        });

        spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
            delete store[key];
        });

        spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
            return store[key] = <string>value;
        });

        spyOn(localStorage, 'clear').and.callFake(() =>  {
            store = {};
        });

    }));

    beforeEach(inject([AuthGuard], (agService:AuthGuard) => {
        service = agService;
    }));

    it('checks if a user is valid before routing', () => {
        expect(service.canActivate()).toBeFalsy();

        localStorage.setItem('currentUser', JSON.stringify({ token: "123" }));

        expect(service.canActivate()).toBeTruthy();
    });

});
