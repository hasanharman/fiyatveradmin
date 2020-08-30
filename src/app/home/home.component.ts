import { Router } from '@angular/router';
import { SearchService } from './../services/search.service';
import { Admin } from './../models/admin';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public admin: Admin
  productText;
  userText;
  constructor(private authService: AuthService, private searchService: SearchService, private route: Router) {
    try {
      this.admin = JSON.parse(localStorage.getItem('currentUser')).admin;
      console.log(this.admin)
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      $("#page-content-wrapper").toggleClass("toggled");
    });
    
  }

  productSearch(text: string) {
    this.searchService.productText = text;
    this.route.navigate(["/home/categorycontroller/products"]);
  }

  userSearch(text: string) {
    this.searchService.userText = text;
    this.route.navigate(["/home/usercontroller/users"]);
  }

  logout() {
    this.authService.logout();
  }
}

