import { Injectable, Inject }                                           from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }     from '@angular/http';

import { Observable }                                                   from 'rxjs';

import 'rxjs/add/operator/map'

/**
 * Service that handles logging the user in and creating the logged in localStorage key
 *
 */
@Injectable()
export class AuthService {

    /**
     * AJAX URL for login requests
     */
    private loginUrl     = "/ajax/users/authentication/login";

    /**
     * AJAX url for logout requests
     */
    private logoutUrl    = "/ajax/users/authentication/logout";

    /**
     * Base AJAX url, set in the constructor
     */
    private _baseUrl: string;

    /**
     * Logged-In user token
     */
    public token: any;

    /**
     * initialize service class variables
     */
    constructor(@Inject(Http) private http: Http) {
        let currentUser = {'token': false};
        this.token = currentUser && currentUser.token;

        this._baseUrl = "";
    }

    /**
     * returns true if the user is logged in. 
     * 
     * checks the localStorage to make sure an expected token exists
     */
    isLoggedIn() : boolean {
        return Boolean(localStorage.getItem('currentUser')); 
    }

    /**
     * performs a login request via POST
     *
     */
    login(form: any): Observable<boolean> {
        let body = JSON.stringify(form);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this._baseUrl + this.loginUrl;

        return this.http.post(url, body, options)
                   .map((response: Response) => {
                       // login successful if there's a jwt token in the response
                       let token = response.json() && response.json().body.token;
                       if (token) {
                           // set token property
                           this.token = token;

                           // store username and jwt token in local storage to keep user logged in between page refreshes
                           localStorage.setItem('currentUser', JSON.stringify({ token: token }));

                           // return true to indicate successful login
                           return true;
                       } else {
                           // return false to indicate failed login
                           return false;
                       }
                   })
                   .catch(
                       (error:any) => Observable.throw(error.json().error || 'Server error')
                   );
    }

    /**
     * deletes the user token to log the user out
     *
     */
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

}
