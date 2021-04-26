import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from "../service/Service";

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
  services: Service[] = []
  appointmentForm: FormGroup;
  hair: Service[] = [];
  bridal: Service[] = [];
  beauty: Service[] = [];
  checkedServices: Service[] = [];
  current = 0;
  index = 'Basic Details';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formControl();
    this.services.map((service) => {
      if (service.subcategory.category.name === 'Hair') {
        this.hair.push(service);
      }
      if (service.subcategory.category.name === 'Bridal') {
        this.bridal.push(service);
      }
      if (service.subcategory.category.name === 'Beauty') {
        this.beauty.push(service);
      }
    });
  }


  formControl() {
    this.appointmentForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      date: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postal: ['', [Validators.required]],
      town: ['', [Validators.required]],
      district: ['', [Validators.required]],
      nic: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

  }


  updateCheckedSet(service: Service, checked: boolean): void {
    if (checked) {
      this.checkedServices.push(service);
    } else {
      let index = this.checkedServices.indexOf(service);
      if (index !== -1) {
        this.checkedServices.splice(index, 1);
      }
    }
  }

  onItemChecked(service: Service, checked: boolean): void {
    this.updateCheckedSet(service, checked);
    // this.refreshCheckedStatus();
    console.log(this.checkedServices);
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

  done(): void {
    console.log('done');
  }

}
