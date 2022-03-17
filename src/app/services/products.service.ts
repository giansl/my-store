import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, {params});
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl, {
      params: { limit, offset }
    });
  }

  getProduct(id: string) {
    return this.http.get<Product>(this.apiUrl + '/' + id);
  }

  create(product: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(this.apiUrl + '/' + id, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(this.apiUrl + '/' + id);
  }

}
