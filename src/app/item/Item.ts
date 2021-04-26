import {Supplier} from "../supplier/Supplier";

export interface Item {
  id: string;
  code: string;
  name: string;
  brand: string;
  price: string;
  quantity: string;
  type: string;
  supplier: Supplier;
  status: string;

}
