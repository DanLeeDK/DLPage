import { UserService } from './user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  pageTitle: string = 'Pretty Pets';
  loggedIn: boolean = false;

  constructor(private userService: UserService) {
  }

logout() {
this.loggedIn = false;
this.userService.logout();
}

login() {
this.loggedIn = true;
}
  ngOnInit() {

  }
}
