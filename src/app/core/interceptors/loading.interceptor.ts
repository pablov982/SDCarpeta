import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  requestCount = 0;
  loadingStarted = false;

  constructor( private loadingService: LoadingService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingStarted = this.loadingService.isStarted();

    if ( !this.loadingStarted ) {
      this.loadingService.start();
    }

    this.requestCount++;
    return next.handle(request).pipe(
      finalize( this.turnOffLoading )
    );
  }

  turnOffLoading = () =>  {
    this.requestCount--;
    this.loadingStarted = this.loadingService.isStarted();
    if ( this.requestCount <= 0 ) {
      this.loadingService.end();
      this.requestCount = 0;
    }
  }
  
}
