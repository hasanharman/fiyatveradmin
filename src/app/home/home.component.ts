import { Admin } from './../models/admin';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public admin: Admin
  constructor() {
    try {
      this.admin = JSON.parse(localStorage.getItem('currentUser')).admin
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
}

