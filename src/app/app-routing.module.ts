import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitPageComponent } from './init-page/init-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: InitPageComponent },
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
