import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {User} from "./User";
import {UserService} from "../services/user.service";
import {Role} from "./Role";
import {NzNotificationService} from "ng-zorro-antd";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  passwordVisible = false;
  searchValue = '';
  visible = false;
  users: User[] = [];
  roles: Role[] = [];
  displayUsers = [...this.users];
  checked = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private notification: NzNotificationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.formControl();
    this.getAllUsers();
    this.getAllRoles();
  }

  formControl() {
    this.userForm = this.fb.group({
      id: null,
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required, this.confirmationValidator]],
      roles: [[], [Validators.required]],
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(value => {
      this.users = value;
      this.displayUsers = value;
    });
  }

  getAllRoles() {
    this.userService.getAllRoles().subscribe(value => {
      console.log(value);
      this.roles = value;
    });
  }

  submitForm() {
    this.http.put(`http://localhost:8000/api/user`, this.userForm.value).subscribe(value => {
      this.showNotification('success', 'User details added successfully', '');
      this.getAllUsers();
      this.resetForm();
    }, err => {
      for (const e in err.error.errors) {
        this.showNotification('error', err.error.errors[e], '');
      }
    });
  }

  resetForm(): void {
    this.userForm.reset();
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.userForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  resetSearch(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.displayUsers = this.users.filter((item: User) => item.name.indexOf(this.searchValue) !== -1);
  }

  fillForm(user: User) {
    this.userForm.patchValue([{
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }])
  }

  showNotification(type: string, message: string, content: string): void {
    this.notification.create(type, message, content);
  }

}
