import { Http } from '@angular/http';
import { Observable, Subscription } from "rxjs";
import { User } from "./user.model";
export declare class UsersService {
    private http;
    private _users$;
    private _total$;
    private _events$;
    private _eventsTotal$;
    private dataStore;
    private listUrl;
    private userUrl;
    private updateUrl;
    private createUrl;
    private deleteUrl;
    private changePassUrl;
    private userEventUrl;
    private authToken;
    private _baseUrl;
    constructor(http: Http);
    readonly users$: Observable<any>;
    readonly total$: Observable<any>;
    readonly events$: Observable<any>;
    readonly eventsTotal$: Observable<any>;
    /**
     *
     *
     */
    private _getHeaderOptions();
    /**
     * Get list of users based on sort, returns an observable
     *
     */
    getUsers(pagesize?: number, page?: number, sortCol?: string, sortDir?: string): Subscription;
    /**
     * Get a specific user, returns a promise
     *
     */
    getUser(id: string): Promise<User>;
    /**
     * Update a specific user
     *
     */
    updateUser(user: any): Promise<any>;
    /**
     * Create a new user
     *
     */
    createUser(user: any): Promise<any>;
    /**
     * Delete a user record
     *
     */
    deleteUser(id: string): Promise<any>;
    /**
     * Update a user record password
     *
     */
    changePassword(id: number, newpass: string): Promise<any>;
    /**
     * get event logs for a user
     *
     */
    getUsersEvents(id?: string, pagesize?: number, page?: number, sortCol?: string, sortDir?: string): Subscription;
    /**
     * handle response errors
     *
     */
    private handleError(error);
}
