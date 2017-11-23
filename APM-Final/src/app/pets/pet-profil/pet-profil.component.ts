import { Image } from './../../shared/Image';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService, Pet } from './../pet.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap';


@Component({
  selector: 'pm-pet-profil',
  templateUrl: './pet-profil.component.html',
  styleUrls: ['./pet-profil.component.css']
})
export class PetProfilComponent implements OnInit {
id: number;
pet: Pet;
petslist: Pet[];
deletable = false;
delete = false;
ImageLoaded = true;

@ViewChild('PetImage') PetImage;
constructor( private service: PetService, private route: ActivatedRoute, private router: Router ) {
  }

showDeleteButton() {
this.delete = !this.delete;
}

LoadImage() {
  this.ImageLoaded = !this.ImageLoaded;
}

deletePet()  {
  this.service.deletePet(this.pet.id).subscribe(
    (res) => {
      console.log('Deleting...');
      this.router.navigate(['petslist']);
    }
  );
}

addImage() {
  const fi = this.PetImage.nativeElement;
  if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.service.addImage(fileToUpload).subscribe(
        (succes) => this.router.navigate(['petprofil/' + this.pet.id])
      );
} else {
  alert('Please choose a picture to upload');
}
}

  ngOnInit() {
    let pet = new Pet();
    this.route.params.subscribe(params => {
      this.id = params['id'];
     });
     this.service.getPet(this.id).subscribe(
      data => {
        this.pet = data;
        pet = data;
      },
      err => {
        console.log('Something went wrong while getting the pet!');
      });

      this.service.getMyPets().subscribe(pets => {
        pets.forEach(element => {
          if (element.id === pet.id) {
            this.deletable = true;
        }
      }
    );
    });
  }
}
