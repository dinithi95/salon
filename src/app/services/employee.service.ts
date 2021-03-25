import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Employee} from "../employee/Employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient
  ) {
  }

  getAllEmployees(): any {
    return this.http.get<Employee[]>('http://localhost:8000/api/employee');
  }

  delete(id: any) {
    return this.http.delete<Employee[]>(`http://localhost:8000/api/employee/${id}`);
  }
}
