import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TesteLoginComponent } from './components/testLogin/teste-login/teste-login.component';
import { TesteTesteComponent } from './components/testLogin/teste-teste/teste-teste.component';

const routes: Routes = [
  {
    path: '', component: TesteLoginComponent
  },
  {
    path: 'login', component: TesteLoginComponent
  },
  {
    path: 'teste-teste', component: TesteTesteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
