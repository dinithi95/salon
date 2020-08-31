import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  purchaseForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formControl();
  }

  formControl() {
    this.purchaseForm = this.fb.group({
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
      gender: ['', [Validators.required]]
    });
  }

  submitForm() {
// need to create laravel backend before write this code(insert part)
  }

  resetForm(e: MouseEvent): void {
    this.purchaseForm.reset();
  }



}
