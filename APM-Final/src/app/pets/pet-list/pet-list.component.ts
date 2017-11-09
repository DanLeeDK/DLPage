import { Component, OnInit } from '@angular/core';
import { PetService, Pet } from './../pet.service';


@Component({
  selector: 'pm-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
petslist: Pet[];
images: string;
  constructor(private service: PetService) { }

  ngOnInit() {
    this.service.getAllPets().subscribe(data => {
      this.petslist = data;
    });
  }
}
