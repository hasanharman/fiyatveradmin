import { Product } from './../models/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  search(input: String, array: Array<any>): Array<String> {
    const queryList: Array<String> = new Array<String>();
    array.forEach(data => {
      Object.values(data).map( e => {
        if (typeof e === "string" || typeof e === "number") {
          if (e.toString().toLocaleUpperCase().indexOf(input.toString().toLocaleUpperCase()) !== -1 && queryList.indexOf(data._id) === -1) {
              queryList.push(data._id);
            }
        }
      });
    });
    return queryList;
  }

  userText = null;
  productText = null;
}
