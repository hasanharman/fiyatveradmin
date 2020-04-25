import { environment } from './../../../environments/environment';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-staff-controller',
  templateUrl: './staff-controller.component.html',
  styleUrls: ['./staff-controller.component.css']
})
export class StaffControllerComponent implements OnInit {
  checkoutForm;
  submitted = false;
  returnUrl: string;
  error = '';
  state = "Ekle"
  admins = [];
  admin: Admin = new Admin();
  opt;
  apiUrl = environment.apiUrl;
  pages = [
    {"path": "/home/hompage", "name": "Ana Sayfa", "category": "Ana Sayfa"},
    {"path": "/home/staffcontroller", "name": "Personel Yönetimi", "category": "Admin"},
    {"path": "/home/contentcontroller/announcements", "name": "Duyuru Yönetimi", "category": "İçerik Kontrolü"},
    {"path": "/home/contentcontroller/slider", "name": "Slider Yönetimi", "category": "İçerik Kontrolü"},
    {"path": "/home/contentcontroller/banner", "name": "Banner Yönetimi", "category": "İçerik Kontrolü"},
    {"path": "/home/contentcontroller/adds", "name": "Reklam Yönetimi", "category": "İçerik Kontrolü"},
    {"path": "/home/contentcontroller/promotions", "name": "Promosyonlar Yönetimi", "category": "İçerik Kontrolü"},
    {"path": "/home/contentcontroller/mails", "name": "Mail Bülteni", "category": "İçerik Kontrolü"},
    {"path": "/home/contentcontroller/agreement", "name": "Sözleşme Yönetimi", "category": "İçerik Kontrolü"},
    {"path": "/home/categorycontroller/categories", "name": "Kategori", "category": "Kategori Kontrolü"},
    {"path": "/home/categorycontroller/products", "name": "Ürünler", "category": "Kategori Kontrolü"},
    {"path": "/home/updatecontroller/cronjob", "name": "Cronjob Ürünlerini Güncelle", "category": "Güncelleme"},
    {"path": "/home/updatecontroller/xml", "name": "Xml Ürünlerini Güncelle", "category": "Güncelleme"},
    {"path": "/home/reportcontroller/click", "name": "Tıklanma Raporları", "category": "Raporlar"},
    {"path": "/home/reportcontroller/search", "name": "Arama Raporlar", "category": "Raporlar"},
    {"path": "/home/shopcontroller/shops", "name": "Mağazalar", "category": "Mağazalar"},
    {"path": "/home/categorycontroller/support", "name": "Mağaza Destek Bildirimleri", "category": "Mağazalar"},
    {"path": "/home/accountingcontroller/credits", "name": "Kredi Yüklemeleri", "category": "Mağazalar"},
    {"path": "/home/accountingcontroller/livesupport", "name": "Canlı Destek Alımları", "category": "Mağazalar"},
    {"path": "/home/accountingcontroller/adds", "name": "Reklam Alımları", "category": "Mağazalar"},
    {"path": "/home/usercontroller/users", "name": "Kullanıcılar", "category": "Kullanıcılar"},
    {"path": "/home/usercontroller/pointsystem", "name": "Kullanıcı Puan Sistemi", "category": "Kullanıcılar"},
    {"path": "/home/usercontroller/chequesystem", "name": "Çek Talepleri", "category": "Kullanıcılar"},
    {"path": "/home/usercontroller/frontrunner", "name": "Puan Rekortmenleri", "category": "Kullanıcılar"},
  ];
  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, public adminService: AdminService) {
    const req = this.adminService.admins();
    req.subscribe(res => {
      // tslint:disable-next-line: forin
      for ( const i in res ) {
        this.admins.push(res[i])
      }
    });
  }

  signUp(userData) {
    this.auth.signup(userData.firstName, userData.lastName, userData.phone, userData.email, userData.password).subscribe(res => {
      if (res !== undefined && res !== null) {
        this.admins.push(res["admin"])
      }
      this.checkoutForm.reset();
    });
  }
  show(e) {
    console.log(e)
    // for (let i of e.target.selectedOptions) {
    //   console.log(i.value)
    // }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    
  }

  adminSelect(admin) {
    this.state = "Güncelle"
    this.admin = admin
    console.log(this.admin)
  }

  async adminUpdate(admin) {
    delete admin.password;
    delete admin.__v;
    delete admin.tokens;
    (await this.adminService.update(admin)).subscribe(e => {
      console.log(e)
    })
  }
  upload() {
    console.log(this.admin)
    this.adminService.id = this.admin._id;
    this.adminService.uploader.uploadAll();
  }

  remove(id: string, i: number) {
    this.adminService.remove(id).subscribe(e => {
      console.log(e);
      this.admins.splice(i, 1);
    });
  }



}
