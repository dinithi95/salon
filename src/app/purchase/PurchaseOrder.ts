import {Supplier} from "../supplier/Supplier";
import {Item} from "../item/Item";

export interface PurchaseOrder {
  id: string;
  code: string;
  date: string;
  status: string;
  price: string;
  supplier: Supplier;
  items: Item[];
}
