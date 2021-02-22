import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../category/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAllCategories() {
    return this.http.get<Category[]>('http://localhost:8000/api/category');//yata thiyena table,service form eke category drop down
  }
}
