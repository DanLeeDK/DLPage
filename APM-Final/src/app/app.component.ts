import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  pageTitle: string = 'Pretty Pets';
  loggedIn: boolean = false;
  constructor( private userService: UserService, private router: Router) { }

  logout() {
    this.userService.logout();
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
}
