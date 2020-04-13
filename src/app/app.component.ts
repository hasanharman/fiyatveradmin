import { AuthService } from './services/auth.service';
import {Component} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fiyatver-admin';

  constructor(private auth: AuthService) {
    this.auth.currentUser.subscribe(a => {
      console.log(a);
    })
  }
}


