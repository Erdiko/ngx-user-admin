import { Injectable, Inject }                                           from '@angular/core';

import { Subject, BehaviorSubject, Observable, Subscription }                    from "rxjs";

@Injectable()
export class MessageService {

    private dataStore: any;
    private _message$: BehaviorSubject<any>;

    constructor() {
        this._message$ = new BehaviorSubject(false);
    }

    set message(msg: any) {
        this.dataStore = msg;
        this._message$.next(this.dataStore);
    }

    get message$() {
        return this._message$.asObservable();
    }

}
