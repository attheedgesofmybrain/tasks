import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore
  ) { }

    async createLogin(user: User) {
      await this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log(data)
      })
      await this.fs.doc(`/Users/${user.email}`).set(user)
      console.log(user)
    }

}
