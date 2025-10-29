import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaginatedResponse} from '../../../shared/interfaces/paginated-response';
import {ProductModel, ProductUpdateModel} from '../product.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly API_SUFFIX = '/inventory-service/api/products';

  http = inject(HttpClient);

  getProducts(
    pageNumber: number,
    sizePerPage: number,
    keyword: string,
  ): Observable<PaginatedResponse<ProductModel>> {
    return this.http.get<PaginatedResponse<ProductModel>>(environment.API_URL + this.API_SUFFIX, {
      params: {
        page: pageNumber,
        size: sizePerPage,
        keyword: keyword,
      },
    });
  }

  createProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(environment.API_URL + this.API_SUFFIX, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(environment.API_URL + this.API_SUFFIX + '/' + id);
  }

  updateProduct(id: string, product: ProductUpdateModel): Observable<void> {
    return this.http.put<void>(environment.API_URL + this.API_SUFFIX + '/' + id, product);
  }

  getProductById(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(environment.API_URL + this.API_SUFFIX + '/' + id);
  }
}
