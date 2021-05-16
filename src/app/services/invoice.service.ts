import { Injectable } from '@angular/core';
import {Item} from "../item/Item";
import {HttpClient} from "@angular/common/http";
import {Invoice} from "../invoice/Invoice";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getAllInvoice() {
    return this.http.get<Invoice[]>('http://localhost:8000/api/invoice');
  }
}
