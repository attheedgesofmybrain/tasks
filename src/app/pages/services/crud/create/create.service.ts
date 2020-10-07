import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CashBox } from '../../../models/cashbox.model';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  cashBox = {} as CashBox

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private showToast: ToastService
  ) { }

  async cashBoxRegister(cashBox: CashBox) {

    /*let dateString = (cashBox.date).toString() 
    if(dateString.length < 10) {
      return cashBox.date
    }
    let dateArray = dateString.split('-')
    if(dateArray.length != 3) {
      return cashBox.date
    }
    let dateAny: any  = dateArray
    let date = new Date(dateAny[0], dateAny[1]-1, dateAny[2])
    let docId = Intl.DateTimeFormat('pt-BR').format(date) */
    if(cashBox.deliveryman == 'Escolha o entregador') {
      cashBox.deliveryman = null
    }
    cashBox.card = cashBox.debitCard+cashBox.creditCard
    cashBox.totalValue = cashBox.currency+cashBox.card+cashBox.online
    //console.log(this.authService.state())
    await this.firestore.doc(`/Users/${localStorage['email']}`).collection('CashBox').add(cashBox)
    this.showToast.showSuccess('Registro criado!')
    this.router.navigateByUrl('/cashbox/reports')
    console.log('Registro criado -> ' +cashBox)
  }

}
