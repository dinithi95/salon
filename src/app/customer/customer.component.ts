import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer1Form: FormGroup;
  customer2Form: FormGroup;
  customer3Form: FormGroup;
  radioValue = 'Married';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formControl();
  }

  formControl() {
    this.customer1Form = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      nic: ['', [Validators.required]],
      civil: ['', [Validators.required]]
    });

    this.customer2Form = this.fb.group({
      address: ['', [Validators.required]],
      postal: ['', [Validators.required]],
      town: ['', [Validators.required]],
      district: ['', [Validators.required]],
    });

    this.customer3Form = this.fb.group({
      land: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

  }
}

  //submitForm() {
// need to create laravel backend before write this code(insert part)
  // }

  //resetForm(e: MouseEvent): void {
    //this.customerForm.reset();
  //}

//}
