import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { PetProfilComponent } from './pets/pet-profil/pet-profil.component';
import { PetListComponent } from './pets/pet-list/pet-list.component';

import { WelcomeComponent } from './home/welcome.component';
import { CreatePetComponent } from './pets/create-pet/create-pet.component';
import { CreateUserComponent } from './user/create-user/create-user.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
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
    component:
    PetProfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createuser',
    component: CreateUserComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
