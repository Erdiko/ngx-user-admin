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

import { FormsModule, 
         FormBuilder, 
         FormGroup, 
         Validators,
         ReactiveFormsModule }  from '@angular/forms';

import { PasswordComponent }        from './password.component';

describe('PasswordComponent', () => {
    let component: PasswordComponent;
    let fixture: ComponentFixture<PasswordComponent>;

    let bodyData: any;

    let user: User;

    beforeEach(async(() => {
    
        TestBed.configureTestingModule({
            declarations: [
                PasswordComponent
            ],
            imports: [
                FormsModule,
                FormBuilder,
                FormGroup,
                ReactiveFormsModule
            ],
            providers: [
                BaseRequestOptions
            ],
            schemas:  [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();

        const testbed = getTestBed();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /*
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should prevent password form submission with invalid input', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        component.user = user;
        component.ngOnInit();

        component.passwordForm.setValue({'password': '', 'confirm': ''});
        fixture.detectChanges();
        expect(component.passwordForm.controls.passwordInput.invalid).toBeTruthy();

        component.passwordForm.setValue({'password': '123', 'confirm': '456'});
        fixture.detectChanges();
        expect(component.passwordForm.controls.passwordInput.invalid).toBeTruthy();

        component.passwordForm.setValue({'password': '------'});
        fixture.detectChanges();
        expect(component.passwordForm.controls.passwordInput.invalid).toBeTruthy();
    });

    it('should allow password update submission with valid input', async(() => {

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        // set up a faked api response
        setupConnections(backend, {
            body: {
                body: bodyData
            },
            status: 200
        });

        // init the component
        component.ngOnInit();

        // fill out the form & submit
        component.passwordForm.setValue({'password': 'abcdef123456', 'confirm': 'abcdef123456'});
        fixture.detectChanges();

        expect(component.passwordForm.controls.passwordInput.invalid).toBeFalsy();
        component.onSubmitChangepass(component.passwordForm).then(() => {  
            //TODO wtf
            //expect(component.passMsg).toEqual("User password successfully updated.");
        });

    }))
    */

});
