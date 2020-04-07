import { AuthService } from './../../services/auth.service';
import { FormBuilder } from '@angular/forms';
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
  admin: Admin
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private route: ActivatedRoute, private router: Router, public adminService: AdminService) {
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
    this.checkoutForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: ''
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  adminSelect(admin) {
    this.state = "Güncelle"
    this.admin = admin
    this.checkoutForm.value.firstName = admin.firstName
    this.checkoutForm.value.lastName = admin.lastName
    this.checkoutForm.value.phone = admin.phone
    this.checkoutForm.value.email = admin.email
  }

  async adminUpdate(admin) {
    delete admin.password;
    Object.assign(admin, {"_id": this.admin._id})
    for (let k in admin) {
      if (admin[k] !== "") {
        this.admin[k] = admin[k]
      }
    }
    delete this.admin["password"]
    delete this.admin["__v"]
    delete this.admin["tokens"]
    const currentId = JSON.parse(localStorage.getItem("currentUser")).admin._id;
    if (currentId === this.admin._id) {
      this.adminService.updateme(this.admin).then(()=>{
        this.checkoutForm.value.firstName = ""
        this.checkoutForm.value.lastName = ""
        this.checkoutForm.value.phone = ""
        this.checkoutForm.value.email = ""
        this.admin = new Admin()
      })
    } else {
      this.adminService.update(this.admin).then(()=>{
        this.checkoutForm.value.firstName = ""
        this.checkoutForm.value.lastName = ""
        this.checkoutForm.value.phone = ""
        this.checkoutForm.value.email = ""
        this.admin = new Admin()
      })
    }

  }



}
