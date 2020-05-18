import { AuthService } from './../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  checkoutForm;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  // onSubmit(userData) {
  //   this.auth.signup(userData.firstName, userData.lastName, userData.phone, userData.email, userData.password).subscribe(res => {
  //     this.auth.login(userData.email, userData.password).subscribe(res => {
  //       this.router.navigate([this.returnUrl])
  //     }, error => {
  //       this.error = error;
  //     });
  //     this.checkoutForm.reset();
  //   });
  // }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: ''
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home/homepage';
    console.log(this.returnUrl)
  }

  // back() {
  //   this.router.navigate(['/lists']);
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 10 );
  // }

}
