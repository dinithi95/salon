import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {NzNotificationService} from "ng-zorro-antd";
import {AppointmentService} from "../services/appointment.service";
import {Appointment} from "../appointment/Appointment";

@Component({
  selector: 'app-approve-appointment',
  templateUrl: './approve-appointment.component.html',
  styleUrls: ['./approve-appointment.component.css']
})
export class ApproveAppointmentComponent implements OnInit {

  pendingAppointments: Appointment[] = [];
  isVisible = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private notification: NzNotificationService,
              private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getPendingAppointments();
  }

  getPendingAppointments() {
    this.appointmentService.getAppointmentsByStatus('Pending').subscribe(value => {
      this.pendingAppointments = value;
    });
  }

  updateStatus(id: string, status: string){
    let stat = new HttpParams();
    stat = stat.append('status', status);
    stat = stat.append('id', id);
    this.http.put(`http://localhost:8000/api/appointment/status`, '', {params: stat}).subscribe(
      res => {
        this.closeModal();
        this.showNotification('success', 'Appointment Details Updated Successfully', '');
        this.getPendingAppointments();
      },
      err => {
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });
  }

  showNotification(type: string, message: string, content: string): void {
    this.notification.create(type, message, content);
  }

  showModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }
}
