import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router
  ) {
  }

  login(val) {
    const reqH = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post<any>(`http://localhost:8000/api/login`, val, {headers: reqH}).subscribe(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['admin']);
      }
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
