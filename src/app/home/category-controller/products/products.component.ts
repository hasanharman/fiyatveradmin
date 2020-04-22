import { SearchService } from './../../../services/search.service';
import { Product } from './../../../models/product';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Array<Product>;
  public fixedProducts: Array<Product>;
  public selectedProduct: Product = new Product();
  constructor(private productService: ProductService, private searchService: SearchService) {
    this.productService.products().subscribe((e: Array<Product>) => {
      this.products = e;
      this.fixedProducts = e;
      console.log(e)
    })
  }

  ngOnInit() {
  }

  update(product: Product) {
    delete product["__v"];
    delete product.searchCount;
    delete product.clickCount;
    this.productService.updateProduct(product).subscribe(e => {
      console.log(e);
    });
  }

  remove(id: string, i: number) {
    this.productService.removeProduct(id).subscribe(e => {
      this.products.splice(i, 1);
    })
  }

  search(e) {
    const searchedIds = this.searchService.search(e, this.fixedProducts);
    let product: Array<Product> = new Array<Product>();
    this.fixedProducts.forEach(e => {
      if (searchedIds.indexOf(e._id) !== -1) {
        product.push(e);
      }
    });
    this.products = product;
  }


}
