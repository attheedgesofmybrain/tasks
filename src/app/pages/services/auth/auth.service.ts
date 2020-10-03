import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { URLSearchParams } from 'url';
import { Users } from '../../models/users.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async create(user: Users) {
    await this.auth.createUserWithEmailAndPassword(user.email, user.pass)
    .then(data => {
      console.log('DADOS -> ' +data)
    })
    .catch(e => {
      console.log('ERRO -> ' +e)
    })
    await this.firestore.doc(`/Users/${user.email}`).set(user)
    console.log('USUÁRIO CADASTRADO -> ' +user)
  }

  async state() {
    await this.auth.onAuthStateChanged(function(user) {
      if(user) {
        console.log('USUÁRIO LOGADO: ' +user.email)
      } else {
        console.log('OFFLINE!')
      }
    })
  }

  async signOut() {
    this.auth.signOut().then(() => {
      console.log('DESLOGADO!')
    })
    .catch(e => {
      console.log('ERRO -> ' +e)
      
    })
  }

  async updateEmail(user: Users) {
    (await this.auth.currentUser).updateEmail(user.email)
    .then(() => {
      console.log('EMAIL ALTERADO!')
    })
    .catch(e => {
      console.log('ERRO -> ' +e)
    })
  }

  async updatePassword(user: Users) {
    (await this.auth.currentUser).updatePassword(user.pass)
    .then(() => {
      console.log('SENHA ALTERADA!')
    })
    .catch(e => {
      console.log('ERRO -> ' +e)
    })
  }

}
