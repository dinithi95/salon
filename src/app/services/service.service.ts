import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../category/Category";
import {Service} from "../service/Service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getAllService(){
    return this.http.get<Service[]>('http://localhost:8000/api/service');
  }
   delete(id: any) {
    return this.http.delete<Service[]>(`http://localhost:8000/api/service/${id}`);
  }
}
