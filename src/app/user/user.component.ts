import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formControl();
  }

  formControl() {
    this.userForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nic: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }

  submitForm() {
// need to create laravel backend before write this code(insert part)
  }

  resetForm(e: MouseEvent): void {
    this.userForm.reset();
  }

}
