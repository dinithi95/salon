import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Employee} from "../employee/Employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,
              private router: Router
  ) {
  }

  getAllEmployees(): any {
    return this.http.get<Employee[]>('http://localhost:8000/api/employee');
  }

}
