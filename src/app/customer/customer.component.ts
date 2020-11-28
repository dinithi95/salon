import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Customer} from "./Customer";
import {CustomerService} from "../services/customer.service";
import {NzNotificationService} from "ng-zorro-antd";
import {differenceInCalendarDays, differenceInCalendarYears} from "date-fns";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customers: Customer[] = [];
  radioValue = 'Married';
   displayCustomers = [...this.customers];
  searchValue = '';
  visible = false;
  code = '';

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private customerService: CustomerService,
              private notification: NzNotificationService) {}
  

  ngOnInit(): void {
    this.formControl();
    this.getAllCustomers();
   
  }

  formControl() {
    this.customerForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(([. ][a-zA-Z ])?[a-zA-Z]*)*$')]],
      birth: ['', [Validators.required]],
      nic: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postal: ['', [Validators.required]],
      town: ['', [Validators.required]],
      district: ['', [Validators.required]],
      land: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      civilStatus: ['', [Validators.required]],
    });

  }

  // Insert and Update Customer
  submitForm() {
    for (const key in this.customerForm.controls) {
      this.customerForm.controls[key].markAsDirty();
      this.customerForm.controls[key].updateValueAndValidity();
    }

    this.http.put(`http://localhost:8000/api/customer`, this.customerForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Customer Details Updated Successfully', '');
        this.getAllCustomers();
      },
      err => {
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });
  }

  // Create message
  showNotification(type: string, message: string, content: string): void {
    this.notification.create(type, message, content);
  }

  // Get Customer details from backend(form eka load wenakota enna employess penna one )
  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(value => {
      this.customers = value;
      this.displayCustomers = value;
      this.generateCode();
    });
  }

  // Form reset(loku form eka reset)
  resetForm(): void {
    this.customerForm.reset();
  }


  // Table search
  search(): void {
    this.visible = false;
    this.displayCustomers = this.customers.filter((item: Customer) => item.name.indexOf(this.searchValue) !== -1);
  }
  // Table search reset(table search)
  resetSearch(): void {
    this.searchValue = '';
    this.search();
  }

  
// Fill values to form for update customer(edit ekata click kalama exsisting data ena eka )
  fillForm(customer: Customer) {
    this.customerForm.patchValue({//fill = patch
      id: customer.id,
      name: customer.name,
      email: customer.email,
      code: customer.code,
      address: customer.address,
      nic: customer.nic,
      civilStatus: customer.civilStatus,
      birth: customer.birth,
      land: customer.land,
      mobile: customer.mobile,
      district: customer.district,
      postal: customer.postal,
      town: customer.town,
    });
  }

  // Auto generate next code(customer code)
  generateCode() {
    if (this.customers.length > 0) {
      const lastCode = parseInt(this.customers[this.customers.length - 1].code, 10);
      const nextCode = lastCode + 1;
      this.code = nextCode.toString();
    } else {
      this.code = '1000';
    }
    this.customerForm.patchValue({code: this.code});
  }


  // Disable invalid date range(18+)
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > -1;
  }


  //submitForm() {
// need to create laravel backend before write this code(insert part)
  // }

  //resetForm(e: MouseEvent): void {
  //this.customerForm.reset();
  //}

}

