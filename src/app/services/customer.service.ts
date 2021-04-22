import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Customer} from "../customer/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,
              private router: Router) { }

  getAllCustomers(): any {
    return this.http.get<Customer[]>('http://localhost:8000/api/customer');
  }

  delete(id: any) {
    return this.http.delete<Customer[]>(`http://localhost:8000/api/customer/${id}`);
  }
}
