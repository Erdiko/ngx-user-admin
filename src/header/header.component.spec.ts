/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Router } from "@angular/router";

import { HttpModule }      from '@angular/http';

import 'rxjs/Rx';

import { AuthService }     from '../auth.service';
import { UsersService }    from '../users.service';
import { UserResolve }     from '../user-resolve.service';
import { MessageService }  from '../message.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    let router: any;

    let authService: AuthService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ 
                HeaderComponent 
            ],
            imports: [
                HttpModule
            ],
            providers: [
                {
                    provide: Router, 
                    useClass: class { navigate = jasmine.createSpy("navigate"); } 
                },
                AuthService,
                UsersService,
                UserResolve,
                MessageService
            ]
        })
        .compileComponents();

        const testbed = getTestBed();
        authService = testbed.get(AuthService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display an navbar', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('.navbar.navbar-inverse')).toBeTruthy();
    });

    it('should display an ul element with 0 links when notlogged in', () => {
        const compiled = fixture.debugElement.nativeElement;
        spyOn(authService, 'isLoggedIn').and.returnValue(false);
        fixture.detectChanges();

        expect(compiled.querySelectorAll('ul')).toBeTruthy();
        expect(compiled.querySelectorAll('ul li').length).toBe(0);
    });


    it('should display an ul element with 3 links when logged in', () => {
        
        /*
         * Get the mocked service here from our fixture
         * and add a spyOn over-ride to pretend we have
         * a logged in user.
         */
        spyOn(authService, 'isLoggedIn').and.returnValue(true);

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('ul')).toBeTruthy();
        expect(compiled.querySelectorAll('ul li').length).toBe(3);
    });

    it('should navigate to /login when clickLogout is fired', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(true);

        let router = fixture.debugElement.injector.get(Router);

        component.clickLogout();

        expect(router.navigate).toHaveBeenCalledWith(["/login"]);
    });

});
