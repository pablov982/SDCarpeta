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
  folders = false
  request = false

  constructor() { }

  ngOnInit(): void {
  }

  showScreen(screen: number) {
    switch (screen) {
      case 1:
        this.documents = true
        this.sync = false
        this.transfer = false
        this.folders = false
        this.request = false
        break
      case 2:
        this.documents = false
        this.sync = true
        this.transfer = false
        this.folders = false
        this.request = false
        break
      case 3:
        this.documents = false
        this.sync = false
        this.transfer = true
        this.folders = false
        this.request = false
        break
      case 4:
        this.documents = false
        this.sync = false
        this.transfer = false
        this.folders = true
        this.request = false
        break
      case 5:
        this.documents = false
        this.sync = false
        this.transfer = false
        this.folders = false
        this.request = true
        break
    }
  }

}
