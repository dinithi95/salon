import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {User} from "./User";
import {UserService} from "../services/user.service";
import {Role} from "./Role";

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

  constructor(private fb: FormBuilder,
              private http: HttpClient,
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
      roles: ['', this.fb.array([]), [Validators.required]]
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
    const selectedRoles: Role = this.userForm.get('roles').value;
    const insertRoles = [];

    for (const r in selectedRoles) {
      insertRoles.push(r.id);
    }
    console.log(insertRoles);
    this.http.put(`http://localhost:8000/api/user`, this.userForm.value).subscribe(value => {
      this.getAllUsers();
    });
  }

  resetForm(e: MouseEvent): void {
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

  fillForm(data: User) {

  }

}
