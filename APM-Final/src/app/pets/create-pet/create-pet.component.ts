import { Pet, PetService } from './../pet.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pm-new-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.css'],
providers: [PetService]
})
export class CreatePetComponent implements OnInit {
pet: Pet;


@ViewChild('PetImage') PetImage;
  constructor(private service: PetService, private router: Router, private elem: ElementRef) {
this.pet = new Pet();
  }

savePet(pet: Pet) {
  const fi = this.PetImage.nativeElement;
  if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.service.addPet(pet, fileToUpload).subscribe(
        (succes) => this.router.navigate(['petslist'])
      );
}
}

ngOnInit() {
  }

}
