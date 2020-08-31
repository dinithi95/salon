import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formControl();
  }

  formControl() {
    this.supplierForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nic: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      fax: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  submitForm() {
// need to create laravel backend before write this code(insert part)
  }

  resetForm(e: MouseEvent): void {
    this.supplierForm.reset();
  }
}
