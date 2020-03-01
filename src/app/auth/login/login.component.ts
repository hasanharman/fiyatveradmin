import { AuthService } from './../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkoutForm;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private route: ActivatedRoute, private router: Router) {
    // if (this.auth.currentUserValue) {
    //   this.router.navigate(['/home'])
    // }
  }

  onSubmit(userData) {
    this.auth.login(userData.email, userData.password).subscribe(res => {
      this.router.navigate([this.returnUrl])
      setTimeout(()=>{
        location.reload();
      }, 3);
    }, error => {
      this.error = error;
    })
    this.checkoutForm.reset();
  }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      email: '',
      password: ''
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/lists';
    console.log(this.returnUrl)
  }

}
