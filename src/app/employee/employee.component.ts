import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Employee} from "./Employee";
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
  update = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private employeeService: EmployeeService,
              private notification: NzNotificationService) {
  }

// Call on page loading(page eka load wena kota 1st wada karanne meka)
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

// Insert Employee
  submitForm() {
    for (const key in this.employeeForm.controls) {
      this.employeeForm.controls[key].markAsDirty();
      this.employeeForm.controls[key].updateValueAndValidity();
    }

    this.http.post(`http://localhost:8000/api/employee`, this.employeeForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Employee Details Saved Successfully', '');
        this.getAllEmployees();
      },
      err => {
        console.log(err, "eeeeeeee");
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });
  }

  // Update Employee
  updateEmployee() {
    for (const key in this.employeeForm.controls) {
      this.employeeForm.controls[key].markAsDirty();
      this.employeeForm.controls[key].updateValueAndValidity();
    }

    this.http.put(`http://localhost:8000/api/employee`, this.employeeForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Employee Details Updated Successfully', '');
        this.getAllEmployees();
        this.update = false;
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

// Get Employee details from backend(form eka load wenakota enna employess penna one )
  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(value => {
      this.employees = value;
      this.displayEmployees = value;
      this.generateCode();
    });
  }

// Form reset(loku form eka reset)
  resetForm(): void {
    this.employeeForm.reset();
    this.update = false;
    this.generateCode();
  }

// Table search
  search(): void {
    this.visible = false;
    this.displayEmployees = this.employees.filter((item: Employee) => item.name.indexOf(this.searchValue) !== -1);
  }

// Table search reset(table search)
  resetSearch(): void {
    this.searchValue = '';
    this.search();
  }

// Fill values to form for update employee(edit ekata click kalama exsisting data ena eka )
  fillForm(employee: Employee) {
    this.employeeForm.patchValue({//fill = patch
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
    this.update = true;
  }

// Auto generate next code(employee code)
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


  //employee kyna array eken 1 ganane widiha
  //employees[0]
  //len 0 1 2 3
  // index 0 1 2

// Disable invalid date range(18+)
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > -6575;
  }

  delete(id: any) {
    this.employeeService.delete(id).subscribe(res => {
      this.showNotification('success', 'Successfully Deleted', '');
      this.getAllEmployees();
    }, err => {
      console.log(err);
      this.showNotification('error', 'Error', '');
    });
  }
}
