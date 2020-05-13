import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public categories(): Observable<object> {
    return this.http.get<Category>(`${environment.apiUrl}/categories`);
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
}
