import { Observable } from 'rxjs';
export declare class MessageService {
    private subject;
    setMessage(msg: any): void;
    getMessage(): Observable<any>;
}
