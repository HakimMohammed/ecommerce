import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaginatedResponse} from '../../../shared/interfaces/paginated-response';
import {CustomerModel, CustomerUpdateModel} from '../customer.model';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {CustomerUpdate} from '../pages/customer-update/customer-update';

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

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(environment.API_URL + this.API_SUFFIX + '/' + id);
  }

  getCustomerById(id: string): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(environment.API_URL + this.API_SUFFIX + '/' + id);
  }

  updateCustomer(id: string, customer: CustomerUpdateModel): Observable<void> {
    return this.http.put<void>(environment.API_URL + this.API_SUFFIX + '/' + id, customer);
  }
}
