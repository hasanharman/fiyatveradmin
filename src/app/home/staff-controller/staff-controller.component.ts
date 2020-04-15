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

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    
  }

  adminSelect(admin) {
    this.state = "Güncelle"
    this.admin = admin
    console.log(this.admin)
  }

  async adminUpdate(admin) {
    console.log(admin)
    delete admin.password;
    delete admin.__v;
    delete admin.tokens;
    (await this.adminService.update(admin)).subscribe(e => {
      console.log(e)
    })
  }

  remove(id: string, i: number) {
    this.adminService.remove(id).subscribe(e => {
      console.log(e);
      this.admins.splice(i, 1);
    });
  }



}
