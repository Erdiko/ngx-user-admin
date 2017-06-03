import { Component, OnInit, ViewChild, Inject }     from '@angular/core';
import { Router, ActivatedRoute }           from '@angular/router';
import { Observable, Subscription }         from "rxjs";

import { ModalDirective }           from 'ngx-bootstrap';

import { UsersService }             from './users.service';
import { User }                     from './user.model';
import { MessageService }           from './message.service';

import { tpl } from './user-list.component.tpl';

@Component({
    selector: 'erdiko-user-list',
    template: tpl
})
export class UserListComponent implements OnInit {

    @ViewChild('confirmDeleteModal') public confirmDeleteModal:ModalDirective;

    private usersService: UsersService;
    public messageService: MessageService;
    public wait: any;

    private users$: Subscription;
    private total$: Subscription;
    public users: User[];
    public total: number;

    public currentPage = 1;
    public pagesize = 10;
    public pages: number[] = [];

    public sortCol: string;
    public sortDir: string;

    public error: any;
    public selectedUser: any;
        
    constructor(
           @Inject(UsersService) usersService: UsersService,
           @Inject(MessageService) messageService: MessageService,
           private route: ActivatedRoute,
           private router: Router) {

        this.usersService = usersService;
        this.messageService = messageService;

        // init the wait state (and indication animation) to 'off'
        this.wait = false;

        // default the sort col and direction
        this.sortCol = 'id';
        this.sortDir = 'desc';

        // subscribe to the service to get data
        this.users$ = this.usersService.users$.subscribe(
            users$ => this.users = users$
        );

        this.total$ = this.usersService.total$.subscribe(
            total$ => this.total = total$
        );

        // listen for the total when it gets updated, update more stuff
        this.usersService.total$.subscribe(
            () => this._listUpdated()
        );

        this.selectedUser = false;
    }
    
    // on init get a list of the users
    ngOnInit() {
        this._getUsers();
    }

    // unsub all the things
    ngOnDestroy() {
        this.users$.unsubscribe();
        this.total$.unsubscribe();
    }

    // update the user list by making another request to the users service
    private _getUsers() {
        this.wait = true;
        this.usersService.getUsers(this.pagesize, 
                                   this.currentPage, 
                                   this.sortCol, 
                                   this.sortDir);
    }

    // list has been updated; toggle wait state off and generate pagination links
    private _listUpdated() {
        this.wait = false;
        this._setPagination();
    }

    // return pagination links count
    getPageCount() {
        return Math.ceil(this.total / this.pagesize);
    }

    // create a list of pagination links
    private _setPagination() {
        this.pages = [];
        for(var i = 1; i <= this.getPageCount(); i++){
            this.pages.push(i);
        }
    }

    // pagination click listeners
    clickPage(idx: any) {
        this.currentPage = idx;
        this._getUsers();
    }

    clickNext() {
        this.currentPage++;
        this._getUsers();
    }

    clickPrev() {
        this.currentPage--;
        this._getUsers();
    }

    // sort click listeners
    sort(col: any) {

        // toggle sort dir if the user clicks on currently sorted column
        if(this.sortCol == col) {
            this.sortDir = (this.sortDir == "desc") ? "asc" : "desc";
        } else {
            // else default the sort to asc
            this.sortDir = "asc";
        }
        this.sortCol = col;

        this._getUsers();
    }

    clickDelete(idx: any) {
        this.selectedUser = idx;
        this.confirmDeleteModal.show();
    }

    cancelDelete() {
        this.confirmDeleteModal.hide();
    }

    confirmDelete(idx: any) {
        this.confirmDeleteModal.hide();
        this.wait = true;
        this.usersService.deleteUser(this.selectedUser)
            .then(res => this._handleResponse(res))
            .catch(error => this.messageService.setMessage({"type": "danger", "body": error}));
    }

    private _handleResponse(res: any) {
        this._getUsers();
        this.wait = false;

        if(false !== res.success) {
            this.messageService.setMessage({"type": "success", "body": "User successfully deleted"});
        } else {
            this.messageService.setMessage({"type": "danger", "body": res.error_message});
        }

    }

}
