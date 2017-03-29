import { Component, OnInit, ViewChild }     from '@angular/core';
import { Router, ActivatedRoute }           from '@angular/router';
import { Observable, Subscription }         from "rxjs";

import { UsersService }             from './users.service';
import { User }                     from './user.model';

@Component({
  selector: 'app-user-list',
  template: `
<div class="row">
    <div class="col-xs-4">
        <button class="btn btn-info btn-sm" routerLink="/user/">Create a New User</button>
    </div>
</div>
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
                        <i *ngIf="sortCol == 'id'" class="fa" [ngClass]="{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}" aria-hidden="true"></i>
                    </th> 
                    <th (click)="sort('name')">
                        User Name
                        <i *ngIf="sortCol == 'name'" class="fa" [ngClass]="{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}" aria-hidden="true"></i>
                    </th> 
                    <th>
                        Role
                    </th> 
                    <th>
                        Last Login
                    </th> 
                    <th>
                        Joined
                    </th> 
                    <th>Edit</th> 
                    <th>Delete</th> 
                </tr> 
            </thead> 

            <tbody *ngIf="wait"> 
                <tr>
                    <td colspan="7" align="center">
                        <i class="fa fa-refresh fa-spin fa-2x fa-fw"></i> 
                    </td>
                </tr>
            </tbody> 

            <tbody *ngIf="!wait && error"> 
                <tr>
                    <td colspan="7" align="center">
                    </td>
                </tr>
            </tbody> 

            <tbody *ngIf="!wait && !error && users && users.length < 1"> 
                <tr>
                    <td colspan="7" align="center">
                    </td>
                </tr>
            </tbody> 

            <tbody *ngIf="!wait && !error && users && users.length > 0"> 
                <tr class="user_row" *ngFor="let user of users; let index = index"> 
                    <th class="user_id" scope="row">{{ user.id }}</th> 
                    <td class="user_name">{{ user.name }}</td> 
                    <td class="user_role_name">{{ user.role.name }}</td> 
                    <td class="user_last_login">{{ user.last_login }}</td> 
                    <td class="user_joined">{{ user.joined }}</td> 
                    <td class="user_edit"><a routerLink="/user/{{ user.id }}">Edit</a></td>
                    <td class="user_delete"><button type="button" class="btn btn-danger" (click)="clickDelete(user.id)">Delete</button></td> 
                </tr> 
            </tbody> 
        </table>
    </div>
</div>
<div class="row paging" *ngIf="total">
    <div class="col-xs-4">

        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm">

            <li *ngIf="(currentPage > 1)">
              <a (click)="clickPrev()" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li 
                *ngFor="let page of pages; let index = index"
                 [ngClass]="{'active': (page == currentPage)}"
                 [attr.id]="'page'+(index + 1)"
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
  `
})
export class UserListComponent implements OnInit {

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
    private selectedUser: any;
        
    constructor(private usersService: UsersService) {

    }
    
    // on init get a list of the users
    ngOnInit() {

    }

    // unsub all the things
    ngOnDestroy() {

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
        //this.confirmDeleteModal.show();
    }

    cancelDelete() {
        //this.confirmDeleteModal.hide();
    }

    confirmDelete(idx: any) {
        //this.confirmDeleteModal.hide();
        this.wait = true;
        this.usersService.deleteUser(this.selectedUser)
            .then(res => this._handleResponse(res))
            .catch(error => this.error = error);
    }

    private _handleResponse(res: any) {
        this._getUsers();
        this.wait = false;
        
        if(false == res.success) {
            this.error = res.error_message;
        }

    }

}
