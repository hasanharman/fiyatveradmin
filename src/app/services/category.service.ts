import { AuthService } from './auth.service';
import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FileUploader } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  uploader: FileUploader = new FileUploader({
    itemAlias: 'photo',
  });
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.currentUser.subscribe(currentUser =>{
      this.uploader.options.authToken = `Bearer ${currentUser.token}`
      this.uploader.options.headers = [{"name": "Authorization", "value": `Bearer ${currentUser.token}`}];
      this.uploader.onAfterAddingAll = (file) => { file.withCredentials = false; };
      // tslint:disable-next-line: max-line-length
      this.uploader.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
      };
    })
  }

  public categories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  public addCategory(category: Category): Observable<object> {
    return this.http.post<Category>(`${environment.apiUrl}/category/add`, category);
  }

  public addSubCategory(subCategory): Observable<object> {
    return this.http.post<Category>(`${environment.apiUrl}/category/subcategory/add`, subCategory);
  }

  public addMicroCategory(microCategory): Observable<object> {
    return this.http.post<Category>(`${environment.apiUrl}/category/subcategory/microcategory/add`, microCategory);
  }

  public deteleCategory(category: any): Observable<object> {
    return this.http.post<Category>(`${environment.apiUrl}/category/delete`, category);
  }

  public deleteSubCategory(subCategory): Observable<object> {
    return this.http.post<Category>(`${environment.apiUrl}/category/subcategory/delete`, subCategory);
  }

  public deleteMicroCategory(microCategory): Observable<object> {
    return this.http.post<Category>(`${environment.apiUrl}/category/subcategory/microcategory/delete`, microCategory);
  }

  public updateCategory(category): Observable<object> {
    return this.http.post<Category>(`${environment.apiUrl}/category/update`, category);
  }

  public updateSubCategory(subCategory): Observable<object> {
    return this.http.post<Category>(`${environment.apiUrl}/category/subcategory/update`, subCategory);
  }

  public upodateMicroCategory(microCategory): Observable<object> {
    return this.http.post<Category>(`${environment.apiUrl}/category/subcategory/microcategory/update`, microCategory);
  }

  public topCategories(limit = 5): Observable<object> {
    return this.http.get(`${environment.apiUrl}/topcategories?limit=${limit}`)
  }
}
