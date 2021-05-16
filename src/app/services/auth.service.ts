import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd";
import {Role} from "../user/Role";

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
          this.http.get<Role[]>(`http://localhost:8000/api/role/${res.user.id}`, {headers: reqH}).subscribe(resp => {
            if (resp) {
              console.log(resp, 'roooollllles')
              let roles: string[] = [];
              resp.map((role) => {
                roles.push(role.name);
              });
              localStorage.setItem('roles', JSON.stringify(roles));
              this.router.navigate(['/']);
            }
          });
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
    localStorage.removeItem('roles');
    this.router.navigate(['/']);
  }

  checkAllowedRoles(allowedRoles) {
    let isMatch = false;
    const roles = JSON.parse(localStorage.getItem('roles'));
    allowedRoles.forEach((el) => {
      if (roles?.indexOf(el) > -1) {
        isMatch = true;
      }
    });
    return isMatch;
  }

}
