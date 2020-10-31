import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../user/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private router: Router
  ) {
  }

  getAllUsers(){
    return this.http.get<User[]>('http://localhost:8000/api/user');
  }
}
