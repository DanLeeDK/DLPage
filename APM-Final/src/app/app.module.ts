import { UserService } from './user/user.service';
import { SearchPipe } from './search-pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetService } from './pets/pet.service';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PetProfilComponent } from './pets/pet-profil/pet-profil.component';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { CreatePetComponent } from './pets/create-pet/create-pet.component';
import { CreateUserComponent } from './user/create-user/create-user.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SearchPipe,
    PetProfilComponent,
    PetListComponent,
    CreatePetComponent,
    CreateUserComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: 'createpet', component: CreatePetComponent },
        { path: 'petslist', component: PetListComponent },
        { path: 'petprofil/:id', component: PetProfilComponent },
        { path: 'createuser', component: CreateUserComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full'},
        { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
  ],
providers: [ PetService, UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
