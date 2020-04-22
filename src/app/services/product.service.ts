import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productIds = [];
  constructor(private http: HttpClient) { }

  public clicks(): Observable<object> {
    return this.http.get<Product>(`${environment.apiUrl}/report/click`);
  }

  public searches(): Observable<object> {
    return this.http.get<Product>(`${environment.apiUrl}/report/search`);
  }

  public addProduct(product: Product): Observable<object> {
    return this.http.post<Product>(`${environment.apiUrl}/store/add/product`, product);
  }

  public products(): Observable<object> {
    if (this.productIds.length > 0) {
      const prods = [];
      console.log(this.productIds)
      for (let i in this.productIds) {
        prods.push({"_id": this.productIds[i]});
      }
      const req = {"products": prods}
      console.log(req);
      return this.http.post<Product>(`${environment.apiUrl}/products/filter`, req);
    } else {
      return this.http.get<Product>(`${environment.apiUrl}/products/query`);
    }
  }

  public updateProduct(product: Product): Observable<object> {
    return this.http.post<Product>(`${environment.apiUrl}/store/update/product`, product);
  }

  public removeProduct(id: string): Observable<object> {
    return this.http.post(`${environment.apiUrl}/store/delete/product`, {"_id": id});
  }
}
