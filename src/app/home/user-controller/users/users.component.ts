import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];
  selectedUser;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.users().subscribe(e => {
      for (let i in e) {
        this.users.push(e[i])
      }
    })
  }

}
