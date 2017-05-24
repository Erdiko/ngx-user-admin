import { Component, Input} from '@angular/core';
import { FormGroup }       from '@angular/forms';
import { User }            from "./user.model";

@Component({
  selector: 'erdiko-password',
  template: `
<form 
        id="user-password-change" 
        class="form-horizontal"
        novalidate 
        (ngSubmit)="onSubmitChangepass(passwordForm)" 
        [formGroup]="passwordForm"
    >

    <div class="form-group">
        <p class="col-xs-12">Passwords must contain at least 1 alpha & 1 numeric character, with a minimum length of 5 characters</p>
        <label for="password" class="col-xs-2 control-label">New Password</label>
        <div class="col-xs-10">
            <input  type="password" 
                    class="form-control" 
                    name="password" 
                    formControlName="password"
                    required>
            <div class="text-danger" *ngIf="passwordForm.get('password').hasError('required') && passwordForm.get('password').touched">
            Password is required
            </div>
        </div>
    </div>
    <div class="form-group" [formGroup] = "passwordForm">
        <label for="password" class="col-xs-2 control-label">Confirm Password</label>
        <div class="col-xs-10">

            <input  type="password" 
                    class="form-control" 
                    name="confirm" 
                    formControlName="confirm"
                    required>

            <div class="text-danger" *ngIf="passwordForm.get('confirm').hasError('required') && passwordForm.get('confirm').touched">
            Password Confirm is required
            </div>
        </div>
    </div>
</form>
  `
})
export class PasswordComponent {

  @Input() passwordForm: FormGroup;

  constructor() {}

  ngOnInit() {}

}
