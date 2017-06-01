export const tpl: string= `
<alert *ngIf="message" [type]="message.type" (click)="close()">{{ message.body }}</alert>
`;
