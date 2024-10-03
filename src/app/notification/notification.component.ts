import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { NotifyOpts } from './notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  @ViewChild('backdrop') backdrop: ElementRef;
  @ViewChild('notify') notify: ElementRef;

  @Output() actionAccept = new EventEmitter();

  show$ = this.notifyService.show$;
  message$ = this.notifyService.message$;
  title$ = this.notifyService.title$;
  type$ = this.notifyService.type$;
  icon$ = this.notifyService.icon$;
  subtitle$ = this.notifyService.subtitle$;
  message2$ = this.notifyService.message2$;
  icon2$ = this.notifyService.icon2$;
  icon3$ = this.notifyService.icon3$;
  buttonText$ = this.notifyService.buttonText$;
  cancelButtonText$ = this.notifyService.btnCancelText$;

  showNotify = false;
  btnAcceptName = '';
  btnCancelName = '';
  hasAccept = true;
  hasClose = false;
  hasCancel = false;
  type: string;

  //subs
  behaviorNotify: Subscription;

  constructor(
    private notifyService: NotificationService,
  ) {
    this.close();
    this.showNotifyButtons();
    this.setNameToNotifyButtons();
    this.hanleNameNotifyButton();
    this.watchNotifyBehavior();
  }

  open( opts: NotifyOpts ) {
    this.notifyService.open( opts );
  }

  close() {
    this.notifyService.close();
  }

  accept() {
    this.actionAccept.emit(true);
    if (this.notifyService.inAcceptAction) {
      this.notifyService.inAcceptAction();
    }
    this.notifyService.close();
  }

  setNameToNotifyButtons() {
    this.type$.subscribe( () => {
      if(this.type !== 'resend-email'){
        this.btnAcceptName = 'Aceptar';
      } if(this.type === 'resend-email'){ this.hasClose = true; }
        if(this.type === 'recovery-password'){
          this.btnAcceptName = 'btn_change_password';
        }
      this.btnCancelName = 'btn_cancel';
    });
  }

  showNotifyButtons() {
    this.type$.subscribe( ( res ) => {
      this.type = res;
      if ( res === 'error' || res === 'info' || !res ||  res === 'email') {
        this.hasCancel = false;
        this.hasAccept = true;
        this.hasClose = false;
      } else if (res === 'camera' || res === 'noCamera' || res === 'no-increase') {
        this.hasCancel = false;
        this.hasAccept = false;
      } else if (res === 'confirm') {
        this.hasCancel = true;
        this.hasAccept = true;
        this.hasClose = false;
      } else if (res === 'check') {
        this.hasCancel = false;
      } else if (res === 'resend-email') {
        this.btnAcceptName = 'btn_resend_confirm_email';
        this.hasClose = true;
        this.hasAccept = true;
        this.hasCancel = false;
      } else if (res === 'success') {
        this.hasCancel = false;
        this.hasAccept = true;
        this.hasClose = false;
      } else if(res === 'recovery-password') {
        this.hasCancel = false;
        this.hasAccept = true;
        this.hasClose = true;
      } else if (res === 'increase'){
        this.hasCancel = true;
        this.hasAccept = true;
        this.hasClose = true;
      }

      else {
        this.hasCancel = true;
      }
    });
  }

  watchNotifyBehavior() {
    this.behaviorNotify = this.show$.subscribe( res => {
      if ( res && this.backdrop ) {
        this.backdrop.nativeElement.focus();
      }
      this.showNotify = res;
    } );
  }

  hanleNameNotifyButton(){
    this.type$.subscribe(()=>{
      this.buttonText$.subscribe( data => {
        this.btnAcceptName = data ? 'Aceptar' : 'Aceptar';
      })
    });
    this.type$.subscribe(()=>{
      this.cancelButtonText$.subscribe( data => {
        this.btnCancelName = data ? 'Cancelar' : 'Cancelar';
      })
    });
  }

}
