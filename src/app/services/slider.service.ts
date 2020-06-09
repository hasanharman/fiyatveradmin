import { Injectable } from '@angular/core';
import { FileUploader } from '../../../node_modules/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SliderService {
  uploader: FileUploader = new FileUploader({
    itemAlias: 'photo',
    // formatDataFunctionIsAsync: true,
    // formatDataFunction: async (item) => {
    //   return new Promise( (resolve, reject) => {
    //     resolve({
    //       name: item._file.name,
    //       length: item._file.size,
    //       contentType: item._file.type,
    //       date: new Date()
    //     });
    //   });
    // }
  });
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  id;
  constructor(private http: HttpClient) {
    this.uploader.onAfterAddingAll = (file) => { file.withCredentials = false; };
    // tslint:disable-next-line: max-line-length
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item.file.name = item.file.name.split(".")[0] + new Date().getUTCFullYear() + new Date().getMilliseconds()  + "." +item.file.name.split(".")[1]
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 200) {
        console.log(response)
        this.id = response["_id"];
      }
  };
  }

  async addSlider(size, id?, fileName?) {
    this.uploader.options.url = id ? `${environment.apiUrl}/slider/add?size=${size}&id=${id}` : `${environment.apiUrl}/slider/add?size=${size}`
    this.uploader.onAfterAddingAll = (file) => { file.withCredentials = false; };
    // tslint:disable-next-line: max-line-length
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item.file.name = item.file.name + new Date().toString();
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 200) {
        location.reload();
      }
  };
  
    this.response = '';
  
    await this.uploader.response.toPromise().then(x => {
      this.response = x
      console.log(x);
    })
    return this.response
  }
  updateSlider(size, id, fileName?) {

    this.uploader.options.url = `${environment.apiUrl}/slider/add?size=${size}&id=${id}`

    this.uploader.onAfterAddingAll = (file) => { file.withCredentials = false; };
    // tslint:disable-next-line: max-line-length
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item.file.name = fileName ? fileName : item.file.name + new Date().toString();
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

    return this.uploader
  }

  deleteSlider() {

  }

  get sliders(): Observable<Array<object>> {
    return this.http.get<Array<object>>("http://localhost:8080/sliders");
  }
} 
