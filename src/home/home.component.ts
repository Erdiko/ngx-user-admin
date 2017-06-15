import { Component, OnInit } from '@angular/core';

import { tpl } from './home.component.tpl';

/**
 * Home Component
 *
 * Default view component for a logged in user
 */
@Component({
  selector: 'app-home',
  template: tpl
})
export class HomeComponent implements OnInit {

  /**
   * 
   */
  constructor() { }

  /**
   * 
   */
  ngOnInit() {
  }

}
