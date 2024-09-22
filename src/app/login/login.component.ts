import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup
  @Output() goToRegister = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  initForm(){
    this.loginform = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  login(){
    window.alert('Login efetuado correctamente')
  }

  goToRegisterMethod(){
    this.goToRegister.emit(true)
  }

}
