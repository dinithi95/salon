import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NzNotificationService} from "ng-zorro-antd";
import {AppointmentService} from "../services/appointment.service";
import {Appointment} from "../appointment/Appointment";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  activeAppointments: Appointment[] = [];
  displayActiveAppointments: Appointment[] = [];
  isVisible = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private notification: NzNotificationService,
              private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    this.getAllActiveAppointments();
  }

  getAllActiveAppointments() {
    this.appointmentService.getAppointmentsByStatus('Active').subscribe(value => {
      this.activeAppointments = value;
    });
  }

  onValueChange(value: Date): void {
    let date = new Date(value).toISOString();
    console.log(`Current value:`, date.toString().slice(0, 10));
    this.displayActiveAppointments = this.activeAppointments.filter(appointment => appointment.date.toString().slice(0, 10) == date.toString().slice(0, 10));
  }

  showModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }


}
