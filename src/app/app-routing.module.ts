import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './pages/components/auth/signin/signin.component';
import { SignupComponent } from './pages/components/auth/signup/signup.component';
import { CashboxComponent } from './pages/components/home/cashbox/cashbox.component';
import { EditComponent } from './pages/components/home/cashbox/edit/edit.component';
import { ReportsComponent } from './pages/components/home/cashbox/reports/reports.component';
import { HomeComponent } from './pages/components/home/home.component';

const routes: Routes = [
  {
    path: '', component: SignupComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'cashbox', component: CashboxComponent
  },
  {
    path: 'cashbox/reports', component: ReportsComponent
  },
  {
    path: 'cashbox/:id', component: EditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
