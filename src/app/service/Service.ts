import {SubCategory} from '../sub-category/SubCategory';

export interface Service {
  id: string;
  code: string;
  name: string;
  price: string;
  time: string;
  subCategory: SubCategory;
}
