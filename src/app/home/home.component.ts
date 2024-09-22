import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  documents = true
  sync = false
  transfer = false

  constructor() { }

  ngOnInit(): void {
  }

  showScreen(screen: number) {
    switch (screen) {
      case 1:
        this.documents = true
        this.sync = false
        this.transfer = false
        break
      case 2:
        this.documents = false
        this.sync = true
        this.transfer = false
        break
      case 3:
        this.documents = false
        this.sync = false
        this.transfer = true
        break
    }
  }

}
