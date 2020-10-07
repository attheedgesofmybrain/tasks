import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CashBox } from 'src/app/pages/models/cashbox.model';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { ReadService } from 'src/app/pages/services/crud/read/read.service';
import { ToastService } from 'src/app/pages/services/toast/toast.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  cashBox = {} as CashBox
  cashBoxes: any
  currency=0; card=0; debitCard=0; creditCard=0; online=0; deliveries=0; deliveriesValue=0; withdrawals=0; totalValue=0
  filtro = ''
  de = ''
  ate = ''

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private readService: ReadService,
    private authService: AuthService,
    private showToast: ToastService
  ) 
  {
    
  }


  async ngOnInit() {
    this.firestore.doc(`/Users/${localStorage['email']}`).collection('CashBox',  ref => ref.orderBy('date', 'asc')).snapshotChanges().subscribe(data => {
      this.cashBoxes = data.map(e => {
        return {
          id: e.payload.doc.id,
          currency: e.payload.doc.data()['currency'],
          card: e.payload.doc.data()['card'],
          debitCard: e.payload.doc.data()['debitCard'],
          creditCard: e.payload.doc.data()['creditCard'],
          online: e.payload.doc.data()['online'],
          deliveryman: e.payload.doc.data()['deliveryman'],
          deliveries: e.payload.doc.data()['deliveries'],
          deliveriesValue: e.payload.doc.data()['deliveriesValue'],
          withdrawals: e.payload.doc.data()['withdrawals'],
          totalValue: e.payload.doc.data()['totalValue'],
          date: e.payload.doc.data()['date'],
        }
      })
      console.log(this.cashBoxes)
      // currency
      for(let i=0; i < this.cashBoxes.length; i++) { this.currency = this.currency + this.cashBoxes[i]['currency'] }
      // card
      for(let i=0; i < this.cashBoxes.length; i++) { this.card = this.card + this.cashBoxes[i]['card'] }
      // debitCard
      for(let i=0; i < this.cashBoxes.length; i++) { this.debitCard = this.debitCard + this.cashBoxes[i]['debitCard'] }
      // creditCard
      for(let i=0; i < this.cashBoxes.length; i++) { this.creditCard = this.creditCard + this.cashBoxes[i]['creditCard'] }
      // online
      for(let i=0; i < this.cashBoxes.length; i++) { this.online = this.online + this.cashBoxes[i]['online'] }
      // deliveries
      for(let i=0; i < this.cashBoxes.length; i++) { this.deliveries = this.deliveries + this.cashBoxes[i]['deliveries'] }
      // deliveriesValue
      for(let i=0; i < this.cashBoxes.length; i++) { this.deliveriesValue = this.deliveriesValue + this.cashBoxes[i]['deliveriesValue'] }
      // withdrawals
      for(let i=0; i < this.cashBoxes.length; i++) { this.withdrawals = this.withdrawals + this.cashBoxes[i]['withdrawals'] }
      // totalValue
      for(let i=0; i < this.cashBoxes.length; i++) { this.totalValue = this.totalValue + this.cashBoxes[i]['totalValue'] }
    })
  }


  async delete(id: string) {
    try {
      await this.firestore.doc(`/Users/${localStorage['email']}/CashBox/` + id).delete()
      this.showToast.showSuccess('Documento deletado com sucesso!')
    }
    catch(e) {
      this.showToast.showSuccess(e)
    }
  }

  async filter() {
    this.firestore.doc(`/Users/${localStorage['email']}`).collection('CashBox',  ref => ref.where('date','>=',this.de).where('date','<=',this.ate).orderBy('date', 'asc')).snapshotChanges().subscribe(data => {
      this.cashBoxes = data.map(e => {
        return {
          id: e.payload.doc.id,
          currency: e.payload.doc.data()['currency'],
          card: e.payload.doc.data()['card'],
          debitCard: e.payload.doc.data()['debitCard'],
          creditCard: e.payload.doc.data()['creditCard'],
          online: e.payload.doc.data()['online'],
          deliveryman: e.payload.doc.data()['deliveryman'],
          deliveries: e.payload.doc.data()['deliveries'],
          deliveriesValue: e.payload.doc.data()['deliveriesValue'],
          withdrawals: e.payload.doc.data()['withdrawals'],
          totalValue: e.payload.doc.data()['totalValue'],
          date: e.payload.doc.data()['date'],
        }
      })
      console.log(this.cashBoxes)
      this.currency=0; this.card=0; this.debitCard=0; this.creditCard=0; this.online=0; this.deliveries=0; this.deliveriesValue=0; this.withdrawals=0; this.totalValue=0
       // currency
       for(let i=0; i < this.cashBoxes.length; i++) { this.currency = this.currency + this.cashBoxes[i]['currency'] }
       // card
       for(let i=0; i < this.cashBoxes.length; i++) { this.card = this.card + this.cashBoxes[i]['card'] }
       // debitCard
       for(let i=0; i < this.cashBoxes.length; i++) { this.debitCard = this.debitCard + this.cashBoxes[i]['debitCard'] }
       // creditCard
       for(let i=0; i < this.cashBoxes.length; i++) { this.creditCard = this.creditCard + this.cashBoxes[i]['creditCard'] }
       // online
       for(let i=0; i < this.cashBoxes.length; i++) { this.online = this.online + this.cashBoxes[i]['online'] }
       // deliveries
       for(let i=0; i < this.cashBoxes.length; i++) { this.deliveries = this.deliveries + this.cashBoxes[i]['deliveries'] }
       // deliveriesValue
       for(let i=0; i < this.cashBoxes.length; i++) { this.deliveriesValue = this.deliveriesValue + this.cashBoxes[i]['deliveriesValue'] }
       // withdrawals
       for(let i=0; i < this.cashBoxes.length; i++) { this.withdrawals = this.withdrawals + this.cashBoxes[i]['withdrawals'] }
       // totalValue
       for(let i=0; i < this.cashBoxes.length; i++) { this.totalValue = this.totalValue + this.cashBoxes[i]['totalValue'] }
    })
  }

  async reset() {
    this.firestore.doc(`/Users/${localStorage['email']}`).collection('CashBox',  ref => ref.orderBy('date', 'asc')).snapshotChanges().subscribe(data => {
      this.cashBoxes = data.map(e => {
        return {
          id: e.payload.doc.id,
          currency: e.payload.doc.data()['currency'],
          card: e.payload.doc.data()['card'],
          debitCard: e.payload.doc.data()['debitCard'],
          creditCard: e.payload.doc.data()['creditCard'],
          online: e.payload.doc.data()['online'],
          deliveryman: e.payload.doc.data()['deliveryman'],
          deliveries: e.payload.doc.data()['deliveries'],
          deliveriesValue: e.payload.doc.data()['deliveriesValue'],
          withdrawals: e.payload.doc.data()['withdrawals'],
          totalValue: e.payload.doc.data()['totalValue'],
          date: e.payload.doc.data()['date'],
        }
      })
      console.log(this.cashBoxes)
      this.currency=0; this.card=0; this.debitCard=0; this.creditCard=0; this.online=0; this.deliveries=0; this.deliveriesValue=0; this.withdrawals=0; this.totalValue=0
      // currency
      for(let i=0; i < this.cashBoxes.length; i++) { this.currency = this.currency + this.cashBoxes[i]['currency'] }
      // card
      for(let i=0; i < this.cashBoxes.length; i++) { this.card = this.card + this.cashBoxes[i]['card'] }
      // debitCard
      for(let i=0; i < this.cashBoxes.length; i++) { this.debitCard = this.debitCard + this.cashBoxes[i]['debitCard'] }
      // creditCard
      for(let i=0; i < this.cashBoxes.length; i++) { this.creditCard = this.creditCard + this.cashBoxes[i]['creditCard'] }
      // online
      for(let i=0; i < this.cashBoxes.length; i++) { this.online = this.online + this.cashBoxes[i]['online'] }
      // deliveries
      for(let i=0; i < this.cashBoxes.length; i++) { this.deliveries = this.deliveries + this.cashBoxes[i]['deliveries'] }
      // deliveriesValue
      for(let i=0; i < this.cashBoxes.length; i++) { this.deliveriesValue = this.deliveriesValue + this.cashBoxes[i]['deliveriesValue'] }
      // withdrawals
      for(let i=0; i < this.cashBoxes.length; i++) { this.withdrawals = this.withdrawals + this.cashBoxes[i]['withdrawals'] }
      // totalValue
      for(let i=0; i < this.cashBoxes.length; i++) { this.totalValue = this.totalValue + this.cashBoxes[i]['totalValue'] }
    })
  }

  async somaCurrency(currency=0, card=0, debitCard=0, creditCard=0, online=0, deliveries=0, deliveriesValue=0, withdrawals=0, totalValue=0) {
    this.firestore.doc(`/Users/${localStorage['email']}`).collection('CashBox', ref => ref.where('date','>=',this.de).where('date','<=',this.ate)).snapshotChanges().subscribe(data => {
      this.cashBoxes = data.map(e => {
        return {
          id: e.payload.doc.id,
          currency: e.payload.doc.data()['currency'],
          card: e.payload.doc.data()['card'],
          debitCard: e.payload.doc.data()['debitCard'],
          creditCard: e.payload.doc.data()['creditCard'],
          online: e.payload.doc.data()['online'],
          deliveryman: e.payload.doc.data()['deliveryman'],
          deliveries: e.payload.doc.data()['deliveries'],
          deliveriesValue: e.payload.doc.data()['deliveriesValue'],
          withdrawals: e.payload.doc.data()['withdrawals'],
          totalValue: e.payload.doc.data()['totalValue'],
          date: e.payload.doc.data()['date'],
        }
      })
      // currency
      for(let i=0; i < this.cashBoxes.length; i++) { currency = currency + this.cashBoxes[i]['currency'] }
      // card
      for(let i=0; i < this.cashBoxes.length; i++) { card = card + this.cashBoxes[i]['card'] }
      // debitCard
      for(let i=0; i < this.cashBoxes.length; i++) { debitCard = debitCard + this.cashBoxes[i]['debitCard'] }
      // creditCard
      for(let i=0; i < this.cashBoxes.length; i++) { creditCard = creditCard + this.cashBoxes[i]['creditCard'] }
      // online
      for(let i=0; i < this.cashBoxes.length; i++) { online = online + this.cashBoxes[i]['online'] }
      // deliveries
      for(let i=0; i < this.cashBoxes.length; i++) { deliveries = deliveries + this.cashBoxes[i]['deliveries'] }
      // deliveriesValue
      for(let i=0; i < this.cashBoxes.length; i++) { deliveriesValue = deliveriesValue + this.cashBoxes[i]['deliveriesValue'] }
      // withdrawals
      for(let i=0; i < this.cashBoxes.length; i++) { withdrawals = withdrawals + this.cashBoxes[i]['withdrawals'] }
      // totalValue
      for(let i=0; i < this.cashBoxes.length; i++) { totalValue = totalValue + this.cashBoxes[i]['totalValue'] }
    })
  }

}
