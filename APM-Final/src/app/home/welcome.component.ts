import { Component } from '@angular/core';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome to Pretty Pets';
    img: string = '../../assets/images/Dogs.jpg';

}
