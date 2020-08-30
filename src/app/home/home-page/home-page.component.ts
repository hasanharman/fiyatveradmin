import { UserService } from './../../services/user.service';
import { StoreService } from './../../services/store.service';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  topCategories = [];
  topProducts = [];
  lastProducts = [];
  storesNumber = null;
  usersNumber = null;
  notifications = null;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private storeService: StoreService,
    private userService: UserService) {
    this.categoryService.topCategories(5).subscribe((categories: any) => {
      this.topCategories = categories;
    });
    this.productService.bestProducts(5).subscribe((products: any) => {
      this.topProducts = products;
    });
    this.storeService.storeCount().subscribe((store: any) => {
      this.storesNumber = store.count;
    });
    this.userService.userCount().subscribe((user: any) => {
      this.usersNumber = user.count;
    })
  }

  ngOnInit() {
  }

}
