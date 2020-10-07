import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { CashBox } from 'src/app/pages/models/cashbox.model';
import { ReadService } from 'src/app/pages/services/crud/read/read.service';
import { UpdateService } from 'src/app/pages/services/crud/update/update.service';
import { ToastService } from 'src/app/pages/services/toast/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  cashBox = {} as CashBox
  id: any
  deliverymen: any

  constructor(
    private actRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private readService: ReadService,
    private updateService: UpdateService,
    private showToast: ToastService,
    private router: Router
  ) 
  { 
    this.id = this.actRoute.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.getCashBoxById(this.id)
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

  async getCashBoxById(id: string) {
    this.firestore.doc(`/Users/${localStorage['email']}/CashBox/` +id).valueChanges().subscribe(data => {
      this.cashBox.currency = data['currency']
      this.cashBox.card = data['card']
      this.cashBox.debitCard = data['debitCard']
      this.cashBox.creditCard = data['creditCard']
      this.cashBox.online = data['online']
      this.cashBox.deliveryman = data['deliveryman']
      this.cashBox.deliveries = data['deliveries']
      this.cashBox.deliveriesValue = data['deliveriesValue']
      this.cashBox.withdrawals = data['withdrawals']
      this.cashBox.totalValue = data['totalValue']
      this.cashBox.date = data['date']
    })
  }

  async update(cashBox: CashBox) {
    if(this.formValidation()) {
      try {
        cashBox.card = cashBox.debitCard+cashBox.creditCard
        cashBox.totalValue = cashBox.currency+cashBox.card+cashBox.online
        await this.firestore.doc(`/Users/${localStorage['email']}/CashBox/` +this.id).update(cashBox)
        this.showToast.showSuccess('Registro criado!')
        this.router.navigateByUrl('/cashbox/reports')
        console.log('Registro criado -> ' +cashBox)
      }
      catch(e) {
        this.showToast.showSuccess(e)
      }
    }
  }

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
