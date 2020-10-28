import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authServise: AuthService,
              private nzMessageService: NzMessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.formControl();
  }

  formControl(){
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.controls.email.value == '' || this.validateForm.controls.password.value == '') {
      this.nzMessageService.error('Insert Username and Password!');
    } else if (this.validateForm.valid) {
      this.authServise.login(this.validateForm.value);
    } else {
      this.nzMessageService.error('Invalid Username or Password!');
    }
  }

}
