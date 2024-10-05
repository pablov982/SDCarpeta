import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitPageComponent } from './init-page/init-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/security/auth.guard';

const routes: Routes = [
  { path: '', component: InitPageComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
