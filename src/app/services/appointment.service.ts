import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Appointment} from "../appointment/Appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {
  }

  getAllAppointments() {
    return this.http.get<Appointment[]>('http://localhost:8000/api/appointment');
  }

  getAppointmentsByStatus(status: string){
    let statusParam = new HttpParams();
    statusParam = statusParam.append('status', status);

    return this.http.get<Appointment[]>('http://localhost:8000/api/appointmentByStatus', {params: statusParam});
  }
}
