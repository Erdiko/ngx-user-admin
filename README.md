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


Special Thanks
--------------

Arroyo Labs - For sponsoring development, [http://arroyolabs.com](http://arroyolabs.com)
