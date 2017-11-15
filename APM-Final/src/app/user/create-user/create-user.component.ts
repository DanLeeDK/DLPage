import { UserService, UserRegistration } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pm-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: UserRegistration;

  constructor( private userService: UserService, private router: Router ) {
        this.user = new UserRegistration();
    }

  ngOnInit() {

  }

  Register(user: UserRegistration) {
      this.userService.register(user).subscribe();
      this.router.navigate(['welcome']);
  }


  Login(user: UserRegistration) {
    this.userService.login(user).subscribe();
    this.router.navigate(['welcome']);
}
}

