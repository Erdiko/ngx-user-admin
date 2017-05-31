import { Component, Input} from '@angular/core';
import { FormGroup }       from '@angular/forms';
import { User }            from "./user.model";

@Component({
    selector: 'erdiko-password',
    templateUrl: './password.component.html'
})
export class PasswordComponent {

  @Input() passwordForm: FormGroup;

  constructor() {}

  ngOnInit() {}

}
