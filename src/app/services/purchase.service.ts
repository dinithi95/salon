import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PurchaseOrder} from "../purchase/PurchaseOrder";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  getAllPO(){
    return this.http.get<PurchaseOrder[]>('http://localhost:8000/api/purchaseOrder');
  }
}
