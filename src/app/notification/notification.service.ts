import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotifyOpts, NotifyOptsModify } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  show$ = new Subject<boolean>();

  title$ = new Subject<string>();
  message$ = new Subject<string>();
  type$ = new Subject<string>();
  icon$ = new Subject<string>();

  subtitle$ = new Subject<string>();
  message2$ = new Subject<string>();
  icon2$ = new Subject<string>();
  icon3$ = new Subject<string>();
  buttonText$ = new Subject<string>();
  btnCancelText$ = new Subject<string>();

  options: NotifyOpts;

  // status
  isNotifyOpen: boolean;

  inAcceptAction: Function;

  constructor() {
    this.close();
  }

  get isOpen() {
      return this.isNotifyOpen;
  }

  open( options: NotifyOpts ) {
    this.options = options;
    this.modify( options );
    this.isNotifyOpen = true;
    this.show$.next(this.isNotifyOpen);
  }

  modify(options: NotifyOptsModify) {
    this.options = {...this.options, ...options} as NotifyOpts;
    this.title$.next(this.options.title);
    this.message$.next(this.options.message);
    this.type$.next(this.options.type);
    this.icon$.next(this.options.icon);
    this.subtitle$.next(this.options.subtitle);
    this.message2$.next(this.options.message2);
    this.icon2$.next(this.options.icon2);
    this.icon3$.next(this.options.icon3);
    this.buttonText$.next(this.options.buttontext);
    this.btnCancelText$.next(this.options.cancelButtonText);
    this.inAcceptAction = this.options.onAccept;
  }

  close() {
    this.isNotifyOpen = false;
    this.show$.next(this.isNotifyOpen);
  }

}
