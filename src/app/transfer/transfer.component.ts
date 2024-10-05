import { Component, OnInit } from '@angular/core';
import { TransferService } from './transfer.service';
import { Operators } from '../core/mock';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifyOpts } from '../notification/notification.model';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  listOperators
  user = JSON.parse(sessionStorage.getItem('user'))
  formTransfer: FormGroup

  constructor( private transferService: TransferService, private notify: NotificationService) { }

  ngOnInit(): void {
    this.getOperatorsMethod()
    this.initForm()
  }

  initForm(){
    this.formTransfer = new FormGroup({
      operator: new FormControl(null, Validators.required)
    })
  }

  getOperatorsMethod(){
    this.transferService.getOperators().subscribe((res:any) => {
      this.listOperators = res.result
      console.log(this.listOperators)
    })
  }

  transFerUser(){
    debugger
    let data = {
      userId: this.user.documentId,
      citizenName: this.user.fullName,
      citizenEmail: this.user.email,
      operatorId: this.formTransfer.get('operator').value
    }

    this.transferService.transferUser(data).subscribe( res => {
      let notify:NotifyOpts = {
        title: 'Datos transferidos',
        message: 'Sus datos fueron transferidos al nuevo operador',
        icon: 'success'
      }
      this.notify.open(notify)
      console.log('Respuesta del transfer', res)
    })
  }
}
