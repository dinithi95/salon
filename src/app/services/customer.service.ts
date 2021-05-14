import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Customer} from "../customer/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  getAllCustomers() {
    return this.http.get<Customer[]>('http://localhost:8000/api/customer');
  }

  getCustomerByNIC(customerNIC) {
    let nic = new HttpParams();
    nic = nic.append('nic', customerNIC);
    return this.http.get<Customer>('http://localhost:8000/api/customerByNIC', {params: nic});
  }

  delete(id: any) {
    return this.http.delete<Customer[]>(`http://localhost:8000/api/customer/${id}`);
  }
}
