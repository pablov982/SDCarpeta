import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup
  @Output() goToRegister = new EventEmitter()
  typeInput = 'password'

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.loginform = new FormGroup({
      document: new FormControl(''),
      password: new FormControl('')
    })
  }

  login() {
    let data = {
      "document": JSON.parse(this.loginform.get('document').value),
      "password": this.loginform.get('password').value,
    }
    this.loginService.login(data).subscribe((res:any) => {
      sessionStorage.setItem('user', JSON.stringify(res.result))
      this.router.navigate(['/home'])
    })
  }

  goToRegisterMethod() {
    this.goToRegister.emit(true)
  }

  changeTypeInput() {
    if (this.typeInput === 'password') {
      this.typeInput = 'text'
    } else {
      this.typeInput = 'password'
    }

  }

}
