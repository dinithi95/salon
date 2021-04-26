import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subcategory} from "../sub-category/SubCategory";
import {NzNotificationService} from "ng-zorro-antd";
import {HttpClient} from "@angular/common/http";
import {ItemService} from "../services/item.service";
import {Item} from "../item/Item";
import {SupplierService} from "../services/supplier.service";
import {Supplier} from "../supplier/Supplier";
import {PurchaseOrder} from "./PurchaseOrder";
import {PurchaseService} from "../services/purchase.service";
import {Service} from "../service/Service";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  purchaseForm: FormGroup;
  items: Item[] = [];
  suppliers: Supplier[] = [];
  purchaseOrders: PurchaseOrder[] = [];
  displayPurchaseOrders: PurchaseOrder[] = [];
  totalPrice = 0;
  code = '';
  visible = false;
  searchValue = '';
  isVisible = false;
  selectedPO: PurchaseOrder;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private itemService: ItemService,
              private supplierService: SupplierService,
              private purchaseService: PurchaseService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.formControl();
    this.getAllSuppliers();
    this.getAllPO();
  }

  formControl() {
    this.purchaseForm = this.fb.group({
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
      this.displayPurchaseOrders = value;
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
    const lines = this.purchaseForm.get('items').value;
    for (let line of lines) {
      let item = this.items.find(i => i.id === line.item_id);
      let lineTotal = parseFloat(item.price) * parseInt(line.quantity, 10);
      this.totalPrice = this.totalPrice + lineTotal;
    }
    this.purchaseForm.patchValue({price: this.totalPrice});
  }

  // Auto generate next code(employee code)
  generateCode() {
    if (this.purchaseOrders.length > 0) {
      const lastCode = parseInt(this.purchaseOrders[this.purchaseOrders.length - 1].code, 10);
      const nextCode = lastCode + 1;
      this.code = nextCode.toString();
    } else {
      this.code = '1000';
    }
    this.purchaseForm.patchValue({code: this.code});
  }

  submitForm() {
    for (const key in this.purchaseForm.controls) {
      this.purchaseForm.controls[key].markAsDirty();
      this.purchaseForm.controls[key].updateValueAndValidity();
    }

    this.http.post(`http://localhost:8000/api/purchaseOrder`, this.purchaseForm.value).subscribe(
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
    this.purchaseForm.reset();
  }

  // Create message
  showNotification(type: string, message: string, content: string): void {
    this.notification.create(type, message, content);
  }


  addItem() {
    const control = this.purchaseForm.controls.items as FormArray;
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
    return this.purchaseForm.get('items') as FormArray;
  }

  removeItem(index: number): void {
    this.itemsArray.removeAt(index);
    this.calculateTotal();
  }

  // Table search
  search(): void {
    this.visible = false;
    this.displayPurchaseOrders = this.purchaseOrders.filter((item: PurchaseOrder) => item.code.indexOf(this.searchValue) !== -1);
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
