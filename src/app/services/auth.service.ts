import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Admin>;
  public currentUser: Observable<Admin>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Admin {
    return this.currentUserSubject.value;
}

login(email: string, password: string) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  return this.http.post<Admin>(`${environment.apiUrl}/admin/signin`, { email, password }, httpOptions)
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
      }));
}

signup(firstName: string, lastName: string, phone: string, email: string, password: string) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  return this.http.post<Admin>(`${environment.apiUrl}/admin/signup`, {firstName, lastName, phone, email, password, "authority": 0}, httpOptions)
    .pipe(map(user => {
      // localStorage.setItem('currentUser', JSON.stringify(user));
      // this.currentUserSubject.next(user);
      // console.log(user)
      return user;
    }));
}

me(token: String) {
  return this.http.get(`${environment.apiUrl}/admin/me`).pipe(map(user => {
    return user;
  }));
}

async logout() {
  // remove user from local storage to log user out
  await localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}
}
