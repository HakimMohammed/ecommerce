import {Routes} from '@angular/router';
import {CustomerList} from './features/customers/pages/customer-list/customer-list';

export const routes: Routes = [
  {
    path: 'customers',
    component: CustomerList
  }
];
