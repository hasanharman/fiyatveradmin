import { Format } from './../../../models/format';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from './../../../services/store.service';
import { Component, OnInit, IterableDiffer, IterableDiffers } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import {Power1, Bounce} from 'gsap/all';
import { BehaviorSubject } from 'rxjs';

declare var TweenMax: any;
declare var $: any;

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
  product: Format = new Format();
  count = 0;
  formats;
  updateState = false;
  selectedName = "";
  selectedFormat = {
    "name": "",
    "path": "",
    "format": {}
  }
  iterableDiffer;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService,
    private iterableDiffers: IterableDiffers
    ) {
    this.route.params.subscribe(e => {
      this.link = e.link;
      this.id = e.id;
      this.storeService.xml(this.link).subscribe(e => {
        this.data = e;
      });
    });
    this.storeService.xmlFormats().subscribe(e => {
      this.formats = e;
    })
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(Object.values(this.selectedFormat.format));
    if (changes && this.example !== undefined) {
        this.updateState = true;
    }
}

  acception() {
    if (this.selectedFormat.path !== "") {
      if (this.path === this.selectedFormat.path) {
        this.updateState = false;
      } else {
        this.updateState = true;
      }
    } else {
      this.updateState = false;
    }
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
        try {
          if (e !== "none") {
            newProduct[e] = element[this.product[e]][0];
          }
        } catch (error) {}
        newProduct.storeId = this.id;
      })
      TweenMax.set(document.getElementsByClassName("alert"), {css: {"opacity": 1, "margin-top": "calc(100vh - 300px)"}});
      this.productService.addProduct(newProduct).subscribe(e => {
        TweenMax.set(document.getElementsByClassName("alert"), {css: {"opacity": 1, "margin-top": "calc(100vh - 300px)"}});
        this.count++;
      });
    });
    this.storeService.update({"_id": this.id, "xml": {"state": true, "link": this.link}}).subscribe(e => {
      if (this.selectedFormat["_id"] === undefined) {
        $(".addFormat").css({"display": "flex"})
      } else {
        if (this.updateState) {
          $(".addFormat").css({"display": "flex"})
        } else {
          this.router.navigate(["/home/shopcontroller/shops"]);
        }
      }
    });

    
  }

  addFormat(state) {
    if (state) {
      if (this.selectedFormat["_id"] === undefined) {
        this.selectedFormat.path = this.path;
        this.selectedFormat.name = this.selectedName;
        this.storeService.xmlFormatAdd(this.selectedFormat).subscribe(e => {
          $(".addFormat").css({"display": "none"})
          this.router.navigate(["/home/shopcontroller/shops"]);
        })
      } else {
        this.selectedFormat.path = this.path;
        this.selectedFormat.name = this.selectedName;
        delete this.selectedFormat["__v"];
        this.storeService.xmlFormatUpdate(this.selectedFormat).subscribe(e => {
          $(".addFormat").css({"display": "none"})
          this.router.navigate(["/home/shopcontroller/shops"]);
        })
      }
    } else {
      $(".addFormat").css({"display": "none"})
      this.router.navigate(["/home/shopcontroller/shops"]);
    }
  }

  selectFormat(format) {
    this.updateState = false;
    this.path = format.path;
    this.selectedName = format.name;
    this.selectedFormat = format;
    this.product = format.format;
  }

  removeFormat(id, i) {
    this.storeService.xmlFormatDelete({"_id": id}).subscribe(e => {
      this.formats.splice(i, 1);
      this.updateState = false;
    })
  }

}
