import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Store } from '../models/store';
import {  FileUploader } from '../../../node_modules/ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  id: string;

  constructor(private http: HttpClient) { 
    this.uploader = new FileUploader({
      url: `${environment.apiUrl}/store/pp/upload`,
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
      console.log('FileUpload:uploaded:', item, status, response);
      // location.reload();
  };
  
    this.response = '';
  
    this.uploader.response.subscribe( res => {
      this.response = res;
    } );
  }

  public signUp(store: Store): Observable<Store> {
    return this.http.post<Store>(`${environment.apiUrl}/store/signup`, store);
  }

  public stores(): Observable<object> {
    return this.http.get<Store>(`${environment.apiUrl}/stores`)
  }

  public update(store: Store): Observable<object> {
    return this.http.post<Store>(`${environment.apiUrl}/store/update`, store);
  }

  public remove(id: String): Observable<object> {
    return this.http.post<Store>(`${environment.apiUrl}/store/delete`, {"_id": id});
  }

  public xml(url: string): Observable<object> {
    return this.http.post(`${environment.apiUrl}/parse/xml`, {"url": url});
  }

  public xmlFormats(): Observable<object> {
    return this.http.get(`${environment.apiUrl}/xml/formats`);
  }

  public xmlFormatAdd(format): Observable<object> {
    return this.http.post(`${environment.apiUrl}/xml/format/add`, format);
  }

  public xmlFormatUpdate(format): Observable<object> {
    return this.http.post(`${environment.apiUrl}/xml/format/update`, format);
  }

  public xmlFormatDelete(format): Observable<object> {
    return this.http.post(`${environment.apiUrl}/xml/format/delete`, format);
  }
}
