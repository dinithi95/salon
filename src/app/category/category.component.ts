import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Category } from './Category';
import { CategoryService } from '../services/category.service';
import {HttpClient} from "@angular/common/http";
import {NzNotificationService} from "ng-zorro-antd";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories: Category[] = [];
  displayCategories = [...this.categories];
  searchValue = '';
  visible = false;
  code = '';
  update = false;

  constructor(private fb: FormBuilder,
             private http: HttpClient,
              private categoryService: CategoryService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.formControl();
    this.getAllCategories();
  }

  formControl() {
    this.categoryForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

//Insert category
  submitForm() { for (const key in this.categoryForm.controls) {
      this.categoryForm.controls[key].markAsDirty();
      this.categoryForm.controls[key].updateValueAndValidity();
    }

    this.http.post(`http://localhost:8000/api/category`, this.categoryForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Category Details Saved Successfully', '');
        this.getAllCategories();
      },
      err => {
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });
// need to create laravel backend before write this code(insert part)
  }

// Update Category
  updateCategory() {
    for (const key in this.categoryForm.controls) {
      this.categoryForm.controls[key].markAsDirty();
      this.categoryForm.controls[key].updateValueAndValidity();
    }

    this.http.put(`http://localhost:8000/api/category`, this.categoryForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Category Details Updated Successfully', '');
        this.getAllCategories();
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
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(value => {
      this.categories = value;
      this.displayCategories = value;
      this.generateCode();
    });
  }


  // Form reset(loku form eka reset)
  resetForm(): void {
    this.categoryForm.reset();
    this.update = false;
    this.generateCode();
  }


  // Table search
  search(): void {
    this.visible = false;
    this.displayCategories = this.categories.filter((item: Category) => item.name.indexOf(this.searchValue) !== -1);
  }


  // Table search reset(table search)
  resetSearch(): void {
    this.searchValue = '';
    this.search();
  }


  // Fill values to form for update employee(edit ekata click kalama exsisting data ena eka )
  fillForm(employee: Category) {
    this.categoryForm.patchValue({//fill = patch
      id: employee.id,
      name: employee.name,
      code: employee.code,
    });
    this.update = true;
  }

  // Auto generate next code(employee code)
  generateCode() {
    if (this.categories.length > 0) {
      const lastCode = parseInt(this.categories[this.categories.length - 1].code, 10);
      const nextCode = lastCode + 1;
      this.code = nextCode.toString();
    } else {
      this.code = '1000';
    }
    this.categoryForm.patchValue({code: this.code});
  }


 
}

