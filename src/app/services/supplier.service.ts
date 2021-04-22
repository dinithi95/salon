import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Supplier} from "../supplier/Supplier";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

   constructor(private http: HttpClient
  ) {
  }

  getAllSuppliers(): any {
    return this.http.get<Supplier[]>('http://localhost:8000/api/supplier');
  }

  delete(id: any) {
    return this.http.delete<Supplier[]>(`http://localhost:8000/api/supplier/${id}`);
  }
}
