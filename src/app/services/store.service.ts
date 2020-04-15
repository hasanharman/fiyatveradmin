import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  public stores(): Observable<object> {
    return this.http.get<Store>(`${environment.apiUrl}/stores`)
  }

  public update(store: Store): Observable<object> {
    return this.http.post<Store>(`${environment.apiUrl}/store/update`, store);
  }

  public remove(id: String): Observable<object> {
    return this.http.post<Store>(`${environment.apiUrl}/store/delete`, {"_id": id});
  }
}
