import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
export declare class AuthService {
    private http;
    private loginUrl;
    private logoutUrl;
    private _baseUrl;
    token: any;
    /**
     *
     *
     */
    constructor(http: Http);
    /**
     *
     *
     */
    isLoggedIn(): boolean;
    /**
     *
     *
     */
    login(form: any): Observable<boolean>;
    /**
     *
     *
     */
    logout(): void;
}
