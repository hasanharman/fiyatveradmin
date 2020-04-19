import { ProductService } from 'src/app/services/product.service';
import { StoreService } from './../../../services/store.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.css']
})
export class XmlComponent implements OnInit {
  link: string;
  id: string;
  data;
  path;
  example;
  types;
  product: Product = new Product();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService
    ) {
    this.route.params.subscribe(e => {
      this.link = e.link;
      this.id = e.id;
      this.storeService.xml(this.link).subscribe(e => {
        this.data = e;
      })
    });
  }

  ngOnInit() {
  }

  acception() {

    const splitted = this.path.split("/");
    let output;
    for (let i in splitted) {
      console.log(splitted[i]);
      if (output === undefined) {
        output = this.data[splitted[i]]
      } else {
        output = output[splitted[i]]
      }
    }
    this.example = output;
    this.types = Object.keys(this.example[0]);
    this.types.push("none");
  }

  addProducts() {
    this.example.forEach(element => {
      const newProduct: Product = new Product();
      Object.keys(this.product).forEach(e => {
        newProduct[e] = element[this.product[e]][0];
        newProduct.storeId = this.id;
      })
      this.productService.addProduct(newProduct).subscribe(e => {
        console.log(e)
      })
    });
  }


}
