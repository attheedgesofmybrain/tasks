import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vendas } from '../models/vendas.model';

@Component({
  selector: 'app-pag1',
  templateUrl: './pag1.component.html',
  styleUrls: ['./pag1.component.scss']
})
export class Pag1Component implements OnInit {

  vendas = {} as Vendas
  entregadores: any

  constructor(
    private firestore: AngularFirestore
  ) { 
    
  }

  ngOnInit() {
    this.firestore.collection("Entregadores").snapshotChanges().subscribe(data => {
      this.entregadores = data.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome']
        }
      })
      console.log(this.entregadores);
    })
  }


  async CriarRegistroVendas(vendas: Vendas) {
    try {
      await this.firestore.collection('Vendas').add(vendas)
      console.log(vendas);
    } catch(e) {
        console.log(e)
      }
  }







}
