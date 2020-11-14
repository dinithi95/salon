import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Employee} from "./Employee";
import {User} from "../user/User";
import {EmployeeService} from "../services/employee.service";
import {NzNotificationService} from "ng-zorro-antd";
import {differenceInCalendarDays, differenceInCalendarYears} from "date-fns";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employees: Employee[] = [];
  displayEmployees = [...this.employees];
  searchValue = '';
  visible = false;
  code = '';

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private employeeService: EmployeeService,
              private notification: NzNotificationService) {
  }

// Call on page loading
  ngOnInit(): void {
    this.formControl();
    this.getAllEmployees();
  }

// Create Form
  formControl() {
    this.employeeForm = this.fb.group({
      id: null,
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      code: null,
      gender: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nic: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

// Insert and Update Employee
  submitForm() {
    for (const key in this.employeeForm.controls) {
      this.employeeForm.controls[key].markAsDirty();
      this.employeeForm.controls[key].updateValueAndValidity();
    }

    this.http.put(`http://localhost:8000/api/employee`, this.employeeForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Employee Details Updated Successfully', '');
        this.getAllEmployees();
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

// Get Employee details from backend
  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(value => {
      this.employees = value;
      this.displayEmployees = value;
      this.generateCode();
    });
  }

// Form reset
  resetForm(): void {
    this.employeeForm.reset();
  }

// Table search
  search(): void {
    this.visible = false;
    this.displayEmployees = this.employees.filter((item: Employee) => item.name.indexOf(this.searchValue) !== -1);
  }

// Table search reset
  resetSearch(): void {
    this.searchValue = '';
    this.search();
  }

// Fill values to form for update employee
  fillForm(employee: Employee) {
    this.employeeForm.patchValue({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      code: employee.code,
      gender: employee.gender,
      contact: employee.contact,
      address: employee.address,
      nic: employee.nic,
      civilStatus: employee.civilStatus,
      dob: employee.dob,
      designation: employee.designation,
      status: employee.status,
    });
  }

// Auto generate next code
  generateCode() {
    if (this.employees.length > 0) {
      const lastCode = parseInt(this.employees[this.employees.length - 1].code, 10);
      const nextCode = lastCode + 1;
      this.code = nextCode.toString();
    } else {
      this.code = '1000';
    }
    this.employeeForm.patchValue({code: this.code});
  }

// Disable invalid date range
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarYears(current, new Date()) > -18;
  }

}
