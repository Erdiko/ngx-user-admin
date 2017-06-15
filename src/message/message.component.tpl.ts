export const tpl: string= `
<div>
<alert *ngFor="let message of messages" [type]="message.type" dismissOnTimeout="10000" dismissible=true>{{ message.body }}</alert>
</div>
`;
