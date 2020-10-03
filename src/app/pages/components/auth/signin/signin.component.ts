import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Users } from 'src/app/pages/models/users.model';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { ToastService } from 'src/app/pages/services/toast/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user = {} as Users

  constructor(
    private router: Router,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private showToast: ToastService
  ) { }

  ngOnInit() {
  }

  async signin(user: Users){
    if(!this.formValidation()) {
      try {
          await this.auth.signInWithEmailAndPassword(user.email, user.pass)
          this.showToast.showSuccess('SUCESSO! USUÁRIO LOGADO!')
          this.router.navigateByUrl('/home')
          console.log('USUÁRIO LOGADO -> ' +user)
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
