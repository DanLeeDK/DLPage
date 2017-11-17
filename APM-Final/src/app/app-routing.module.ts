import { LoginComponent } from './user/login/login.component';
import { PetProfilComponent } from './pets/pet-profil/pet-profil.component';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeComponent } from './home/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePetComponent } from './pets/create-pet/create-pet.component';
import { CreateUserComponent } from './user/create-user/create-user.component';




const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard]
  },
  {
  path: 'createpet',
  component: CreatePetComponent,
  canActivate: [AuthGuard]
  },
  {
    path: 'petslist',
    component: PetListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'petprofil/:id',
    component: PetProfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createuser',
    component: CreateUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
