/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpModule }           from '@angular/http';

import { AppComponent }         from './app.component';
import { HeaderComponent }      from './header/header.component';
import { AuthService }          from './auth.service';
import { UsersService }         from './users.service';
import { MessageService }       from './message.service';
import { UserResolve }          from './user-resolve.service';

describe('AppComponent', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HeaderComponent
            ],
            imports: [
                HttpModule
            ],
            providers: [
                AuthService,
                UsersService,
                UserResolve,
                MessageService
            ],
            schemas:  [CUSTOM_ELEMENTS_SCHEMA]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', async(() => {
        fixture.detectChanges();
        let app = fixture.debugElement.componentInstance;
        const compiled = fixture.debugElement.nativeElement;
        expect(app).toBeTruthy();
    }));

    it('should include and render the header component', async(() => {
        fixture.detectChanges();
        let app = fixture.debugElement.componentInstance;
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('app-header')).toBeTruthy();
    }));

    it('should include and render a router outlet', async(() => {
        fixture.detectChanges();
        let app = fixture.debugElement.componentInstance;
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('router-outlet')).toBeTruthy();
    }));

});
