import { Component, OnInit } from '@angular/core';

import { tpl } from './home.component.tpl';

@Component({
  selector: 'app-home',
  template: tpl
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
