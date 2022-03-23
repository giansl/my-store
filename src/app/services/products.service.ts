import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { retry, catchError, throwError, map,  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { checkTime } from 'src/app/interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${ environment.API_URL }/api`;
  constructor(
    private http: HttpClient
  ) { }

  getAllByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl  + '/categories/' + categoryId  + '/products', { params, context: checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(product => {
        return {
          ...product,
          taxes: .19 * product.price
        };
      })),
    );
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl + '/products', { params, context: checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(product => {
        return {
          ...product,
          taxes: .19 * product.price
        };
      })),
    );
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl  + '/products', {
      params: { limit, offset }
    });
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${ this.apiUrl  + '/products' }/${ id }`)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === HttpStatusCode.NotFound) {
          return throwError(() => { new Error('Producto no existe') });
        }
        if(err.status === HttpStatusCode.Conflict) {
          return throwError(() => { new Error('Algo esa fallando en el server') });
        }
        if(err.status === HttpStatusCode.Unauthorized) {
          return throwError(() => { new Error('No esta aturizado') });
        }
        return throwError(() => { new Error('Producto no existe') });
      })
    );
  }

  create(product: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl  + '/products', product);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${ this.apiUrl  + '/products' }/${ id }`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${ this.apiUrl  + '/products' }/${ id }`);
  }

}
