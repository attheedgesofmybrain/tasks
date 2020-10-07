import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { CashBox } from 'src/app/pages/models/cashbox.model';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  cashBox = {} as CashBox
  id: any
  de
  ate
  cashBoxes


  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private actRoute: ActivatedRoute,
  ) { }

  getDeliveryman(deliverymen) {
    this.firestore.collection("Deliverymen").snapshotChanges().subscribe(data => {
      deliverymen = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name']
        }
      })
      console.log(deliverymen)
    })
  }

  async getCashBox(cashBoxes) {
    console.log((await this.auth.currentUser).email)
    this.firestore.doc(`/Users/${localStorage['email']}`).collection('CashBox').snapshotChanges().subscribe(data => {
      cashBoxes = data.map(e => {
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
      console.log(cashBoxes)
    })
    return cashBoxes
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
