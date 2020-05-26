import { Category } from './../../../models/category';
import { CategoryService } from './../../../services/category.service';
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
  categories: Category[];
  topCategory = "";
  topCategories = [];
  sub = "all";
  micro = "all";
  subCategory = "";
  subCategories = {"all": []};
  microCategory = "";
  microCategories = {"all": []};
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
    private iterableDiffers: IterableDiffers,
    private categoryService: CategoryService
    ) {
    this.route.params.subscribe(e => {
      this.link = e.link;
      this.id = e.id;
      this.storeService.xml(this.link).subscribe(e => {
        this.data = e;
      });
    });
    this.categoryService.categories().subscribe(categories => {
      this.categories = categories;
      this.distrubuteCategory(categories);
    })
    this.storeService.xmlFormats().subscribe(e => {
      this.formats = e;
    })
    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
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
    console.log(this.topCategory, this.subCategory, this.microCategory)
    console.log(this.product)
    this.example.forEach(element => {
      const newProduct: Product = new Product();
      newProduct.categories = [];
      newProduct.images = [];
      Object.keys(this.product).forEach(e => {
        try {
          if (e !== "none") {
            newProduct[e] = element[this.product[e]][0];
            if (e === "name") {
              newProduct.slug = element[this.product[e]][0].replace(/ /gi, "-").toLowerCase();
            }
            if (e === "images" && typeof element[this.product[e]][0] === "string") {
              newProduct[e] = [element[this.product[e]][0]];
            }
            if (e === "category") {
              newProduct.categories.push(this.topCategory !== "" ? this.topCategory.replace(/ /gi, "-").toLowerCase() : element[this.product[e]][0].replace(/ /gi, "-").toLowerCase());
            } else if (e === "subCategory") {
              newProduct.categories.push(this.subCategory !== "" ? this.subCategory.replace(/ /gi, "-").toLowerCase() : element[this.product[e]][0].replace(/ /gi, "-").toLowerCase());
            } else if (e === "microCategory") {
              newProduct.categories.push(this.microCategory !== "" ? this.microCategory.replace(/ /gi, "-").toLowerCase() : element[this.product[e]][0].replace(/ /gi, "-").toLowerCase());
            }
            if(newProduct[e] == undefined || newProduct[e] == null || newProduct[e] == "") {
              delete newProduct[e]
            }
          }
        } catch (error) {}
        newProduct.storeId = this.id;
      })
      if (this.topCategory !== "" && this.topCategory !== "None") {
        newProduct["category"] = this.topCategory;
        newProduct.categories.push(this.topCategory.replace(/ /gi, "-").toLowerCase())
      }
      if (this.subCategory !== "" && this.subCategory !== "None") {
        newProduct["subCategory"] = this.subCategory;
        newProduct.categories.push(this.subCategory.replace(/ /gi, "-").toLowerCase());
      }
      if (this.microCategory !== "" && this.microCategory !== "None") {
        newProduct["microCategory"] = this.microCategory;
        newProduct.categories.push(this.microCategory.replace(/ /gi, "-").toLowerCase());
      }
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
        this.selectedFormat.format = this.product
        this.storeService.xmlFormatAdd(this.selectedFormat).subscribe(e => {
          $(".addFormat").css({"display": "none"})
          this.router.navigate(["/home/shopcontroller/shops"]);
        })
      } else {
        this.selectedFormat.path = this.path;
        this.selectedFormat.name = this.selectedName;
        this.selectedFormat.format = this.product;
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
