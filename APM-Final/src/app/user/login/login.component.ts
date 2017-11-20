import { Router } from '@angular/router';
import { UserCredentials, UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean;
  credentials: UserCredentials;

  constructor(private userService: UserService, private router: Router) {
    this.credentials = new UserCredentials();
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  public login() {
    this.userService.login(this.credentials).subscribe();
    this.router.navigate(['welcome']);
  }

}
