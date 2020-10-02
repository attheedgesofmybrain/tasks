import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { User } from '../models/user.model'
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-teste-login',
  templateUrl: './teste-login.component.html',
  styleUrls: ['./teste-login.component.scss']
})
export class TesteLoginComponent implements OnInit {

  formLogin: FormGroup

  validationMessages = {
    email: [
      {
        tipo: 'required',
        mensagem: 'O campo Email é obrigatório...'
      },
      {
        tipo: 'email', mensagem: 'Email inválido'
      }
    ],
    password: [
        {
          tipo: 'required',
          mensagem: 'O campo senha é obrigatório...'
        },
        {
          tipo: 'minLegth', mensagem: 'A senha deve ter no mínimo 3 caracteres...'
        }
    ],
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private us: UsersService
  ) 
  { 
    this.formLogin = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    })
  }

  async ngOnInit() {

  }

  async salvarForm(){

    try {
      if(this.formLogin.valid) {
        let user = {} as User
        user.email = this.formLogin.value.email
        user.password = this.formLogin.value.password
          if(this.us.createLogin(user)) {
            console.log('Sucesso!, Usuário Cadastrado!')
            this.router.navigateByUrl('/teste-teste')
          } else {
            console.log('Falha!, Erro ao Cadastrar Usuário!')
          }
      } else {
        console.log('Formulário Inválido!')
      }
    }
    catch(e) {
      console.log(e)
    }
    
  }

}
