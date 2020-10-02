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
import { RouterModule, Routes } from '@angular/router';
import { TesteTesteComponent } from './components/testLogin/teste-teste/teste-teste.component';

@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    Pag1Component,
    Pag2Component,
    TesteLoginComponent,
    TesteTesteComponent
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
    CommonModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
