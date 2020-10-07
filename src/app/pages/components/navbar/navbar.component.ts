import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  async logout() {
    this.authService.signOut()
    localStorage['email'] = null
    this.route.navigateByUrl('/signin')
  }

}
