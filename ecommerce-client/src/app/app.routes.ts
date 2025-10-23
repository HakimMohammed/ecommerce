import {Routes} from '@angular/router';
import {CustomerList} from './features/customers/pages/customer-list/customer-list';
import {CustomerCreation} from './features/customers/pages/customer-creation/customer-creation';
import {CustomerUpdate} from './features/customers/pages/customer-update/customer-update';

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
  }
];
