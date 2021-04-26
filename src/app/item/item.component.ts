import {SupplierService } from './../services/supplier.service';
import { Supplier } from './../supplier/Supplier';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Item} from "./Item";
import {ItemService} from "../services/item.service";
import {NzNotificationService} from "ng-zorro-antd";


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  itemForm: FormGroup;
  items: Item[] = [];
  displayItems: Item[] = [];
  searchValue = '';
  visible = false;
  update = false;
  suppliers: Supplier[] = [];
  code = '';


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private itemService: ItemService,
    private supplierService: SupplierService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.formControl();
    this.getAllItems();
    this.getAllSuppliers()
  }

  formControl() {
    this.itemForm = this.fb.group({
      id: null,
      code: null,
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(([. ][a-zA-Z ])?[a-zA-Z]*)*$')]],
      brand: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(([. ][a-zA-Z ])?[a-zA-Z]*)*$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]{1,}$')]],
      type: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('[0-9]+.[0-9]{2}$')]],
      status: ['', [Validators.required]],
      supplier_id: ['', [Validators.required]],

    });
  }



  submitForm() {
     for (const key in this.itemForm.controls) {
      this.itemForm.controls[key].markAsDirty();
      this.itemForm.controls[key].updateValueAndValidity();
    }
    const sup: Supplier = this.itemForm.get('supplier_id').value;
    this.itemForm.controls.supplier_id.setValue(sup.id);

    this.http.post(`http://localhost:8000/api/item`, this.itemForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Item Details Saved Successfully', '');
        this.getAllItems();
      },
      err => {
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });
// need to create laravel backend before write this code(insert part)
  }

  updateItem(){
    for (const key in this.itemForm.controls) {
      this.itemForm.controls[key].markAsDirty();
      this.itemForm.controls[key].updateValueAndValidity();
    }

    const sup: Supplier = this.itemForm.get('supplier_id').value;
    this.itemForm.controls.supplier_id.setValue(sup.id);

    this.http.put(`http://localhost:8000/api/item`, this.itemForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Item Details Updated Successfully', '');
        this.getAllItems();
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
  getAllItems() {
    this.itemService.getAllItem().subscribe(value => {
      this.items = value;
      this.displayItems = value;
      this.generateCode();
    });
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(value => {
      this.suppliers = value;
    });
  }


  resetForm(): void {
    this.itemForm.reset();
     this.update = false;
  }

   // Table search
  search(): void {
    this.visible = false;
    this.displayItems = this.items.filter((item: Item) => item.name.indexOf(this.searchValue) !== -1);
  }

  // Table search reset(table search)
  resetSearch(): void {
    this.searchValue = '';
    this.search();
  }

  // Fill values to form for update employee(edit ekata click kalama exsisting data ena eka )
  fillForm(item: Item) {
    this.itemForm.patchValue({//fill = patch
      id: item.id,
      name: item.name,
      code: item.code,
      price: item.price,
      type: item.type,
      quantity: item.quantity,
      status: item.status,
      supplier_id: item.supplier,
      brand: item.brand
    });
    this.update = true;
  }

   generateCode() {
    if (this.items.length > 0) {
      const lastCode = parseInt(this.items[this.items.length - 1].code, 10);
      const nextCode = lastCode + 1;
      this.code = nextCode.toString();
    } else {
      this.code = '1000';
    }
    this.itemForm.patchValue({code: this.code});
  }

compare = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2; //obj


 delete(id: any) {
    this.itemService.delete(id).subscribe(res => {
      this.showNotification('success', 'Successfully Deleted', '');
      this.getAllItems();
    }, err => {
      console.log(err);
      this.showNotification('error', 'Error', 'Cannot Delete Items');
    });
  }

}
