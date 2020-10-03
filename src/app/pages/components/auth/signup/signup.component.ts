import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Users } from 'src/app/pages/models/users.model';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { ToastService } from 'src/app/pages/services/toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {} as Users

  constructor(
    private router: Router,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private showToast: ToastService
  ) 
  {

  }

  ngOnInit() {
    this.authService.state()
  }

  async create(user: Users){
    if(!this.formValidation()) {
      try {
          await this.auth.createUserWithEmailAndPassword(user.email, user.pass)
          await this.firestore.doc(`/Users/${user.email}`).set(user)
          this.showToast.showSuccess('SUCESSO! USUÁRIO CADASTRADO!')
          this.router.navigateByUrl('/home')
          console.log('USUÁRIO CADASTRADO -> ' +user)
        } 
        catch(e) {
          this.showToast.showSuccess(e)
        }
    }
  }

  formValidation() {
    if(!this.user.email && !this.user.pass) {
      this.showToast.showSuccess('ENTRE COM OS DADOS')
      return false
    }
    if(!this.user.email) {
      this.showToast.showSuccess('ENTRE COM O EMAIL')
      return false
    }
    if(!this.user.pass) {
      this.showToast.showSuccess('ENTRE COM A SENHA')
      return false
    }
    return false
  }

}
