import { Announcement } from './../models/announcement';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  public announcements(): Observable<object> {
    return this.http.get(`${environment.apiUrl}/announcements`);
  }

  public add(announcement: Announcement): Observable<object> {
    return this.http.post<Announcement>(`${environment.apiUrl}/admin/announcement/add`, announcement);
  }

  public update(announcement: Announcement): Observable<object> {
    return this.http.post<Announcement>(`${environment.apiUrl}/admin/announcement/update`, announcement);
  }

  public remove(id: String): Observable<object> {
    return this.http.post<Announcement>(`${environment.apiUrl}/admin/announcement/delete`, {"_id": id});
  }
}
