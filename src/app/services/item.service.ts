import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Item} from "../item/Item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  getAllItem() {
    return this.http.get<Item[]>('http://localhost:8000/api/item');
  }//

  getItemBySupplier(id) {
    let supplier = new HttpParams();
    supplier = supplier.append('supplier', id);

    return this.http.get<Item[]>('http://localhost:8000/api/itemBysupplier', {params: supplier});//filter wela ena nisa(item athule supplier)
  }

  delete(id: any) {
    return this.http.delete<Item[]>(`http://localhost:8000/api/item/${id}`);
  }
}

