import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [ LoadingInterceptor ],
  exports: [ LoadingComponent ]
})
export class CoreModule { }
