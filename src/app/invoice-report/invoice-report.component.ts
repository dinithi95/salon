import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Invoice} from "../invoice/Invoice";
import {InvoiceService} from "../services/invoice.service";

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css']
})
export class InvoiceReportComponent implements OnInit {
  form: FormGroup;
  data: Invoice[] = [];
  displayData: Invoice[] = [];
  today = null;

  constructor(private fb: FormBuilder,
              private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.formControl();
    this.geAllInvoices();
    this.today = new Date().toISOString();
  }

  formControl() {
    this.form = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      status: [''],
    });
  }

  geAllInvoices() {
    this.invoiceService.getAllInvoice().subscribe(value => {
      this.data = value;
    });
  }

  resetForm(): void {
    this.form.reset();
    this.displayData = [];
  }

  search() {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }
    if (this.form.valid) {

      this.displayData = [];
      const from = new Date(this.form.controls.from.value);
      const to = new Date(this.form.controls.to.value);
      const status = this.form.controls.status.value;

      this.data.map(invoice => {
        const date = new Date(invoice.date);
        if ((from < date && date < to) && (status == '' || status == invoice.status)) {
          this.displayData.push(invoice);
        }
      });
    }
  }

}
