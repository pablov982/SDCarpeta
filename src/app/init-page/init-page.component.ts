import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.scss']
})
export class InitPageComponent implements OnInit {

  login = true
  register = false

  constructor() { }

  ngOnInit(): void {
  }

}
