import { PurchaseOrder } from './../purchase/PurchaseOrder';
import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subcategory} from "../sub-category/SubCategory";
import {NzNotificationService} from "ng-zorro-antd";
import {HttpClient} from "@angular/common/http";
import {ItemService} from "../services/item.service";
import {Item} from "../item/Item";
import {SupplierService} from "../services/supplier.service";
import {Supplier} from "../supplier/Supplier";
import {PurchaseService} from "../services/purchase.service";
import {GrnService} from "../services/grn.service";
import {Grn} from "./Grn";

@Component({
  selector: 'app-grn',
  templateUrl: './grn.component.html',
  styleUrls: ['./grn.component.css']
})
export class GrnComponent implements OnInit {
  grnForm: FormGroup;
  items: Item[] = [];
  suppliers: Supplier[] = [];
  GRNs: Grn[] = [];
  displayGRNs: Grn[] = [];
  purchaseOrders: PurchaseOrder[] = [];
  totalPrice = 0;
  code = '';
  visible = false;
  searchValue = '';
  isVisible = false;
  selectedPO: PurchaseOrder;
  selectedGRN: Grn;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private itemService: ItemService,
              private supplierService: SupplierService,
              private purchaseService: PurchaseService,
              private grnService: GrnService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.formControl();
    this.getAllSuppliers();
    this.getAllPO();
  }

  formControl() {
    this.grnForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      supplier_id: ['', [Validators.required]],
      date: ['', [Validators.required]],
      price: ['', [Validators.required]],
      status: ['', [Validators.required]],
      items: this.fb.array([this.setItems()])
    });
  }

  getAllPO() {
    this.purchaseService.getAllPO().subscribe(value => {
      this.purchaseOrders = value;
      this.generateCode();
    });
  }

  getItemsBySupplier(id) {
    this.itemService.getItemBySupplier(id).subscribe(value => {
      this.items = value;
    });
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(value => {
      this.suppliers = value;
    });
  }

  calculateTotal(){
    this.totalPrice = 0;
    const lines = this.grnForm.get('items').value;
    for (let line of lines) {
      let item = this.items.find(i => i.id === line.item_id);
      let lineTotal = parseFloat(item.price) * parseInt(line.quantity, 10);
      this.totalPrice = this.totalPrice + lineTotal;
    }
    this.grnForm.patchValue({price: this.totalPrice});
  }

  // Auto generate next code(employee code)
  generateCode() {
    if (this.purchaseOrders.length > 0) {
      const lastCode = parseInt(this.purchaseOrders[0].code, 10);
      const nextCode = lastCode + 1;
      this.code = nextCode.toString();
    } else {
      this.code = '1000';
    }
    this.grnForm.patchValue({code: this.code});
  }

  submitForm() {
    for (const key in this.grnForm.controls) {
      this.grnForm.controls[key].markAsDirty();
      this.grnForm.controls[key].updateValueAndValidity();
    }

    this.http.post(`http://localhost:8000/api/grn`, this.grnForm.value).subscribe(
      res => {
        this.resetForm();
        this.showNotification('success', 'Service Details Saved Successfully', '');
        this.getAllPO();
      },
      err => {
        for (const e in err.error.errors) {
          this.showNotification('error', err.error.errors[e], '');
        }
      });

  }

  resetForm(): void {
    this.grnForm.reset();
    this.generateCode();
  }

  // Create message
  showNotification(type: string, message: string, content: string): void {
    this.notification.create(type, message, content);
  }


  addItem() {
    const control = this.grnForm.controls.items as FormArray;
    control.push(
      this.fb.group({
        item_id: ['', ],
        quantity: ['', ],
      })
    );
  }

  setItems(): FormGroup {
    return this.fb.group({
      item_id: [''],
      quantity: [''],
    });
  }

  get itemsArray(): FormArray {
    return this.grnForm.get('items') as FormArray;
  }

  removeItem(index: number): void {
    this.itemsArray.removeAt(index);
    this.calculateTotal();
  }

  // Table search
  search(): void {
    this.visible = false;
    this.displayGRNs = this.GRNs.filter((item: Grn) => item.code.indexOf(this.searchValue) !== -1);
  }

// Table search reset(table search)
  resetSearch(): void {
    this.searchValue = '';
    this.search();
  }

  showModal(po: PurchaseOrder): void {
    this.selectedPO = po;
    this.isVisible = true;
    console.log(this.selectedPO)
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
