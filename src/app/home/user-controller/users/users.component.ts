import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchService } from './../../../services/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  users: Array<User> = new Array<User>();
  fixedUsers: Array<User> = new Array<User>();
  selectedUser: User = new User();
  searchText = null;
  constructor(private userService: UserService, private searchService: SearchService) { }

  ngOnInit() {
    this.userService.users().subscribe(e => {
      for (let i in e) {
        this.users.push(e[i]);
        this.fixedUsers.push(e[i]);
      }
      this.searchText = this.searchService.userText;
      if (this.searchText) {
        this.search(this.searchText);
      }
    })
  }

  update(user: User) {
    delete user["__v"];
    delete user.tokens;
    delete user.history;
    delete user.registerDate;
    delete user.password;
    this.userService.update(user).subscribe(e => {
      console.log(e);
    });
  }

  remove(id: string, i: number) {
    const req = {"_id": id};
    this.userService.remove(req).subscribe(e => {
      this.users.splice(i, 1);
      this.fixedUsers.splice(i, 1);
    })
  }

  search(e) {
    this.searchService.userText = e;
    this.searchText = e;
    const searchedIds = this.searchService.search(e, this.fixedUsers);
    let users: Array<User> = new Array<User>();
    this.fixedUsers.forEach(e => {
      if (searchedIds.indexOf(e._id) !== -1) {
        users.push(e);
      }
    });
    this.users = users;
  }

}
