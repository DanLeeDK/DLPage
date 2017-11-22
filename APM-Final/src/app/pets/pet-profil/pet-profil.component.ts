import { ActivatedRoute, Router } from '@angular/router';
import { PetService, Pet } from './../pet.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'pm-pet-profil',
  templateUrl: './pet-profil.component.html',
  styleUrls: ['./pet-profil.component.css']
})
export class PetProfilComponent implements OnInit {
id: number;
pet: Pet;
petslist: Pet[];
deletable = true;
delete = false;

  constructor( private service: PetService, private route: ActivatedRoute, private router: Router ) {
  }

showDeleteButton() {
this.delete = !this.delete;
}

  deletePet()  {
    this.service.deletePet(this.pet.id).subscribe(
      (res) => {
        console.log('Deleting...');
        this.router.navigate(['petslist']);
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
     });
     this.service.getPet(this.id).subscribe(
      data => {
        this.pet = data;
      },
      err => {
        console.log('Something went wrong while getting the pet!');
      });

      this.service.getMyPets().subscribe(data =>
        this.petslist = data
      );
      if (this.petslist.includes(this.pet)) {
        this.deletable = false;
    }
  }
}
