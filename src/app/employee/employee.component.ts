import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  radioValue = 'Married';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formControl();
  }

  formControl() {
    this.employeeForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nic: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      civil: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  submitForm() {
// need to create laravel backend before write this code(insert part)
  }

  resetForm(e: MouseEvent): void {
    this.employeeForm.reset();
  }
}
