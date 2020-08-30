import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { environment } from './../../../../environments/environment';
import { StoreService } from './../../../services/store.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '../../../models/store';
@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  stores = [];
  selectedStore: Store = new Store();
  apiUrl = environment.apiUrl;
  referances = [];
  constructor(public storeService: StoreService, public productService: ProductService, private http: HttpClient) {
    this.selectedStore.xml = {"state": undefined, "link": ""}
    this.http.get(`${environment.apiUrl}/referances`).subscribe((refs: any) => {
      this.referances = refs.referances;
    });
  }

  ngOnInit() {
    this.storeService.stores().subscribe(e => {
      for (let i in e) {
        this.stores.push(e[i]);
      }
    })
  }

  removeStore(id: String, i: number) {
    this.storeService.remove(id).subscribe(e => {
      console.log(e);
    });

    this.stores.splice(i, 1);
  }
  update(store: Store) {
    delete store.transferList;
    delete store.products;
    delete store.__v;
    delete store.tokens;
    delete store.registeredDate;
    delete store.password;
    this.storeService.update(store).subscribe(e => {
      this.selectedStore = new Store();
      this.selectedStore.xml = {"state": undefined, "link": ""};
    })
  }

  signUp(store: Store) {
    
    this.storeService.signUp(store).subscribe(e => {
      this.stores.push(e["store"]);
      this.selectedStore = new Store();
      this.selectedStore.xml = {"state": undefined, "link": ""};
    })
  }


  upload() {
    this.storeService.id = this.selectedStore._id;
    this.storeService.uploader.uploadAll();
  }

}
