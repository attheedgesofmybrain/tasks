import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { UserData } from '../models/userData.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore
  ) 
  {

  }

    async create(user: User) {
      await this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
      await this.fs.doc(`/Users/${user.email}`).set(user)
      console.log(user)
    }

    async state() {
      await this.auth.onAuthStateChanged(function(user) {
        if(user) {
          console.log('Usuário Logado')
          console.log('Usuário: ', user.email)
        } else {
          console.log('Offline')
        }
      })
    }

    async getEmailByState() {
      await this.auth.onAuthStateChanged(function(user) {
        if(user) {
          return user.email
        }
      })
    }

    async signOut() {
      this.auth.signOut().then(() => {
        console.log('Logout')
      })
      .catch(e => {
        console.log(e)
        
      })
    }

    async updateEmail(user: User) {
      (await this.auth.currentUser).updateEmail(user.email)
      .then(() => {
        console.log('Email Alterado')
      })
      .catch(e => {
        console.log(e)
      })
    }

    async updatePassword(user: User) {
      (await this.auth.currentUser).updatePassword(user.password)
      .then(() => {
        console.log('Senha Alterada')
      })
      .catch(e => {
        console.log(e)
      })
    }

    


    async createUserData(userData: UserData) {
      console.log(this.state());
      
      await this.fs.doc(`/Users/${this.getEmailByState()}`).collection('UserData').add(userData)
      console.log(userData)
    }
    

}
