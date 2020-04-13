import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {
  

  }
  public admins(): Observable<object> {
    return this.http.get<Admin>(`${environment.apiUrl}/admin/all-admins`);
  }

  public async updateme(admin: Admin) {
    const data = admin
    return await this.http.post<Admin>(`${environment.apiUrl}/admin/me/update`, data).subscribe(user => {
      if (user !== undefined && user !== null) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    })
  }

  public async update(admin: Admin) {
    const data = admin
    return await this.http.post<Admin>(`${environment.apiUrl}/admin/update`, data);
  }

}
