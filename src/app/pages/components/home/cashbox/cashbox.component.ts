import { Component, OnInit } from '@angular/core';
import { CashBox } from 'src/app/pages/models/cashbox.model';

@Component({
  selector: 'app-cashbox',
  templateUrl: './cashbox.component.html',
  styleUrls: ['./cashbox.component.scss']
})
export class CashboxComponent implements OnInit {

  cashbox = {} as CashBox
  deliverymen: any

  constructor() { }

  ngOnInit() {
  }

}
