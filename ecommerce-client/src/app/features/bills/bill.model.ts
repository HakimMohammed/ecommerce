import {ProductModel} from '../products/product.model';

export interface BillModel {
  id: string;
  billingDate: Date;
  customerID: string;
  products: ProductModel[];
}
