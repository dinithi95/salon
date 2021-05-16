import {Component, OnInit} from '@angular/core';
import {Appointment} from "../appointment/Appointment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {NzNotificationService} from "ng-zorro-antd";
import {AppointmentService} from "../services/appointment.service";
import {InvoiceService} from "../services/invoice.service";
import {Invoice} from "./Invoice";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  appointments: Appointment[] = [];
  isVisible = false;
  selectedData = null;
  code = '';
  invoiceForm: FormGroup;
  invoices: Invoice[] = [];

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private notification: NzNotificationService,
              private appointmentService: AppointmentService,
              private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.getActiveAppointments();
    this.formControl();
    this.getAllInvoices();
  }

  formControl() {
    this.invoiceForm = this.fb.group({
      id: null,
      code: [''],
      status: ['', [Validators.required]],
      date: [''],
      price: [''],
      appointment_id: [''],
    })
  }

  getActiveAppointments() {
    this.appointmentService.getAppointmentsByStatus('Active').subscribe(value => {
      this.appointments = value;
    });
  }

  getAllInvoices() {
    this.invoiceService.getAllInvoice().subscribe(value => {
      this.invoices = value;
      this.generateCode();
    })
  }

  submit() {
    for (const key in this.invoiceForm.controls) {
      this.invoiceForm.controls[key].markAsDirty();
      this.invoiceForm.controls[key].updateValueAndValidity();
    }

    this.http.post(`http://localhost:8000/api/invoice`, this.invoiceForm.value).subscribe(res => {
      this.updateAppointmentStatus();
      this.showNotification('success', 'Appointment Details Updated Successfully', '');
      this.invoiceForm.reset();
      this.selectedData = null;
      this.getAllInvoices();
      this.getActiveAppointments();
    });
  }

  updateAppointmentStatus() {
    let stat = new HttpParams();
    stat = stat.append('status', 'Completed');
    stat = stat.append('id', this.selectedData.id);
    this.http.put(`http://localhost:8000/api/appointment/status`, '', {params: stat}).subscribe();
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

  reset() {
    this.invoiceForm.reset();
  }

  select(data) {
    this.selectedData = data;
    this.closeModal();
    this.invoiceForm.patchValue({
      date: this.selectedData.date,
      price: this.selectedData.cost,
      appointment_id: this.selectedData.id,
    })
  }

  generateCode() {
    if (this.invoices.length > 0) {
      const lastCode = parseInt(this.invoices[this.invoices.length - 1].code, 10);
      const nextCode = lastCode + 1;
      this.code = nextCode.toString();
    } else {
      this.code = '1000';
    }
    this.invoiceForm.patchValue({code: this.code});
  }
}
