import {Routes} from '@angular/router';
import {CustomerList} from './features/customers/pages/customer-list/customer-list';
import {CustomerCreation} from './features/customers/pages/customer-creation/customer-creation';
import {CustomerUpdate} from './features/customers/pages/customer-update/customer-update';
import {ProductList} from './features/products/pages/product-list/product-list';
import {ProductCreate} from './features/products/pages/product-create/product-create';
import {ProductUpdate} from './features/products/pages/product-update/product-update';
import {BillList} from './features/bills/pages/bill-list/bill-list';
import { BillDetailComponent } from './features/bills/pages/bill-detail/bill-detail';

export const routes: Routes = [
  {
    path: 'customers',
    component: CustomerList
  },
  {
    path: 'customers/create',
    component: CustomerCreation
  },
  {
    path: 'customers/edit/:id',
    component: CustomerUpdate
  },
  {
    path: 'products',
    component: ProductList,
  },
  {
    path: 'products/create',
    component: ProductCreate,
  },
  {
    path: 'products/edit/:id',
    component: ProductUpdate,
  },
  {
    path: 'bills/:customerId',
    component: BillList,
  },
  {
    path: 'bills/detail/:id',
    component: BillDetailComponent,
  }
];
