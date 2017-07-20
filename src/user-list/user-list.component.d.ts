import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { MessageService } from '../message.service';
/**
 * User List Component
 *
 * Displays a sortable list of current users in the system
 */
export declare class UserListComponent implements OnInit {
    private route;
    private router;
    /**
     * ngx-bootstrap modal view child, injected so we can listen for button click events
     */
    confirmDeleteModal: ModalDirective;
    /**
     * local users service instance
     */
    private usersService;
    /**
     * local message service instance
     */
    messageService: MessageService;
    /**
     * Flag used to show/hide the wait spinner
     */
    wait: any;
    /**
     *
     */
    private users$;
    /**
     *
     */
    private total$;
    /**
     *
     */
    users: User[];
    /**
     *
     */
    total: number;
    /**
     *
     */
    currentPage: number;
    /**
     *
     */
    pagesize: number;
    /**
     *
     */
    pages: number[];
    /**
     *
     */
    sortCol: string;
    /**
     *
     */
    sortDir: string;
    /**
     *
     */
    error: any;
    /**
     *
     */
    selectedUser: any;
    /**
     *
     */
    constructor(usersService: UsersService, messageService: MessageService, route: ActivatedRoute, router: Router);
    /**
     * on init get a list of the users
     */
    ngOnInit(): void;
    /**
     * unsub all the things
     */
    ngOnDestroy(): void;
    /**
     * update the user list by making another request to the users service
     */
    private _getUsers();
    /**
     * list has been updated; toggle wait state off and generate pagination links
     */
    private _listUpdated();
    /**
     * return pagination links count
     */
    getPageCount(): number;
    /**
     * create a list of pagination links
     */
    private _setPagination();
    /**
     * pagination click listeners
     */
    clickPage(idx: any): void;
    /**
     * handles "next" pagination button click
     */
    clickNext(): void;
    /**
     * handles "prev" pagination button click
     */
    clickPrev(): void;
    /**
     * sort click listeners
     */
    sort(col: any): void;
    /**
     *
     */
    clickDelete(idx: any): void;
    /**
     *
     */
    cancelDelete(): void;
    /**
     *
     */
    confirmDelete(idx: any): void;
    /**
     *
     */
    private _handleResponse(res);
}
