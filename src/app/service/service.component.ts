import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  serviceForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formControl();
  }

  formControl() {
    this.serviceForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      catname: ['', [Validators.required]],
      subname: ['', [Validators.required]],
      servicecode: ['', [Validators.required]],
      servicename: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    });
  }

 // submitForm() {
// need to create laravel backend before write this code(insert part)
 // }

  resetForm(e: MouseEvent): void {
    this.serviceForm.reset();
  }
}

