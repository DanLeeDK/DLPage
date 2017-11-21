import { GlobalEventsManager } from './../shared/GlobalEventsManager';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'pm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {showNavbar: boolean = false;
  constructor( private userService: UserService,
    private router: Router,
    private globalEventsManager: GlobalEventsManager
  ) {
    this.globalEventsManager.showNavBarEmitter.subscribe((mode) => {
        this.showNavbar = mode;
    });
}

  logout() {
    this.userService.logout();
    this.globalEventsManager.showNavBar(false);
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.showNavbar = true;
      } else {
        this.showNavbar = false;
      }
    }
}
