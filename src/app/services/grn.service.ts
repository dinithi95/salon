import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PurchaseOrder} from "../grn/Grn";

@Injectable({
  providedIn: 'root'
})
export class GrnService {

  constructor(private http: HttpClient) { }

  getAllgrn(){
    return this.http.get<Grn[]>('http://localhost:8000/api/grn');
  }
}
