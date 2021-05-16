import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  scroll(id) {
    const el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }


  isAdmin() {
    let adminRoles = ['Owner', 'Cashier'];
    return this.authService.checkAllowedRoles(adminRoles);
  }

  logout() {
    this.authService.logout();
  }

}
