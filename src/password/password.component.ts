import { Component, Input} from '@angular/core';
import { FormGroup }       from '@angular/forms';

import { tpl } from './password.component.tpl';

/**
 * Password Component
 *
 * Component to display password update form
 */
@Component({
    selector: 'erdiko-password',
    template: tpl
})
export class PasswordComponent {

  @Input() passwordForm: FormGroup;

  constructor() {}

  ngOnInit() {}

}
