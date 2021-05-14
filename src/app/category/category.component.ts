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
      name: ['', [Validators.required]]
    });
  }

//Insert category
  submitForm() {
    for (const key in this.categoryForm.controls) {
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
    });
  }


  // Form reset(loku form eka reset)
  resetForm(): void {
    this.categoryForm.reset();
    this.update = false;
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
  fillForm(category: Category) {
    this.categoryForm.patchValue({//fill = patch
      id: category.id,
      name: category.name,
    });
    this.update = true;
  }



}

