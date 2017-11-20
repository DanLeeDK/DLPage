import { Component, OnInit } from '@angular/core';
import { Pet, PetService } from '../pet.service';

@Component({
  selector: 'pm-mypets',
  templateUrl: './mypets.component.html',
  styleUrls: ['./mypets.component.css']
})
export class MypetsComponent implements OnInit {
  petslist: Pet[];
  constructor(private service: PetService) { }

  ngOnInit() {
    this.service.getMyPets().subscribe(data => {
      this.petslist = data;
    });
  }
}
