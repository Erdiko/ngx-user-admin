import { Observable } from 'rxjs';
/**
 * Service that handles flash messages
 */
export declare class MessageService {
    /**
     * Messages observable
     */
    private subject;
    /**
     * Add a message to the array
     */
    setMessage(msg: any): void;
    /**
     * Return observable array of messages
     */
    getMessage(): Observable<any>;
}
