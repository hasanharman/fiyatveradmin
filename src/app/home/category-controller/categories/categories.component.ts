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
  constructor(private categoryService: CategoryService) {
    this.categoryService.categories().subscribe(e => {
      this.categories = e;
      console.log(e);
    });
  }

  ngOnInit() {
  }

  removeCategory(i) {
    const category = this.categories[i].category.name;
    if (this.categories[i]._id !== undefined) {
      this.categoryService.deteleCategory({"category": category}).subscribe(e => {
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
    const category = this.categories[this.topIndex].category.name;
    const subCategory = this.categories[this.topIndex].category.subCategory[i].name;
    if (this.categories[this.topIndex].category.subCategory[i]._id !== undefined) {
      this.categoryService.deleteSubCategory({"category": category, "subCategory": subCategory}).subscribe(e => {
        this.categories[this.topIndex].category.subCategory.splice(i, 1);
        this.microIndex = undefined;
        this.subIndex = undefined;
      })
    } else {
      this.categories[this.topIndex].category.subCategory.splice(i, 1);
      this.microIndex = undefined;
      this.subIndex = undefined;
    }
  }

  removeMicroCategory(i) {
    const category = this.categories[this.topIndex].category.name;
    const subCategory = this.categories[this.topIndex].category.subCategory[this.subIndex].name;
    const microCategory = this.categories[this.topIndex].category.subCategory[this.subIndex].microCategory[i].name;
    const req = {"category": category, "subCategory": subCategory, "microCategory": microCategory};
    if (this.categories[this.topIndex].category.subCategory[i]._id !== undefined) {
      this.categoryService.deleteMicroCategory(req).subscribe(e => {
        this.categories[this.topIndex].category.subCategory[this.subIndex].microCategory.splice(i, 1);
        this.microIndex = undefined;
      })
    } else {
      this.categories[this.topIndex].category.subCategory[this.subIndex].microCategory.splice(i, 1);
      this.microIndex = undefined;
    }
  }

  newCategory() {
    this.categories.unshift({
      "category": {
        "name": "",
        "subCategory": []
      }
    });
    console.log(this.categories)
  }

  newSubCategory(i) {
    this.categories[i].category.subCategory.unshift({
      "microCategory": [],
      "name": ""
    });
  }

  newMicroCategory(i, j) {
    this.categories[i].category.subCategory[j].microCategory.unshift({
      "name": ""
    });
  }

  addCategory() {
    const category = this.categories[this.topIndex].category;
    this.categoryService.addCategory({"category": category}).subscribe(e => {
      this.categories[this.topIndex] = e;
    });
  }

  addSubCategory() {
    const category = this.categories[this.topIndex].category.subCategory[this.subIndex];
    const req =  {"category": this.categories[this.topIndex].category.name, "subCategory": category};
    this.categoryService.addSubCategory(req).subscribe(e => {
      this.categories[this.topIndex] = e;
    });
  }

  addMicroCategory() {
    const category = this.categories[this.topIndex].category.name;
    const subCategory = this.categories[this.topIndex].category.subCategory[this.subIndex].name
    const microCategory = this.categories[this.topIndex].category.subCategory[this.subIndex].microCategory[this.microIndex];
    const req = {"category": category, "subCategory": subCategory, "microCategory":  microCategory}
    this.categoryService.addMicroCategory(req).subscribe(e => {
      this.categories[this.topIndex] = e;
    });
  }

  updateCategory(category) {
    const req = {
      "categoryId": category._id,
      "newName": category.category.name
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
      "subCategoryId": this.categories[this.topIndex].category.subCategory[this.subIndex]._id,
      "microCategoryId": micro._id,
      "newName": micro.name
    };
    this.categoryService.upodateMicroCategory(req).subscribe(e => {
      this.categories[this.topIndex] = e;
    })
  }


}
