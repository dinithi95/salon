import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from "../service/Service";

// interface service {
//   name: string;
//   price: string;
//   time:
// }

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  services: Service[] = [
    {
      id: '1',
      code: '0010',
      name: 'Layers',
      price: '1000.00',
      time: '30.00',
      subCategory: {
        code: '001',
        name: 'Cutting',
        category: {
          code: '001',
          name: 'Hair',
        }
      }
    },
    {
      id: '2',
      code: '0011',
      name: 'V shape',
      price: '1000.00',
      time: '30.00',
      subCategory: {
        code: '001',
        name: 'Cutting',
        category: {
          code: '001',
          name: 'Hair',
        }
      }
    },
    {
      id: '3',
      code: '0012',
      name: 'Short',
      price: '1000.00',
      time: '30.00',
      subCategory: {
        code: '001',
        name: 'Cutting',
        category: {
          code: '001',
          name: 'Hair',
        }
      }
    },
    {
      id: '4',
      code: '0010',
      name: 'Black',
      price: '2000.00',
      time: '30.00',
      subCategory: {
        code: '002',
        name: 'Coloring',
        category: {
          code: '001',
          name: 'Hair',
        }
      }
    },
    {
      id: '5',
      code: '0011',
      name: 'Brown',
      price: '3000.00',
      time: '30.00',
      subCategory: {
        code: '002',
        name: 'Coloring',
        category: {
          code: '001',
          name: 'Hair',
        }
      }
    },
    {
      id: '6',
      code: '0013',
      name: 'Platinum',
      price: '300000.00',
      time: '600.00',
      subCategory: {
        code: '001',
        name: 'Dressing',
        category: {
          code: '001',
          name: 'Bridal',
        }
      }
    },
    {
      id: '7',
      code: '0014',
      name: 'Gold',
      price: '200000.00',
      time: '600.00',
      subCategory: {
        code: '001',
        name: 'Dressing',
        category: {
          code: '001',
          name: 'Bridal',
        }
      }
    },
    {
      id: '8',
      code: '0015',
      name: 'Silver',
      price: '100000.00',
      time: '600.00',
      subCategory: {
        code: '001',
        name: 'Dressing',
        category: {
          code: '001',
          name: 'Bridal',
        }
      }
    },
  ]
  appointmentForm: FormGroup;
  hair: Service[] = [];
  bridal: Service[] = [];
  beauty: Service[] = [];
  checkedServices: Service[] = [];
  current = 0;
  index = 'Basic Details';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formControl();
    this.services.map((service) => {
      if (service.subCategory.category.name === 'Hair') {
        this.hair.push(service);
      }
      if (service.subCategory.category.name === 'Bridal') {
        this.bridal.push(service);
      }
      if (service.subCategory.category.name === 'Beauty') {
        this.beauty.push(service);
      }
    });
  }


  formControl() {
    this.appointmentForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      date: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postal: ['', [Validators.required]],
      town: ['', [Validators.required]],
      district: ['', [Validators.required]],
      nic: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

  }


  updateCheckedSet(service: Service, checked: boolean): void {
    if (checked) {
      this.checkedServices.push(service);
    } else {
      let index = this.checkedServices.indexOf(service);
      if (index !== -1) {
        this.checkedServices.splice(index, 1);
      }
    }
  }

  onItemChecked(service: Service, checked: boolean): void {
    this.updateCheckedSet(service, checked);
    // this.refreshCheckedStatus();
    console.log(this.checkedServices);
  }

  // refreshCheckedStatus(): void {
  //   this.checked = this.listOfCurrentPageData.every(item => this.checkedServices.indexOf(item));
  //   this.indeterminate = this.listOfCurrentPageData.some(item => this.checkedServices.indexOf(item)) && !this.checked;
  // }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }

}
