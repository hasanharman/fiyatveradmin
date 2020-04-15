import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public clicks(): Observable<object> {
    return this.http.get<Product>(`${environment.apiUrl}/report/click`);
  }

  public searches(): Observable<object> {
    return this.http.get<Product>(`${environment.apiUrl}/report/search`);
  }
}
