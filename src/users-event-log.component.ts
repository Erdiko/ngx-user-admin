import { Component, OnInit, Inject }        from '@angular/core';

import { UsersService }             from './users.service';
import { User }                     from './user.model';

import { Subscription }             from 'rxjs';

@Component({
  selector: 'erdiko-users-event-log',
  template: `
<div class="row">
    <div class="col-xs-12">
        <br />
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <table class="table table-bordered table-hover"> 
            <thead>
                <tr>
                    <th (click)="sort('id')">
                        ID
                        <i class="fa" [ngClass]="{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}" aria-hidden="true"></i>
                    </th>
                    <th (click)="sort('user_id')">
                        User ID
                        <i class="fa" [ngClass]="{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}" aria-hidden="true"></i>
                    </th>
                    <th>
                        Event Log
                    </th>
                    <th>
                        Event Data
                    </th>
                    <th (click)="sort('created_at')">
                        Created At
                        <i class="fa" [ngClass]="{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}" aria-hidden="true"></i>
                    </th>
                </tr>
            </thead>

            <tbody *ngIf="wait"> 
                <tr>
                    <td colspan="7" align="center">
                        <i class="fa fa-refresh fa-spin fa-2x fa-fw"></i> 
                    </td>
                </tr>
            </tbody>

            <tbody *ngIf="!wait && events.length <= 0">
                <tr>
                    <td colspan="7" align="center">
                        <alert type="warning">Sorry, no user events were found.</alert>
                    </td>
                </tr>
            </tbody>

            <tbody *ngIf="!wait && events.length > 0">
                <tr class="users-events" *ngFor="let event of events">
                    <td> {{event.id}} </td>
                    <td> {{event.user_id}} </td>
                    <td> {{event.event}} </td>
                    <td> {{event.event_data|json}} </td>
                    <td> {{event.created_at}} </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="row paging" *ngIf="eventsTotal">
    <div class="col-xs-4">

        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm">

            <li *ngIf="(currentPage > 1)">
              <a (click)="clickPrev()" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li 
                *ngFor="let page of pages"
                 [ngClass]="{'active': (page == currentPage)}"
                >
                <a (click)="clickPage(page)">{{ page }}</a>
            </li>

            <li *ngIf="(currentPage < getPageCount())">
              <a (click)="clickNext()" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>

          </ul>
        </nav>

    </div>
</div>
  `,
  providers: [UsersService]
})
export class UsersEventLogComponent implements OnInit {

  private usersService: UsersService;
  public wait: boolean;
  public events: Event[];
  public eventsTotal: number;
  
  public userID: any;
  public pageSize: number;
  public currentPage: number;
  public sortCol: string;
  public sortDir: string;

  public pages: number[];

  private events$: Subscription;
  private eventsTotal$: Subscription;

  constructor(
    @Inject(UsersService) usersService: UsersService
    ) {

    this.usersService = usersService;

    this.userID = null
    this.pageSize = 10;
    this.currentPage = 1;
    this.sortCol = 'id';
    this.sortDir = 'desc';

    this.pages = [];

    /**
     * Subscribe to the usersService to get events
     */
    this.events$ = this.usersService.events$.subscribe(
      events$ => this.events = events$
    );

    /**
     * When getting events is finished, hide the loading animation
     */
    this.usersService.events$.subscribe(
      () => this.wait = false
    )

    /**
     * Subscribe to the usersService to get total number of events
     */
    this.eventsTotal$ = this.usersService.eventsTotal$.subscribe(
      eventsTotal$ => this.eventsTotal = eventsTotal$
    );

    /**
     * When total number of events is known, set the pagination
     */
    this.usersService.eventsTotal$.subscribe(
      () => this._setPages()
    )

  }

  /**
   * Sorts event log specified by the parameter
   * @param {string} column - instruction specifying which column to sort
   */
  sort(column: any){
    if(this.sortCol != column){
      this.sortCol = column;
    }
    this.sortDir = ( this.sortDir === 'desc' ) ? 'asc' : 'desc';

    this._getEvents();
  }

  /**
   * Show loading animation while request for Users Event Log is being made
   */
  private _getEvents(){
    this.wait = true;
    this.usersService.getUsersEvents(this.userID, 
                                     this.pageSize,
                                     this.currentPage,
                                     this.sortCol,
                                     this.sortDir);
  }

  /**
   * Sets array of pages
   */
  private _setPages(){
    this.pages = []; //reset page before setting pages
    for(let i = 1; i <= this.getPageCount(); i++){
      this.pages.push(i);
    }
  }

  /**
   * Called when clicking on numbered link to get to certain page
   */
  clickPage(i: any){
      this.currentPage = i;
      this._getEvents();
  }

  /**
   * Called when clicking '<<' link to lead to proceeding page
   */
  clickPrev(){
      
      if(this.currentPage > 1){
        this.currentPage--;  
      }
      this._getEvents();
  }

  /**
   * Called when clicking '>>' link to lead to succeeding page
   */
  clickNext(){

      if(this.currentPage < this.getPageCount()){
        this.currentPage++;
      }
      this._getEvents();
  }

  /**
   * Get the number of pages necessary to house set of 10 event logs
   */
  getPageCount() {
    return Math.ceil(this.eventsTotal / this.pageSize );
  }

  /**
   * Calls for Events at the initialization of component
   */
  ngOnInit() {
    this._getEvents();
  }

  /**
   * Clean up by unsubscribing observables to avoid memory leak
   */
  ngOnDestroy() {
    this.events$.unsubscribe();
    this.eventsTotal$.unsubscribe();
  }

}
