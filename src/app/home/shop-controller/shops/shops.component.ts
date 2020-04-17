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
  constructor(private storeService: StoreService) {
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
    console.log(store);
    this.storeService.update(store).subscribe(e => {
      console.log(e);
    })
  }

}
