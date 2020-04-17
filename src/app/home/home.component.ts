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
  constructor(private authService: AuthService) {
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

  logout() {
    this.authService.logout();
  }
}

