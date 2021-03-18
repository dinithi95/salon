import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../user/User";
import {Role} from "../user/Role";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private router: Router
  ) {
  }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:8000/api/user');
  }

  getAllRoles() {
    return this.http.get<Role[]>('http://localhost:8000/api/role');
  }
}
