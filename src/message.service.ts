import { Injectable }  from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

/**
 * Service that handles flash messages
 */
@Injectable()
export class MessageService {

    /**
     * Messages observable
     */
    private subject = new Subject<any>();

    /**
     * Add a message to the array
     */
    setMessage(msg: any) : void {
        this.subject.next(msg);
    }

    /**
     * Return observable array of messages
     */
     getMessage() : Observable<any> {
        return this.subject.asObservable();
    }

}
