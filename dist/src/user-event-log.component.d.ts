import { OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';
export declare class UserEventLogComponent implements OnInit {
    private route;
    private usersService;
    wait: boolean;
    events: Event[];
    eventsTotal: number;
    userID: any;
    pageSize: number;
    currentPage: number;
    sortCol: string;
    sortDir: string;
    pages: number[];
    private events$;
    private eventsTotal$;
    constructor(usersService: UsersService, route: ActivatedRoute);
    /**
     * Sorts event log specified by the parameter
     * @param {string} column - instruction specifying which column to sort
     */
    sort(column: any): void;
    /**
     * Show loading animation while request for Users Event Log is being made
     */
    private _getEvents();
    /**
     * Sets array of pages
     */
    private _setPages();
    /**
     * Called when clicking on numbered link to get to certain page
     */
    clickPage(i: any): void;
    /**
     * Called when clicking '<<' link to lead to proceeding page
     */
    clickPrev(): void;
    /**
     * Called when clicking '>>' link to lead to succeeding page
     */
    clickNext(): void;
    /**
     * Get the number of pages necessary to house set of 10 event logs
     */
    getPageCount(): number;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
