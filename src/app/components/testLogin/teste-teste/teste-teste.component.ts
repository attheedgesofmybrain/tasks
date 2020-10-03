import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../models/userData.model';
import { User } from '../models/User.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-teste-teste',
  templateUrl: './teste-teste.component.html',
  styleUrls: ['./teste-teste.component.scss']
})
export class TesteTesteComponent implements OnInit {

  formDataUser: FormGroup

  validationMessages = {
    name: [
      {
        tipo: 'required',
        mensagem: 'O campo nome é obrigatório...'
      }
    ],
    age: [
        {
          tipo: 'required',
          mensagem: 'O campo idade é obrigatório...'
        }
    ]
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fs: AngularFirestore,
    private us: UsersService) 
    {
      this.formDataUser = fb.group({
        name: ['', Validators.compose([Validators.required])],
        age: ['', Validators.compose([Validators.required])],
      })
    }

  ngOnInit(
    
  ) 
  {
    this.us.state()
  }

  async salvarForm(){

    try {
      if(this.formDataUser.valid) {
        let userData = {} as UserData
        userData.name = this.formDataUser.value.name
        userData.age = this.formDataUser.value.age
          if(this.us.createUserData(userData)) {
            console.log('Sucesso!, Usuário Cadastrado!')
            //this.router.navigateByUrl('/teste-teste')
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
