import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {NzNotificationService} from "ng-zorro-antd";
import {CategoryService} from "../services/category.service";
import {SubcategoryService} from "../services/subcategory.service";
import {ServiceService} from "../services/service.service";
import {Category} from "../category/Category";
import {Subcategory} from "../sub-category/Subcategory";
import {Service} from "./Service";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  serviceForm: FormGroup;
  categories: Category[];
  subcategories: Subcategory[];
  services: Service[];
  displayServices: Service[];
  code = "";
  update = false;
  visible = false;
  searchValue = '';


  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private categoryService: CategoryService,
              private subcategoryService: SubcategoryService,
              private serviceService: ServiceService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.formControl();
    this.getCategory();
    this.getAllServices();
  }

  formControl() {
    this.serviceForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subcategory_id: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  getCategory() {
    this.categoryService.getAllCategory().subscribe(value => {
      console.log("cat........", value);
      this.categories = value;
    });
  }

  getSubcategoryByCategory(id) {
    this.subcategoryService.getSubcategoryByCategory(id.id).subscribe(value => {
      this.subcategories = value;
    });
  }

  getAllServices() {
    this.serviceService.getAllService().subscribe(value => {
      console.log(value);
      this.services = value;
      this.displayServices = value;
      this.generateCode();
    })
  }

  // Insert Employee
  submitForm() {
    for (const key in this.serviceForm.controls) {
      this.serviceForm.controls[key].markAsDirty();
      this.serviceForm.controls[key].updateValueAndValidity();
    }

    const sub: Subcategory = this.serviceForm.get('subcategory_id').value;
    console.log("vvvaaaaaa", sub);
    this.serviceForm.controls.subcategory_id.setValue(sub.id);

    this.http.post(`http://localhost:8000/api/service`, this.serviceForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Service Details Saved Successfully', '');
        this.getAllServices();
      },
      err => {
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });
  }

  // Update Employee
  updateEmployee() {
    for (const key in this.serviceForm.controls) {
      this.serviceForm.controls[key].markAsDirty();
      this.serviceForm.controls[key].updateValueAndValidity();
    }

    const sub: Subcategory = this.serviceForm.get('subcategory_id').value;
    console.log("vvvaaaaaa", sub);
    this.serviceForm.controls.subcategory_id.setValue(sub.id);

    this.http.put(`http://localhost:8000/api/service`, this.serviceForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Service Details Updated Successfully', '');
        this.getAllServices();
        this.update = false;
      },
      err => {
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });
  }

// Form reset(loku form eka reset)
  resetForm(): void {
    this.serviceForm.reset();
    this.update = false;
    this.generateCode();
  }


// Fill values to form for update employee(edit ekata click kalama exsisting data ena eka )
  fillForm(service: Service) {
    this.serviceForm.patchValue({//fill = patch
      id: service.id,
      name: service.name,
      code: service.code,
      category: service.subcategory.category,
      subcategory_id: service.subcategory,
      price: service.price,
      duration: service.duration,
      status: service.status,
    });
    this.update = true;
  }

  // Create message
  showNotification(type: string, message: string, content: string): void {
    this.notification.create(type, message, content);
  }

  // Auto generate next code(employee code)
  generateCode() {
    if (this.services.length > 0) {
      const lastCode = parseInt(this.services[this.services.length - 1].code, 10);
      const nextCode = lastCode + 1;
      this.code = nextCode.toString();
    } else {
      this.code = '1000';
    }
    this.serviceForm.patchValue({code: this.code});
  }

  // Table search
  search(): void {
    this.visible = false;
    this.displayServices = this.services.filter((item: Service) => item.name.indexOf(this.searchValue) !== -1);
  }

// Table search reset(table search)
  resetSearch(): void {
    this.searchValue = '';
    this.search();
  }

// Compare select
  compares = (o1: any, o2: any) => o1 && o2 ? o1 === o2.id : o1 === o2;
  compare = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;
  compareString = (o1: any, o2: any) => o1 === o2;

}

