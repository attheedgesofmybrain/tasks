import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth
  ) { }

  async ngOnInit() {
    var user = this.auth.currentUser
    if(user!=null) {
      console.log('sua mae');
    } else {
      console.log('nulo');
      
    }
  }

}
