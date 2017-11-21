import { GlobalEventsManager } from './shared/GlobalEventsManager';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  pageTitle: string = 'Pretty Pets';
  showNavbar: boolean = false;
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
    }
}
