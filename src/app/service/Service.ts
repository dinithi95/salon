import {Subcategory} from '../sub-category/Subcategory';
import {Category} from "../category/Category";

export interface Service {
  id: string;
  code: string;
  name: string;
  price: string;
  duration: string;
  subcategory: Subcategory;
  category: Category;
  status: string;
}
