import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ServiceService} from "./service.service";
import {NzNotificationService} from "ng-zorro-antd";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              private notification: NzNotificationService
  ) {
  }

  login(val) {
    const reqH = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
    this.http.post<any>(`http://localhost:8000/api/login`, val, {headers: reqH}).subscribe(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['admin']);
      }
    },
      err => {
        console.log(err.error.message);
          this.notification.create('error', 'Error!', err.error.message);

      });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
