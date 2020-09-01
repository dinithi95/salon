import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions} from 'ng-zorro-antd';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointment1Form: FormGroup;
  appointment2Form: FormGroup;
  appointment3Form: FormGroup;
  radioValue = 'Married';
  @ViewChild('nzTreeComponent', {static: false}) nzTreeComponent!: NzTreeComponent;
  defaultCheckedKeys = ['10020'];
  defaultSelectedKeys = ['10010'];
  defaultExpandedKeys = ['100', '1001'];

  nodes: NzTreeNodeOptions[] = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          disabled: true,
          children: [
            {title: 'leaf 1-0-0', key: '10010', disableCheckbox: true, isLeaf: true},
            {title: 'leaf 1-0-1', key: '10011', isLeaf: true}
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [
            {title: 'leaf 1-1-0', key: '10020', isLeaf: true},
            {title: 'leaf 1-1-1', key: '10021', isLeaf: true}
          ]
        }
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formControl();
  }



  formControl() {
    this.appointment1Form = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      date: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      cost: ['', [Validators.required]]
    });

    this.appointment2Form = this.fb.group({
      address: ['', [Validators.required]],
      postal: ['', [Validators.required]],
      town: ['', [Validators.required]],
      district: ['', [Validators.required]],
    });

    this.appointment3Form = this.fb.group({
      nic: ['', [Validators.required]],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

  }


  nzClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  // nzSelectedKeys change
  // nzSelect(keys: string[]): void {
  //   console.log(keys, this.nzTreeComponent.getSelectedNodeList());
  // }

  ngAfterViewInit(): void {
    console.log(this.nzTreeComponent.getTreeNodeByKey('10011'));
    // use tree methods
    console.log(
      this.nzTreeComponent.getTreeNodes(),
      this.nzTreeComponent.getCheckedNodeList(),
      this.nzTreeComponent.getSelectedNodeList(),
      this.nzTreeComponent.getExpandedNodeList()
    );
  }


}
