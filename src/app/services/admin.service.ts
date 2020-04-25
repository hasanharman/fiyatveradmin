import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Admin } from '../models/admin';
import {  FileUploader } from '../../../node_modules/ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  id: string;
  constructor(private http: HttpClient) {
    this.uploader = new FileUploader({
      url: `${environment.apiUrl}/admin/pp/upload`,
      itemAlias: 'photo'
    });

    this.uploader.onAfterAddingAll = (file) => { file.withCredentials = false; };
    // tslint:disable-next-line: max-line-length
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item.file.name = this.id + '.' + item.file.type.split('/')[1];
      item.headers.push({"authorization": "this.id"});
      console.log(item)
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 200) {
        location.reload();
      }
  };
  
    this.response = '';
  
    this.uploader.response.subscribe( res => {
      this.response = res;
    } );
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

  public remove(id: string): Observable<object> {
    return this.http.post<Admin>(`${environment.apiUrl}/admin/delete`, {"_id": id});
  }

}
