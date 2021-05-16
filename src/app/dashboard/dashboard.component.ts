import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppointmentService} from "../services/appointment.service";
import {Appointment} from "../appointment/Appointment";
import {DateTime, Duration} from 'luxon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todayApt: Appointment[] = [];
  modalData = null;
  isVisible = false;

  constructor(
    private http: HttpClient,
    private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    this.getTodayAppointments();
  }

  getTodayAppointments() {
    const today = new Date().toISOString();
    console.log(today);
    this.appointmentService.getAppointmentsByStatus('Active').subscribe(value => {
      this.todayApt = value.filter(appointment => appointment.date.toString().slice(0, 10) === today.toString().slice(0, 10));
      console.log(value);
      console.log(this.todayApt);
    });
  }

  showModal(data): void {
    this.modalData = data;
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalData = null;
  }

}
