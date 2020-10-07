import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { Test1Component } from './components/test1/test1.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pag1Component } from './components/caixaHambugueria/pag1/pag1.component';
import { Pag2Component } from './components/caixaHambugueria/pag2/pag2.component';
import { TesteLoginComponent } from './components/testLogin/teste-login/teste-login.component';
import { TesteTesteComponent } from './components/testLogin/teste-teste/teste-teste.component';
import { HomeComponent } from './pages/components/home/home.component';
import { SigninComponent } from './pages/components/auth/signin/signin.component';
import { SignupComponent } from './pages/components/auth/signup/signup.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './pages/components/navbar/navbar.component';
import { CashboxComponent } from './pages/components/home/cashbox/cashbox.component';
import { ReportsComponent } from './pages/components/home/cashbox/reports/reports.component';
import { PipeModule } from './pages/pipes/pipes.module';
import { EditComponent } from './pages/components/home/cashbox/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    Pag1Component,
    Pag2Component,
    TesteLoginComponent,
    TesteTesteComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    CashboxComponent,
    ReportsComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    BrowserAnimationsModule,
    PipeModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
