import { Observable } from "rxjs";
export declare class MessageService {
    messages: any;
    private messageUpdate;
    constructor();
    setMessageType(result: any): "success" | "warning" | "danger";
    sendMessage(action: string, result: any): void;
    getMessage(): Observable<any>;
    clearMessage(): void;
}
