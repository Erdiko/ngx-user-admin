import { Component, Input} from '@angular/core';
import { FormGroup }       from '@angular/forms';
import { User }            from "./user.model";

import { tpl } from './password.component.tpl';

@Component({
    selector: 'erdiko-password',
    template: tpl
})
export class PasswordComponent {

  @Input() passwordForm: FormGroup;

  constructor() {}

  ngOnInit() {}

}
