import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Subcategory} from "../sub-category/Subcategory";

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http: HttpClient) {
  }

  getAllSubcategory() {
    return this.http.get<Subcategory[]>('http://localhost:8000/api/subcategory');
  }//

  getSubcategoryByCategory(id) {
    let category = new HttpParams();
    category = category.append('category', id);

    return this.http.get<Subcategory[]>('http://localhost:8000/api/subcategoryByCategory', {params: category});//filter wela ena nisa(category athule subcategory)
  }

  delete(id: any) {
    return this.http.delete<Subcategory[]>(`http://localhost:8000/api/subcategoryByCategory/${id}`);
  }
}
