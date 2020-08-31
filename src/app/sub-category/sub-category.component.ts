import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  subCategoryForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formControl();
  }

  formControl() {
    this.subCategoryForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      catname: ['', [Validators.required]],
      sub: ['', [Validators.required]]
    });
  }



  submitForm() {
// need to create laravel backend before write this code(insert part)
  }

  resetForm(e: MouseEvent): void {
    this.subCategoryForm.reset();
  }
}
