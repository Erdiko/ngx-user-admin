import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router }                               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

import { MessageService }           from '../message.service';
import { AuthService }              from '../auth.service';

import { tpl } from './login.component.tpl';

@Component({
  selector: 'app-login',
  template: tpl
})
export class LoginComponent implements OnInit {

    public wait: any;

    public title: string;

    public messageService: MessageService;
    public loginForm: FormGroup;

    public loggedOut: string;
    public error: string;

    constructor(
           @Inject(MessageService) messageService: MessageService,
           private authService: AuthService,
           private router: Router,
           private fb: FormBuilder) { 

        // init the wait state (and indication animation) to 'off'
        this.wait = false;
        
        this.messageService = messageService;
    }

    ngOnInit() {

        this._initForm();

    }

    // foo bar
    private _initForm() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password:  ['', Validators.required]
        });
    }

    onSubmit({ value, valid }: { value: any, valid: boolean }) {

        if(valid) {

            this.wait = true;
            this.authService.login(value)
                .subscribe(result => {
                    if (result === true) {
                        this.router.navigate(['/']);
                        this.messageService.setMessage({"type": "success", "body": "Login successful"});
                    } else {
                        this.messageService.setMessage({"type": "danger", "body": "Login un-successful"});
                        this.wait = false;
                    }
                }, err => {
                    this.messageService.setMessage({"type": "danger", "body": "Login un-successful"});
                    this.wait = false;
                });

        }
    }

}
