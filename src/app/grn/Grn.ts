import {PurchaseOrder} from "../purchase/PurchaseOrder";
import {Item} from "../item/Item";

export interface Grn {
  id: string;
  code: string;
  date: string;
  price: string;
  status: string;
  po: PurchaseOrder;
  items: Item[];
}
