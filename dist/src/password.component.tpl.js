export var tpl = "\n<form \n        id=\"user-password-change\" \n        class=\"form-horizontal\"\n        novalidate \n        (ngSubmit)=\"onSubmitChangepass(passwordForm)\" \n        [formGroup]=\"passwordForm\"\n    >\n\n    <div class=\"form-group\">\n        <p class=\"col-xs-12\">Passwords must contain at least 1 alpha & 1 numeric character, with a minimum length of 5 characters</p>\n        <label for=\"password\" class=\"col-xs-2 control-label\">New Password</label>\n        <div class=\"col-xs-10\">\n            <input  type=\"password\" \n                    class=\"form-control\" \n                    name=\"password\" \n                    formControlName=\"password\"\n                    required>\n            <div class=\"text-danger\" *ngIf=\"passwordForm.get('password').hasError('required') && passwordForm.get('password').touched\">\n            Password is required\n            </div>\n        </div>\n    </div>\n    <div class=\"form-group\" [formGroup] = \"passwordForm\">\n        <label for=\"password\" class=\"col-xs-2 control-label\">Confirm Password</label>\n        <div class=\"col-xs-10\">\n\n            <input  type=\"password\" \n                    class=\"form-control\" \n                    name=\"confirm\" \n                    formControlName=\"confirm\"\n                    required>\n\n            <div class=\"text-danger\" *ngIf=\"passwordForm.get('confirm').hasError('required') && passwordForm.get('confirm').touched\">\n            Password Confirm is required\n            </div>\n        </div>\n    </div>\n</form>\n";
//# sourceMappingURL=password.component.tpl.js.map