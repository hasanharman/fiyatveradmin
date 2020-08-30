import { Category } from './../../../models/category';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { CategoryService } from './../../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories;
  topIndex: number;
  subIndex: number;
  microIndex: number;
  api = environment.apiUrl;
  constructor(public categoryService: CategoryService) {
    this.categoryService.categories().subscribe(e => {
      this.categories = e;
    });
  }

  ngOnInit() {
  }


  removeCategory(i) {
    const category = this.categories[i].name;
    if (this.categories[i]._id !== undefined) {
      this.categoryService.deteleCategory({"name": category}).subscribe(e => {
        this.categories.splice(i, 1);
        this.microIndex = undefined;
        this.subIndex = undefined;
        this.topIndex = undefined;
      });
    } else {
      this.categories.splice(i, 1);
      this.microIndex = undefined;
      this.subIndex = undefined;
      this.topIndex = undefined;
    }
  }

  removeSubCategory(i) {
    const category = this.categories[this.topIndex].name;
    const subCategory = this.categories[this.topIndex].children[i].name;
    if (this.categories[this.topIndex].children[i]._id !== undefined) {
      this.categoryService.deleteSubCategory({"name": category, "subName": subCategory}).subscribe(e => {
        this.categories[this.topIndex].children.splice(i, 1);
        this.microIndex = undefined;
        this.subIndex = undefined;
      })
    } else {
      this.categories[this.topIndex].children.splice(i, 1);
      this.microIndex = undefined;
      this.subIndex = undefined;
    }
  }

  removeMicroCategory(i) {
    const category = this.categories[this.topIndex].name;
    const subCategory = this.categories[this.topIndex].children[this.subIndex].name;
    const microCategory = this.categories[this.topIndex].children[this.subIndex].children[i].name;
    const req = {"name": category, "subName": subCategory, "microName": microCategory};
    if (this.categories[this.topIndex].children[i]._id !== undefined) {
      this.categoryService.deleteMicroCategory(req).subscribe(e => {
        this.categories[this.topIndex].children[this.subIndex].children.splice(i, 1);
        this.microIndex = undefined;
      })
    } else {
      this.categories[this.topIndex].children[this.subIndex].children.splice(i, 1);
      this.microIndex = undefined;
    }
  }

  newCategory() {
    this.categories.unshift({
      "name": "",
      "slug": ""
    });
    console.log(this.categories)
  }

  newSubCategory(i) {
    this.categories[i].children.unshift({
      "slug": "",
      "name": ""
    });
  }

  newMicroCategory(i, j) {
    this.categories[i].children[j].children.unshift({
      "name": "",
      "slug": ""
    });
  }

  addCategory() {
    const category = this.categories[this.topIndex];
    category.slug = category.name.replace(/ /gi, "-").toLowerCase();
    console.log(category)
    this.categoryService.addCategory(category).subscribe(e => {
      this.categories[this.topIndex] = e;
    });
  }

  addSubCategory() {
    const category = this.categories[this.topIndex].children[this.subIndex];
    category.slug = category.name.replace(/ /gi, "-").toLowerCase();
    const req =  {"name": this.categories[this.topIndex].name, "children": category};
    this.categoryService.addSubCategory(req).subscribe(e => {
      this.categories[this.topIndex] = e;
    });
  }

  addMicroCategory() {
    const category = this.categories[this.topIndex].name;
    const subCategory = this.categories[this.topIndex].children[this.subIndex].name
    const microCategory = this.categories[this.topIndex].children[this.subIndex].children[this.microIndex];
    microCategory.slug = microCategory.name.replace(/ /gi, "-").toLowerCase();
    const req = {"name": category, "subName": subCategory, "children":  microCategory}
    this.categoryService.addMicroCategory(req).subscribe(e => {
      this.categories[this.topIndex] = e;
    });
  }

  updateCategory(category) {
    const req = {
      "categoryId": category._id,
      "newName": category.name
    };
    this.categoryService.updateCategory(req).subscribe(e => {
      this.categories[this.topIndex] = e;
    })
  }

  updateSubCategory(sub) {
    const req = {
      "categoryId": this.categories[this.topIndex]._id,
      "subCategoryId": sub._id,
      "newName": sub.name
    };
    this.categoryService.updateSubCategory(req).subscribe(e => {
      this.categories[this.topIndex] = e;
    });
  }

  updateMicroCategory(micro) {
    const req = {
      "categoryId": this.categories[this.topIndex]._id,
      "subCategoryId": this.categories[this.topIndex].children[this.subIndex]._id,
      "microCategoryId": micro._id,
      "newName": micro.name
    };
    this.categoryService.upodateMicroCategory(req).subscribe(e => {
      this.categories[this.topIndex] = e;
    })
  }

  addCategoryThumbnail(id) {
    let items = this.categoryService.uploader.queue;
    items[0].url = `${environment.apiUrl}/category/thumbnail/add?_id=${id}`
    items[0].file.name = "thumbnail" + id + "." + items[0].file.type.split("/")[1];
    items[0].upload();
    this.categoryService.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 200 && items[0]) {
        this.categoryService.categories().subscribe(e => {
          this.categories = e;
        });
      }
      if (!items[0]) {

      }
      this.categoryService.uploader.clearQueue();
      return
    };
  }


}
