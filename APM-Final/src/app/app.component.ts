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

  ngOnInit() {
    }
}
