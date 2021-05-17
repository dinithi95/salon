import { CategoryService } from './../services/category.service';
import { Category } from './../category/Category';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Subcategory} from "./Subcategory";
import {SubcategoryService} from "../services/subcategory.service";
import {NzNotificationService} from "ng-zorro-antd";


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})

export class SubCategoryComponent implements OnInit {
  subCategoryForm: FormGroup;
  subcategories: Subcategory[] = [];
  displaySubcategories: Subcategory[] = [];
  searchValue = '';
  visible = false;
  update = false;
  categories: Category[] = [];


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.formControl();
    this.getAllSubcategories();
    this.getAllCategories()
  }

  formControl() {
    this.subCategoryForm = this.fb.group({
      id: null,
      category_id: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }



  submitForm() {
     for (const key in this.subCategoryForm.controls) {
      this.subCategoryForm.controls[key].markAsDirty();
      this.subCategoryForm.controls[key].updateValueAndValidity();
    }
    const cat: Category = this.subCategoryForm.get('category_id').value;
    console.log("vvvaaaaaa", cat);
    this.subCategoryForm.controls.category_id.setValue(cat.id);

    this.http.post(`http://localhost:8000/api/subcategory`, this.subCategoryForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Subcategory Details Saved Successfully', '');
        this.getAllSubcategories();
      },
      err => {
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });
// need to create laravel backend before write this code(insert part)
  }

  updateSubcategory(){
    for (const key in this.subCategoryForm.controls) {
      this.subCategoryForm.controls[key].markAsDirty();
      this.subCategoryForm.controls[key].updateValueAndValidity();
    }
    const cat: Category = this.subCategoryForm.get('category_id').value;
    console.log("vvvaaaaaa", cat);
    this.subCategoryForm.controls.category_id.setValue(cat.id);

    this.http.put(`http://localhost:8000/api/subcategory`, this.subCategoryForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'SUbcategory Details Updated Successfully', '');
        this.getAllSubcategories();
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
  getAllSubcategories() {
    this.subcategoryService.getAllSubcategory().subscribe(value => {
      this.subcategories = value;
      this.displaySubcategories = value;
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(value => {
      this.categories = value;
    });
  }


  resetForm(): void {
    this.subCategoryForm.reset();
     this.update = false;
  }

   // Table search
  search(): void {
    this.visible = false;
    this.displaySubcategories = this.subcategories.filter((item: Subcategory) => item.name.indexOf(this.searchValue) !== -1);
  }

  // Table search reset(table search)
  resetSearch(): void {
    this.searchValue = '';
    this.search();
  }

  // Fill values to form for update employee(edit ekata click kalama exsisting data ena eka )
  fillForm(subcategory: Subcategory) {
    this.subCategoryForm.patchValue({//fill = patch
      id: subcategory.id,
      name: subcategory.name,
      category_id: subcategory.category
    });
    this.update = true;
  }

compares = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;


}
