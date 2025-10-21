import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaginatedResponse} from '../../../shared/interfaces/paginated-response';
import {CustomerModel} from '../customer.model';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly API_SUFFIX = '/customer-service/api/customers';

  http = inject(HttpClient);

  getCustomers(
    pageNumber: number,
    sizePerPage: number,
    keyword: string,
  ): Observable<PaginatedResponse<CustomerModel>> {
    return this.http.get<PaginatedResponse<CustomerModel>>(environment.API_URL + this.API_SUFFIX, {
      params: {
        page: pageNumber,
        size: sizePerPage,
        keyword: keyword,
      },
    });
  }

  createCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(environment.API_URL + this.API_SUFFIX, customer);
  }
}
