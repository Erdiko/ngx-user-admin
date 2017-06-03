export const tpl: string= `
<alert *ngIf="message" [type]="message.type" dismissOnTimeout="3000" dismissible=true>{{ message.body }}</alert>
`;
