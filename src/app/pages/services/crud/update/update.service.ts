import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { CashBox } from 'src/app/pages/models/cashbox.model';
import { ToastService } from '../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  cashBox = {} as CashBox
  id: any

  constructor(
    private actRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router,
    private showToast: ToastService
  ) 
  {
    this.id = this.actRoute.snapshot.paramMap.get('id')
  }

  async updateCashBox(cashBox: CashBox) {
    await this.firestore.doc(`/Users/${localStorage['email']}/CashBox/` +this.id).update(cashBox)
    this.showToast.showSuccess('Registro criado!')
    this.router.navigateByUrl('/cashbox/reports')
    console.log('Registro criado -> ' +cashBox)
  }



}
