import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppointmentService} from "../services/appointment.service";
import {Appointment} from "../appointment/Appointment";
import {DateTime, Duration} from 'luxon';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  form: FormGroup;
  data: Appointment[] = [];
  displayData: Appointment[] = [];
  today = null;

  constructor(private fb: FormBuilder,
              private appointmentservice: AppointmentService) {
  }

  ngOnInit(): void {
    this.formControl();
    this.geAllAppointments();
    this.today = new Date().toISOString();
  }

  formControl() {
    this.form = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      status: [''],
    });
  }

  geAllAppointments() {
    this.appointmentservice.getAllAppointments().subscribe(value => {
      this.data = value;
    });
  }

  resetForm(): void {
    this.form.reset();
    this.displayData = [];
  }

  search() {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }
    if (this.form.valid) {

      this.displayData = [];
      const from = new Date(this.form.controls.from.value);
      const to = new Date(this.form.controls.to.value);
      const status = this.form.controls.status.value;

      this.data.map(appointment => {
        const date = new Date(appointment.date);
        if ((from < date && date < to) && (status == '' || status == appointment.status)) {
          this.displayData.push(appointment);
        }
      });
    }
  }
}
