import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CashBox } from 'src/app/pages/models/cashbox.model';
import { CreateService } from 'src/app/pages/services/crud/create/create.service';
import { ReadService } from 'src/app/pages/services/crud/read/read.service';
import { ToastService } from 'src/app/pages/services/toast/toast.service';

@Component({
  selector: 'app-cashbox',
  templateUrl: './cashbox.component.html',
  styleUrls: ['./cashbox.component.scss']
})
export class CashboxComponent implements OnInit {

  cashBox = {} as CashBox
  deliverymen: any

  constructor(
    private firestore: AngularFirestore,
    private createService: CreateService,
    private showToast: ToastService
  ) 
  {
    
  }
  
  async ngOnInit() {
    this.firestore.collection("Deliverymen").snapshotChanges().subscribe(data => {
      this.deliverymen = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name']
        }
      })
      //console.log(this.deliverymen)
    })
  }

  async create() {
    if(this.formValidation()) {
      try {
        this.createService.cashBoxRegister(this.cashBox)
      }
      catch(e) {
        this.showToast.showSuccess(e)
      }
    }
  }

  /*
    if(this.cashBox.deliveries > 10) {
      this.cashBox.additionalDeliveries = this.cashBox.deliveries-10
      this.cashBox.deliveriesValue = 50+(this.cashBox.additionalDeliveries*2)
      console.log('adicional' +this.cashBox.additionalDeliveries);
      console.log('total' +this.cashBox.deliveriesValue);

    } else {
      this.cashBox.additionalDeliveries = 0
      this.cashBox.deliveriesValue = 50
      console.log('adicional: ' +this.cashBox.additionalDeliveries);
      console.log('total: ' +this.cashBox.deliveriesValue);
    } 
  */
     
 formValidation() {
  if(!this.cashBox.card && !this.cashBox.creditCard && !this.cashBox.currency && !this.cashBox.date && !this.cashBox.debitCard && !this.cashBox.deliveries && !this.cashBox.deliveriesValue && !this.cashBox.deliveryman && !this.cashBox.online && !this.cashBox.totalValue && !this.cashBox.withdrawals) {
    this.showToast.showSuccess('Entre com os dados!')
    return false
  }
  if(!this.cashBox.creditCard) {
    this.showToast.showSuccess('Entre com o valor do crédito!')
    return false
  }
  if(!this.cashBox.currency) {
    this.showToast.showSuccess('Entre com o valor do dinheiro!')
    return false
  }
  if(!this.cashBox.date) {
    this.showToast.showSuccess('Entre com a data!')
    return false
  }
  if(!this.cashBox.debitCard) {
    this.showToast.showSuccess('Entre com o valor do débito!')
    return false
  }
  if(!this.cashBox.deliveries) {
    this.showToast.showSuccess('Entre com o total de entregas!')
    return false
  }
  if(!this.cashBox.deliveriesValue) {
    this.showToast.showSuccess('Entre com o valor total a ser pago para o entregador!')
    return false
  }
  if(!this.cashBox.deliveryman) {
    this.showToast.showSuccess('Entre com o nome do entregador!')
    return false
  }
  if(!this.cashBox.online) {
    this.showToast.showSuccess('Entre com o valor do Aiqfome!')
    return false
  }
  if(!this.cashBox.withdrawals) {
    this.showToast.showSuccess('Entre com o total de retiras!')
    return false
  }
  return true
}

}
