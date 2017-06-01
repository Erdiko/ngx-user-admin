import { Injectable }  from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

    private subject = new Subject<any>();

    setMessage(msg: any) {
        this.subject.next(msg);
    }

    getMessage() {
        return this.subject.asObservable();
    }

}
