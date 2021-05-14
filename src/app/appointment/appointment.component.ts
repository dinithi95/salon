import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from "../service/Service";
import {CustomerService} from "../services/customer.service";
import {ServiceService} from "../services/service.service";
import {NzNotificationService} from "ng-zorro-antd";
import {CategoryService} from "../services/category.service";
import {Category} from "../category/Category";
import {DateTime, Duration} from 'luxon';
import {HttpClient} from "@angular/common/http";
import {AppointmentService} from "../services/appointment.service";
import {Appointment} from "./Appointment";

// interface service {
//   name: string;
//   price: string;
//   time:
// }

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  services: Service[] = [];
  appointments: Appointment[] = [];
  selectedServices: Service[] = [];
  selectedServiceIDs: string[] = [];
  categories: Category[] = [];
  current = 0;
  index = 'Basic Details';
  registered = true;
  code = '';
  totalPrice = 0.00;
  endTime = '';

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private notification: NzNotificationService,
              private customerService: CustomerService,
              private categoryService: CategoryService,
              private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    this.formControl();
    this.getAllCategories();
    this.getAllAppointments();
  }


  formControl() {
    this.appointmentForm = this.fb.group({
      id: null,
      nic: ['', [Validators.required]],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
      code: ['', [Validators.required]],
      date: ['', [Validators.required]],
      start: [null, [Validators.required]],
      end: null,
      cost: null,
      status: ['Pending'],
      services: [this.selectedServiceIDs]
    });

  }

  submitForm() {
    for (const key in this.appointmentForm.controls) {
      this.appointmentForm.controls[key].markAsDirty();
      this.appointmentForm.controls[key].updateValueAndValidity();
    }

    console.log(this.appointmentForm.value);
    this.http.post(`http://localhost:8000/api/appointment`, this.appointmentForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Appointment Details Saved Successfully', '');
        this.getAllCategories();
      },
      err => {
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });
  }

  resetForm(): void {
    this.appointmentForm.reset();
    this.current = 0;
    this.generateCode();
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointments().subscribe(value => {
      this.appointments = value;
      this.generateCode();
    });
  }

  updateCheckedSet(service: Service, checked: boolean): void {
    if (checked) {
      this.selectedServices.push(service);
      this.selectedServiceIDs.push(service.id);
    } else {
      let index = this.selectedServices.indexOf(service);
      if (index !== -1) {
        this.selectedServices.splice(index, 1);
      }
    }
    this.calculateTotalPrice();
  }

  onItemChecked(service: Service, checked: boolean): void {
    this.updateCheckedSet(service, checked);
    // this.refreshCheckedStatus();
    console.log(this.selectedServiceIDs);
    console.log(this.appointmentForm.value);
  }

  // refreshCheckedStatus(): void {
  //   this.checked = this.listOfCurrentPageData.every(item => this.checkedServices.indexOf(item));
  //   this.indeterminate = this.listOfCurrentPageData.some(item => this.checkedServices.indexOf(item)) && !this.checked;
  // }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  getCustomerByNIC(nic) {
    console.log(nic);
    this.customerService.getCustomerByNIC(nic).subscribe(res => {
      this.appointmentForm.patchValue({
        name: res.name,
        email: res.email,
        mobile: res.mobile
      });
      this.registered = true;
    }, err => {
      this.showNotification('warning', 'You are not registered ', 'Please register of enter required details here');
      this.registered = false;
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(value => {
      this.categories = value;
    });
  }

  // Create message
  showNotification(type: string, message: string, content: string): void {
    this.notification.create(type, message, content);
  }

  // Auto generate next code(employee code)
  generateCode() {
    if (this.appointments.length > 0) {
      const lastCode = parseInt(this.appointments[this.appointments.length - 1].code, 10);
      const nextCode = lastCode + 1;
      this.code = nextCode.toString();
    } else {
      this.code = '1000';
    }
    this.appointmentForm.patchValue({code: this.code});
  }

  calculateTotalPrice() {
    let total: any = 0.00;
    this.selectedServices.map(service => {
      total = total + parseFloat(service.price);
    });
    this.totalPrice = total.toFixed(2);
    this.appointmentForm.patchValue({cost: this.totalPrice});
  }

  calculateEndTime() {
    let duration: Duration = 0;
    this.selectedServices.map(service => {
      duration = duration + Duration.fromISOTime(service.duration).toMillis();
    });
    const begin: DateTime = new Date(this.appointmentForm.controls.start.value);
    this.endTime = DateTime.fromJSDate(begin).plus(duration).toLocaleString(DateTime.TIME_SIMPLE).toString();
    const startTime = DateTime.fromJSDate(begin).toLocaleString(DateTime.TIME_SIMPLE).toString();

    this.appointmentForm.patchValue({end: this.endTime, start: startTime});
    this.next();
  }


}
