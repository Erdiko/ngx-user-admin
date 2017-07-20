import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
/**
 * Service that handles logging the user in and creating the logged in localStorage key
 *
 */
export declare class AuthService {
    private http;
    /**
     * AJAX URL for login requests
     */
    private loginUrl;
    /**
     * AJAX url for logout requests
     */
    private logoutUrl;
    /**
     * Base AJAX url, set in the constructor
     */
    private _baseUrl;
    /**
     * Logged-In user token
     */
    token: any;
    /**
     * initialize service class variables
     */
    constructor(http: Http);
    /**
     * returns true if the user is logged in.
     *
     * checks the localStorage to make sure an expected token exists
     */
    isLoggedIn(): boolean;
    /**
     * performs a login request via POST
     *
     */
    login(form: any): Observable<boolean>;
    /**
     * deletes the user token to log the user out
     *
     */
    logout(): void;
}
