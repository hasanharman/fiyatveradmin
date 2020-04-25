import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public users(): Observable<object> {
    return this.http.get<User>(`${environment.apiUrl}/users`)
  }

  public update(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user/update/info/admincreditional`, user);
  }

  public remove(id: object): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user/remove`, id);
  }
}
