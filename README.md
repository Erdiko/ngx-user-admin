# ngx-user-admin

**A modular AngularJS User Management UI package**

ngx-user-admin is a npm package designed for use with the [Erdiko User Admin Module](https://github.com/Erdiko/user-admin) but is easily extended for use in other projects. Secured with routing guards and JWT tokens, this package is a great start (or end) for secure user management.

The UI relies upon the Twitter Bootstrap / ngx-bootstrap projects and is easily modified for customization by extending the components.

**Note** this is an active development project and not quite ready for production yet.  A stable V1 is due for release end of June 2017.


Package Installation
------------

This package is included as a dependency with our [user-admin](https://github.com/Erdiko/user-admin) project by default. We highly suggest you check out this package for all your user administration needs. 

If you would like to use this package with your custom package, you will need to provide matching AJAX responses or extend the services. For more information, please refer to our documentation (coming soon).

Manual installation of this package is also quite simple and is required for local development:

`npm i --save-dev @erdiko/ngx-user-admin`


## Package Commands

* Compile and export files for end user: `npm run build`
* Run the unit tests: `npm run test`


## Editing & Compiling the Code Locally

The easiest way to install this package locally is as a depedency of our user-admin project, but you must install the package locally and link to it if you wish to edit the code and test your changes.

First you must link your local package then follow our guidelines for local development.

As a rule, edit code in the `src` directory and link the compiled bundle from the `dist` directory. 

### Local Development Workflow

* Fork and clone the ngx-user-admin repo to a local directory
* Fork and clone the user-admin repo to a local directory
* NPM link the ngx-user-admin `dist` directory via `npm link`
* Install the user-admin repo's npm dependencies via `npm i`
* Edit the code in the ngx-user-admin `src` directory
* Build the package via `npm run build` and test in the user-admin application

#### NPM Linking

[NPM's Link](https://docs.npmjs.com/cli/link) command allows you to install a locally hosted package into your project.

Please note that if/when you delete your node_modules directory the link will remain present and will be installed on subseuqent installs! Please refer to the npm docs on how to remove the link when you are done developing!

#### How to Link the package

1. cd into your locally cloned `ngx-user-admin` package and navigate to the `dist` directory
1. create a link with this command: `npm link`
1. cd into your locally cloned `user-admin` package, navigate to the angular application directory `app/themes/user-admin`, and install the package link with this command: `npm link @erdiko/ngx-user-admin`

## Package Overview

The package itself provides the following elements:

* Application Routes
* Services, Guards & Resolvers
* Components

More info can be found in our full documentation (coming soon).

### Routes

The app consists of a few simple routes with more to be added in the near future. All of these can be found in the `user-admin` module.

##### Login

Presents a basic login form requiring the user to enter an email and password.

This is default view for logged out users. 

##### Home

Presents a list of links allowing the user to access the remaining routes. 

##### User List

Presents a sortable list of users returned via AJAX from the Users Service.

##### User Events

Presents a sortable list showing user events returned via AJAX from the Users Service.

##### User Edit

Presents a form allowing the current user to edit a provided user record, and the User Event log.

### Services, Guards & Resolves

##### Auth Service

Handles AJAX login requests from the Login Component and is responsible for creating the localstorage record indicating a logged in user.

This service is used by the Login Component described below.

##### Users Service

This service manages the following actions and AJAX endpoints:

* User List
* User Events
* Create and Update User

##### Messages Service

An observable service to handle the flash messaging displayed below the header component. This service is paired with the message component to display application messaging and results from a user action.

##### Auth Guard

Routing guard that only allows logged in users to access a route by verifying the user record stored in localstorage.

##### User Resolve

Retrieves and provides a user record based upon an ID from the User Edit Route. This guard prevents the User Edit route from loading until it finds an expected user.

### Models

##### User

A model representing a single User Record when returned from the Users Service.

### Components

##### Message

Component that displays a flash message that uses the Messages Service to provide messaging.

##### Login

Component that displays a login form prompting the user for an email and password. 

This component is the default view for logged out users.

##### Header

Component to display links to the application routes.

##### Home

Component displaying a list of application routes. 

This is the default view for a logged in user.

##### User List

Component displaying a sortable list of application Users.

##### User Edit

Component displaying a form allowing the user to create a new user or edit an existing user. 

It requires the password component to allow the user to edit a user's password.

##### Password

Component that displays a simple form allowing the user to edit a user's password.

##### User Events

Component displaying a sortable list of application Users.

##### User Event

Component displaying the events for a specific user.


Extending this Package
------------

Extending the ngx-user-admin package is simple and a safe way to extend the package for usage in your package. While the official Angular Docs have more complete instructions and tips on how to extend elements, I have created an example that we dissect below where we extend two components and we provide custom a custom HTML template: Home Component & User Edit Component.

You can see the full example on my [github repo here](https://github.com/saarmstrong/ngx-user-admin-test)).

This example is a "fresh" vanilla Angular CLI application I created for this example via the simple command `ng new ngx-user-admin-test`.  

## Create your Components & Application Module Set Up

I created two components (MyhomeComponent & MyusereditComponent) with the following commands:

`ng generate component myhome && ng generate component myuseredit`

After importing the `@erdiko/ngx-user-admin` module, you will need to import these into your new Application module as seen below:


File: `app/app.module.ts`

```
...

// Import the ngx-user-admin module
import { UserAdminModule }      from '@erdiko/ngx-user-admin';

...

// Import the extended components from ngx-user-admin package
import { MyhomeComponent }      from './myhome/myhome.component';
import { MyusereditComponent }  from './myuseredit/myuseredit.component';
```

You will then have to create some custom routing to load your soon to be extended components and import this into your module:


File: `app/app.module.ts`

```
...

/**
  Custom routing to make sure we use our extended components
 */

// clang-format off
const routes: Routes = [
     {
         path: 'user',
         component: MyusereditComponent
     },
     {
         path: '',
         component: MyhomeComponent
     },
     {
         path: '**',
         redirectTo: ''
     }
];
// clang-format on

@NgModule({
  declarations: [
    AppComponent,

    // Declare our custom components
    MyhomeComponent,
    MyusereditComponent
  ],
  imports: [

    ...

    // Import our custom routes
    RouterModule.forRoot(routes),
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

And then you will need to update the Application component HTML template to include the `<router-outlet>` component so we can see the router output.

File: `app/app.component.html`

```html
<h1>
  {{title}}
</h1>
<div class="page-content">
    <router-outlet></router-outlet>
</div>
```


## Extended Component Example: Home Component

Below is an example of an extended version of the ngx-user-admin Home Component. This simple example shows how we can provide a custom HTML template to the component so we can provide a different list of links for the user. 

Here are the two files that make up our custom component:

File: `myhome/myhome.component.ts`

```
...

// Import the component we will extend
import { HomeComponent }   from '@erdiko/ngx-user-admin';

@Component({
  selector: 'app-myhome',
  templateUrl: './myhome.component.html'
})
export class MyhomeComponent extends HomeComponent {

  constructor() {
    super();
  }

}
```

File: `myhome/myhome.component.html`

```html
<div class="row">
  <div class="col-xs-12">
    <h1 id="welcome-title">My Extended ngx-user-admin Home Component</h1>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <br />
  </div>
</div>
<div class="row">
  <div class="col-sm-6 col-xs-12">
    <ul class="list-group">
      <li class="list-group-item">
        <a routerLink="/user/">My Create a User</a>
      </li>
    </ul>
  </div>
</div>
```


## Extended Component Example: User Edit 

Below is an example of an extended version of the ngx-user-admin Home Component. This simple example shows how we can provide a custom HTML template to the component so we can provide a different list of links for the user. 

Here are the two files that make up our custom component:


File: `myuseredit/myuseredit.component.ts`

```
...

// Import the components & service we will extend
import { UserEditComponent }    from '@erdiko/ngx-user-admin';
import { AuthService }          from '@erdiko/ngx-user-admin';
import { UsersService }         from '@erdiko/ngx-user-admin';
import { MessageService }       from '@erdiko/ngx-user-admin';

@Component({
  selector: 'app-myusereditcomponent',
  templateUrl: './myuseredit.component.html',
  providers: [AuthService, UsersService, MessageService]
})
export class MyusereditComponent extends UserEditComponent {

    constructor(
            @Inject(UsersService) usersService: UsersService,
            @Inject(ActivatedRoute) route: ActivatedRoute,
            @Inject(Router) router: Router,
            @Inject(MessageService) messageService: MessageService) {

        super(usersService, route, router, messageService);
    }

}
```

File: `myuseredit/myuseredit.component.html`

```html
<div class="row">
    <div class="col-xs-12">
        <button class="btn btn-info btn-sm" routerLink="/">
            <i class="fa fa-chevron-left" aria-hidden="true"></i> Back to Home
        </button>
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <br/>
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <div class="panel panel-default" id="edit-update">

            <h2>My User Edit Component</h2>

            <p>[Form goes here]</p>

        </div>
    </div>
</div>
```


Special Thanks
--------------

Arroyo Labs - For sponsoring development, [http://arroyolabs.com](http://arroyolabs.com)
