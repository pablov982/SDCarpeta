import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { RegisterService } from './register.service';
import { NotifyOpts } from '../notification/notification.model';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  @Output() goToLogin = new EventEmitter()
  typeInput = 'password'

  constructor( private registerService: RegisterService, private notify: NotificationService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      document: new FormControl('', Validators.minLength(10)),
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

  registerUserMethod(){

    let data = {
      documentId: this.registerForm.get('document').value,
      fullName: this.registerForm.get('name').value,
      status: 'active',
      email: this.registerForm.get('email').value,
      description: 'user',
      password: this.registerForm.get('password').value,
      address: 'address',
    }

    console.log(data)

    this.registerService.registerUser(data).subscribe((data) => {
      console.log(data)

      let notify:NotifyOpts = {
        title: 'Usuario Creado',
        message: 'Usuario creado con exito',
        icon: 'success'
      }
      this.notify.open(notify)
      this.registerForm.reset()
    })
  }

  changeTypeInput(){
    if(this.typeInput === 'password'){
      this.typeInput = 'text'
    }else{
      this.typeInput = 'password'
    }

  }

}
