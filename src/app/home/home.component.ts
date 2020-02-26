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
    this.admin = JSON.parse(localStorage.getItem('currentUser')).admin;
    console.log(this.admin);
  }

  ngOnInit() {
    $("#menu-toggle").click(function (e) {
      console.log('basıldı');
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    
  }
}

