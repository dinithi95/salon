import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Supplier} from "./Supplier";
import {SupplierService} from "../services/supplier.service";
import {NzNotificationService} from "ng-zorro-antd";


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierForm: FormGroup;
  suppliers: Supplier[] = [];
  displaySuppliers: Supplier[] = [];
  searchValue = '';
  visible = false;
  code = '';
  update = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private supplierService: SupplierService,
              private notification: NzNotificationService) {
  }

// Call on page loading(page eka load wena kota 1st wada karanne meka)
  ngOnInit(): void {
    this.formControl();
    this.getAllSuppliers();
    this.generateCode();
  }

// Create Form
  formControl() {
    this.supplierForm = this.fb.group({
      id: null,
      name: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+(([. ][a-zA-Z ])?[a-zA-Z]*)*$')]],
      company: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+(([. ][a-zA-Z ])?[a-zA-Z]*)*$')]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      code: null,
      contact: ['', [Validators.required, Validators.pattern('0[0-9]{9}')]],
      address: ['', [Validators.required]],
      fax:['', [Validators.required, Validators.pattern('0[0-9]{9}')]],
      description:['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

// Insert 
  submitForm() {
    for (const key in this.supplierForm.controls) {
      this.supplierForm.controls[key].markAsDirty();
      this.supplierForm.controls[key].updateValueAndValidity();
    }

    this.http.post(`http://localhost:8000/api/supplier`, this.supplierForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Supplier Details Saved Successfully', '');
        this.getAllSuppliers();
      },
      err => {
        console.log(err, "eeeeeeee");
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });
  }

  // Update 
  updateSupplier() {
    for (const key in this.supplierForm.controls) {
      this.supplierForm.controls[key].markAsDirty();
      this.supplierForm.controls[key].updateValueAndValidity();
    }

    this.http.put(`http://localhost:8000/api/supplier`, this.supplierForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Supplier Details Updated Successfully', '');
        this.getAllSuppliers();
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

// Get Supplier details from backend(form eka load wenakota enna employess penna one )
  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(value => {
      this.suppliers = value;
      this.displaySuppliers = value;
      this.generateCode();
    });
  }

// Form reset(loku form eka reset)
  resetForm(): void {
    this.supplierForm.reset();
    this.update = false;
    this.generateCode();
  }

// Table search
  search(): void {
    this.visible = false;
    this.displaySuppliers = this.suppliers.filter((item: Supplier) => item.name.indexOf(this.searchValue) !== -1);
  }

// Table search reset(table search)
  resetSearch(): void {
    this.searchValue = '';
    this.search();
  }

// Fill values to form for update supplier(edit ekata click kalama exsisting data ena eka )
  fillForm(supplier: Supplier) {
    this.supplierForm.patchValue({//fill = patch
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      code: supplier.code,
      fax: supplier.fax,
      contact: supplier.contact,
      address: supplier.address,
      status: supplier.status,
      company: supplier.company,
      description:supplier.description,
    });
    this.update = true;
  }

// Auto generate next code(supplier code)
  generateCode() {
    if (this.suppliers.length > 0) {
      const lastCode = parseInt(this.suppliers[this.suppliers.length - 1].code, 10);
      const nextCode = lastCode + 1;
      this.code = nextCode.toString();
    } else {
      this.code = '1000';
    }
    this.supplierForm.patchValue({code: this.code});
  }


  delete(id: any) {
    this.supplierService.delete(id).subscribe(res => {
      this.showNotification('success', 'Successfully Deleted', '');
      this.getAllSuppliers();
    }, err => {
      console.log(err);
      this.showNotification('error', 'Error', 'Cannot Delete Supplier');
    });
  }
}
