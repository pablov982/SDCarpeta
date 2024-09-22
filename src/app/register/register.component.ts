import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  @Output() goToLogin = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  initForm(){
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      document: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    })
  }

  register(){
    window.alert('Registro efetuado correctamente')
  }

  goToLoginMethod(){
    this.goToLogin.emit(true)
  }

}
