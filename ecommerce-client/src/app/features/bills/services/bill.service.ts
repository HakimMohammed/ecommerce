import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaginatedResponse} from '../../../shared/interfaces/paginated-response';
import {BillModel} from '../bill.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  readonly API_SUFFIX = '/billing-service/api/bills';
  http = inject(HttpClient);

  getBills(
    pageNumber: number,
    sizePerPage: number,
    customerID: string,
  ): Observable<PaginatedResponse<BillModel>> {
    return this.http.get<PaginatedResponse<BillModel>>(environment.API_URL + this.API_SUFFIX, {
      params: {
        page: pageNumber,
        size: sizePerPage,
        customerID: customerID,
      },
    });
  }

  getBillById(id: string): Observable<BillModel> {
    return this.http.get<BillModel>(`${environment.API_URL}${this.API_SUFFIX}/${id}`);
  }
}
