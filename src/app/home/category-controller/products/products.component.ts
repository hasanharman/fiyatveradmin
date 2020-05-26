import { CategoryService } from './../../../services/category.service';
import { Category } from './../../../models/category';
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

  pages: number[] = [];
  onChange: any = () => {};
  onTouched: any = () => {};
  siblings = 1;
  current = 1;
  total = 1;
  loading = true;
  categories: Category[];
  common: Boolean = true;
  topCategory = "";
  topCategories = [];
  sub = "all";
  micro = "all";
  subCategory = "";
  subCategories = {"all": []};
  microCategory = "";
  microCategories = {"all": []};
  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private categoryService: CategoryService
    ) {
    this.productService.products().subscribe((e: Array<any>) => {
      this.products = e["items"];
      this.fixedProducts = e["items"];
      this.total = Math.ceil(e["total"]/12)
      this.calc();
      this.loading = false;
    });
    this.categoryService.categories().subscribe(categories => {
      this.categories = categories;
      this.distrubuteCategory(categories);
    })
  }

  distrubuteCategory(categories) {
    categories.map(top => {
      this.topCategories.push(top.name)
      top.children.map(sub => {
        if ( this.subCategories[top.name] ) {
          this.subCategories[top.name].push(sub.name)
        } else {
          this.subCategories[top.name] = [sub.name];
        }
        this.subCategories["all"].push(sub.name);
        sub.children.map(micro => {
          if ( this.microCategories[sub.name] ) {
            this.microCategories[sub.name].push(micro.name)
          } else {
            this.microCategories[sub.name] = [micro.name];
          }
          this.microCategories["all"].push(micro.name);
        })
      });
    })
  }

  changeHandler(e, type) {
    const category = e.target.value;
    switch (type) {
      case 'top':
        this.sub = category;
        break;
      case 'sub':
        this.micro = category;
        break;
      case 'micro':
        
        break;
    }
  }

  commonProducts() {
    this.setPage(1);
    this.loading = true;
    this.productService.products().subscribe((e: Array<any>) => {
      this.products = e["items"];
      this.fixedProducts = e["items"];
      this.total = Math.ceil(e["total"]/12)
      this.common = true;
      this.calc();
      this.loading = false;
    });
  }

  connectedProducts(ids: Array<string>) {
    this.setPage(1);
    this.loading = true;
    this.productService.productIds = Object.values(ids);
    this.productService.products().subscribe(products => {
      this.products = products["items"];
      this.fixedProducts = products["items"];
      this.total = 1;
      this.productService.productIds = [];
      this.common = false;
      this.calc();
      this.loading = false;
    })
  }
  setPage(value: number): void {
    this.onTouched();

    if (value < 1 || value > this.total || value === this.current) {
        return;
    }
    this.loading = true;

    if (this.current !== value) {
        this.onChange(value);
    }

    this.current = value;
    // console.log(pages);
    // if (value < pages) {
    //   this.calc();
    // }
    
    this.productService.getProductsByPage(this.current.toString()).subscribe(e => {
      this.products = e["items"];
      this.fixedProducts = e["items"];
      this.total = Math.ceil(e["total"]/12)
      this.common = true;
      this.calc()
      this.loading = false;
    })
}

writeValue(obj: any): void {
  if (typeof obj === 'number') {
      this.setPage(obj);
  }
}
  

  ngOnInit() {
    this.calc();
  }

  trackByFn(index: number): number {
    return index;
  }

  private calc(): void {
    const min = Math.max(1, this.current - this.siblings - Math.max(0, this.siblings - this.total + this.current));
    const max = Math.min(this.total, min + this.siblings * 2);

    this.pages = [];

    for (let i = min; i <= max; i++) {
        this.pages.push(i);
    }
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
